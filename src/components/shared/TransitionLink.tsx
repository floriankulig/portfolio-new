import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

interface TransitionLinkProps {
  children: React.ReactNode;
  href: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href, undefined, { scroll: false });
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
