import {
  easeInOut,
  easeOut,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useViewport } from "hooks";
import { darken, lighten } from "polished";
import { useRef } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { EMAIL } from "ts/content";

const StyledContactIntroSection = styled.section`
  background: var(--text1);
  padding-bottom: 45vh;
`;

const StyledContactIntroSectionAnimation = styled.div`
  position: relative;
  height: 200vh;
`;

const Heading = styled(motion.h3)`
  position: sticky;
  position: relative;
  top: -100%;
  top: 0;
  left: 0;
  text-align: center;
  color: var(--bg1);
  font-size: clamp(1.5rem, 8vw, 5rem);
  padding-block-start: 15vh;
`;

const StyledEmailMockup = styled(motion.div)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  padding-block: 10vh;
  @media (${({ theme }) => theme.bp.medium}) {
    padding-block: max(10vh, clamp(80px, 10vw, 120px));
  }
  background: var(--bg1);
  background: linear-gradient(
    178deg,
    ${({ theme }) => theme.bg1} 0% ${({ theme }) => lighten(0.05, theme.bg1)}
      100%
  );
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 5dvw, 2.5rem);
  align-items: start;
  justify-content: center;

  div.textBox {
    background: var(--bg3);
    width: 100%;
    padding: 1.5em;
    font-size: clamp(1rem, 4dvw, 1.25rem);
    border-radius: 0.5em;
    border: 1px solid ${({ theme }) => darken(0.05, theme.bg3)};
    flex-grow: 1;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 500;
      font-size: inherit;
    }

    &:not(:last-of-type) {
      flex-grow: 0;
      padding-block: 0.75em;
      width: 100%;
      @media (${({ theme }) => theme.bp.medium}) {
        width: 45%;
      }
    }
  }
`;

const Text = styled(motion.div)`
  height: 100%;
  width: 95%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TextMock = styled(motion.div)<{ $margTop?: boolean; $width: string }>`
  height: 1.25rem;
  width: ${(p) => p.$width};
  background: linear-gradient(to left, #d9d9d9, #d4d3d3);
  margin-top: ${(p) => p.$margTop && "calc(1.25rem/1.618)"};
`;

const textBoxVariants: Variants = {
  initial: {
    scaleX: 0,
  },
  inView: (noDelay: boolean) => ({
    scaleX: 1,
    originX: "left",
    transition: {
      ease: theme.easing,
      duration: 1.6,
      delayChildren: noDelay ? 0 : 0.95,
    },
  }),
};
const textVariants: Variants = {
  initial: {
    opacity: 0,
  },
  inView: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const mockupTransformRange = [0, 0.6];
export const ContactIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useViewport();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const sprungScrollY = useSpring(scrollYProgress, {
    stiffness: 125,
    damping: 25,
    restDelta: 0.0001,
  });
  const mockupScale = useTransform(
    sprungScrollY,
    mockupTransformRange,
    [1, isMobile ? 0.9 : 0.7],
    { ease: easeInOut }
  );
  const mockupY = useTransform(
    sprungScrollY,
    mockupTransformRange,
    ["0", "30vh"],
    { ease: easeOut }
  );
  const mockupBorderRadius = useTransform(
    sprungScrollY,
    mockupTransformRange,
    ["0", isMobile ? "1.25em" : "2em"],
    { ease: easeInOut }
  );

  const headingY = useTransform(scrollYProgress, [0.7, 1], ["0%", "60%"]);
  const headingOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.5]);

  const shadowColorOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3],
    [0, 0.9]
  );
  const shadow = useMotionTemplate`
    0 0 max(8vw, 80px) rgba(0, 0, 0, ${shadowColorOpacity})
  `;

  return (
    <StyledContactIntroSection ref={sectionRef}>
      <StyledContactIntroSectionAnimation>
        <StyledEmailMockup
          className="main-col"
          style={{
            scale: mockupScale,
            y: mockupY,
            boxShadow: shadow,
            borderRadius: mockupBorderRadius,
          }}
        >
          <motion.div variants={textBoxVariants} className="textBox">
            <motion.p variants={textVariants}>{EMAIL}</motion.p>
          </motion.div>
          <motion.div variants={textBoxVariants} className="textBox">
            <motion.p variants={textVariants}>
              Let&apos;s work together!
            </motion.p>
          </motion.div>
          <motion.div
            variants={textBoxVariants}
            custom={true}
            className="textBox"
          >
            <Text
              variants={{
                inView: {
                  transition: {
                    delayChildren: 0,
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              <TextMock variants={textBoxVariants} $width="30%" />
              <TextMock variants={textBoxVariants} $width="86%" $margTop />
              <TextMock variants={textBoxVariants} $width="100%" />
              <TextMock variants={textBoxVariants} $width="78%" />
              <TextMock variants={textBoxVariants} $width="82%" />
              <TextMock variants={textBoxVariants} $width="28%" $margTop />
              <TextMock variants={textBoxVariants} $width="25%" />
            </Text>
          </motion.div>
        </StyledEmailMockup>
        <Heading style={{ y: headingY, opacity: headingOpacity }}>
          Convincing?
        </Heading>
      </StyledContactIntroSectionAnimation>
    </StyledContactIntroSection>
  );
};
