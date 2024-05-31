import { useEffect, useState } from "react";

export interface SensorData {
  date: string;
  type: string;
  value: number;
}

export const useGetIpfsData = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [ipfsData, setIpfsData] = useState<any>(null);
  const [temperatureData, setTemperatureData] = useState<SensorData[]>([]);
  const [humidityData, setHumidityData] = useState<SensorData[]>([]);
  const [vibrationData, setVibrationData] = useState<SensorData[]>([]);
  const [lightingData, setLightingData] = useState<SensorData[]>([]);
  const [sensorData, setSensorData] = useState<any>([]);

  const setIpfsUrl = (utl: string) => {
    setUrl(utl);
  };

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIpfsData(data);

          data.storageConditions.storageTemperature.data.forEach(
            (element: any, index: number) => {
              const _date = new Date(element.dateTime);

              const shortDate = _date.toLocaleDateString();
              const shortTime = _date.toLocaleTimeString();

              const date = `${shortDate} ${shortTime}`;

              const temp = {
                date,
                type: "temperature",
                value: element.value,
              };

              setTemperatureData((prev: any) => [...prev, temp]);

              const humidity = {
                date,
                type: "humidity",
                value: data.storageConditions.humidityLevel.data[index].value,
              };

              setHumidityData((prev: any) => [...prev, humidity]);

              const vibration = {
                date,
                type: "vibration",
                value: data.storageConditions.vibrationLevel.data[index].value,
              };

              setVibrationData((prev: any) => [...prev, vibration]);

              const lighting = {
                date,
                type: "lighting",
                value:
                  data.storageConditions.lightingConditions.data[index].value,
              };

              setLightingData((prev: any) => [...prev, lighting]);

              setSensorData((prev: any) => [
                ...prev,
                temp,
                humidity,
                vibration,
                lighting,
              ]);
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [url]);

  return {
    setIpfsUrl,
    ipfsData,
    sensorData,
    temperatureData,
    humidityData,
    vibrationData,
    lightingData,
  };
};
