import React from "react";
import styled from "styled-components";

const StyledMoreInfoComingSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  h3 {
    font-size: clamp(2rem, 10svw, 3rem);
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 1;
    color: var(--text2);
    text-align: center;
  }

  p {
    text-align: center;
    color: var(--text3);
    font-family: var(--jakarta);

    a {
      color: var(--text2);
      text-decoration: underline;
    }
  }
`;
interface MoreInfoComingProps {
  stillDeveloping?: boolean;
  githubLink?: string;
  externalLink?: string;
}
export const MoreInfoComing: React.FC<MoreInfoComingProps> = ({
  stillDeveloping,
  githubLink,
  externalLink,
}) => {
  return (
    <StyledMoreInfoComingSection>
      <h3>More Information Coming Soon...</h3>
      {stillDeveloping && <p>This project is still being developed.</p>}
      {!!githubLink && (
        <p>
          For now, read more in the{" "}
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            projects&apos; documentation
          </a>
          {externalLink && !externalLink.endsWith(".pdf") ? (
            <>
              &nbsp; or &nbsp;
              <a href={externalLink} target="_blank" rel="noopener noreferrer">
                explore the app.
              </a>
            </>
          ) : (
            "."
          )}
        </p>
      )}
    </StyledMoreInfoComingSection>
  );
};
