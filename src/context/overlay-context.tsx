import { createContext, useContext, ReactNode, useState } from "react";

interface OverlayContextType {
  blockHeader: boolean;
  setBlockHeader: (block: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [blockHeader, setBlockHeader] = useState(false);
  return (
    <OverlayContext.Provider value={{ blockHeader, setBlockHeader }}>
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
