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

export const Arrow: React.FC<MotionProps> = (props) => {
  return (
    <svg
      width="20"
      height="6"
      viewBox="0 0 20 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M0.75 2.625C0.542893 2.625 0.375 2.79289 0.375 3C0.375 3.20711 0.542893 3.375 0.75 3.375V2.625ZM19.0152 3.26517C19.1616 3.11872 19.1616 2.88128 19.0152 2.73483L16.6287 0.34835C16.4822 0.201903 16.2448 0.201903 16.0983 0.34835C15.9519 0.494796 15.9519 0.732233 16.0983 0.87868L18.2197 3L16.0983 5.12132C15.9519 5.26777 15.9519 5.5052 16.0983 5.65165C16.2448 5.7981 16.4822 5.7981 16.6287 5.65165L19.0152 3.26517ZM0.75 3.375H18.75V2.625H0.75V3.375Z"
        fill="#242424"
        strokeWidth="2"
        {...props}
      />
    </svg>
  );
};

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
        stroke="#E4E4E4"
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        {...props}
      />
    </svg>
  );
};

const xPathVariants: Variants = {
  pageEntry: {
    width: 0,
    overflow: "hidden",
  },
  pageLoad: {
    width: "100%",
  },
};

export const HeroX: React.FC<MotionProps> = (p) => {
  return (
    <motion.svg
      width="338"
      height="338"
      viewBox="0 0 338 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <motion.g variants={xPathVariants}>
        <path d="M289 338L0 0H51L338 338H289Z" fill="#242424" />
      </motion.g>
      <motion.g variants={xPathVariants}>
        <path d="M49 338L338 0H287L0 338H49Z" fill="#242424" />
      </motion.g>
    </motion.svg>
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
    color: var(--light);
    font-weight: 500;
    font-size: clamp(0.7rem, 1.5vw, 1rem);
    max-width: 165px;
    text-align: center;
    padding-top: clamp(80px, 13vw, 160px);
    line-height: 1.618;

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
    <StyledCircle initial="initial" animate={mode} exit="exit">
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
          stroke="#242424"
          fill="#242424"
          strokeWidth="37.5"
          {...restProps}
        />
        <motion.path
          d="M148 153.731L174.833 182.628L229.5 99"
          stroke="#F9F9F9"
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
                  fill="#242424"
                  fillOpacity="0.2"
                />
                <rect
                  x="113"
                  y="222"
                  width="25"
                  height="7"
                  fill="#242424"
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

export const QuotationMark: React.FC = () => {
  return (
    <svg
      width="147"
      height="111"
      viewBox="0 0 147 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.808 0C57.5147 0.341329 59.0507 1.536 60.416 3.58401C62.1227 5.63201 62.976 8.53334 62.976 12.288C51.0293 15.7013 42.6667 20.3093 37.888 26.112C33.1093 31.5733 30.72 37.5467 30.72 44.032C30.72 49.4933 32.0853 53.9307 34.816 57.344C37.5467 60.416 40.6187 63.1467 44.032 65.536C47.7867 67.9253 51.0293 70.656 53.76 73.728C56.4907 76.8 57.856 81.2373 57.856 87.04C57.856 93.8667 55.4667 99.4987 50.688 103.936C46.2507 108.373 40.6187 110.592 33.792 110.592C23.2107 110.592 14.848 106.496 8.704 98.304C2.90133 89.7707 0 79.5307 0 67.584C0 53.5893 3.072 41.8133 9.216 32.256C15.36 22.6987 22.6987 15.1893 31.232 9.728C40.1067 4.26667 48.2987 1.02401 55.808 0ZM139.264 0C140.971 0.341329 142.507 1.536 143.872 3.58401C145.579 5.63201 146.432 8.53334 146.432 12.288C134.485 15.7013 126.123 20.3093 121.344 26.112C116.565 31.5733 114.176 37.5467 114.176 44.032C114.176 49.4933 115.541 53.9307 118.272 57.344C121.003 60.416 124.075 63.1467 127.488 65.536C131.243 67.9253 134.485 70.656 137.216 73.728C139.947 76.8 141.312 81.2373 141.312 87.04C141.312 93.8667 138.923 99.4987 134.144 103.936C129.707 108.373 124.075 110.592 117.248 110.592C106.667 110.592 98.304 106.496 92.16 98.304C86.3573 89.7707 83.456 79.5307 83.456 67.584C83.456 53.5893 86.528 41.8133 92.672 32.256C98.816 22.6987 106.155 15.1893 114.688 9.728C123.563 4.26667 131.755 1.02401 139.264 0Z"
        fill="#E4E4E4"
      />
    </svg>
  );
};
