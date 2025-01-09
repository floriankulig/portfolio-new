import { useRouter } from "next/router";
import React from "react";

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
    <div
      style={{
        display: "contents",
        cursor: "pointer",
      }}
      onClick={() => handleClick()}
    >
      {children}
    </div>
  );
};
