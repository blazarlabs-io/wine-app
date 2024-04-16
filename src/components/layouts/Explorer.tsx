import {
  TopBar,
  Toast,
  Modal,
  AuthSpinnerLoader,
  GeneralLoaderOverlay,
  ExploreModeSelect,
  SideBarFilter,
  Container,
} from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const ExplorerLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-full">
      <GeneralLoaderOverlay />
      <AuthSpinnerLoader />
      <Modal />
      <Toast />
      <TopBar />
      <ExploreModeSelect />
      <Container
        intent="unstyled"
        gap="large"
        className="flex items-start justify-start min-w-full"
      >
        {/* <SideBarFilter /> */}
        <Container intent="flexColTop" className="min-w-full">
          {children}
        </Container>
      </Container>
    </main>
  );
};
