import React from "react";

export const Score = ({ score }: { score: number }) => {
  const getColor = (score: number): string => {
    if (score >= 30000) return "#FED700";
    if (score >= 25000) return "#EB4B4B";
    if (score >= 20000) return "#D22CE6";
    if (score >= 15000) return "#8846FF";
    if (score >= 10000) return "#4B69FF";
    if (score >= 5000) return "#5E98D9";
    return "#B1C3D9";
  };

  const color = getColor(score);

  return (
    <div className="flex items-center justify-center relative">
      <svg
        width="160"
        height="54"
        viewBox="0 0 160 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 0H160L150 54H1L10 0Z" fill={color} fillOpacity="0.3" />
        <path d="M21 0H29L18 54H10L21 0Z" fill={color} />
        <path
          d="M30.5 2H34.5L24.5 52H20.5L30.5 2Z"
          fill={color}
          fillOpacity="0.5"
        />
        <path
          d="M36.5 2H44.5L34.5 52H26.5L36.5 2Z"
          fill={color}
          fillOpacity="0.2"
        />
        <path
          d="M46.5 2H58.5L48.5 52H36.5L46.5 2Z"
          fill={color}
          fillOpacity="0.2"
        />
        <path
          d="M60.5 2H80.5L70.5 52H50.5L60.5 2Z"
          fill={color}
          fillOpacity="0.2"
        />
        <path d="M10 0H19L8 54H0L10 0Z" fill={color} />
      </svg>
      <div className="absolute font-(family-name:--font-highspeed) -mr-4">
        {(() => {
          const stringScore = score.toLocaleString();
          const [main, rest] = stringScore.split(",");

          return (
            <span style={{ color: color, textShadow: `0 0 4px ${color}` }}>
              {stringScore === "0" ? (
                <span>{stringScore}</span>
              ) : (
                <>
                  <span className="text-[32px]">{main}</span>
                  <span className="-ml-[7px] text-xl">{"," + rest}</span>
                </>
              )}
            </span>
          );
        })()}
      </div>
    </div>
  );
};
