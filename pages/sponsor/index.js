import { Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import sponsorApi from "../../api/api_sponsor";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Home = () => {
  const [sponsor, setSponsor] = useState();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getSponsor();
  }, []);

  async function getSponsor() {
    const data = await sponsorApi.getSponsor();
    setSponsor(data.result);
  }
  function loopImage() {
    const rows = [];
    const count = sponsor ? sponsor.length : 0;
    for (let i = 0; i < count; i++) {
      sponsor &&
        rows.push(
          <Grid key={i} item xs={matches ? 2 : 6} sx={{ display: "flex" }}>
            <Link target="_blank" href={sponsor[i].link_ref} textAlign={"center"}>
              <img width={"70%"} src={`${path}${sponsor[i].file_path}`}></img>
            </Link>
          </Grid>
        );
    }
    return rows;
  }
  return (
    <Fragment>
      <Banner></Banner>
      <Grid mt={6} mb={15}>
        <Container>
          <Grid my={3} container justifyContent={"center"}>
            <Typography fontWeight={500} sx={{ fontSize: { xs: 28, sm: 32 } }}>
              {t("sponsor-text.title")}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {sponsor && loopImage()}
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
    //         ผู้ใหญ่ใจดี มอบโอกาส
    //         <br />
    //         สร้างการศึกษาไร้พรมแดน
    //       </Typography>
    //     </Container>
    //   </Grid> */}
    //   <Grid className={classes.banner_image} item>
    //     <img width={1310} src="/image/th/AST_sub banner -01.png"></img>
    //   </Grid>
    //   <div className={classes.banner_background}></div>
    // </Grid>
    <Grid>
      <img width="100%" src="/image/th/AST_sub banner -01.png"></img>
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
