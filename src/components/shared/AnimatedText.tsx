import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { theme } from "styles";

const StyledAnimatedLetterContainer = styled(motion.div)`
  display: inline-block;
  overflow-y: hidden;
`;

const StyledAnimatableLetter = styled(motion.span)`
  display: inline-block;
`;

interface AnimatedTextProps {
  children: React.ReactNode;
  withAnimatePresence?: boolean;
  baseDelay?: number;
  letterVariants?: Variants;
}

export const AnimatedLetters: React.FC<AnimatedTextProps> = ({
  children,
  withAnimatePresence,
  baseDelay = 0,
}) => {
  const letters = Array.from(String(children));
  const space = <>&nbsp;</>;
  const returnJSX: ReactElement = (
    <StyledAnimatedLetterContainer
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
    >
      {letters?.map((letter, i) => (
        <StyledAnimatableLetter
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            type: "tween",
            easings: theme.easing,
            duration: 0.8,
            delay: baseDelay + 0.05 * i,
          }}
          key={`${letter}-${i}`}
        >
          {letter === " " ? space : letter}
        </StyledAnimatableLetter>
      ))}
    </StyledAnimatedLetterContainer>
  );
  return withAnimatePresence ? (
    <AnimatePresence>{returnJSX}</AnimatePresence>
  ) : (
    returnJSX
  );
};
