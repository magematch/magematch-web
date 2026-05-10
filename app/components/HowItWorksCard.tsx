import React from "react";

export interface HowItWorksCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  dynamicContent?: React.ReactNode;
}

export default function HowItWorksCard({
  title,
  desc,
  icon,
  highlight = false,
  dynamicContent,
}: HowItWorksCardProps) {
  return (
    <div
      className={`relative rounded-3xl border p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:scale-[1.03] ${
        highlight
          ? "border-orange-400 bg-gradient-to-br from-orange-50 via-white to-white ring-2 ring-orange-200 animate-pulse"
          : "border-zinc-200/70 bg-white"
      }`}
    >
      {icon && <div className="mb-3">{icon}</div>}
      <p className="text-lg font-semibold text-zinc-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
      {dynamicContent && <div className="mt-4">{dynamicContent}</div>}
    </div>
  );
}
