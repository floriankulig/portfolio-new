import { AboutSection } from "./AboutSection";
import { Entries, Entry } from "./Entry";

export const Education = () => (
  <AboutSection label="Education">
    <Entries>
      <Entry
        title="M.Sc. Robotics, Cognition, Intelligence"
        meta="Technical University of Munich · from Oct 2026"
      >
        <p>
          Focusing on ML, CV, high-performance deep-learning and autonomous
          systems.
        </p>
      </Entry>
      <Entry
        title="B.Sc. Computer Science"
        meta="DHBW Stuttgart · 10/2022 — 09/2025"
      >
        <p>Dual student program with Capgemini.</p>
      </Entry>
    </Entries>
  </AboutSection>
);
