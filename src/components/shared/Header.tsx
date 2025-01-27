import React, { useEffect, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { LINKS } from "ts";
import { NavLink } from "./NavLink";

const StyledHeader = styled.nav`
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-block: clamp(1.5rem, 3vw, 2rem) 0;
  letter-spacing: 2%;
  font-size: 14px;
  font-family: var(--jakarta);
  font-weight: 500;
`;

const StyledMeta = styled.div`
  color: var(--text3);
  display: flex;
  justify-content: flex-end;
  gap: 0.25em;
  text-align: right;
  & > span {
    font-weight: 600;
    min-width: 2.5rem;
    text-align: right;
    color: var(--text1);
  }
`;

const StyledLinks = styled.ul`
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 2.5vw, 1.5rem);
`;

// Memoized Colon component to prevent unnecessary re-renders
const BlinkingColon = memo(() => (
  <motion.span
    initial="visible"
    animate={{
      opacity: [1, 0, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
  >
    :
  </motion.span>
));

BlinkingColon.displayName = "BlinkingColon";

const formatTimeForGermany = (date: Date) => {
  return date.toLocaleTimeString("de-DE", {
    timeZone: "Europe/Berlin",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const Header: React.FC = () => {
  const [timeData, setTimeData] = useState(() => {
    const initialDate = new Date();
    const formattedTime = formatTimeForGermany(initialDate);
    const [time, meridiem] = formattedTime.split(" ");
    const [hours, minutes] = time.split(":");
    return { hours, minutes, meridiem };
  });

  // Memoize the update function to prevent recreating it on each render
  const updateTime = useCallback(() => {
    const now = new Date();
    const formattedTime = formatTimeForGermany(now);
    const [time, meridiem] = formattedTime.split(" ");
    const [hours, minutes] = time.split(":");
    setTimeData({ hours, minutes, meridiem });
  }, []);

  useEffect(() => {
    // Update immediately to sync with system clock
    updateTime();

    // Sync interval with system clock
    const now = new Date();
    const ms = now.getMilliseconds();
    const secondsDelay = 1000 - ms;

    // Initial timeout to sync with next second
    const timeout = setTimeout(() => {
      updateTime();
      // Then start the interval
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, secondsDelay);

    return () => clearTimeout(timeout);
  }, [updateTime]);

  return (
    <StyledHeader className="main-col">
      <div>Florian Kulig</div>
      <StyledLinks>
        {LINKS.map((link) => (
          <NavLink key={link.name} link={link}></NavLink>
        ))}
      </StyledLinks>
      <StyledMeta>
        Bavaria, Germany{" "}
        <span>
          {timeData.hours}
          <BlinkingColon />
          {timeData.minutes}
        </span>{" "}
        {timeData.meridiem}
      </StyledMeta>
    </StyledHeader>
  );
};
