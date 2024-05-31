"use client";

import { SensorData } from "@/hooks/useGetIpfsData";
// import { Line } from "@ant-design/plots";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export interface AreaGraphProps {
  title: string;
  sensorData: SensorData[];
  highlightColor: string;
  dashed?: boolean;
}

export const LineGraph = ({
  title,
  sensorData,
  highlightColor = "#D68287",
  dashed = false,
}: AreaGraphProps) => {
  const Line = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Line) as any,
    { ssr: false }
  );

  const [data, setData] = useState<SensorData[] | null>(null);
  const [configuration, setConfiguration] = useState<any>(null);

  useEffect(() => {
    setData(sensorData);
  }, [sensorData]);

  useEffect(() => {
    if (data) {
      setConfiguration({
        data,

        title: title,
        theme: "classicDark",
        xField: "date",
        yField: "value",
        colorField: "type",
        point: {
          size: 5,
          shape: "circle",
          style: {
            fill: "trnasparent",
            stroke: "#D68287",
            lineWidth: 1,
          },
        },
        axis: {
          y: {
            labelFormatter: (v: any) =>
              `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
        },
        scale: { color: { range: [highlightColor] } },
        style: {
          fontSize: 16,
          lineWidth: 2,
          lineDash: (data: any) => {
            if (dashed) return [4, 4];
          },
          opacity: (data: any) => {
            if (data[0].type !== "humidity") return 0.5;
          },
        },
      });
    }
  }, [data, title, highlightColor, dashed]);

  return (
    <>
      {configuration && sensorData && (
        <Line className="rounded-lg" {...configuration} />
      )}
    </>
  );
};
