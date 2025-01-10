import { rgba } from "polished";
import React from "react";
import styled from "styled-components";

interface InlineImageBubbleProps {
  image: string;
  alt?: string;
  aspectRatio?: number;
}

const InlineImageWrapper = styled.div<{ $aspectRatio: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1em;
  border-radius: 0.5em;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.125);
  border: 1.5px solid ${rgba("white", 0.05)};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const InlineImageBubble: React.FC<InlineImageBubbleProps> = ({
  image,
  alt = "Design Image",
  aspectRatio = 2,
}) => {
  return (
    <InlineImageWrapper $aspectRatio={aspectRatio}>
      <Image src={image} alt={alt} />
    </InlineImageWrapper>
  );
};
