import { BlurAround } from "components/shared";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import styled from "styled-components";
import { ParallaxImagesSection } from "ts/types";

const StyledParallaxImagesSection = styled.section`
  min-height: 125vh;
  padding-block: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg3);
  position: relative;
  overflow: hidden;
`;

const BGImageWrapper = styled(motion.div)<{ $overlap: number }>`
  position: absolute;
  width: 100%;
  will-change: transform;
  height: ${(p) => 100 + 2 * p.$overlap}%;
`;

const MainImage = styled(motion.div)`
  position: relative;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.15);
`;

interface ParallaxImagesProps {
  parallaxImages: ParallaxImagesSection;
}
const IMAGE_OVERLAP = 15;
export const ParallaxImages: React.FC<ParallaxImagesProps> = ({
  parallaxImages,
}) => {
  const { mainImage, bgImage, sideImages } = parallaxImages;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageYPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [-IMAGE_OVERLAP, IMAGE_OVERLAP]
  );
  const imageY = useMotionTemplate`${imageYPercent}%`;
  return (
    <StyledParallaxImagesSection ref={sectionRef}>
      <BGImageWrapper $overlap={IMAGE_OVERLAP} style={{ y: imageY }}>
        <Image
          src={`/parallaxBG/${bgImage}`}
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </BGImageWrapper>
      <MainImage>
        <BlurAround size={5}>
          <Image
            src={`/${mainImage}`}
            alt="Main Image"
            style={{
              width: "70vw",
              height: "auto",
              borderRadius: 4,
            }}
            width={1618}
            height={1000}
          />
        </BlurAround>
      </MainImage>
    </StyledParallaxImagesSection>
  );
};
