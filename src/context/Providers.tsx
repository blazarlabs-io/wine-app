import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";
import { WineryProvider } from "./wineryContext";
import { ModalProvider } from "./modalContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <WineryProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </WineryProvider>
    </AuthProvider>
  );
};
