import { Variant } from "framer-motion";
import theme from "./theme";

export const pageContentExit: Variant = {
  x: 100,
  opacity: 0.5,
  transition: {
    x: { type: "tween", ease: theme.easing, duration: 0.5 },
    opacity: { duration: 0.6, ease: "linear" },
  },
};
