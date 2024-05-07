"use client";

import { Container, Text, Button } from "@/components";
import { useModal } from "@/context/modalContext";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

export const Modal = () => {
  const { show, title, description, action, updateModal } = useModal();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-60 z-[999] w-screen  h-screen backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.25,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative flex flex-col items-center justify-center px-[32px] pt-[32px] pb-[16px] gap-[24px] bg-surface min-w-[420px] max-w-[520px] rounded-lg shadow-lg"
          >
            <Button
              intent="unstyled"
              className="absolute top-[16px] right-[16px]"
              onClick={() => {
                updateModal({
                  show: false,
                  title: "",
                  description: "",
                  action: {
                    label: "",
                    onAction: () => {},
                  },
                });
              }}
            >
              <Icon
                icon="material-symbols:close"
                width="20px"
                height="20px"
                className="text-on-surface-dark"
              />
            </Button>
            <Container intent="flexRowCenter">
              <Text intent="h4">{title}</Text>
            </Container>
            <Container intent="flexRowCenter">
              <Text intent="p1" variant="dim" className="text-center">
                {description}
              </Text>
            </Container>
            <div className="w-full h-[2px] bg-on-surface-dark/10" />
            <Container intent="flexRowCenter">
              <Button
                intent="primary"
                size="medium"
                fullWidth={false}
                onClick={() => action.onAction()}
              >
                {action.label}
              </Button>
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
