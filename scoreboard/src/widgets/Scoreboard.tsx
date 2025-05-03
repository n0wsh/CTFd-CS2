"use client";
import React, { useState } from "react";

import { Score } from "@/components/Score";
import { ScoreboardItem } from "@/server/scoreboard";
import { useScoreboard } from "@/hooks/useScoreboard";

type Props = {
  initialScoreboard: ScoreboardItem[];
  endAt: number;
};

export const Scoreboard = ({ initialScoreboard, endAt }: Props) => {
  const { scoreboard } = useScoreboard({
    endAt,
    initialScoreboard,
  });
  const [isStarted, setIsStarted] = useState(false);

  return isStarted ? (
    <div className="flex flex-col items-center bg-[#1e202fe6] rounded-sm">
      <h1 className="font-(family-name:--font-highspeed) text-4xl p-5">
        Scoreboard
      </h1>
      <table>
        <thead className="text-xl">
          <tr>
            <th className="p-2">Rank</th>
            <th className="p-2">Rating</th>
            <th className="p-2 text-start">Team</th>
            <th className="p-2">Kills</th>
            <th className="p-2">Deaths</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {scoreboard.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                (index + 1) % 2 !== 0 ? "bg-[#00000033]" : "bg-transparent"
              } ${
                index + 1 === 1
                  ? "text-[#FFF732]"
                  : index + 1 === 2
                  ? "text-[#C0C0C0]"
                  : index + 1 === 3
                  ? "text-[#CD7F32]"
                  : "text-[#E9E9E9]"
              }`}
            >
              <td className="p-2 text-center text-3xl font-bold">
                {index + 1}
              </td>
              <td className="p-2">
                <Score score={item.score} />
              </td>
              <td className="p-2 font-medium min-w-xs">{item.name}</td>
              <td className="p-2 text-center text-3xl font-bold">
                {item.solves}
              </td>
              <td className="p-2 text-center text-3xl font-bold">
                {item.fails}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <button className="bg-[#36B752] text-[#133C08] hover:bg-[#43D663] hover:text-[#fff] hover:text-shadow-[0_0_8px_#fff] ease-linear duration-200 px-8 py-5 text-4xl font-bold rounded-xs cursor-pointer" onClick={() => setIsStarted(true)}>ACCEPT</button>
    </div>
  );
};
