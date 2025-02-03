import { useEffect, useState } from "react";

interface ViewportData {
  viewPortHeight: number;
  viewPortWidth: number;
}

type ViewportOrientation = "landscape" | "portrait";

type UseViewPortReturn = {
  isMobile: boolean;
  viewport: ViewportData;
  orientation: ViewportOrientation;
};

export const useViewport = (
  breakpoint: number = 1080,
  defaultIsMobile: boolean = true
): UseViewPortReturn => {
  const [viewport, setViewport] = useState<ViewportData>({
    viewPortHeight: 1080,
    viewPortWidth: defaultIsMobile ? breakpoint - 120 : 1920,
  });

  const { viewPortWidth, viewPortHeight } = viewport;
  const isMobile = viewPortWidth <= breakpoint;
  const orientation: ViewportOrientation =
    viewPortHeight > viewPortWidth ? "portrait" : "landscape";

  const onResize = (e: any) => {
    if (!e.currentTarget) return;
    setViewport({
      viewPortHeight: e.currentTarget.innerHeight,
      viewPortWidth: e.currentTarget.innerWidth,
    });
  };

  useEffect(() => {
    // set this as an initial value without having to resize first
    if (window) {
      setViewport({
        viewPortHeight: window.innerHeight,
        viewPortWidth: window.innerWidth,
      });
    }

    // handle on resize
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return { isMobile, viewport, orientation };
};
