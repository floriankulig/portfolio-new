import { TextGradientOnView } from "components/shared";
import styled from "styled-components";

const StyledApproachSection = styled.section`
  padding-block: 40vh;
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
          I build systems that have to hold up under real-world constraints –
          limited compute, real-time latency, and safety-critical hardware. I
          care about{" "}
          <TextGradientOnView>
            modular, reproducible pipelines
          </TextGradientOnView>{" "}
          and{" "}
          <TextGradientOnView>
            efficient inference on edge devices
          </TextGradientOnView>
          , and I measure what I ship.{" "}
          <TextGradientOnView>
            Concrete numbers over adjectives.
          </TextGradientOnView>
        </p>
      </StyledApproachSectionRight>
    </StyledApproachSection>
  );
};
