export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  technologiesFeatured: number;
  externalLink?: string;
  github?: string;
  categories?: string[];
}

export interface ProjectCategory {
  id: string;
  title: string;
  color: string;
}

export interface FeaturedProject extends Project {}

const PROJECTS: Project[] = [
  {
    id: "jvis",
    title: "Job Manager",
    image: "JvisMock.png",
    description:
      "A tool for managing and planning contracting \n work in the forestry business.",
    technologies: ["React", "Firebase"],
    technologiesFeatured: 2,
  },
  {
    id: "testiply",
    title: "Testiply",
    image: "TestiplyMock.png",
    description:
      "A platform for sharing beta applications with a feedback \n mechanism connecting testers and developers.",
    technologies: ["Interaction", "React", "MongoDB", "NodeJS"],
    technologiesFeatured: 2,
    externalLink: "https://testiply.vercel.app",
    github: "",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    image: "SortVisMock.png",
    description:
      "An application that visualizes the most popular sorting \n algorithms, including documentation of their methodology.",
    technologies: ["Visualization", "Python"],
    technologiesFeatured: 2,
    github: "",
  },
];

const FEATURED_PROJECTS: FeaturedProject[] = PROJECTS.slice(
  0,
  3
) as FeaturedProject[];

const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "development",
    title: "Development",
    color: "#87CEEB",
  },
  {
    id: "data-science",
    title: "Data Science & AI",
    color: "#FF6347",
  },
  {
    id: "design",
    title: "Design",
    color: "#20B2AA",
  },
];

export { FEATURED_PROJECTS, PROJECTS, PROJECT_CATEGORIES };
