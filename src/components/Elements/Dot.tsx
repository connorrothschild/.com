import React from "react";

export default function Dot({
  animated = false,
  classes,
}: {
  animated?: boolean;
  classes?: string;
}) {
  return (
    <div
      className={`relative w-3 h-3 rounded-full animate-gradient bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 ${classes}`}
    >
      {animated && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full animate-gradient bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 opacity-75"></span>
      )}
    </div>
  );
}
