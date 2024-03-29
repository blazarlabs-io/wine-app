import { TopBar, Toast, Modal } from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-full">
      <TopBar />
      <Modal />
      <Toast />
      {children}
    </main>
  );
};
