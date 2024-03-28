import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";
import { WineryProvider } from "./wineryContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <WineryProvider>
        <ToastProvider>{children}</ToastProvider>
      </WineryProvider>
    </AuthProvider>
  );
};
