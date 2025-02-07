import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
  onTap?: () => void;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  onTap = () => {},
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href, undefined, { scroll: false });
    onTap();
  };
  return (
    <motion.div
      style={{
        display: "contents",
        cursor: "pointer",
      }}
      onTap={() => handleClick()}
      role="link"
    >
      {children}
    </motion.div>
  );
};
