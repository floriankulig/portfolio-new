import { rgba } from "polished";
import styled from "styled-components";

const StyledIntro = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 1rem;

  h1 {
    font-size: clamp(2.5rem, 12dvw, 6rem);
    font-weight: 600;
    letter-spacing: -0.06em;
    line-height: 1;
    width: fit-content;
    padding-block: 0.05em 0.1em;
    padding-inline: 0 0.1em;
    background: var(--text1);
    background-image: radial-gradient(
      circle at 20% 0%,
      ${({ theme }) => rgba(theme.bg3, 0.45)} 0%,
      transparent 45%
    );
    color: transparent;
    background-clip: text;
  }

  p {
    font-family: var(--jakarta);
    font-size: clamp(1rem, 2.4vw, 1.25rem);
    line-height: 1.6;
    color: ${({ theme }) => rgba(theme.text2, 0.85)};
    max-width: 60ch;
    word-break: keep-all;
    text-wrap: pretty;

    b {
      font-weight: 600;
      color: var(--text2);
    }
  }
`;

export const AboutIntro = () => (
  <StyledIntro>
    <h1>About</h1>
    <p>
      I build complex systems - whether it&apos;s custom software, a data
      pipeline, or a machine learning model.
    </p>
    <p>
      I&apos;m passionate about creating software that is not only functional
      but also elegant and efficient. My journey has taken me from frontend
      development to the cutting edge of AI and robotics, and I&apos;m always
      looking for new challenges to tackle.
    </p>
  </StyledIntro>
);
