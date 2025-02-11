import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LINKS } from "ts";
import { NavLink } from "./NavLink";
import { TimeZoneInfo } from "./TimeZoneInfo";
import { Menu as FullscreenMenu } from "../Menu";
import { useCannotScroll, useViewport } from "hooks";
import { rgba } from "polished";
import {
  AnimatePresence,
  circInOut,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { theme } from "styles";
import { useOverlayContext } from "context/overlay-context";
import { Menu } from "react-feather";
import { TransitionLink } from "components/shared";

const SHOW_LINKS_WIDTH = 600;

const StyledHeader = styled(motion.nav)`
  position: fixed;
  z-index: 99;
  width: 100%;
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid;
  letter-spacing: 0.02em;
  font-size: 14px;
  font-family: var(--jakarta);
  font-weight: 500;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  @media (max-width: ${SHOW_LINKS_WIDTH}px) {
    display: flex;
    justify-content: space-between;
  }

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

const StyledRightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  height: 14px;
`;

const MenuWrapper = styled(motion.button)`
  all: unset;
  display: grid;
  place-content: center;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: -0.5rem;
  border-radius: 0.5rem;
  color: var(--text2);
`;

const headerVariants: Variants = {
  pageEntry: {
    y: "-120%",
  },
  hidden: {
    y: "-120%",
  },
  pageLoad: {
    y: "0%",
  },
};

type ScrollDirection = "up" | "down";
const STICK_TOP = 50;

export const Header: React.FC = () => {
  const {
    isMobile,
    viewport: { viewPortWidth },
  } = useViewport(721);
  const name = isMobile ? "FK" : "Florian Kulig";

  const { blockHeader } = useOverlayContext();
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");

  //MENU OPENING LOGIC
  const [menuOpen, setMenuOpen] = useState(false);
  const onOpenMenu = () => {
    setMenuOpen(true);
  };
  const showLinks = viewPortWidth > SHOW_LINKS_WIDTH;

  useCannotScroll(menuOpen);
  useEffect(() => {
    setMenuOpen(false);
  }, [showLinks]);

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
    <LayoutGroup>
      <StyledHeader
        className="main-col"
        style={{ paddingBlock, borderColor, backgroundColor }}
        layoutRoot
        animate={hideHeader ? "hidden" : ""}
        variants={headerVariants}
        transition={{
          ease: hideHeader ? theme.easing : circInOut,
          duration: 0.75,
        }}
      >
        <motion.div
          className="name"
          layoutId="hm-name"
          layoutDependency={menuOpen}
          layoutRoot
        >
          <TransitionLink href="/">{name}</TransitionLink>
        </motion.div>
        {showLinks && (
          <StyledLinks>
            {LINKS.map((link) => (
              <NavLink key={link.name} link={link}></NavLink>
            ))}
          </StyledLinks>
        )}
        <StyledRightSide>
          <AnimatePresence>
            {!menuOpen && (
              <TimeZoneInfo
                key="timezone-info"
                layoutDependency={menuOpen}
                displayCounty={
                  viewPortWidth > 720 ||
                  (300 < viewPortWidth && viewPortWidth < SHOW_LINKS_WIDTH)
                }
                displayFullCounty={
                  viewPortWidth > 720 ||
                  (420 < viewPortWidth && viewPortWidth < SHOW_LINKS_WIDTH)
                }
              />
            )}
            {!showLinks && !menuOpen && (
              <MenuWrapper
                key="menu-wrapper"
                aria-label="Open Menu"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: rgba(theme.text3, 0.1),
                }}
                whileTap={{ scale: 0.925 }}
                onTap={() => onOpenMenu()}
                layoutDependency={menuOpen}
                layoutId="hm-menu"
                layoutScroll
              >
                <Menu />
              </MenuWrapper>
            )}
          </AnimatePresence>
        </StyledRightSide>
      </StyledHeader>
      <FullscreenMenu
        open={menuOpen}
        displayName={name}
        setOpen={setMenuOpen}
      />
    </LayoutGroup>
  );
};
