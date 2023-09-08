import { Transition } from "framer-motion";

export const EMAIL = "florian.kulig@web.de" as const;

export const EASING = [0.6, 0.01, -0.05, 0.95] as any;

export const BASE_TRANSITION: Transition = {
  type: "tween",
  ease: [0.6, 0.01, -0.05, 0.95] as any,
  duration: 0.8,
};
