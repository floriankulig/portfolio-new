import { useState, useEffect, useRef } from "react";

export interface MeasurementRect {
  width: number;
  height: number;
  top: number;
  left: number;
}

export const useMeasure = () => {
  const [rect, setRect] = useState<MeasurementRect>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node && node) {
      const measure = () => {
        const { width, height, top, left } = node.getBoundingClientRect();
        console.log({ width, height, top, left });
        setRect({ width, height, top, left });
      };

      measure();
      window.addEventListener("resize", measure);

      return () => {
        window.removeEventListener("resize", measure);
      };
    }
  }, []);

  return [rect, ref] as const;
};
