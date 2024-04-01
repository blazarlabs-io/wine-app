"use client";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { ModalProps } from "@/typings/components";

export interface ModalContextInterface extends ModalProps {
  show: boolean;
  title: string;
  description: string;
  action: ModalProps["action"];
  updateModal: (props: ModalProps) => void;
}

const contextInitialData: ModalContextInterface = {
  show: false,
  title: "Modal Title",
  description: "Modal Message",
  action: {
    label: "Action",
    onAction: () => {},
  },
  updateModal: () => {},
};

const ModalContext = createContext(contextInitialData);

export const useModal = (): ModalContextInterface => {
  const context = useContext<ModalContextInterface>(ModalContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

/* This provider should be nested into the auth provider
  because the internal hooks use auth context hook.
*/
export const ModalProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [show, setShow] = useState<boolean>(contextInitialData.show);
  const [title, setTitle] = useState<string>(contextInitialData.title);
  const [description, setDescription] = useState<string>(
    contextInitialData.description
  );
  const [action, setAction] = useState<ModalProps["action"]>(
    contextInitialData.action
  );

  const updateModal = (props: ModalProps) => {
    setShow(props.show);
    setTitle(props.title);
    setDescription(props.description);
    setAction(props.action);
  };

  useEffect(() => {}, []);

  const value = {
    show,
    title,
    description,
    action,
    updateModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
