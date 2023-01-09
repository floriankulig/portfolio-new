import styled from "styled-components";
import { motion, MotionProps } from "framer-motion";
import { theme } from "styles";
import { rgba } from "polished";

interface ExampleProps extends MotionProps {
  on: boolean;
}

const StyledExample4 = styled(motion.div)<{ $on?: boolean }>`
  display: flex;
  justify-content: ${(p) => (p.$on ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 2%;
  width: 40%;
  border-radius: 50px;

  div {
    width: 45%;
    aspect-ratio: 1;
    border-radius: 25px;
    background: white;
  }
`;

const Example4: React.FC<ExampleProps> = ({ on }) => {
  return (
    <StyledExample4
      $on={on}
      animate={{ background: on ? theme.dark : rgba(theme.dark, 0.5) }}
    >
      <motion.div layout></motion.div>
    </StyledExample4>
  );
};

export { Example4 };
