import { NavigateNext } from "@mui/icons-material";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const Banner = ({ page, subPage, chapter }) => {
  const { query, locale } = useRouter();
  const classes = useStyles();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");
  const [imageChap, setImageChap] = useState("");
  useEffect(() => {
    if (chapter && query.action === "learning") {
      loopImage(chapter);
    } else {
      setImageChap("");
    }
  }, [chapter, query]);

  function loopImage(params) {
    params.forEach((e) => {
      if (e.id.toString() === query.chapter) {
        setImageChap(e.index.toString());
      }
    });
  }

  function getLocal(locale) {
    const LOCALE = "";
    switch (locale) {
      case "th":
        LOCALE = "TH";
        break;
      case "mm":
        LOCALE = "MM";
        break;
      case "ls":
        LOCALE = "LA";
        break;
      case "cd":
        LOCALE = "KH";
        break;
      default:
        LOCALE = "TH";
        break;
    }
    return LOCALE
  }

  return (
    <Grid className={classes.banner_main} container>
      <Container sx={{ display: matches ? "" : "none" }}>
        <Grid sx={{ position: "absolute", top: 15, zIndex: 1 }} item>
          <Typography fontSize={16} display={"flex"} alignItems={"center"}>
            {t("banner-home")} <NavigateNext></NavigateNext>
            {subPage ? (
              <Fragment>
                {page}
                <NavigateNext></NavigateNext>
                <span style={{ color: "#2699FB" }}>{subPage}</span>
              </Fragment>
            ) : (
              <span style={{ color: "#2699FB" }}>{page}</span>
            )}
          </Typography>
        </Grid>
      </Container>
      {parseInt(imageChap) <= 8 && parseInt(imageChap) >= 1 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width="100%"
          alt="banner"
          // src={`/image/${locale}/AST_module_${
          //   locale === "mm" ? "MM" : "Thai"
          // }-0${imageChap}.png`}
          src={`/image/${locale}/Module_${imageChap}_${getLocal(locale)}.png`}
        ></img>
      ) : query.action === "preview" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width="100%"
          alt="banner"
          src={`/image/${locale}/Banner Benefit_${getLocal(locale)}.png`}
        ></img>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          width="100%"
          alt="banner"
          src={`/image/${locale}/AST_sub banner -01.png`}
        ></img>
      )}
    </Grid>
  );
};

export default Banner;

const useStyles = makeStyles({
  banner_main: {
    position: "relative",
  },
  banner_background: {
    width: "100%",
    height: "100%",
    // background:
    //   "transparent linear-gradient(180deg, #FFFFFF 0%, #F1F8FE 100%) 0% 0% no-repeat padding-box",
    position: "static",
    zIndex: -2,
  },
  banner_text: {
    position: "absolute",
    top: 100,
    left: 70,
  },
  banner_image: {
    position: "absolute",
    zIndex: -1,
    bottom: -7,
    right: 100,
  },
});
