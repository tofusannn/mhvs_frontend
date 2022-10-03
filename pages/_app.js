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
import store from "../redux/store";
import { Provider } from "react-redux";

const messages = {
  th,
  en,
};

function MyApp({ Component, pageProps }) {
  const { locale, pathname } = useRouter();

  function checkPage() {
    if (pathname === "/auth") return false;
    return true;
  }

  return (
    <Fragment>
      <Head>
        <title>Mhvs - Online</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextIntlProvider locale={locale} messages={messages[locale]}>
        <CssBaseline></CssBaseline>
        <Provider store={store}>
          {checkPage() ? (
            <Fragment>
              <NavBar locale={locale}></NavBar>
              <Component {...pageProps} />
              <Footer></Footer>
            </Fragment>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </NextIntlProvider>
    </Fragment>
  );
}

export default MyApp;
