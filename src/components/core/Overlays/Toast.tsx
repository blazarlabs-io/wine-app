"use client";

import { Text } from "@/components";
import { useToast } from "@/context/toastContext";
import { classNames } from "@/utils/classNames";
import { motion, AnimatePresence } from "framer-motion";
import { TextVariantType } from "@/typings/components";
import { useEffect } from "react";

export const Toast = () => {
  const { show, status, message, timeout, updateToast } = useToast();

  useEffect(() => {
    if (show && timeout) {
      const timer = setTimeout(() => {
        const toastProps = {
          show: false,
          status: null,
          message: null,
          timeout: null,
        };
        updateToast(toastProps);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className={classNames(
            "flex items-center justify-center px-[20px] py-[16px] fixed bottom-0 m-4 rounded-md z-50",
            status === "error" && "bg-status-error/30",
            status === "success" && "bg-status-success/30",
            status === "info" && "bg-status-info/30",
            status === "warning" && "bg-status-warning/30"
          )}
        >
          <Text intent="p1" variant={status as TextVariantType}>
            {message}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
