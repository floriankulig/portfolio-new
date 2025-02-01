import { Poppins, Plus_Jakarta_Sans } from "next/font/google";

const POPPINS = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--poppins",
});
const JAKARTA = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--jakarta",
});

export { POPPINS, JAKARTA };
