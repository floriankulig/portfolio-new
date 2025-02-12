import React from "react";
import styled from "styled-components";
import { Project, ProjectRole } from "ts/types";
import { LinkButton } from "./LinkButton";
import { ExternalLink, GitHub } from "react-feather";
const Stats = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  gap: 14px;

  span {
    font-weight: 500;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &.links {
      gap: 8px;
      flex-direction: row;
      flex-wrap: wrap;
      @media (${({ theme }) => theme.bp.small}) {
        flex-direction: column;
      }
      @media (max-width: 400px) {
        flex-direction: column;
        a {
          width: 100%;
        }
      }
    }
  }
`;
const StyledProjectStatsSection = styled.section`
  padding-block: 0 16px;
  font: var(--jakarta);
  color: var(--text2);

  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 28px;
  @media (${({ theme }) => theme.bp.small}) {
    padding-block: 0 32px;
    align-items: flex-start;
    flex-direction: row;
    gap: clamp(24px, 5vw, 64px);
  }
  justify-content: space-between;
  .left {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
    gap: clamp(24px, 5vw, 64px);

    ${Stats} {
      display: none;

      @media (${({ theme }) => theme.bp.small}) {
        display: flex;
      }

      &.technologies {
        display: flex;
      }
    }
  }
`;

interface ProjectStatsProps {
  project: Project;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ project }) => {
  const {
    technologies,
    date,
    github,
    externalLink,
    client,
    services,
    roles,
    gradient,
  } = project;
  const dateSection = (
    <Stats>
      <span>{date?.includes("-") ? "Timeframe" : "Date"}</span>
      <ul>
        <li>{date}</li>
      </ul>
    </Stats>
  );
  const dateFirst = !client;
  return (
    <StyledProjectStatsSection>
      <div className="left">
        {dateFirst && dateSection}
        {client && (
          <Stats>
            <span>Client</span>
            <ul>
              <li>{client}</li>
            </ul>
          </Stats>
        )}
        <Stats className="technologies">
          <span>Technologies</span>
          <ul>
            {technologies.map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </Stats>
        {services && (
          <Stats>
            <span>Services</span>
            <ul>
              {services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Stats>
        )}
        {roles && !(client && services) && <Roles roles={roles} />}
        {!dateFirst && dateSection}
      </div>
      {(github || externalLink) && (
        <Stats>
          <span>Links</span>
          <ProjectLinks
            github={github}
            externalLink={externalLink}
            gradient={gradient}
          />
        </Stats>
      )}
    </StyledProjectStatsSection>
  );
};

type RolesProps = Required<Pick<Project, "roles">>;

const Roles: React.FC<RolesProps> = ({ roles }) => {
  const showResponsibilities = roles.every(
    (role) => role.responsibilities && role.responsibilities.length > 0
  );
  const header = showResponsibilities ? "Role & Team" : "Team";

  const responsibilityDetails = (role: ProjectRole) => {
    if (!role.responsibilities || !showResponsibilities) return "";
    return ` (${role.responsibilities.join(", ")})`;
  };

  return (
    <Stats>
      <span>{header}</span>
      <ul>
        {roles.map((role, i) => (
          <li key={`role-${i}-${role.name}`}>
            {role.name + responsibilityDetails(role)}
          </li>
        ))}
      </ul>
    </Stats>
  );
};

const GitHubIcon = <GitHub />;
const ExternalIcon = <ExternalLink />;

type ProjectLinksProps = Pick<Project, "github" | "externalLink" | "gradient">;

const ProjectLinks: React.FC<ProjectLinksProps> = ({
  github,
  externalLink,
  gradient,
}) => {
  return (
    <ul className="links">
      {github && (
        <li>
          <LinkButton link={github} icon={GitHubIcon}>
            Github
          </LinkButton>
        </li>
      )}
      {externalLink && (
        <li>
          <LinkButton link={externalLink} color={gradient} icon={ExternalIcon}>
            Visit Site
          </LinkButton>
        </li>
      )}
    </ul>
  );
};
