"use client";

import { AuthProvider } from "./authContext";
import { ToastProvider } from "./toastContext";
import { ModalProvider } from "./modalContext";
import { AppStateProvider } from "./appStateContext";
import { RealtimeDbProvider } from "./realtimeDbContext";
import { FiltersProvider } from "./filtersContext";
import { FormsProvider } from "./FormsContext";
import { APIProvider } from "@vis.gl/react-google-maps";
import { MasterLoaderProvider } from "./masterLoaderContext";
import { UiContextProvider } from "./uiContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <MasterLoaderProvider>
      <AppStateProvider>
        <UiContextProvider>
          <AuthProvider>
            <RealtimeDbProvider>
              <FormsProvider>
                <FiltersProvider>
                  <ToastProvider>
                    <ModalProvider>
                      <APIProvider
                        apiKey={
                          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                        }
                      >
                        {children}
                      </APIProvider>
                    </ModalProvider>
                  </ToastProvider>
                </FiltersProvider>
              </FormsProvider>
            </RealtimeDbProvider>
          </AuthProvider>
        </UiContextProvider>
      </AppStateProvider>
    </MasterLoaderProvider>
  );
};
