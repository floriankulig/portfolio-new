import { Spring, Transition } from "framer-motion";
import { url } from "inspector";

export const EASING = [0.6, 0.01, -0.05, 0.95] as any;

export const SCROLL_SPRING: Spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  restDelta: 0.0001,
};

export const MOUSE_SPRING: Spring = {
  type: "spring",
  stiffness: 125,
  damping: 15.5,
  mass: 0.75,
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
    url: "/work",
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
