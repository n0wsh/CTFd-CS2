import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

import { ScoreboardItem } from "@/server/scoreboard";

import { useTaskQueue } from "@/contexts/TaskQueueContext";

import { playSound } from "@/core/SoundDispatcher";
import { FirstBloodItem } from "@/server/firstblood";

export function useScoreboard({
  endAt,
  initialScoreboard,
}: {
  endAt: number;
  initialScoreboard: ScoreboardItem[];
}) {
  const [scoreboard, setScoreboard] = useState(initialScoreboard);

  const scoreboardRef = useRef(scoreboard);
  useEffect(() => {
    scoreboardRef.current = scoreboard;
  }, [scoreboard]);

  // 🔥 INITIAL FETCH
  useEffect(() => {
    async function fetchInitialScoreboard() {
      try {
        const res = await fetch("/api/scoreboard");
        const data = await res.json();
        setScoreboard(data);
      } catch (err) {
        console.error("Failed to fetch initial scoreboard", err);
      }
    }
    fetchInitialScoreboard();
  }, []);

  useEffect(() => {
    const now = Date.now() / 1000;
    const timeUntilEnd = endAt - now;
    if (timeUntilEnd <= 0) {
      return;
    }

    const timeout = setTimeout(async () => {
      await playSound("/assets/sounds/end.mp3"); // ENDED
    }, timeUntilEnd * 1000);
    return () => clearTimeout(timeout);
  }, [endAt]);

  const taskQueue = useTaskQueue();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);
    socket.on(
      "submission",
      async (submission: {
        success: boolean;
        status: "correct" | "incorrect" | "already_solved";
        team: { id: number; name: string };
      }) => {
        if (submission.status === "incorrect") {
          // Increment fail count
          setScoreboard((scoreboard) =>
            scoreboard.map((standing) => {
              if (standing.id === submission.team.id) {
                return { ...standing, fails: standing.fails + 1 };
              }
              return standing;
            })
          );
          return;
        }

        if (submission.status === "already_solved") {
          // No-op: team already solved this, no update
          return;
        }

        // Only here if submission.status === "correct"
        const firstBlood: FirstBloodItem[] = await fetch(
          "/api/firstblood"
        ).then((res) => res.json());
        const newScoreboard: ScoreboardItem[] = await fetch(
          "/api/scoreboard"
        ).then((res) => res.json());

        const firstBloodList = firstBlood.filter(
          (el) => el.team_id === submission.team.id
        );

        const teamID = firstBloodList[firstBloodList.length - 1]?.team_id;

        const matchingTeam = newScoreboard.find((team) => team.id === teamID);

        taskQueue.push(async () => {
          await playSound("kill").catch(() => {});

          const playedFirstBloods: number[] = JSON.parse(
            localStorage.getItem("firstBloodList") || "[]"
          );

          const latestFirstBlood = firstBloodList[firstBloodList.length - 1];

          const isAlreadyAnnounced = playedFirstBloods.includes(
            latestFirstBlood?.challenge_id
          );

          if (!isAlreadyAnnounced && latestFirstBlood) {
            await playSound("firstblood").catch(() => {});
            console.log(`First blood for team: ${matchingTeam?.name}`);
            playedFirstBloods.push(latestFirstBlood.challenge_id);
            localStorage.setItem(
              "firstBloodList",
              JSON.stringify(playedFirstBloods)
            );
          }

          setScoreboard(newScoreboard);
        });
      }
    );

    return () => {
      socket.close();
    };
  }, [taskQueue]);

  return { scoreboard };
}
