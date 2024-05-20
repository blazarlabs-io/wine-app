"use client";

import { WinesAccordion, Container } from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export default function Sandbox() {
  const { wines } = useRealtimeDb();
  return (
    <Container intent="flexRowCenter" className="">
      {/* <WinesAccordion data={wines} /> */}
    </Container>
  );
}
