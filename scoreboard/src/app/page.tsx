"use client";
import { Score } from "@/components/Score";
// import { useEffect, useRef, useState } from "react";
// import { Announce, Scoreboard } from "./components";
// import { fetchData } from "./server/fetchData";

const scoreboardData = [
  {
    pos: 1,
    name: "Team A",
    score: 30000,
    kills: 10,
    deaths: 2,
  },
  {
    pos: 2,
    name: "Ардын хоршооны хөөрхөн Бурмаа",
    score: 27000,
    kills: 8,
    deaths: 5,
  },
  {
    pos: 3,
    name: "Hackratic",
    score: 25000,
    kills: 6,
    deaths: 4,
  },
  {
    pos: 4,
    name: "Team B",
    score: 20000,
    kills: 5,
    deaths: 3,
  },
  { pos: 5, name: "因果", score: 15000, kills: 4, deaths: 2 },
  { pos: 6, name: "Tralalero Tralala 🦈👟", score: 12000, kills: 3, deaths: 1 },
  { pos: 7, name: "Team E", score: 10000, kills: 2, deaths: 0 },
  { pos: 8, name: "Team F", score: 8000, kills: 1, deaths: 1 },
  { pos: 9, name: "Team G", score: 6000, kills: 1, deaths: 2 },
  { pos: 10, name: "Team H", score: 0, kills: 0, deaths: 3 },
];

export default function Home() {
  return (
    <div className="w-screen h-screen bg-mirage-background-image bg-no-repeat bg-center bg-cover">
      <main className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#10101080] backdrop-blur-xs">
        <div className="flex flex-col items-center bg-[#1e202fe6]">
          <h1 className="font-(family-name:--font-highspeed) text-4xl p-5">
            Scoreboard
          </h1>
          <table>
            <thead className="text-xl">
              <tr>
                <th className="p-2">Rank</th>
                <th className="py-2">Rating</th>
                <th className="py-2 text-start">Team</th>
                <th className="p-2">Kills</th>
                <th className="p-2">Deaths</th>
              </tr>
            </thead>
            <tbody className="text-2xl">
              {scoreboardData.map((item) => (
                <tr
                  key={item.pos}
                  className={`${
                    item.pos % 2 !== 0 ? "bg-[#00000033]" : "bg-transparent"
                  } ${
                    item.pos === 1
                      ? "text-[#FFF732]"
                      : item.pos === 2
                      ? "text-[#C0C0C0]"
                      : item.pos === 3
                      ? "text-[#CD7F32]"
                      : "text-[#E9E9E9]"
                  }`}
                >
                  <td className="p-2 text-center text-3xl font-bold">
                    {item.pos}
                  </td>
                  <td className="p-2">
                    <Score score={item.score} />
                  </td>
                  <td className="p-2 font-medium">{item.name}</td>
                  <td className="p-2 text-center text-3xl font-bold">
                    {item.kills}
                  </td>
                  <td className="p-2 text-center text-3xl font-bold">
                    {item.deaths}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
