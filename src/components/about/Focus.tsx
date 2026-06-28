import { rgba } from "polished";
import styled from "styled-components";
import { AboutSection } from "./AboutSection";

const FOCUS = [
  "Physical / embodied AI",
  "Edge inference",
  "Autonomous systems & ADAS",
  "Computer vision",
  "Multimodal architectures",
  "Robotics",
];

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li {
    font-family: var(--jakarta);
    font-size: clamp(0.875rem, 2vw, 1rem);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--text2);
    padding: 0.5em 1em;
    border-radius: 99px;
    background: ${({ theme }) => rgba(theme.bg3, 0.45)};
    border: 1px solid ${({ theme }) => rgba(theme.bg3, 0.8)};
  }
`;

export const Focus = () => (
  <AboutSection label="Focus / Interests">
    <TagList>
      {FOCUS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </TagList>
  </AboutSection>
);
