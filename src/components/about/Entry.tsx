import { rgba } from "polished";
import React from "react";
import styled from "styled-components";

export const Entries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 1rem;
    justify-content: space-between;

    h3 {
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      font-weight: 500;
      letter-spacing: -0.02em;
      color: var(--text1);
    }

    .meta {
      font-family: var(--jakarta);
      font-size: 0.9375rem;
      color: var(--text3);
      white-space: nowrap;
    }
  }

  p {
    font-family: var(--jakarta);
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
    color: ${({ theme }) => rgba(theme.text2, 0.85)};
    max-width: 62ch;

    b {
      font-weight: 600;
      color: var(--text2);
    }
  }
`;

interface EntryProps {
  title: string;
  meta: string;
  children?: React.ReactNode;
}

export const Entry: React.FC<EntryProps> = ({ title, meta, children }) => (
  <StyledEntry>
    <div className="head">
      <h3>{title}</h3>
      <span className="meta">{meta}</span>
    </div>
    {children}
  </StyledEntry>
);
