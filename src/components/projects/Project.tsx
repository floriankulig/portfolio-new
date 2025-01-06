import React from "react";
import { Project as TProject } from "ts/content";

interface ProjectProps {
  project: TProject;
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  return <div>Project</div>;
};
