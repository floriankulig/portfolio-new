import { motion, MotionProps, Variants } from "framer-motion";
import styled from "styled-components";
import { theme } from "styles";
import { Arrow } from "./Shapes";

const StyledButton = styled(motion.button)`
  font-size: 1rem;
  font-family: var(--inter);
  font-weight: 600;
  color: var(--dark);
  text-transform: uppercase;
  background: none;
  border: none;
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  line-height: 2.2;
  z-index: 1;
  overflow-x: visible;
  padding: 0 1.25rem 0 1.5rem;
  cursor: pointer;

  div {
    position: absolute;
    left: 0;
    height: 100%;
    width: 0.9rem;
    background: var(--grey);
    border-radius: 1.1rem;
    z-index: -1;
  }

  svg {
    margin-left: 0.8rem;
    overflow: visible;
  }
`;

const backgroundVariants: Variants = {
  animate: {
    width: "0.9rem",
    originY: "bottom",
    transition: {
      duration: 0.6,
      ease: theme.easing,
    },
  },
  hovered: {
    width: "100%",
    transition: {
      duration: 0.6,
      ease: theme.easing,
      delay: 0,
    },
  },
  pageEntry: {
    scaleY: 0,
    x: 50,
  },
  pageLoad: {
    scaleY: 1,
    x: 0,
    transition: { duration: 2 },
  },
};
const arrowVariants: Variants = {
  animate: {
    y: 2,
  },
  hovered: {
    y: 0,
    transition: {
      delay: 0.3,
    },
  },
};

interface ButtonProps extends MotionProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...motionProps }) => {
  return (
    <StyledButton
      // initial="initial"
      animate="animate"
      whileTap={{ scale: 0.9 }}
      whileHover="hovered"
      aria-label={children?.toString()}
      role="button"
      {...motionProps}
    >
      <motion.div variants={backgroundVariants}></motion.div>
      {children}
      <Arrow variants={arrowVariants} />
    </StyledButton>
  );
};
