import { MeasurementRect } from "hooks/useMeasure";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
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
