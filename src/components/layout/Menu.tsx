import { TransitionLink } from "components/shared";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { rgba } from "polished";
import { X } from "react-feather";
import styled from "styled-components";
import { theme } from "styles";
import { LINKS } from "ts";
import { TimeZoneInfo } from "./header/TimeZoneInfo";
import { useViewport } from "hooks";

const StyledFullscreenMenu = styled(motion.div)`
  position: fixed;
  overflow-y: auto;
  inset: 0;
  z-index: 99;
  background: ${({ theme }) => rgba(theme.bg1, 0.6)};
  backdrop-filter: saturate(130%) blur(24px);
  color: var(--bg1);
  color: var(--text1);
  will-change: transform;
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 15vh;
  }
`;

const MenuHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--jakarta);
  h3 {
    font-size: clamp(1.75rem, 7.5vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  .right {
    display: flex;
    gap: 1rem;
    align-items: center;
    .timezone-meta {
      font-size: clamp(0.875rem, 3vw, 1.125rem);
    }
  }
`;

const CloseMenuButton = styled(motion.button)`
  all: unset;
  display: grid;
  place-items: center;
  width: clamp(3.5rem, 15vw, 5rem);
  aspect-ratio: 1;
  color: var(--text1);
  background: var(--bg3);
  border-radius: 50%;
  cursor: pointer;
  margin-right: -1.5%;
  will-change: transform;
  svg {
    width: 60%;
    height: 60%;
    stroke-width: 1.5;
  }
`;
const LinkList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const menuVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "linear", when: "afterChildren" },
  },
};

interface MenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  displayName: string;
}

export const Menu: React.FC<MenuProps> = ({ open, setOpen, displayName }) => {
  const {
    viewport: { viewPortWidth },
  } = useViewport();
  return (
    <AnimatePresence>
      {open && (
        <StyledFullscreenMenu
          initial="initial"
          animate="animate"
          exit="exit"
          variants={menuVariants}
        >
          <div>
            <MenuHeader className="main-col">
              <motion.h3 layoutId="hm-name" className="name">
                {displayName}
              </motion.h3>
              <div className="right">
                <TimeZoneInfo
                  displayCounty={300 < viewPortWidth}
                  displayFullCounty={420 < viewPortWidth}
                />
                <CloseMenuButton
                  layoutId="hm-menu"
                  animate
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onTap={() => setOpen(false)}
                >
                  <X size={24} />
                </CloseMenuButton>
              </div>
            </MenuHeader>

            <LinkList>
              {LINKS.map((link) => (
                <FullscreenNavLink
                  key={link.name}
                  link={link}
                ></FullscreenNavLink>
              ))}
            </LinkList>
          </div>
        </StyledFullscreenMenu>
      )}
    </AnimatePresence>
  );
};

const StyledFullscreenNavLink = styled(motion.li)`
  line-height: 1.3;
  font-size: 15vw;
  letter-spacing: -0.06em;
  font-weight: 500;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  span {
    display: inline-block;
  }
  & > span {
    &:nth-child(2) {
      position: absolute;
    }
  }
`;

const letterTransition = {
  opacity: {
    duration: 0.25,
  },
  y: {
    ease: theme.easing,
    duration: 0.6,
  },
};

const letterVariantsEnter: Variants = {
  initial: {
    y: "100%",
    transition: letterTransition,
  },
  hover: {
    y: 0,
    transition: letterTransition,
  },
};

const letterVariantsExit: Variants = {
  hover: {
    y: "-100%",
    // opacity: 0,
    transition: letterTransition,
  },
  initial: {
    y: 0,
    opacity: 1,
    transition: letterTransition,
  },
};

interface FullscreenNavLinkProps {
  link: { name: string; url: string };
}
const FullscreenNavLink: React.FC<FullscreenNavLinkProps> = ({ link }) => {
  const letters = link.name.split("");
  return (
    <TransitionLink href={link.url}>
      <StyledFullscreenNavLink
        whileHover="hover"
        initial="initial"
        animate="initial"
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          variants={{
            hover: {
              transition: { staggerChildren: 0.035, staggerDirection: 1 },
            },
            initial: {
              transition: { staggerChildren: 0.035, staggerDirection: -1 },
            },
          }}
        >
          {letters.map((letter, i) => (
            <motion.span key={"exit" + i} variants={letterVariantsExit}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          variants={{
            hover: {
              transition: { staggerChildren: 0.035, staggerDirection: 1 },
            },
            initial: {
              transition: { staggerChildren: 0.035, staggerDirection: -1 },
            },
          }}
        >
          {letters.map((letter, i) => (
            <motion.span key={"enter" + i} variants={letterVariantsEnter}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </StyledFullscreenNavLink>
    </TransitionLink>
  );
};
