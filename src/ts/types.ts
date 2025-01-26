import { PROJECT_CATEGORIES } from "./content";

export interface Project {
  id: string;
  title: string;
  featureDescription: string;
  projectBackground: string;
  image: string;
  technologies: string[];
  technologiesFeatured: number;
  externalLink?: string;
  github?: string;
  categories: Array<(typeof PROJECT_CATEGORIES)[number]["id"]>;
  client?: string;
  date?: string;
  roles?: string;
}

export interface ProjectCategory {
  id: string;
  title: string;
  legerTitle: string;
  color: string;
}

export interface FeaturedProject extends Project {}
