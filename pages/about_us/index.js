import { Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import sponsorApi from "../../api/api_sponsor";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Home = () => {
  const t = useTranslations();

  return (
    <Fragment>
      <Banner></Banner>
      <Grid mt={6} mb={15}>
        <Container>
          <Grid my={3}>
            <Typography fontWeight={500} fontSize={32}>
              {t("about-text.title")}
            </Typography>
            <Typography fontWeight={500} fontSize={24}>
              {t("about-text.subtitle")}
            </Typography>
            <Typography mt={3}>{t("about-text.description")}</Typography>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  );
};

export default Home;

const Banner = () => {
  const classes = useStyles();
  const t = useTranslations();
  return (
    // <Grid
    //   className={classes.banner_main}
    //   container
    //   alignItems={"center"}
    //   justifyContent={"center"}
    // >
    //   {/* <Grid className={classes.banner_text} item>
    //     <Container>
    //       <Typography fontWeight={500} fontSize={60}>
    //         aorsortor.online
    //       </Typography>
    //     </Container>
    //   </Grid> */}
    //   <Grid className={classes.banner_image} item>
    //     <img width={1310} src="/image/AST_About Us.png"></img>
    //   </Grid>
    //   <div className={classes.banner_background}></div>
    // </Grid>
    <Grid>
      <img width="100%" src="/image/AST_About Us.png"></img>
    </Grid>
  );
};

const useStyles = makeStyles({
  banner_main: {
    height: "50vh",
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
