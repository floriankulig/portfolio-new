import { Easing, motion, Transition, Variants } from "framer-motion";
import { rgba } from "polished";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";

const ICON_SIZE = 20;
const iconStyle: React.CSSProperties = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};
const GAP = 10;
type SLinkButtonProps = {
  $color: string;
  $textColor: string;
};

const StyledLinkButton = styled(motion.a)<SLinkButtonProps>`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 99px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${GAP}px;
    white-space: nowrap;
    span {
      font-family: var(--poppins);
      font-weight: 500;
      line-height: 1.5;
      text-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
      display: block;

      &.icon {
        user-select: none;

        svg {
          width: 100%;
          height: 100%;
        }

        &:first-child {
          position: absolute;
        }
      }
    }
  }
  background: ${({ $color }) => $color};
  color: ${({ $textColor }) => $textColor};
`;

interface LinkButtonProps {
  color?: string;
  textColor?: string;
  link: string;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  sameSite?: boolean;
}

const transition: Transition = {
  duration: 0.5,
  ease: theme.easing as unknown as Easing,
};

const firstIconVariants: Variants = {
  initial: {
    scale: 0,
    x: -8,
    y: 8,
    transformOrigin: "bottom left",
  },
  hovered: {
    scale: 1,
    x: 0,
    y: 0,
    transformOrigin: "bottom left",
  },
};
const textVariants: Variants = {
  initial: {
    x: 0,
  },
  hovered: {
    x: GAP + ICON_SIZE,
  },
};
const secondIconVariants: Variants = {
  initial: {
    scale: 1,
    x: 0,
    y: 0,
    transformOrigin: "top right",
  },
  hovered: {
    scale: 0,
    x: 4,
    y: -2,
    transformOrigin: "top right",
  },
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  color = theme.text1,
  textColor = theme.bg1,
  link,
  disabled,
  children,
  icon,
  sameSite = false,
}) => {
  const variantDefinitions = {
    whileTap: "pressed",
    initial: "initial",
    animate: "initial",
    whileHover: "hovered",
  };
  const appliedVariants = disabled ? undefined : variantDefinitions;
  return (
    <StyledLinkButton
      $color={disabled ? rgba(theme.text3, 0.25) : color}
      $textColor={disabled ? rgba(theme.bg3, 0.25) : textColor}
      href={!disabled ? link : undefined}
      target={sameSite ? "_self" : "_blank"}
      rel="noopener noreferrer"
      {...appliedVariants}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
      variants={{
        pressed: { scale: 0.95 },
        hovered: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
        initial: {
          transition: { staggerChildren: 0.05, staggerDirection: 1 },
        },
      }}
    >
      <div>
        {!disabled && icon && (
          <motion.span
            className="icon"
            style={iconStyle}
            variants={firstIconVariants}
            transition={transition}
          >
            {icon}
          </motion.span>
        )}
        <motion.span variants={textVariants} transition={transition}>
          {children}
        </motion.span>
        {icon && (
          <motion.span
            className="icon"
            style={iconStyle}
            variants={secondIconVariants}
            transition={transition}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </StyledLinkButton>
  );
};
