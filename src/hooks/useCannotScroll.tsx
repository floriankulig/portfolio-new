import { useEffect } from "react";

export const useCannotScroll = (cannotScroll: boolean): void => {
  useEffect(() => {
    if (cannotScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null as unknown as string;
    }
    return () => {
      document.body.style.overflow = null as unknown as string;
    };
  }, [cannotScroll]);
};
