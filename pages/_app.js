import { useRouter } from "next/router";
import { NextIntlProvider } from "next-intl";
import { Fragment } from "react";
import th from "../messages/th.json";
import en from "../messages/en.json";
import Head from "next/head";
import NavBar from "../components/NavBar";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import Footer from "../components/Footer";

const messages = {
  th,
  en,
};

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextIntlProvider locale={locale} messages={messages[locale]}>
        <CssBaseline></CssBaseline>
        <NavBar locale={locale}></NavBar>
        <Component {...pageProps} />
        <Footer></Footer>
      </NextIntlProvider>
    </Fragment>
  );
}

export default MyApp;
