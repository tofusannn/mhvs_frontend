import { Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import sponsorApi from "../../api/api_sponsor";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Home = () => {
  const [sponsor, setSponsor] = useState();

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
          <Grid key={i} item xs={2}>
            <Link target="_blank" href={sponsor[i].link_ref}>
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
            <Typography fontWeight={500} fontSize={32}>
              ผู้ใหญ่ใจดี
            </Typography>
          </Grid>
          <Grid container spacing={2} alignItems={"center"}>
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
    <Grid
      className={classes.banner_main}
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid className={classes.banner_text} item>
        <Container>
          <Typography fontWeight={500} fontSize={60}>
            ผู้ใหญ่ใจดี มอบโอกาส
            <br />
            สร้างการศึกษาไร้พรมแดน
          </Typography>
        </Container>
      </Grid>
      <Grid className={classes.banner_image} item>
        <img width={850} src="/image/banner_sub.svg"></img>
      </Grid>
      <div className={classes.banner_background}></div>
    </Grid>
  );
};

const useStyles = makeStyles({
  banner_main: {
    height: "55vh",
    position: "relative",
  },
  banner_background: {
    width: "100%",
    height: "100%",
    background:
      "transparent linear-gradient(180deg, #FFFFFF 0%, #F1F8FE 100%) 0% 0% no-repeat padding-box",
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
