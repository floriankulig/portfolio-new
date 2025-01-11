import styled from "styled-components";
import {
  easeIn,
  easeOut,
  motion,
  Spring,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useMeasure } from "hooks";

const StyledProjectsCategoryWrapper = styled(motion.div)`
  padding: 8px;
  user-select: none;
  cursor: pointer;
`;
interface StyledProjectsCategoryProps {
  $selected?: boolean;
  $hasColor?: boolean;
}
const StyledProjectsCategory = styled(motion.li)<StyledProjectsCategoryProps>`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -3%;
  position: relative;
  color: var(--text3);
  border-radius: 99px;
  overflow: ${({ $selected }) => ($selected ? "visible" : "hidden")};
  padding: 0.5em 1em;
  border: 1px solid
    ${({ $selected }) => ($selected ? "transparent" : "var(--text3)")};
  transition: border-color 0.2s;

  .text {
    position: relative;
    display: inline-block;
    color: ${({ $selected, $hasColor }) =>
      $selected
        ? !$hasColor
          ? "var(--bg2)"
          : "var(--text2)"
        : "var(--text3)"};
    transition: color 0.2s;
    z-index: 1;
  }

  .background {
    border-radius: 99px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
`;

const MOUSE_SPRING = {
  stiffness: 120,
  damping: 15.5,
  mass: 0.8,
};

const MOUSE_SIZE = 20;

interface ProjectsCategoryChipProps {
  selected: boolean;
  toggleSelected: () => void;
  color?: string;
  children: React.ReactNode;
}
// TODO: Code animation for when all chips are selected (bubble moving to the "all" chip)
export const ProjectsCategoryChip: React.FC<ProjectsCategoryChipProps> = ({
  children,
  color,
  selected,
  toggleSelected,
}) => {
  const [hovered, setHovered] = useState(false);
  const [measurementRect, ref] = useMeasure<HTMLDivElement>();
  const { width, height, top, left } = measurementRect;
  const middle = {
    x: width / 2,
    y: height / 2,
  };
  const mouseX = useMotionValue(left + width / 2);
  const mouseY = useMotionValue(top + height / 2);

  const onMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  const onMouseEnter = (e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    mouseX.jump(x);
    mouseY.jump(y);
    if (!selected) {
      backgroundX.jump(x - left - MOUSE_SIZE / 2);
      backgroundY.jump(y - top - MOUSE_SIZE / 2);
    }
    setHovered(true);
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    setHovered(false);
  };

  const onClick = () => {
    toggleSelected();
  };

  const mouseElementX = useTransform(mouseX, (x) => x - left);
  const mouseElementY = useTransform(mouseY, (y) => y - top);
  const mouseBackgroundX = useTransform(mouseElementX, (x) =>
    selected ? 0 : x - MOUSE_SIZE / 2
  );
  const mouseBackgroundY = useTransform(mouseElementY, (y) =>
    selected ? 0 : y - MOUSE_SIZE / 2
  );
  const backgroundX = useSpring(mouseBackgroundX, MOUSE_SPRING);
  const backgroundY = useSpring(mouseBackgroundY, MOUSE_SPRING);

  useEffect(() => {
    // On unselect, move the mouse to the middle
    if (!selected && !hovered) {
      backgroundX.set(middle.x);
      backgroundY.set(middle.y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const textRange = hovered ? [-1, 0, 1] : [0, 0, 0];
  const textX = useSpring(
    useTransform(mouseElementX, [0, width / 2, width], textRange, {
      ease: [easeIn, easeOut],
    })
  );
  const textY = useSpring(
    useTransform(mouseElementY, [0, height / 2, height], textRange, {
      ease: [easeIn, easeOut],
    })
  );
  const chipRange = hovered ? [-1, 0, 1] : [0, 0, 0];
  const chipX = useSpring(
    useTransform(mouseElementX, [0, width / 2, width], chipRange, {
      ease: [easeIn, easeOut],
    })
  );
  const chipY = useSpring(
    useTransform(mouseElementY, [0, height / 2, height], chipRange, {
      ease: [easeIn, easeOut],
    })
  );

  return (
    <StyledProjectsCategoryWrapper
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTap={onClick}
    >
      <div ref={ref}>
        <StyledProjectsCategory
          $selected={selected}
          $hasColor={!!color}
          style={{ x: chipX, y: chipY }}
        >
          <motion.span className="text" style={{ x: textX, y: textY }}>
            {children}
          </motion.span>
          <motion.div
            className="background"
            animate={{
              width: selected ? width : MOUSE_SIZE,
              height: selected ? height : MOUSE_SIZE,
              scale: selected || hovered ? 1 : 0,
              opacity: selected || hovered ? 1 : 0,
            }}
            transition={{
              delay: 0.025,
              damping: 50,
              // height: { duration: 0.4, ease: "easeOut" },
              // width: { duration: 0.4, ease: "easeOut" },
            }}
            style={{
              backgroundColor: color || "var(--text2)",
              x: backgroundX,
              y: backgroundY,
            }}
          ></motion.div>
        </StyledProjectsCategory>
      </div>
    </StyledProjectsCategoryWrapper>
  );
};
