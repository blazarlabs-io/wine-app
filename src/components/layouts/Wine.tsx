import {
  TopBar,
  Toast,
  Modal,
  AuthSpinnerLoader,
  GeneralLoaderOverlay,
  MapViewerSection,
} from "@/components";

export interface WineLayoutProps {
  children: React.ReactNode;
}

export const WineLayout = ({ children }: WineLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] w-full min-h-screen">
      <GeneralLoaderOverlay />
      <AuthSpinnerLoader />
      <TopBar />
      <Modal />
      <Toast />
      {children}
    </main>
  );
};
