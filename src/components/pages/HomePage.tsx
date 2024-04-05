import { Container } from "../core/Container";
import { HeroSection } from "../sections/Home/HeroSection";
import Image from "next/image";

export const HomePage = () => {
  return (
    <Container intent="flexColTop" className="w-full h-full">
      <div
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          width: "100%",
          height: "100%",
          // maxHeight: "100vh",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: -1,
        }}
      />
      <HeroSection />
    </Container>
  );
};
