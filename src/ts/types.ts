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
  clientLink?: string;
  services?: string[];
  date: string;
  roles?: ProjectRole[];
  stillDeveloping?: boolean;
  sections?: {
    parallaxImages?: ParallaxImagesSection;
  };
}

export interface ProjectRole {
  name: string;
  responsibilities?: string[];
  link?: string;
}

export interface ParallaxImagesSection {
  bgImage: string;
  mainImage: string;
  sideImages?: string[];
}

export interface ProjectCategory {
  id: string;
  title: string;
  legerTitle: string;
  color: string;
}

export interface FeaturedProject extends Project {}
