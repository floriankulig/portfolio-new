import React, { useDebugValue, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LINKS } from "ts";
import { NavLink } from "./NavLink";
import { TimeZoneInfo } from "./TimeZoneInfo";
import { useViewport } from "hooks";
import { rgba } from "polished";
import {
  circInOut,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { theme } from "styles";
import { useOverlayContext } from "context/overlay-context";

const StyledHeader = styled(motion.nav)`
  position: fixed;
  z-index: 99;
  width: 100%;
  align-items: center;
  backdrop-filter: saturate(180%) blur(32px);
  border-bottom: 1px solid;
  letter-spacing: 0.02em;
  font-size: 14px;
  font-family: var(--jakarta);
  font-weight: 500;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .name {
    font-weight: 600;
    letter-spacing: -0.04em;
    @media (min-width: 720px) {
      letter-spacing: unset;
      font-weight: 500;
    }
  }
`;

const StyledLinks = styled.ul`
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 2.5vw, 1.5rem);
`;

type ScrollDirection = "up" | "down";
const STICK_TOP = 50;

export const Header: React.FC = () => {
  const {
    isMobile,
    viewport: { viewPortWidth },
  } = useViewport(720);
  const name = isMobile ? "FK" : "Florian Kulig";

  const { blockHeader } = useOverlayContext();
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollUp = scrollDirection === "up";
  const hideHeader = (!scrollUp && !isAtTop) || blockHeader;

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - (scrollY.getPrevious() || 0);
    const isScrollingDown = diff >= 0;
    setIsAtTop(current < STICK_TOP && !(scrollY.getVelocity() > 500));
    setScrollDirection(isScrollingDown ? "down" : "up");
  });

  const paddingMultiple = useTransform(scrollY, [0, STICK_TOP * 0.5], [2, 1.5]);
  const paddingBlock = useMotionTemplate`clamp(1.25rem, 5vw, ${paddingMultiple}rem)`;
  const borderColor = useTransform(
    scrollY,
    [STICK_TOP * 0.25, STICK_TOP * 0.5],
    [rgba(theme.text3, 0), rgba(theme.text3, 0.15)]
  );
  const backgroundColor = useTransform(
    scrollY,
    [0, STICK_TOP],
    [rgba(theme.bg1, 0), rgba(theme.bg1, 0.75)]
  );

  return (
    <StyledHeader
      className="main-col"
      style={{ paddingBlock, borderColor, backgroundColor }}
      animate={{
        y: hideHeader ? "-120%" : "0%",
      }}
      transition={{
        ease: hideHeader ? theme.easing : circInOut,
        duration: 0.75,
      }}
    >
      <div className="name">{name}</div>
      <StyledLinks>
        {LINKS.map((link) => (
          <NavLink key={link.name} link={link}></NavLink>
        ))}
      </StyledLinks>
      <TimeZoneInfo
        displayFullLocation={viewPortWidth > 560}
        displayCounty={viewPortWidth > 720}
        displayFullCounty={viewPortWidth > 1080}
      />
    </StyledHeader>
  );
};
