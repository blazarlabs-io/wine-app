import {
  TopBar,
  Toast,
  Modal,
  AuthSpinnerLoader,
  GeneralLoaderOverlay,
} from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-full">
      <GeneralLoaderOverlay />
      <AuthSpinnerLoader />
      <TopBar />
      <Modal />
      <Toast />
      {children}
    </main>
  );
};
