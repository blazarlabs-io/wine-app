"use client";
import { SensorData } from "@/hooks/useGetIpfsData";
import { LineGraph } from "./LineGraph";
import { Button, Container } from "@/components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { classNames } from "@/utils/classNames";

export interface SensorsProps {
  temperatureData: SensorData[];
  humidityData: SensorData[];
  vibrationData: SensorData[];
  lightingData: SensorData[];
}

export interface Sensor {
  id: number;
  icon: string;
  selected: boolean;
  title: string;
  data: SensorData[];
}

export const Sensors = ({
  temperatureData,
  humidityData,
  vibrationData,
  lightingData,
}: SensorsProps) => {
  const [data, setData] = useState<Sensor[]>([
    {
      id: 0,
      icon: "fluent:temperature-16-filled",
      selected: true,
      title: "Temperature sensor data",
      data: temperatureData,
    },
    {
      id: 1,
      icon: "carbon:humidity-alt",
      selected: false,
      title: "Humidity sensor data",
      data: humidityData,
    },
    {
      id: 2,
      icon: "lets-icons:lamp-light",
      selected: false,
      title: "Lighting sensor data",
      data: lightingData,
    },
    {
      id: 3,
      icon: "lucide:vibrate",
      selected: false,
      title: "Vibration sensor data",
      data: vibrationData,
    },
  ]);
  const [selected, setSelected] = useState<Sensor>(data[0]);

  const handleIndex = (i: number) => {
    data.map((item) => {
      item.selected = false;
    });
    data[i].selected = true;
    setSelected(data[i]);
  };
  return (
    <>
      <Container
        intent="flexColLeft"
        gap="medium"
        px="medium"
        py="medium"
        className="w-full rounded-lg bg-[#141414]"
      >
        <Container intent="flexRowCenter" gap="small">
          {data.map((item, i) => (
            <div key={item.title} className="w-full">
              <Button
                intent="unstyled"
                fullWidth
                className={classNames(
                  "text-2xl font-bold flex items-center justify-center py-[12px]",
                  item.selected
                    ? "bg-primary-light/20"
                    : "group bg-transparent hover:bg-primary-light/10 transition-all duration-300 ease-in-out"
                )}
                onClick={() => handleIndex(i)}
              >
                <Icon
                  icon={item.icon}
                  width="24px"
                  className={classNames(
                    item.selected
                      ? "text-primary-light"
                      : "text-on-surface-dark group-hover:text-primary-light/50 transition-all duration-300 ease-in-out"
                  )}
                />
              </Button>
            </div>
          ))}
        </Container>
        {selected.data && (
          <div className="w-full">
            <LineGraph
              title={selected.title}
              sensorData={selected.data}
              highlightColor="#D68287"
            />
          </div>
        )}
      </Container>
    </>
  );
};
