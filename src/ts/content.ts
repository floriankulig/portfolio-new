export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  technologiesFeatured: number;
  externalLink?: string;
  github?: string;
}

export interface FeaturedProject extends Project {}

const PROJECTS: Project[] = [
  {
    id: "jvis",
    title: "Job Manager",
    description:
      "A tool for managing and planning contracting work in the forestry business.",
    technologies: ["React", "Firebase"],
    technologiesFeatured: 2,
  },
  {
    id: "testiply",
    title: "Testiply",
    description:
      "A platform for sharing beta applications with a feedback mechanism connecting testers and developers.",
    technologies: ["Interaction", "React", "MongoDB", "NodeJS"],
    technologiesFeatured: 2,
    externalLink: "https://testiply.vercel.app",
    github: "",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    description:
      "An application that visualizes the most popular sorting algorithms, including documentation of their methodology.",
    technologies: ["Visualization", "Python"],
    technologiesFeatured: 2,
    github: "",
  },
];

const FEATURED_PROJECTS: FeaturedProject[] = PROJECTS.slice(
  0,
  3
) as FeaturedProject[];

export { FEATURED_PROJECTS, PROJECTS };
