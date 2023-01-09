import { Poppins, Inter } from "@next/font/google";

const POPPINS = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--poppins",
});
const INTER = Inter({ subsets: ["latin"], variable: "--inter" });

export { POPPINS, INTER };
