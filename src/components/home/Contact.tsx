import { SectionHeading } from "components/layout";
import { CopyToClipboard, ExternalButton } from "components/shared";
import { motion, useScroll, useSpring, useTransform, Variants } from "framer-motion";
import { copyToClipboard } from "helpers";
import { useViewport } from "hooks";
import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { EMAIL } from "ts";

const StyledContactSection = styled.section`
  width: 100%;
  min-height: 250vh;
  background: var(--dark);
  position: relative;
`;

const Heading = styled(motion.h3)`
position: absolute;
  text-align: center;
  width: 100%;
  color: var(--light);
  font-size: clamp(2.5rem, 8dvw, 4rem);
  margin-top: 750px;
`;

const StyledEmailMockup = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: var(--light);
  padding: 40px 35px;
  display: flex;
  flex-direction: column;
  gap: clamp(30px, 8dvw, 50px);
  align-items: flex-start;
  justify-content: space-between;
  
  @media (${({ theme }) => theme.bp.small}) {
    padding: 75px;
  }
  @media (${({ theme }) => theme.bp.medium}) {
    padding: 125px 150px;
  }

  div.textBox {
    background: var(--grey);
    width: 100%;
    padding: 40px;
    border-radius: 0.6rem;
    @media (${({ theme }) => theme.bp.medium}) {
      border-radius: 0.8rem;
    }
    text-overflow: ellipsis;
    flex-grow: 1;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      white-space: nowrap;
      font-family: var(--poppins);
      font-size: clamp(1.1rem, 4dvw, 1.3rem);
    }

    &:not(:last-of-type) {
      flex-grow: 0;
      padding: 12px 40px;
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

const TextMock = styled(motion.div) <{ $margTop?: boolean; $width: string }>`
  height: 1.25rem;
  width: ${(p) => p.$width};
  background: #d9d9d9;
  margin-top: ${(p) => p.$margTop && "calc(1.25rem/1.618)"};
`;
const Content = styled(motion.div)`
  ${({ theme }) => theme.grid}
  margin-top: 1000px;
  padding-bottom: 300px;
  color: var(--light);
  & > div {
    ${({ theme }) => theme.gridElement.fullWidth}
  }
  p {
    max-width: 40ch;
    justify-self: left;
    line-height: 180%;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
  }
  h2 {
    margin-bottom: 2.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 1.25rem;
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

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useViewport();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.05, 0.4], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.05, 0.35], [0, 100, 800])
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0, isMobile ? 20 : 30]
    );
    
    const headerY = useTransform(scrollYProgress, [0.4, 0.6], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <StyledContactSection ref={sectionRef}>
      <Heading style={{ opacity, y: headerY }}>convinced?</Heading>
      <StyledEmailMockup
        style={{ y, scale, borderRadius }}
        initial="initial"
        whileInView="inView"
        viewport={{ once: true }}
        variants={{ inView: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div variants={textBoxVariants} className="textBox">
          <motion.p variants={textVariants}>{EMAIL}</motion.p>
        </motion.div>
        <motion.div variants={textBoxVariants} className="textBox">
          <motion.p variants={textVariants}>Let&apos;s work together!</motion.p>
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
      <Content>
        <div>
          <SectionHeading light>Contact Me</SectionHeading>
          <motion.p>
            Convinced by the portfolio? Questions about me? Whatever it is, my
            inbox is open to you. <br /> Feel free to contact me via mail.
          </motion.p>
          <Buttons>
            <a href={`mailto:${EMAIL}?subject=Let's work together!`}>
              <ExternalButton light>{EMAIL}</ExternalButton>
            </a>
            <CopyToClipboard
              light
              onTap={() => copyToClipboard(EMAIL)}
              whileHover={{ scale: 1 }} //somehow fixes stuck tap state
              whileTap={{ scale: 0.95 }}
            />
          </Buttons>
        </div>
      </Content>
    </StyledContactSection>
  );
};
