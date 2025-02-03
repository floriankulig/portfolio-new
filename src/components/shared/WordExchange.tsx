import {
  motion,
  AnimatePresence,
  LayoutGroup,
  Variants,
  Transition,
} from "framer-motion";
import React from "react";

const wordVariants: Variants = {
  wordInitial: {
    opacity: 0,
    scale: 0.8,
    y: 40,
    filter: "blur(24px)",
  },
  wordAnimate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
  },
  wordExit: {
    opacity: 0,
    y: 40,
    transition: {
      opacity: {
        duration: 0.1,
      },
    },
  },
};

interface WordExchangeProps {
  children: React.ReactNode;
  withAnimatePresence?: boolean;
  variants?: Variants;
}
export const WordExchange: React.FC<WordExchangeProps> = ({
  children,
  withAnimatePresence,
  variants,
}) => {
  const words = String(children).toString().split(" ");

  const body = (
    <>
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial="wordInitial"
          animate="wordAnimate"
          exit="wordExit"
          variants={!!variants ? variants : wordVariants}
          transition={
            {
              delay: i * 0.05,
              filter: {
                ease: "easeOut",
                duration: 0.25,
              },
              opacity: {
                ease: "easeIn",
                duration: 0.275,
              },
              type: "spring",
              stiffness: 175,
              mass: 0.8,
              damping: 14,
            } as Transition
          }
          layout
        >
          {word}
        </motion.span>
      ))}
    </>
  );

  return withAnimatePresence ? (
    <AnimatePresence mode="popLayout">{body}</AnimatePresence>
  ) : (
    body
  );
};
