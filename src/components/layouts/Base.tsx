import { TopBar, Toast } from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] min-h-screen w-full">
      <TopBar />
      <Toast />
      {children}
    </main>
  );
};
