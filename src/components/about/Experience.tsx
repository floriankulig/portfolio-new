import { AboutSection } from "./AboutSection";
import { Entries, Entry } from "./Entry";

export const Experience = () => (
  <AboutSection label="Experience">
    <Entries>
      <Entry title="Software Engineer — Capgemini" meta="Oct 2025 — Present">
        <p>
          - <b>Leading a team of 8 developers</b> on an EU-wide VAT-fraud
          detection platform, focused on architecture & testing. <br />-
          Building <b>MLOps tooling</b> for a <b>Sovereign AI platform</b> on
          on-premise GPU-clusters.
        </p>
      </Entry>
      <Entry
        title="Software Engineer, Dual Student — Capgemini"
        meta="2022 — 2025"
      >
        <p>
          Software engineer in automotive, manufacturing, defense and SaaS.{" "}
          <br />
          <b>Led 6 developers</b> shipping a real-time monitoring dashboard to
          production in <b>5 months</b> (Spring Boot, Angular).
        </p>
      </Entry>
      <Entry title="Quantitative Analyst Intern — AlleAktien" meta="2022">
        <p>
          Quantitative analysis for <b>11,000+ investor clients</b> and a{" "}
          <b>Python ETL pipelines</b> for automated financial data processing.
        </p>
      </Entry>
    </Entries>
  </AboutSection>
);
