import {
  animate,
  AnimatePresence,
  motion,
  MotionProps,
  Variants,
} from "framer-motion";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";

export const Underline: React.FC<MotionProps> = (props) => {
  return (
    <svg
      width="307"
      height="21"
      viewBox="0 0 307 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M4.75 16C39.9121 8.41378 148.539 -2.95312 301.75 12.2691"
        stroke={theme.bg3}
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        {...props}
      />
    </svg>
  );
};

const StyledCircle = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  position: relative;
  svg {
    position: absolute;
    width: 100%;
    aspect-ratio: 1;
  }

  p {
    color: var(--bg2);
    font-weight: 500;
    font-size: clamp(0.7rem, 1.5vw, 1rem);
    max-width: 12.5ch;
    text-align: center;
    padding-top: clamp(80px, 13vw, 160px);
    line-height: 1.618;
    z-index: 1;

    span {
      display: inline-block;
    }
  }
`;

const wordVariants: Variants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

interface ContactCircleProps extends MotionProps {
  mode?: "clipboard" | "emailSVG";
}
export const ContactCircle: React.FC<ContactCircleProps> = ({
  mode,
  ...restProps
}) => {
  return (
    <StyledCircle initial="initial" animate={mode || "initial"} exit="exit">
      <svg
        width="366"
        height="366"
        viewBox="0 0 366 366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="18.75"
          y="18.75"
          width="328.5"
          height="328.5"
          rx="164.25"
          strokeLinecap="round"
          stroke={theme.text2}
          fill={theme.text2}
          strokeWidth="37.5"
          {...restProps}
        />
        <motion.path
          d="M148 153.731L174.833 182.628L229.5 99"
          stroke={theme.bg2}
          strokeWidth="9.28846"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            clipboard: {
              pathLength: 1,
              opacity: 1,
              transition: { delay: 0.1 },
            },
            initial: { opacity: 0, pathLength: 0 },
          }}
        />
        <AnimatePresence>
          {mode === "emailSVG" && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 20 }}
              exit={{
                opacity: 0,
                scale: 0.7,
                y: 0,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: 0.3,
                },
                scale: {
                  duration: 0.5,
                  delay: 0.2,
                  easings: theme.easing,
                },
                y: {
                  duration: 0.3,
                  delay: 0.5,
                  easings: theme.easing,
                },
              }}
            >
              <motion.path d="M83 121H283V244H83V121Z" fill="#CCCCCC" />{" "}
              <motion.g
                initial={{ opacity: 0, y: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, y: -114, scaleY: 1 }}
                exit={{ opacity: 0, y: 0, scaleY: 0.5 }}
                transition={{
                  opacity: {
                    duration: 0.4,
                    delay: 0.5,
                    easings: theme.easing,
                  },
                  y: {
                    duration: 0.3,
                    delay: 0.5,
                    easings: theme.easing,
                  },
                  scaleY: {
                    duration: 0.3,
                    delay: 0.5,
                    easings: theme.easing,
                  },
                }}
              >
                <rect x="101" y="188" width="164" height="114" fill="white" />
                <circle cx="235" cy="264" r="18" fill="#D3D3D3" />
                <rect
                  x="113"
                  y="209"
                  width="42"
                  height="7"
                  fill={theme.text2}
                  fillOpacity="0.2"
                />
                <rect
                  x="113"
                  y="222"
                  width="25"
                  height="7"
                  fill={theme.text2}
                  fillOpacity="0.2"
                />
                <path d="M266 198L256 188H249.5L259.5 198H266Z" fill="black" />
                <path
                  d="M249.5 198L239.5 188H233L243 198H249.5Z"
                  fill="black"
                />
                <path d="M233 198L223 188H216.5L226.5 198H233Z" fill="black" />
                <path
                  d="M216.5 198L206.5 188H200L210 198H216.5Z"
                  fill="black"
                />
                <path d="M200 198L190 188H183.5L193.5 198H200Z" fill="black" />
                <path
                  d="M183.5 198L173.5 188H167L177 198H183.5Z"
                  fill="black"
                />
                <path d="M167 198L157 188H150.5L160.5 198H167Z" fill="black" />
                <path
                  d="M150.5 198L140.5 188H134L144 198H150.5Z"
                  fill="black"
                />
                <path d="M134 198L124 188H117.5L127.5 198H134Z" fill="black" />
                <path
                  d="M117.5 198L107.5 188H101L111 198H117.5Z"
                  fill="black"
                />
              </motion.g>
              <motion.path d="M83 244V132L283 244H83Z" fill="#D9D9D9" />
              <motion.path d="M283 244V132L83 244H283Z" fill="#E4E4E4" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      <AnimatePresence>
        {mode === "clipboard" && (
          <motion.p
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              animate: {
                transition: {
                  delayChildren: 0.1,
                  staggerChildren: 0.05,
                  staggerDirection: 1,
                },
              },
            }}
          >
            <motion.span variants={wordVariants}>Email&nbsp;</motion.span>
            <motion.span variants={wordVariants}>was&nbsp;</motion.span>
            <motion.span variants={wordVariants}>copied&nbsp;</motion.span>
            <motion.span variants={wordVariants}>to&nbsp;</motion.span>
            <motion.span variants={wordVariants}>clipboard!</motion.span>
          </motion.p>
        )}
      </AnimatePresence>
    </StyledCircle>
  );
};
