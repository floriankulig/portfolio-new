import { once } from "events";
import { motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";

const StyledTextGradientOnView = styled(motion.b)<{ $baseColor: string }>`
  background-clip: text;
  background-color: ${({ baseColor }) => baseColor};
  color: transparent;
`;

const textGradientVariants: Variants = {
  "tg-start": ({ gradientColor }) => ({
    backgroundImage: `linear-gradient(90deg, ${gradientColor} 0%, transparent 0.25%)`,
  }),
  "tg-end": ({ gradientColor, delay }) => ({
    backgroundImage: `linear-gradient(90deg, ${gradientColor} 100%, transparent 100%)`,
    transition: {
      duration: 0.6,
      delay: 0.15 + delay,
      ease: theme.easing,
    },
  }),
};

interface TextGradientOnViewProps {
  children: React.ReactNode;
  baseColor?: string;
  gradientColor?: string;
  delay?: number;
}

export const TextGradientOnView: React.FC<TextGradientOnViewProps> = ({
  children,
  baseColor = theme.text3,
  gradientColor = theme.text2,
  delay = 0,
}) => {
  return (
    <StyledTextGradientOnView
      baseColor={baseColor}
      initial="tg-start"
      animate="tg-start"
      whileInView="tg-end"
      variants={textGradientVariants}
      viewport={{ once: true }}
      custom={{ gradientColor, delay }}
    >
      {children}
    </StyledTextGradientOnView>
  );
};
