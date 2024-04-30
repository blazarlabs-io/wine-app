import {
  TopBar,
  Toast,
  Modal,
  GeneralLoaderOverlay,
  MasterLoaderOverlay,
} from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] w-full min-h-screen">
      <MasterLoaderOverlay />
      <GeneralLoaderOverlay />
      <TopBar />
      <Modal />
      <Toast />
      {children}
    </main>
  );
};
