import React, { useCallback, useRef } from 'react';
import { useToast as useFeedback } from 'native-base';

export type ToastItem = {
  message: string;
  staus: 'error' | 'success' | 'info';
};

export const useToast = () => {
  const toast = useFeedback();
  const currentRef = useRef();

  const close = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  const showToast = useCallback(
    (item: ToastItem) => {
      const { message, staus } = item;

      if (!toast.isActive(currentRef)) {
        currentRef.current = toast.show({
          duration: 2000,
          title: message,
          status: staus ?? 'info',
        });
      }
    },
    [toast],
  );

  return { showToast };
};
