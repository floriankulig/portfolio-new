import styled from "styled-components";
import { motion, MotionProps } from "framer-motion";
import { theme } from "styles";

const StyledCopyToClipboard = styled(motion.div)`
  height: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

interface CopyToClipboardProps extends MotionProps {
  light?: boolean;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  light,
  ...props
}) => {
  return (
    <StyledCopyToClipboard {...props}>
      <svg
        width="19"
        height="28"
        viewBox="0 0 19 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4.875"
          y="5.125"
          width="12.75"
          height="21.75"
          rx="1.125"
          stroke={light ? theme.bg1 : theme.text2}
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.25 2.5H12.75V3.25H15V2.5C15 1.25736 13.9926 0.25 12.75 0.25H2.25C1.00736 0.25 0 1.25736 0 2.5V22C0 23.2426 1.00736 24.25 2.25 24.25H3V22H2.25L2.25 2.5Z"
          fill={light ? theme.bg1 : theme.text2}
        />
      </svg>
    </StyledCopyToClipboard>
  );
};
