import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import { NAV_LINKS } from "ts";

const StyledNav = styled(motion.nav)`
  position: absolute;
  padding: 2rem 5%;
  @media (${({ theme }) => theme.bp.small}) {
    padding: 2.5rem 4rem;
  }
  z-index: 99;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  color: var(--dark);
`;

const StyledNavLogo = styled(motion.div)`
  font-family: var(--poppins);
  font-weight: 600;
  font-size: 21px;
`;

const StyledNavLinks = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(1rem, 3vw, 2rem);
`;

interface StyledNavLinkProps {
  $active?: boolean;
}
const StyledNavLink = styled(motion.li)<StyledNavLinkProps>`
  position: relative;
  font-family: var(--inter);
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  font-size: 16.5px;
  text-transform: uppercase;

  .active-indicator {
    position: absolute;
    width: 4px;
    aspect-ratio: 1;
    background: var(--dark);
    border-radius: 2px;
    margin: 2px calc(50% - 2px) 0;
  }
`;

const navVariants: Variants = {
  pageLoad: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.4,
    },
  },
  pageExit: {
    opacity: 0,
  },
};

const navItemVariants: Variants = {
  pageEntry: {
    opacity: 0,
  },
  pageLoad: {
    opacity: 1,
  },
};

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <StyledNav variants={navVariants} layout>
      <StyledNavLogo variants={navItemVariants}>Florian Kulig</StyledNavLogo>
      <StyledNavLinks>
        {NAV_LINKS.map((link) => {
          const linkIsActive = router.route === link.path;
          return (
            <StyledNavLink
              key={link.path}
              variants={navItemVariants}
              $active={linkIsActive || false}
            >
              <Link href={link.path}>{link.name}</Link>
              {linkIsActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.8,
                    },
                  }}
                  className="active-indicator"
                />
              )}
            </StyledNavLink>
          );
        })}
      </StyledNavLinks>
    </StyledNav>
  );
};
