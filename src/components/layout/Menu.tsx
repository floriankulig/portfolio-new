import { TransitionLink } from "components/shared";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";
import { rgba } from "polished";
import { X } from "react-feather";
import styled from "styled-components";
import { theme } from "styles";
import { LINKS } from "ts";
import { TimeZoneInfo } from "./header/TimeZoneInfo";
import { useViewport } from "hooks";

const StyledFullscreenMenu = styled(motion.div)<{ $open: boolean }>`
  position: fixed;
  overflow-y: auto;
  inset: 0;
  z-index: 99;
  background: ${({ theme }) => rgba(theme.bg1, 0.6)};
  backdrop-filter: saturate(130%) blur(24px);
  color: var(--bg1);
  color: var(--text1);
  will-change: transform;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  display: flex;
  flex-direction: column;
  padding-block: clamp(1.5rem, 4vh, 2.5rem);

  & > div.content {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MenuHeader = styled.div`
  width: 100%;
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

const menuOverlayVariants: Variants = {
  hminitial: {
    opacity: 0,
  },
  hmanimate: {
    opacity: 1,
  },
  hmexit: {
    opacity: 0,
    transition: { delay: 0.1, ease: "linear" },
  },
};

const linkListVariants: Variants = {
  hmanimate: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.05,
    },
  },
  hmexit: {
    transition: {
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
};

const navLinkVariants: Variants = {
  hminitial: {
    opacity: 0,
    scale: 0.9,
    y: "-30%",
  },
  hmanimate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 110,
      visualDuration: 0.275,
      opacity: {
        ease: "linear",
        duration: 0.275,
      },
    },
  },
  hmexit: {
    opacity: 0,
    scale: 0.9,
    y: "-30%",
    transition: {
      type: "spring",
      visualDuration: 0.3,
      opacity: {
        ease: "linear",
        duration: 0.275,
      },
    },
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
          initial="hminitial"
          animate="hmanimate"
          exit="hmexit"
          variants={menuOverlayVariants}
          $open={open}
        >
          <MenuHeader className="main-col">
            <motion.h3
              layoutId="hm-name"
              className="name"
              layoutDependency={open}
            >
              {displayName}
            </motion.h3>
            <div className="right">
              <TimeZoneInfo
                displayCounty={300 < viewPortWidth}
                displayFullCounty={420 < viewPortWidth}
              />
              <CloseMenuButton
                layoutId="hm-menu"
                layoutDependency={open}
                animate
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onTap={() => setOpen(false)}
              >
                <X size={24} />
              </CloseMenuButton>
            </div>
          </MenuHeader>

          <div className="content">
            <LinkList variants={linkListVariants}>
              {LINKS.map((link) => (
                <motion.li variants={navLinkVariants} key={link.name}>
                  <FullscreenNavLink link={link} setOpen={setOpen} />
                </motion.li>
              ))}
            </LinkList>
          </div>
        </StyledFullscreenMenu>
      )}
    </AnimatePresence>
  );
};

const StyledFullscreenNavLink = styled(motion.div)`
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

const letterTransition: Transition = {
  ease: theme.easing,
  duration: 0.6,
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
    transition: letterTransition,
  },
  initial: {
    y: 0,
    transition: letterTransition,
  },
};

interface FullscreenNavLinkProps {
  link: { name: string; url: string };
  setOpen: (open: boolean) => void;
}
const FullscreenNavLink: React.FC<FullscreenNavLinkProps> = ({
  link,
  setOpen,
}) => {
  const letters = link.name.split("");
  const onTap = () => {
    setOpen(false);
  };

  return (
    <TransitionLink href={link.url} onTap={onTap}>
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
