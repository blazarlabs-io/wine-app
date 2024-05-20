import { Banner, GeneralLoaderOverlay, Modal, Toast } from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const CleanLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative py-[32px] flex flex-col justify-start items-center mx-auto max-w-[1440px] min-h-screen w-full">
      <Toast />
      <Banner />
      <GeneralLoaderOverlay />
      <Modal />
      {children}
    </main>
  );
};
