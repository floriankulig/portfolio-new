import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const StyledNavLinkItem = styled.li`
  position: relative;
  overflow: visible;

  .indicator {
    position: absolute;
    bottom: -8px;
    left: calc(50% - 1.5px);
    width: 3px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--text2);
  }
`;

interface NavLinkProps {
  link: { url: string; name: string };
}
export const NavLink: React.FC<NavLinkProps> = ({ link: { url, name } }) => {
  const router = useRouter();
  const isActive = router.pathname === url;

  return (
    <StyledNavLinkItem>
      <Link href={url} key={name}>
        <span>{name}</span>
      </Link>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="indicator"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.7,
              },
            }}
            exit={{ opacity: 0, scale: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </StyledNavLinkItem>
  );
};
