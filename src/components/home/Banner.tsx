import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useVelocity,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledBannerSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-block: 64px;
  overflow: hidden;
  flex-direction: column;
  background: var(--bg2);
`;
const MIN_SCROLL_SPEED = 3;
export const Banner: React.FC = () => {
  const [direction, setDirection] = useState(1);
  const { scrollY } = useScroll();
  const prevScrollY = useRef<number>(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setDirection(latest > prevScrollY.current ? 1 : -1);
    prevScrollY.current = latest;
  });
  return (
    <StyledBannerSection>
      <BannerText direction={direction} text="I'm a developer" />
      <BannerText direction={direction * -1} text="Not a frameworker" />
    </StyledBannerSection>
  );
};

const StyledBannerText = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
`;

const StyledBannerSingleText = styled.h2`
  display: flex;
  font-size: clamp(64px, 15vw, 130px);
  font-family: var(--jakarta);
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.035em;
  color: var(--text2);
  gap: 0.25em;
  padding-right: 0.25em;
  min-width: fit-content;
  span.divider {
    color: var(--bg3);
  }
`;

interface BannerTextProps {
  text: string;
  direction: number;
  speed?: number;
}
const BannerText: React.FC<BannerTextProps> = ({ text, direction }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [textWidth, setTextWidth] = useState(0);
  const textX = useMotionValue(0);
  useMotionValueEvent(textX, "change", (latest) => {
    if (Math.abs(latest) > textWidth) {
      textX.set(direction);
    }
  });
  useAnimationFrame(() => {
    textX.set(
      textX.get() +
        direction *
          Math.max(
            MIN_SCROLL_SPEED,
            Math.min(Math.abs(scrollVelocity.get()), 1250) / 100
          )
    );
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    setTextWidth(ref.current.offsetWidth);
  }, [ref]);

  return (
    <StyledBannerText style={{ x: textX }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <StyledBannerSingleText key={i} ref={i === 0 ? ref : undefined}>
          {text}
          <span className="divider">-</span>
        </StyledBannerSingleText>
      ))}
    </StyledBannerText>
  );
};
