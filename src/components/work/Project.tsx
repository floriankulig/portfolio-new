import React from "react";
import { PROJECT_CATEGORIES } from "ts/content";
import { Project as TProject } from "ts/types";
import { easeInOut, motion, Transition, Variants } from "framer-motion";
import styled from "styled-components";
import { theme } from "styles";
import { TransitionLink } from "components/shared";
import Image from "next/image";
import { rgba } from "polished";

const StyledProject = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledProjectFeatureImageWrapper = styled(motion.div)`
  --br: clamp(6px, 2vw, 10px);
  position: relative;
  width: 100%;
  aspect-ratio: 1.618;
  overflow: hidden;
  border-radius: var(--br);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.075);
  & > div:not(.chips) {
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
      border-radius: var(--br);
    }
  }

  .chips {
    --padding: 8px;
    position: absolute;
    padding: calc(0.75 * var(--padding) - 2px);
    gap: calc(0.75 * var(--padding));
    border-radius: 99px;
    backdrop-filter: blur(24px);
    background: ${({ theme }) => rgba(theme.bg3, 0.1)};
    border: 1px solid ${({ theme }) => rgba(theme.bg3, 0.075)};
    bottom: var(--padding);
    right: var(--padding);
    display: flex;
    flex-wrap: wrap;
    span {
      font-size: clamp(0.875rem, 2vw, 1rem);
      border-radius: 32px;
      padding: 0.5em 1em;
      font-weight: 500;
      letter-spacing: -0.03em;
    }
  }
`;

const StyledProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(12px, 2vw, 16px);
  padding: 0 clamp(6px, 2vw, 24px);
`;

const StyledProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: start;
  h3 {
    font-size: 1.875rem;
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.1;
    color: var(--text2);
  }
  p {
    font-family: var(--jakarta);
    color: ${({ theme }) => rgba(theme.text2, 0.5)};
    line-height: 1.3;
  }
`;
const imageVariants: Variants = {
  animate: {
    scale: 1,
    transition: {
      ease: theme.easing,
      duration: 0.75,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      ease: theme.easing,
      duration: 0.75,
    },
  },
};

const fadeInUpVariants: Variants = {
  initial: (isImage) => ({
    opacity: 0,
    scale: isImage ? 0.975 : 1,
    y: 25,
  }),
  inView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      delay: 0.1,
      scale: { ease: theme.easing },
      opacity: {
        ease: "linear",
        duration: 0.2,
      },
    } as Transition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      opacity: {
        ease: "linear",
        duration: 0.15,
      },
    },
  },
};

interface ProjectProps {
  project: TProject;
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  const {
    id,
    title,
    featureImage: image,
    technologies,
    services,
    keywords,
    categories,
  } = project;
  const chips = categories.map((category) => {
    const foundCategory = PROJECT_CATEGORIES.find(
      (cat) => cat.id === category
    )!;
    return foundCategory;
  });
  const secondarySubTextContent = services || technologies;
  const subText = Array.from(
    new Set(keywords.concat(secondarySubTextContent || []))
  ).join(", ");
  return (
    <TransitionLink href={`/project/${id}`}>
      <StyledProject
        layout
        initial="initial"
        animate="animate"
        whileInView="inView"
        whileHover="hover"
        exit="exit"
        transition={{
          layout: { type: "spring", stiffness: 115, damping: 18 },
          staggerChildren: 0.04,
        }}
        viewport={{ once: true }}
      >
        <StyledProjectFeatureImageWrapper
          variants={fadeInUpVariants}
          custom={true}
        >
          <motion.div
            layoutId={`project-image-feature-${title}`}
            layout
            variants={imageVariants}
          >
            <Image
              src={"/" + image}
              alt={`Image showing a software preview of the project "${title}"`}
              fill
              sizes="(max-width: 1080px) 95vw, 50vw"
              priority
            />
          </motion.div>
          <div className="chips">
            {chips.map((chip) => (
              <motion.span
                key={chip.id}
                layout
                variants={fadeInUpVariants}
                style={{ backgroundColor: chip.color }}
              >
                {chip.title}
              </motion.span>
            ))}
          </div>
        </StyledProjectFeatureImageWrapper>

        <StyledProjectContent>
          <StyledProjectHeader>
            <motion.h3 layout variants={fadeInUpVariants}>
              {title}
            </motion.h3>
            <motion.p layout variants={fadeInUpVariants}>
              {subText}
            </motion.p>
          </StyledProjectHeader>
        </StyledProjectContent>
      </StyledProject>
    </TransitionLink>
  );
};
