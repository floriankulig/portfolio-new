import { useEffect, useState } from "react";

interface ViewportData {
  viewPortHeight: number;
  viewPortWidth: number;
}

type ViewportOrientation = "landscape" | "portrait";

export const useViewport = (
  breakpoint: number = 1080,
  def: boolean = true
): {
  isMobile: boolean;
  viewport: ViewportData;
  orientation: ViewportOrientation;
} => {
  const [isMobile, setIsMobile] = useState<boolean>(def);
  const [viewport, setViewport] = useState<ViewportData>({
    viewPortHeight: window?.innerHeight,
    viewPortWidth: window?.innerWidth,
  });
  const [orientation, setOrientation] =
    useState<ViewportOrientation>("landscape");

  const onResize = (e: any) => {
    if (!e.currentTarget) return;
    setViewport({
      viewPortHeight: e.currentTarget.innerHeight,
      viewPortWidth: e.currentTarget.innerWidth,
    });
    setOrientation(
      e.currentTarget.innerHeight > e.currentTarget.innerWidth
        ? "landscape"
        : "portrait"
    );
    if (e.currentTarget.innerWidth > breakpoint) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    // set this as an initial value without having to resize first
    setIsMobile(window.innerWidth <= breakpoint);

    // handle on resize
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return { isMobile, viewport, orientation };
};
