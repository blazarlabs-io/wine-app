export type ContainrIntentType =
  | "unstyled"
  | "flexColCenter"
  | "flexColTop"
  | "flexColLeft"
  | "flexColRight"
  | "flexRowLeft"
  | "flexRowRight"
  | "flexRowCenter"
  | "flexRowTop"
  | "flexRowWrap"
  | "flexRowBetween"
  | "flexColBetween"
  | "grid-1"
  | "grid-2"
  | "grid-3"
  | "grid-4"
  | "grid-5"
  | "grid-6"
  | "grid-7"
  | "grid-8";
export type ContainerGapType =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "2xlarge"
  | "3xlarge";
export type ContainerPxType =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "2xlarge"
  | "3xlarge";
export type ContainerPyType =
  | "none"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "2xlarge"
  | "3xlarge";

// TEXT COMPONENT
export type TextIntentType =
  | "h1"
  | "h1/2"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p1"
  | "p2";
export type TextVariantType =
  | "normal"
  | "accent"
  | "dim"
  | "inverted"
  | "error"
  | "success"
  | "warning"
  | "info";
export interface TextProps {
  children: React.ReactNode;
  className?: string;
  intent?: TextIntentType;
  variant?: TextVariantType;
}

// TOAST COMPONENT
export type ToastStatusType = "success" | "error" | "info" | "warning";
export interface ToastProps {
  show: boolean;
  status: ToastStatusType | null;
  message: string | null;
  timeout: number | null;
}

// WINERY STAT COMPONENT
export interface WineryStatInterface {
  title: string;
  icon: any;
  value: string;
  updatedAt: string;
}

// MODAL COMPONENT
export interface ModalProps {
  show: boolean;
  title: string;
  description: string;
  action: {
    label: string;
    onAction: () => void;
  };
}

export interface MenuItemInterface {
  key: string;
  label: string;
  disabled: boolean;
  icon: string;
  href: string;
  onClick?: () => void;
}

export type MenuItemsInterface = MenuItemInterface[];
