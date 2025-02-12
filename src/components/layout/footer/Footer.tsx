import styled from "styled-components";
import { BuiltByMessage } from "./BuiltByMessage";
import { useRouter } from "next/router";
import { LINKS } from "ts";
import {
  ArrowButton,
  InlineImageBubble,
  TransitionLink,
} from "components/shared";
import { motion, MotionProps, useScroll, useTransform } from "framer-motion";
import { theme } from "styles";
import { LinkButton } from "components/project-detail/LinkButton";
import { GitHub, Linkedin } from "react-feather";
import { EMAIL, GITHUB } from "ts/content";
import { useRef } from "react";

const StyledFooter = styled(motion.footer)`
  --gap: clamp(3rem, 10vw, 5rem);
  --header-font-size: clamp(1.5rem, 10.8vw, 4rem);
  width: 100%;
  background: var(--text1);
  color: var(--bg3);
`;

const StyledFooterContent = styled(motion.section)`
  padding-block: 5rem;
  display: flex;
  align-items: start;
  gap: 2rem var(--gap);
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;

  .cta-section {
    display: flex;
    flex-direction: column;
    gap: max(0.35em, 1rem);
    font-size: var(--header-font-size);

    .headline {
      font-weight: 500;
      max-width: 8em;
      padding-block: 0.15em;
      overflow: visible;
      color: var(--bg3);
      letter-spacing: -0.045em;
    }

    a {
      display: inline-flex; /* or flex */
      padding: 0;
      margin: 0;
      width: fit-content;
      height: fit-content;
    }
  }
`;

const StyledLinksSection = styled.div`
  font-size: var(--header-font-size);
  padding-block: 0.3em;
  display: flex;
  justify-content: end;
  gap: var(--gap);
`;

const StyledLinks = styled.ul`
  color: var(--text3);
  font-size: 1.125rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  h4 {
    opacity: 0.75;
    font-weight: 500;
    letter-spacing: -0.04em;
    padding-block-end: 0.5rem;
  }

  li {
    letter-spacing: -0.02em;
    padding-block: 0.25rem;
    cursor: pointer;
  }
  a {
    font-size: 1rem;
    margin-block: 0.25rem;
    width: 100%;
  }
`;

const GitHubIcon = <GitHub />;
const LinkedInIcon = <Linkedin strokeWidth={1.5} />;

interface FooterProps extends MotionProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  const { asPath } = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
  return (
    <StyledFooter ref={sectionRef} {...props}>
      <StyledFooterContent className="main-col" style={{ y: sectionY }}>
        <div className="cta-section">
          <h3 className="headline balanced with-bubble">
            Let&apos;s build
            <InlineImageBubble
              image="/bulb.png"
              aspectRatio={2.4}
              sizes="(max-width: 1080px) 25vw, 150px"
              alt="Image of a hand holding a light bulb"
            />
            something great.
          </h3>
          <a href={`mailto:${EMAIL}?subject=Let's work together!`}>
            <ArrowButton theme="dark">Get in touch</ArrowButton>
          </a>
        </div>
        <StyledLinksSection>
          <StyledLinks>
            <h4>Links</h4>
            {LINKS.map((link) => (
              <TransitionLink key={link.name} href={link.url}>
                <motion.li
                  whileHover={{ color: theme.bg3 }}
                  animate={{
                    color: link.url === asPath ? theme.bg3 : theme.text3,
                    cursor: link.url === asPath ? "default" : "pointer",
                  }}
                >
                  {link.name}
                </motion.li>
              </TransitionLink>
            ))}
          </StyledLinks>
          <StyledLinks>
            <h4>Socials</h4>
            <LinkButton
              link={GITHUB}
              icon={GitHubIcon}
              color={"#000"}
              textColor={theme.bg1}
            >
              Github
            </LinkButton>
            <LinkButton
              link={GITHUB}
              icon={LinkedInIcon}
              color={"#0a689a"}
              textColor={theme.bg1}
              disabled
            >
              LinkedIn
            </LinkButton>
          </StyledLinks>
        </StyledLinksSection>
      </StyledFooterContent>
      <BuiltByMessage />
    </StyledFooter>
  );
};
