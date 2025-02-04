import React from "react";
import styled from "styled-components";
import { MotionProps, Transition, Variants, motion } from "framer-motion";
import { darken } from "polished";
import { theme } from "styles";

const StyledArrowButton = styled(motion.button)`
  font-family: var(--jakarta);
  color: var(--text1);
  font-weight: 500;
  font-size: 1rem;
  overflow: visible;
  border: none;
  height: 44px;
  padding-inline: 22px 30px;
  background: none;
  position: relative;
  pointer-events: all;
  cursor: pointer;

  .bg {
    position: absolute;
    inset: 0;
    height: 44px;
    aspect-ratio: 1;
    background: var(--bg3);
    border-radius: 99px;
  }

  .text {
    position: relative;
    display: block;
    white-space: nowrap;
    z-index: 1;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .arrow {
    position: absolute;
    right: -26px;
    top: 5px;
    fill: var(--text1);
  }
`;

interface ArrowButtonProps extends MotionProps {
  children: React.ReactNode;
}
const springAnimation: Transition = {
  type: "spring",
  duration: 0.6,
  bounce: 0.15,
  restSpeed: 0.00001,
};
export const ArrowButton: React.FC<ArrowButtonProps> = ({
  children,
  ...motionProps
}) => {
  return (
    <StyledArrowButton
      initial="initial"
      animate="animate"
      whileHover="hovered"
      whileTap="tapped"
      variants={{
        initial: { scale: 1 },
        animate: { scale: 1 },
        tapped: { scale: 0.95 },
      }}
      aria-label={children?.toString()}
      role="button"
      {...motionProps}
    >
      <motion.div
        className="bg"
        variants={backgroundVariants}
        transition={springAnimation}
      ></motion.div>
      <motion.span
        className="text"
        variants={textVariants}
        transition={springAnimation}
      >
        {children}
        <motion.svg
          className="arrow"
          width="18"
          height="8"
          viewBox="0 0 18 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5H17V3.5H1V4.5Z" />
        </motion.svg>
      </motion.span>
    </StyledArrowButton>
  );
};

const backgroundVariants: Variants = {
  animate: {
    width: "44px",
    x: 0,
  },
  hovered: {
    width: "calc(100% + 8px)",
    x: -4,
  },
  tapped: {
    width: "calc(100% + 8px)",
    backgroundColor: darken(0.05, theme.bg3),
    x: -4,
  },
};

const textVariants: Variants = {
  animate: {
    x: 0,
  },
  hovered: {
    x: -6,
  },
};
