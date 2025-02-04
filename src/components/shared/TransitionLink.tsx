import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import { useOverlayContext } from "context/overlay-context";

interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
}) => {
  const router = useRouter();
  const { setPreRunPageTransition } = useOverlayContext();
  const handleClick = () => {
    setPreRunPageTransition(true);
    router.push(href, undefined, { scroll: false });
  };
  return (
    <motion.div
      style={{
        display: "contents",
        cursor: "pointer",
      }}
      onTap={() => handleClick()}
    >
      {children}
    </motion.div>
  );
};
