import { rgba } from "polished";
import styled from "styled-components";
import { YEARS_OF_EXPERIENCE } from "ts/content";

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

    .pronunciation {
      padding-left: 0.25em;
      font-family: var(--jakarta);
      font-size: 0.4em;
      font-weight: 500;
      letter-spacing: -0.02em;
      white-space: nowrap;
      vertical-align: middle;
      color: var(--text3);
    }
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
    <h1>
      About Flo <span className="pronunciation">/floʊ/</span>
    </h1>
    <p>
      Over the past {YEARS_OF_EXPERIENCE} years I&apos;ve grown from writing my
      first production code before university to leading delivery for an
      eight-person engineering team. What has stayed constant is how I work:
      I&apos;d rather understand a problem deeply and build something that holds
      up than ship quickly and patch later.
    </p>
    <p>
      My pull toward machine learning isn&apos;t new. I first explored physical
      AI systems during my thesis with Bosch on driver-assistance technology,
      and the interest never left — but it never had room in my day-to-day work.
      Now, I&apos;m acting on it deliberately: a Master&apos;s in Robotics,
      Cognition and Intelligence at TU Munich, taking my expertise from
      well-built software toward intelligent systems that operate in the real
      world.
    </p>
  </StyledIntro>
);
