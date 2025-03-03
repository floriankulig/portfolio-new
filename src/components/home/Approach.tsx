import { TextGradientOnView } from "components/shared";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledApproachSection = styled.section`
  padding-block: 30vh;
  background: var(--bg2);
  padding-inline: 2.5vw;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  gap: 16px;
  font-size: clamp(3rem, 6vw, 6rem);

  h3 {
    padding-bottom: 16px;
    font-weight: 500;
    letter-spacing: -0.05em;
    color: var(--text1);
  }

  @media (max-width: 960px) {
    font-size: clamp(2.5rem, 8vw, 6rem);
    flex-direction: column;
  }
`;
const StyledApproachSectionRight = styled.div`
  padding-top: calc(1em - 4px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  div {
    height: 2px;
    background: var(--text1);
  }
  p {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: var(--text3);
    font-family: var(--jakarta);
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: -0.01em;

    b {
      font-weight: 500;
      /* color: var(--text2); */
    }
  }
  @media (max-width: 960px) {
    padding-top: 0;
    p {
      font-size: clamp(1rem, 3vw, 1.5rem);
    }
  }
`;

export const Approach = () => {
  return (
    <StyledApproachSection>
      <h3>APPROACH</h3>
      <StyledApproachSectionRight>
        <div></div>
        <p>
          As a frontend developer, I always prioritize user experience and
          usabilty. I strive for a{" "}
          <TextGradientOnView delay={0.25}>
            modular, well-tested, and easily maintainable
          </TextGradientOnView>{" "}
          codebase using contemporary frameworks like React.{" "}
          <TextGradientOnView delay={0.5}>
            Responsive design and accessibility
          </TextGradientOnView>{" "}
          are the bare minimum for me. Extensive testing and project reviews
          enable me to always ship{" "}
          <TextGradientOnView delay={0.75}>
            the best possible product.
          </TextGradientOnView>
        </p>
      </StyledApproachSectionRight>
    </StyledApproachSection>
  );
};
