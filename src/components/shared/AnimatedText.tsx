import { motion, Variants } from "framer-motion";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { EASING } from "ts";

const StyledAnimatedLetterContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: hidden;
`;

const StyledAnimatedLetter = styled(motion.span)`
  display: inline-block;
`;

interface AnimatedTextProps {
  children: React.ReactNode;
  variants?: Variants;
}

export const AnimatedLetters: React.FC<AnimatedTextProps> = ({
  children,
  variants,
}) => {
  const letters = Array.from(children as string);
  const returnJSX: ReactElement = variants ? (
    <StyledAnimatedLetterContainer>
      {letters?.map((letter, i) => (
        <StyledAnimatedLetter variants={variants} key={`${letter}-${i}`}>
          {letter === " " ? <b>&nbsp;</b> : letter}
        </StyledAnimatedLetter>
      ))}
    </StyledAnimatedLetterContainer>
  ) : (
    <StyledAnimatedLetterContainer>
      {letters?.map((letter, i) => (
        <StyledAnimatedLetter
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            type: "tween",
            easings: EASING,
            duration: 0.8,
            delay: 0.05 * i,
          }}
          key={`${letter}-${i}`}
        >
          {letter}
        </StyledAnimatedLetter>
      ))}
    </StyledAnimatedLetterContainer>
  );
  return returnJSX;
};

export const AnimatedWords: React.FC<AnimatedTextProps> = ({
  children,
  variants,
}) => {
  const words = (children as string).split(" ");

  const returnJSX: ReactElement = variants ? (
    <StyledAnimatedLetterContainer>
      {words?.map((word, i) => (
        <StyledAnimatedLetter variants={variants} key={`${word}-${i}`}>
          <>{word}&nbsp;</>
        </StyledAnimatedLetter>
      ))}
    </StyledAnimatedLetterContainer>
  ) : (
    <StyledAnimatedLetterContainer>
      {words?.map((word, i) => (
        <StyledAnimatedLetter
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            type: "tween",
            easings: EASING,
            duration: 0.3,
            delay: 0.05 * i,
          }}
          key={`${word}-${i}`}
        >
          <>{word}&nbsp;</>
        </StyledAnimatedLetter>
      ))}
    </StyledAnimatedLetterContainer>
  );
  return returnJSX;
};
