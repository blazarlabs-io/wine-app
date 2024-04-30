import {
  TopBar,
  Toast,
  Modal,
  AuthSpinnerLoader,
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
      <AuthSpinnerLoader />
      <TopBar />
      <Modal />
      <Toast />
      {children}
    </main>
  );
};
