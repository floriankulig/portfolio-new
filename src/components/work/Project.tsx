import React from "react";
import { PROJECT_CATEGORIES } from "ts/content";
import { Project as TProject } from "ts/types";
import { easeInOut, motion, Transition, Variants } from "framer-motion";
import styled from "styled-components";
import { theme } from "styles";
import { TransitionLink } from "components/shared";
import Image from "next/image";

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
  & > div {
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
      border-radius: 16px;
    }
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
    featureDescription,
    featureImage: image,
    technologies,
    categories,
  } = project;
  const chips = PROJECT_CATEGORIES.filter((category) =>
    categories?.includes(category.id)
  );
  // TODO: Build animation to Project Detail
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
        viewport={{ once: false }}
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
              priority
            />
          </motion.div>
        </StyledProjectFeatureImageWrapper>

        <StyledProjectContent>
          <StyledProjectHeader>
            <motion.h3 layout variants={fadeInUpVariants}>
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
      </StyledProject>
    </TransitionLink>
  );
};
