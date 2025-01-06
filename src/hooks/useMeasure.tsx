import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";

export interface MeasurementRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
}

const defaultMeasurements: MeasurementRect = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0,
};

export function useMeasure<T extends HTMLElement>() {
  const [rect, setRect] = useState<MeasurementRect>(defaultMeasurements);
  const ref = useRef<T | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const measure = useCallback(() => {
    if (!ref.current) return;

    const measurements = ref.current.getBoundingClientRect();

    // Prüfen ob sich die Werte tatsächlich geändert haben
    if (
      measurements.width !== rect.width ||
      measurements.height !== rect.height ||
      measurements.top !== rect.top ||
      measurements.left !== rect.left
    ) {
      setRect({
        width: measurements.width,
        height: measurements.height,
        top: measurements.top,
        left: measurements.left,
        right: measurements.right,
        bottom: measurements.bottom,
        x: measurements.x,
        y: measurements.y,
      });
    }
  }, [rect]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // ResizeObserver für Größenänderungen
    resizeObserverRef.current = new ResizeObserver((entries) => {
      if (!entries.length) return;
      measure();
    });

    resizeObserverRef.current.observe(element);

    // Intersection Observer für Position/Sichtbarkeit
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.length) return;
        measure();
      },
      {
        threshold: [0, 1],
      }
    );

    intersectionObserver.observe(element);

    // Event Listener für Scroll und Layout-Änderungen
    // const documentElement = document.documentElement;
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    // Initial messen
    requestAnimationFrame(() => {
      measure();
    });

    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      resizeObserverRef.current?.disconnect();
      intersectionObserver.disconnect();
    };
  }, [measure]);

  return [rect, ref] as const;
}
