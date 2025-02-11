import { MeasurementRect } from "hooks/useMeasure";
import { PROJECTS } from "ts/content";
import { Project } from "ts/types";

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Handle errors appropriately
    console.error("Failed to copy text to clipboard:", error);
  }
};

export const measureDistance = (
  rect1: MeasurementRect,
  rect2: MeasurementRect
) => {
  const dx = rect2.left - rect1.left;
  const dy = rect2.top - rect1.top;
  console.log(`${rect2.left} - ${rect1.left} = ${dx}`);
  return { distanceX: dx, distanceY: dy };
};

export const getProjectByID = (projectID: string) => {
  return PROJECTS.find((project) => project.id === projectID);
};

export const getProjectYear = (project: Project) => {
  const today = new Date();
  const thisYear = today.getFullYear();
  if (project.date?.includes("Present")) {
    return thisYear;
  }
  // Extract the last year from the date string using regex
  const yearMatch = project.date?.match(/\d{4}/g);
  return yearMatch ? parseInt(yearMatch[yearMatch.length - 1]) : undefined;
};

export { formatTimeForGermany } from "./formatTimeForGermany";
