import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledHeader = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 8vw, 8rem) 0;
  letter-spacing: 2%;
  font-size: 14px;
  font-family: var(--jakarta);
  font-weight: 500;
`;

const StyledMeta = styled.div`
  color: var(--text3);

  span {
    font-weight: 600;
    width: 2.5rem;
    text-align: right;
    color: var(--text1);
  }
`;

export const Header: React.FC = () => {
  const [date, setDate] = useState(new Date("2004-05-27T00:00:00"));
  const dateString = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const time = dateString.split(" ")[0];
  const dateMeridiem = dateString.split(" ")[1];

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledHeader>
      <div>Florian Kulig</div>
      <StyledMeta>
        Bavaria, Germany <span>{time}</span> {dateMeridiem}
      </StyledMeta>
    </StyledHeader>
  );
};
