import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";
import { WineryProvider } from "./wineryContext";
import { ModalProvider } from "./modalContext";
import { AppStateProvider } from "./appStateContext";
import { RealtimeDbProvider } from "./realtimeDbContext";
import { FiltersProvider } from "./filtersContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppStateProvider>
      <AuthProvider>
        <RealtimeDbProvider>
          <WineryProvider>
            <FiltersProvider>
              <ToastProvider>
                <ModalProvider>{children}</ModalProvider>
              </ToastProvider>
            </FiltersProvider>
          </WineryProvider>
        </RealtimeDbProvider>
      </AuthProvider>
    </AppStateProvider>
  );
};
