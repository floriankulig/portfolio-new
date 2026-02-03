import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface DeviceInfo {
  isTouchDevice: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  prefersReducedMotion: boolean;
  browserName: string;
  operatingSystem: string;
  isLowPowerMode: boolean | null;
}

export const useDevice = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isTouchDevice: false,
    isDesktop: false,
    isMobile: false,
    isTablet: false,
    isLandscape: false,
    screenWidth: 0,
    screenHeight: 0,
    devicePixelRatio: 1,
    prefersReducedMotion: false,
    browserName: "",
    operatingSystem: "",
    isLowPowerMode: null,
  });

  // Using MotionValues for smooth animations when screen dimensions change
  const screenWidthMotion = useMotionValue(0);
  const screenHeightMotion = useMotionValue(0);

  // Spring animation for smooth transitions
  const smoothScreenWidth = useSpring(screenWidthMotion, {
    stiffness: 100,
    damping: 30,
  });

  const smoothScreenHeight = useSpring(screenHeightMotion, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const updateDeviceInfo = async () => {
      // Check if primary input is touch (not mouse/trackpad)
      // Using media queries is more reliable than checking maxTouchPoints,
      // which can incorrectly report touch capability on Windows desktops
      const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        ("ontouchstart" in window && navigator.maxTouchPoints > 0);

      // Screen dimensions
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Update motion values
      screenWidthMotion.set(screenWidth);
      screenHeightMotion.set(screenHeight);

      // Device type detection
      const isMobile =
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
          navigator.userAgent,
        );
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
      const isDesktop = !isMobile && !isTablet;

      // Browser and OS detection
      const browserName = detectBrowser();
      const operatingSystem = detectOS();

      // Prefers reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Battery status
      let isLowPowerMode = null;
      try {
        if ("getBattery" in navigator) {
          const battery: any = await (navigator as any).getBattery();
          isLowPowerMode = battery.charging;
        }
      } catch (error) {
        console.warn("Battery API not supported");
      }

      setDeviceInfo({
        isTouchDevice,
        isDesktop,
        isMobile,
        isTablet,
        isLandscape: screenWidth > screenHeight,
        screenWidth,
        screenHeight,
        devicePixelRatio: window.devicePixelRatio,
        prefersReducedMotion,
        browserName,
        operatingSystem,
        isLowPowerMode,
      });
    };

    // Initial update
    updateDeviceInfo();

    // Event listeners
    const handleResize = () => {
      updateDeviceInfo();
    };

    const handleOrientationChange = () => {
      updateDeviceInfo();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [screenHeightMotion, screenWidthMotion]);

  // Helper functions
  const detectBrowser = (): string => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    if (ua.includes("Opera")) return "Opera";
    return "Unknown";
  };

  const detectOS = (): string => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "MacOS";
    if (platform.includes("linux")) return "Linux";
    if (platform.includes("ios")) return "iOS";
    if (platform.includes("android")) return "Android";
    return "Unknown";
  };

  return {
    ...deviceInfo,
    smoothScreenWidth,
    smoothScreenHeight,
  };
};
