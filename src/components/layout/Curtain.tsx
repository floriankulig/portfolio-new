import { theme } from "styles";
import { motion, Variants, Transition } from "framer-motion";
import styled from "styled-components";

export const StyledCurtain = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: ${(theme) => theme.theme.text1};
`;

const curtainTransition: Transition = {
  duration: 0.5,
  type: "tween",
  ease: theme.easing as any,
};

const curtainVariants: Variants = {
  pageEntry: {
    scaleX: 1,
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
  if (noEnter) {
    return (
      <StyledCurtain
        variants={{ ...curtainVariants, pageEntry: { scaleX: 0 } }}
      />
    );
  }
  if (noExit) {
    return (
      <StyledCurtain
        variants={{ ...curtainVariants, pageExit: { scaleX: 0 } }}
      />
    );
  }
  return <StyledCurtain variants={curtainVariants} />;
};
