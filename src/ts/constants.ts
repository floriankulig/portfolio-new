import { Spring, Transition } from "framer-motion";
import { url } from "inspector";

export const EASING = [0.6, 0.01, -0.05, 0.95] as any;

export const SCROLL_SPRING: Spring = {
  type: "spring",
  stiffness: 70,
  damping: 20,
  mass: 1.1,
  restDelta: 0.0001,
};

export const BASE_TRANSITION: Transition = {
  type: "tween",
  ease: [0.6, 0.01, -0.05, 0.95] as any,
  duration: 0.8,
};

export const LINKS = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Work",
    url: "/projects",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];
