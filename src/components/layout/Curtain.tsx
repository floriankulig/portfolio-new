import { theme } from "styles";
import { motion, Variants, Transition } from "framer-motion";
import styled from "styled-components";
import { useEffect } from "react";

export const StyledCurtainContainer = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 150lvh;
  inset: 0;
  top: -25lvh;
  z-index: 9999;
  pointer-events: none;
`;

const CurtainLayer = styled(motion.div)<{ color: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${({ color }) => color};
`;

const curtainContainerVariants: Variants = {
  pageLoad: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  pageExit: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

const curtainTransition: Transition = {
  duration: 0.4,
  type: "tween",
  ease: theme.easing as any,
};

const curtainVariants: Variants = {
  pageEntry: {
    scaleX: 1,
    originX: "right",
  },
  pageLoad: {
    scaleX: 0,
    originX: "right",
    transition: curtainTransition,
  },
  pageExit: {
    scaleX: 1,
    originX: "left",
    transition: curtainTransition,
  },
};

interface CurtainProps {
  noExit?: boolean;
  noEnter?: boolean;
}

export const Curtain: React.FC<CurtainProps> = ({ noEnter, noExit }) => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);

  const variants = noEnter
    ? { ...curtainVariants, pageEntry: { scaleX: 0 } }
    : noExit
    ? { ...curtainVariants, pageExit: { scaleX: 0 } }
    : curtainVariants;

  return (
    <StyledCurtainContainer variants={curtainContainerVariants}>
      <CurtainLayer color={theme.text3} variants={variants} />
      <CurtainLayer color={theme.text2} variants={variants} />
      <CurtainLayer color={theme.text1} variants={variants} />
    </StyledCurtainContainer>
  );
};
