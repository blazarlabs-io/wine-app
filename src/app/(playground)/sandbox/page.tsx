"use client";

import { EuLabelsAccordion, Container } from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export default function Sandbox() {
  const { wineryEuLabels } = useRealtimeDb();
  return (
    <Container intent="flexRowCenter" className="">
      <EuLabelsAccordion data={wineryEuLabels} />
    </Container>
  );
}
