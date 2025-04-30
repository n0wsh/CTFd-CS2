// import { useEffect, useRef, useState } from "react";

// import { io } from "socket.io-client";

// import { ScoreboardItem } from "@/server/scoreboard";
// import { SoundsManifest } from "@/server/sounds";

// import { useTaskQueue } from "@/contexts/TaskQueueContext";

// import { pickSound } from "@/core/sounds";
// import { playSound } from "@/core/SoundDispatcher";
// import { FirsBloodItem } from "@/server/firstblood";

// export function useScoreboard({
//   endAt,
//   sounds,
//   initialScoreboard,
// }: {
//   endAt: number;
//   sounds: SoundsManifest;
//   initialScoreboard: ScoreboardItem[];
// }) {
//   const [scoreboard, setScoreboard] = useState(initialScoreboard);

//   const scoreboardRef = useRef(scoreboard);
//   useEffect(() => {
//     scoreboardRef.current = scoreboard;
//   }, [scoreboard]);

//   useEffect(() => {
//     const now = Date.now() / 1000;
//     const timeUntilEnd = endAt - now;
//     if (timeUntilEnd <= 0) {
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       const newScoreboard: ScoreboardItem[] = await fetch(
//         "/api/scoreboard"
//       ).then((res) => res.json());
//       await playSound("/assets/sounds/end.mp3"); // ENDED
//     }, timeUntilEnd * 1000);
//     return () => clearTimeout(timeout);
//   }, [endAt]);

//   return { scoreboard };
// }
