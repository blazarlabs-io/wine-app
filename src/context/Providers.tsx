import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";
import { WineryProvider } from "./wineryContext";
import { ModalProvider } from "./modalContext";
import { AppStateProvider } from "./appStateContext";
import { RealtimeDbProvider } from "./realtimeDbContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppStateProvider>
      <AuthProvider>
        <RealtimeDbProvider>
          <WineryProvider>
            <ToastProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
          </WineryProvider>
        </RealtimeDbProvider>
      </AuthProvider>
    </AppStateProvider>
  );
};
