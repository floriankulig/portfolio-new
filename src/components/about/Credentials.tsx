import styled from "styled-components";
import { AboutSection } from "./AboutSection";

const CREDENTIALS = [
  "TOEFL iBT — C2 (118 / 120)",
  "Recommendation letter from the DHBW faculty dean (Neural Navi)",
];

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li {
    font-family: var(--jakarta);
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.5;
    color: var(--text2);
    padding-left: 1.1em;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 0.45em;
      height: 1px;
      background: var(--text3);
    }
  }
`;

export const Credentials = () => (
  <AboutSection label="Credentials">
    <List>
      {CREDENTIALS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  </AboutSection>
);
