import { PageLoader } from "components/layout/PageLoader";
import { OverlayProvider } from "context/overlay-context";
import { useDevice } from "hooks";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, POPPINS, theme } from "styles";
import { JAKARTA } from "styles/fonts";

export default function App({ Component, pageProps, router }: AppProps) {
  const { isTouchDevice } = useDevice();
  const usedTheme = { ...theme, isTouch: isTouchDevice };
  return (
    <>
      <Head>
        <title>Florian Kulig | Portfolio</title>
        <meta name="description" content="Portfolio of Florian Kulig" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest"></link>
      </Head>
      <style jsx global>{`
        :root {
          --poppins: ${POPPINS.style.fontFamily};
          --jakarta: ${JAKARTA.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={usedTheme}>
        <OverlayProvider>
          <GlobalStyle />
          <PageLoader router={router}>
            <Component {...pageProps} />
          </PageLoader>
        </OverlayProvider>
      </ThemeProvider>
    </>
  );
}
