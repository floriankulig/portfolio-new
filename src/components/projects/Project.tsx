/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PROJECT_CATEGORIES, Project as TProject } from "ts/content";
import { animate, delay, easeInOut, motion, Variants } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import { theme } from "styles";
import { TransitionLink } from "components/shared";

const StyledProject = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledProjectFeatureImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1.618;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.075);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const StyledProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  padding: 0 16px 8px;
`;

const StyledProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  gap: 8px;

  h3 {
    font-size: 1.618rem;
    font-weight: 600;
    letter-spacing: -4%;
    color: var(--text2);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    span {
      border-radius: 32px;
      padding: 0.5em 1em;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: -3%;
    }
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

const imageWrapperVariants: Variants = {
  initial: {
    opacity: 0,
  },
  inView: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      ease: easeInOut,
      duration: 0.15,
      opacity: {
        duration: 0.1,
        ease: "linear",
      },
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
      delay: 0.15,
      duration: 0.25,
      type: "spring",
      stiffness: 120,
      damping: 18,
      scale: { ease: theme.easing },
      opacity: {
        ease: "linear",
        duration: 0.15,
      },
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      opacity: {
        ease: "linear",
        duration: 0.1,
      },
    },
  },
};

interface ProjectProps {
  project: TProject;
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  const { id, title, description, image, technologies, categories } = project;
  const chips = PROJECT_CATEGORIES.filter((category) =>
    categories?.includes(category.id)
  );
  // TODO: Build animation to Project Detail
  return (
    <StyledProject
      layout
      initial="initial"
      animate="animate"
      whileInView="inView"
      whileHover="hover"
      exit="exit"
      transition={{
        layout: { type: "spring", stiffness: 115, damping: 18 },
        staggerChildren: 0.05,
      }}
      onLayoutMeasure={(layout) => console.log(layout)}
      viewport={{ once: true }}
    >
      <TransitionLink href={`/projects/${id}`}>
        <StyledProjectFeatureImageWrapper
          variants={fadeInUpVariants}
          custom={true}
        >
          <motion.img
            layoutId={`project-image-feature-${title}`}
            layout="preserve-aspect"
            src={image}
            variants={imageVariants}
            alt={`Image showing a software preview of the project "${title}"`}
          />
        </StyledProjectFeatureImageWrapper>

        <StyledProjectContent>
          <StyledProjectHeader>
            <motion.h3 layout="position" variants={fadeInUpVariants}>
              {title}
            </motion.h3>
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
          </StyledProjectHeader>
        </StyledProjectContent>
      </TransitionLink>
    </StyledProject>
  );
};
