"use client";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { ToastProps } from "@/typings/components";

export interface ToastContextInterface extends ToastProps {
  show: ToastProps["show"];
  timeout: ToastProps["timeout"];
  status: ToastProps["status"];
  message: ToastProps["message"];
  updateToast: (props: ToastProps) => void;
}

const contextInitialData: ToastContextInterface = {
  show: false,
  status: null,
  message: null,
  timeout: null,
  updateToast: () => {},
};

const ToastContext = createContext(contextInitialData);

export const useToast = (): ToastContextInterface => {
  const context = useContext<ToastContextInterface>(ToastContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

/* This provider should be nested into the auth provider
  because the internal hooks use auth context hook.
*/
export const ToastProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [show, setShow] = useState<ToastContextInterface["show"]>(false);
  const [status, setStatus] = useState<ToastContextInterface["status"]>(null);
  const [message, setMessage] =
    useState<ToastContextInterface["message"]>(null);
  const [timeout, setTimeout] =
    useState<ToastContextInterface["timeout"]>(null);

  const updateToast = (props: ToastProps) => {
    setShow(props.show);
    setStatus(props.status);
    setMessage(props.message);
    setTimeout(props.timeout);
  };

  useEffect(() => {}, []);

  const value = {
    show,
    status,
    message,
    timeout,
    updateToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
