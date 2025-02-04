import { memo, use, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatTimeForGermany } from "helpers";
import styled from "styled-components";

const StyledMeta = styled.div`
  color: var(--text3);
  display: flex;
  justify-content: flex-end;
  text-align: right;
  gap: 0.25em;
  & > span {
    font-weight: 600;
    min-width: 2.5rem;
    color: var(--text1);
  }
`;

interface TimeZoneInfoProps {
  displayFullLocation?: boolean;
  displayFullCounty?: boolean;
  displayCounty?: boolean;
}

export const TimeZoneInfo: React.FC<TimeZoneInfoProps> = ({
  displayFullCounty,
  displayFullLocation,
  displayCounty,
}) => {
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

  const county = displayCounty ? (displayFullCounty ? "Bavaria" : "BY") : null;
  const location = !displayFullLocation
    ? "DE"
    : (county ? county + ", " : "") + "Germany";

  return (
    <StyledMeta>
      {location}
      <span>
        {timeData.hours}
        <BlinkingColon />
        {timeData.minutes}
      </span>{" "}
      {timeData.meridiem}
    </StyledMeta>
  );
};

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
