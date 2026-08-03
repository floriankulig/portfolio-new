import { AboutSection } from "./AboutSection";
import { Entries, Entry } from "./Entry";

export const Experience = () => (
  <AboutSection label="Experience">
    <Entries>
      <Entry title="Software Engineering Intern — BMW" meta="Oct 2026 — Today">
        <p>
          - <b>L2++ and L4 autonomous driving</b> software development in C++
          and Python. <br />- <b>Deep learning research</b> for perception{" "}
          <br />
        </p>
      </Entry>
      <Entry title="Software Engineer — Capgemini" meta="Oct 2025 — Oct 2026">
        <p>
          - <b>Leading a team of 8 developers</b> on an EU-wide VAT-fraud
          detection platform, focused on architecture & testing. <br />-
          Building <b>MLOps tooling</b> for a <b>Sovereign AI platform</b> on
          on-premise GPU-clusters.
        </p>
      </Entry>
      <Entry
        title="Software Engineer, Dual Student — Capgemini"
        meta="Sep 2022 — Sep 2025"
      >
        <p>
          Software engineer in automotive, manufacturing, defense and SaaS.{" "}
          <br />
          <b>Led 6 developers</b> shipping a real-time monitoring dashboard to
          production in <b>5 months</b> (Spring Boot, Angular).
        </p>
      </Entry>
      <Entry
        title="Quantitative Analyst Intern — AlleAktien"
        meta="Apr 2022 — Sep 2022"
      >
        <p>
          Quantitative analysis for <b>11,000+ investor clients</b> and a{" "}
          <b>Python ETL pipelines</b> for automated financial data processing.
        </p>
      </Entry>
    </Entries>
  </AboutSection>
);
