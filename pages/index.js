import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { makeStyles } from "@mui/styles";
import CardMediaAboutUs from "../components/aboutUs/CardMediaAboutUs";
import en from "../messages/en.json";
import th from "../messages/th.json";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Home = () => {
  const { locale } = useRouter();

  return (
    <Fragment>
      <Banner />
      <AboutUs locale={locale} />
      <Sponsor locale={locale} />
      <CountUser locale={locale} />
    </Fragment>
  );
};

export default Home;

const Banner = () => {
  const classes = useStyles();
  const t = useTranslations();
  const { push } = useRouter();
  const [token, setToken] = useState();
  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, [token]);

  function changePage() {
    if (token) {
      push({ pathname: "/lesson", query: { part: "prologue" } });
    } else {
      push({ pathname: "/auth", query: { action: "register" } });
    }
  }

  return (
    <Grid
      className={classes.banner_main}
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid className={classes.banner_text} item>
        <Container>
          <Typography mb={1} fontWeight={500} fontSize={32}>
            {t("banner-text.banner1")}
          </Typography>
          <Typography mb={1} fontWeight={500} fontSize={72}>
            {t("banner-text.banner2")}
          </Typography>
          <Typography mb={1} fontWeight={500} fontSize={48}>
            {t("banner-text.banner3")}
          </Typography>
          <Button
            className={classes.buttonRegister}
            variant="contained"
            onClick={() => changePage()}
          >
            {token ? "เริ่มต้นเลย" : t("button-register-text")}
          </Button>
        </Container>
      </Grid>
      <Grid className={classes.banner_image} item>
        <img width={1366} src="/image/banner.svg"></img>
      </Grid>
      <div className={classes.banner_background}></div>
    </Grid>
  );
};

const AboutUs = ({ locale }) => {
  const t = useTranslations();

  function loopCard() {
    const data = [];
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["about-us-card-text"]).length;
    const sliderItems = count > 3 ? 3 : count;
    for (let i = 1; i <= count; i++) {
      data.push(message["about-us-card-text"][`card${i}`]);
    }
    for (let i = 0; i < count; i += sliderItems) {
      if (i % sliderItems === 0) {
        rows.push(
          <Grid key={i} pl={3} container spacing={2}>
            {data.slice(i, i + sliderItems).map((items, index) => {
              return (
                <Grid key={index} item>
                  <CardMediaAboutUs
                    image={items.image}
                    title={items.title}
                    link={items.link}
                  ></CardMediaAboutUs>
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }
    return rows;
  }

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item xs={3}>
          <Typography mb={1} sx={{ color: "#2DA373" }} fontSize={24}>
            {t("about-us-text.about-us1")}
          </Typography>
          <Typography
            mb={1}
            sx={{ color: "#2DA373" }}
            fontWeight={500}
            fontSize={48}
          >
            {t("about-us-text.about-us2")}
          </Typography>
          <Typography mb={3} fontSize={24}>
            {t("about-us-text.about-us3")}
          </Typography>
          <Link href="#">
            <img src="/icon/arrow-right-green.svg"></img>
          </Link>
        </Grid>
        <Grid item xs={9}>
          <Carousel
            height={450}
            autoPlay={false}
            indicators={false}
            cycleNavigation={false}
            navButtonsAlwaysVisible={true}
          >
            {loopCard()}
          </Carousel>
        </Grid>
      </Grid>
    </Container>
  );
};

const Sponsor = ({ locale }) => {
  const classes = useStyles();
  const t = useTranslations();

  function loopImage() {
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["sponsor-list"]).length;
    for (let i = 0; i < count; i++) {
      rows.push(
        <Grid key={i} item xs={2}>
          <img width={"100%"} src={t(`sponsor-list.sponsor${i + 1}`)}></img>
        </Grid>
      );
    }
    return rows;
  }

  return (
    <Fragment>
      <div className={classes.sponsor_main}>
        <Container>
          <Grid mb={5} container justifyContent={"center"}>
            <Typography fontWeight={500} fontSize={32}>
              ผู้สนับสนุนใจดี{" "}
              <Link
                href="#"
                style={{ color: "#2DA373", textDecorationColor: "#2DA373" }}
              >
                ดูทั้งหมด
              </Link>
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {loopImage()}
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

const CountUser = ({ locale }) => {
  const classes = useStyles();
  const t = useTranslations();

  function loopCard() {
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["count-user-text"]).length;
    for (let i = 0; i < count; i++) {
      rows.push(
        <Grid key={i} item xs={4}>
          <Card className={classes.count_user_card}>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <img src={t(`count-user-text.count-user${i + 1}.icon`)}></img>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ textAlign: "right", alignSelf: "center" }}
                >
                  <Typography fontSize={24}>
                    {t(`count-user-text.count-user${i + 1}.title`)}
                  </Typography>
                  <Typography fontWeight={500} fontSize={38}>
                    {t(`count-user-text.count-user${i + 1}.count`)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return rows;
  }
  return (
    <Fragment>
      <Container className={classes.count_user_main}>
        <Grid container spacing={3}>
          {loopCard()}
        </Grid>
      </Container>
    </Fragment>
  );
};

const useStyles = makeStyles({
  banner_main: {
    height: "100vh",
    position: "relative",
  },
  banner_background: {
    width: "100%",
    height: "90vh",
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
    top: -100,
    right: 0,
  },
  buttonRegister: {
    marginTop: 20,
    width: 200,
    color: "#ffffff",
    borderRadius: 100,
    borderColor: "#ffffff",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 18,
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    "&:hover": {
      borderColor: "#ffffff",
    },
  },
  sponsor_main: {
    paddingTop: 50,
    paddingBottom: 50,
    background: "#F1F8FE",
  },
  count_user_main: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  count_user_card: {
    boxShadow: "10px 20px 60px #12121214",
  },
});
