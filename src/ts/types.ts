import { PROJECT_CATEGORIES } from "./content";

export interface Project {
  id: string;
  title: string;
  featureDescription: string;
  projectBackground: string;
  featureImage: string;
  gradient: string;
  technologies: string[];
  keywords: string[];
  externalLink?: string;
  github?: string;
  categories: Array<(typeof PROJECT_CATEGORIES)[number]["id"]>;
  client?: string;
  services?: string[];
  date?: string;
  roles?: ProjectRole[];
}

export interface ProjectRole {}

export interface ProjectCategory {
  id: string;
  title: string;
  legerTitle: string;
  color: string;
}

export interface FeaturedProject extends Project {}
