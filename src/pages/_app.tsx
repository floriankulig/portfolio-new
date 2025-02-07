import { PageLoader } from "components/layout/PageLoader";
import { OverlayProvider } from "context/overlay-context";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, POPPINS, theme } from "styles";
import { JAKARTA } from "styles/fonts";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Florian Kulig | Portfolio</title>
        <meta name="description" content="Portfolio of Florian Kulig" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        :root {
          --poppins: ${POPPINS.style.fontFamily};
          --jakarta: ${JAKARTA.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
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
