"use client";

import "./index.css";
import { useState, useMemo } from "react";
import CHART_DATA from "@/data/jiraVelocityChart";

const Chart: React.FC = () => {
  const maxTicketCount = useMemo(
    () => Math.max(...CHART_DATA.map((bar) => bar.ticketCount)),
    [],
  );

  return (
    <div className="relative mx-auto h-[700px] w-[80%]">
      <span
        data-axis="y"
        className="absolute -left-[4.5rem] top-1/2 -translate-y-1/2 -rotate-90 select-none whitespace-nowrap text-lg font-bold"
      >
        No of tickets
      </span>

      <div
        data-chart="tickets-vs-department"
        className="flex size-full items-end gap-10 border-b border-l border-black"
      >
        {/* .bar:hover .tooltip {opacity: 100} */}
        {CHART_DATA.map((bar) => (
          <div
            key={bar.id}
            style={{
              backgroundColor: bar.colour,
              height: `${(bar.ticketCount / maxTicketCount) * 100}%`,
            }}
            className="animateBarHeight group relative flex-1"
          >
            <div className="absolute -top-9 left-1/2 z-10 w-fit -translate-x-1/2 select-none whitespace-nowrap rounded-md bg-black p-1 text-white opacity-0 transition-opacity delay-[400ms] group-hover:opacity-100">
              {bar.name} - {bar.ticketCount}
            </div>
          </div>
        ))}
      </div>

      <span
        data-axis="x"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 select-none text-lg font-bold"
      >
        Department
      </span>
    </div>
  );
};

const JiraVelocityChat = () => {
  const [renderChart, setRenderChart] = useState(false);

  function toogleRenderChart() {
    setRenderChart((prev) => !prev);
  }

  return (
    <div>
      <button
        onClick={toogleRenderChart}
        type="button"
        className="mx-auto my-5 block rounded-md bg-gray-800 px-6 py-4 font-semibold text-white transition-transform active:scale-90"
      >
        Render Chart
      </button>

      {renderChart && <Chart />}
    </div>
  );
};

export default JiraVelocityChat;
