import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { ScoreboardItem } from "@/server/scoreboard";
import { FirstBloodItem } from "@/server/firstblood";

import { useTaskQueue } from "@/contexts/TaskQueueContext";
import { playSound } from "@/core/SoundDispatcher";

export function useScoreboard({
  endAt,
  initialScoreboard,
}: {
  endAt: number;
  initialScoreboard: ScoreboardItem[];
}) {
  const [scoreboard, setScoreboard] = useState(initialScoreboard);
  const scoreboardRef = useRef(scoreboard);
  const taskQueue = useTaskQueue();

  useEffect(() => {
    scoreboardRef.current = scoreboard;
  }, [scoreboard]);

  // Initial fetch
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

  // Sound when game ends
  useEffect(() => {
    const now = Date.now() / 1000;
    const timeUntilEnd = endAt - now;
    if (timeUntilEnd <= 0) return;

    const timeout = setTimeout(() => {
      playSound("end");
    }, timeUntilEnd * 1000);

    return () => clearTimeout(timeout);
  }, [endAt]);

  // WebSocket listener
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);

    socket.on(
      "submission",
      async (submission: {
        success: boolean;
        team: { id: number; name: string };
      }) => {
        console.log("Received submission:", submission);

        if (!submission.success) {
          // Incorrect submission, increase fail count
          setScoreboard((scoreboard) =>
            scoreboard.map((standing) =>
              standing.id === submission.team.id
                ? { ...standing, fails: standing.fails + 1 }
                : standing
            )
          );
          return;
        }

        // Correct submission
        const [firstBlood, newScoreboard] = await Promise.all([
          fetch("/api/firstblood").then((res) => res.json()),
          fetch("/api/scoreboard").then((res) => res.json()),
        ]);

        const teamBloods = firstBlood.filter(
          (el: FirstBloodItem) => el.team_id === submission.team.id
        );

        const latestBlood = teamBloods[teamBloods.length - 1];
        const matchingTeam = newScoreboard.find(
          (team: ScoreboardItem) => team.id === latestBlood?.team_id
        );

        taskQueue.push(async () => {
          await playSound("kill").catch(() => {});

          const playedFirstBloods: number[] = JSON.parse(
            localStorage.getItem("firstBloodList") || "[]"
          );

          const isAlreadyAnnounced = playedFirstBloods.includes(
            latestBlood?.challenge_id
          );

          if (!isAlreadyAnnounced && latestBlood) {
            await playSound("firstblood").catch(() => {});
            console.log(`First blood for team: ${matchingTeam?.name}`);
            playedFirstBloods.push(latestBlood.challenge_id);
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
