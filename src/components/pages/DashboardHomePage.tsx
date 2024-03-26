import { Container, WineryHeaderSection, WinesListSection } from "@/components";

export const DashboardHomePage = () => {
  return (
    <Container intent="flexColTop" className="w-full h-full">
      <WineryHeaderSection />
      <WinesListSection />
    </Container>
  );
};
