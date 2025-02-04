import { createContext, useContext, ReactNode, useState } from "react";

interface OverlayContextType {
  blockHeader: boolean;
  setBlockHeader: (block: boolean) => void;
  preRunPageTransition: boolean;
  setPreRunPageTransition: (block: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [blockHeader, setBlockHeader] = useState(false);
  const [preRunPageTransition, setPreRunPageTransition] = useState(false);
  return (
    <OverlayContext.Provider
      value={{
        blockHeader,
        setBlockHeader,
        preRunPageTransition,
        setPreRunPageTransition,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
