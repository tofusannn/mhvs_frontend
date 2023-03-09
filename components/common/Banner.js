import { NavigateNext } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Banner = ({ page, subPage }) => {
  const { query, locale } = useRouter();
  const classes = useStyles();
  const t = useTranslations();
  return (
    <Grid className={classes.banner_main} container>
      <Container>
        <Grid sx={{ position: "absolute", top: 15 }} item>
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
      {locale === "mm" ? (
        <img width="100%" src={`/image/th/AST_sub banner -01.png`}></img>
      ) : (
        <>
          {parseInt(query.chapter) <= 9 && parseInt(query.chapter) >= 1 ? (
            <img
              width="100%"
              src={`/image/${locale}/AST_sub banner -0${parseInt(
                query.chapter
              )}.png`}
            ></img>
          ) : (
            <img
              width="100%"
              src={`/image/${locale}/AST_sub banner -01.png`}
            ></img>
          )}
        </>
      )}
    </Grid>
  );
};

export default Banner;

const useStyles = makeStyles({
  banner_main: {
    height: "55vh",
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
