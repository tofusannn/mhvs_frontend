import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Grid,
  Link,
  Typography,
  useMediaQuery,
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
import Count from "../api/api_count";
import sponsorApi from "../api/api_sponsor";
import Content from "../api/api_content";
import axios from "axios";
import auth from "../api/api_auth";
import DialogConsent from "../components/DialogConsent";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Home = () => {
  const { locale } = useRouter();
  const token = Cookies.get("token");
  //creating IP state
  const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    // console.log(res.data);
    setIP(res.data.IPv4);
    setLocationUser(res.data);
  };

  const setLocationUser = async (location) => {
    const payload = {
      lat: `${location.latitude}`,
      long: `${location.longitude}`,
    };
    const data = await auth.postLocation(payload);
    if (data.status) {
      console.log("success");
    }
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    token && getData();
  }, [token]);

  return (
    <Fragment>
      <Banner />
      <AboutUs locale={locale} />
      <Sponsor locale={locale} />
      <CountUser locale={locale} />
      <DialogConsent></DialogConsent>
    </Fragment>
  );
};

export default Home;

const Banner = () => {
  const classes = useStyles();
  const t = useTranslations();
  const { push, locale } = useRouter();
  const [token, setToken] = useState();
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, [token]);

  function changePage() {
    if (token) {
      push({ pathname: "/lesson", query: { action: "list" } });
    } else {
      push({ pathname: "/auth", query: { action: "register" } });
    }
  }

  return (
    <Grid sx={{ position: "relative", height: { xs: "25vh", sm: '55vh', md: "80vh" } }}>
      <Box sx={{ position: "absolute", width: "100%", zIndex: -1 }}>
        <Carousel
          height={matches ? "100vh" : "25vh"}
          autoPlay={true}
          indicators={false}
          cycleNavigation={true}
          navButtonsAlwaysVisible={false}
        >
          <img width="100%" src={`/image/${locale}/index.png`}></img>
          <img width="100%" src={`/image/${locale}/index2.png`}></img>
        </Carousel>
      </Box>
      {!token && (
        <Container>
          <Grid className={classes.banner_text}>
            <Button
              className={classes.buttonRegister}
              variant="contained"
              onClick={() => changePage()}
            >
              {t("started")}
            </Button>
          </Grid>
        </Container>
      )}
    </Grid>
  );
};

const AboutUs = ({ locale }) => {
  const t = useTranslations();
  const [content, setContent] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [youtube, setYoutube] = useState();
  const matches = useMediaQuery("(min-width:1324px)");
  const matches2 = useMediaQuery("(min-width:769px)");

  useEffect(() => {
    getContentList();
  }, []);

  async function getContentList() {
    const data = await Content.getContent();
    setContent(data.result);
  }

  function loopCard() {
    const data = [];
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = content ? content.length : 0;
    let sliderItems;
    if (matches) {
      sliderItems = count > 3 ? 3 : count;
    } else if (matches2) {
      sliderItems = count > 2 ? 2 : count;
    } else {
      sliderItems = count > 1 ? 1 : count;
    }
    for (let i = 1; i <= count; i++) {
      data.push(content[i - 1]);
    }
    for (let i = 0; i < count; i += sliderItems) {
      if (i % sliderItems === 0) {
        rows.push(
          <Grid
            key={i}
            sx={{ paddingLeft: { sm: 3 } }}
            container
            justifyContent={matches ? "start" : "center"}
            spacing={2}
          >
            {data.slice(i, i + sliderItems).map((items, index) => {
              return (
                <Grid key={index} item>
                  <CardMediaAboutUs
                    image={`${path}${items.file_path}`}
                    title={items.content_name}
                    detail={items.content_detail}
                    link={items.youtube_link}
                    setOpenModal={setOpenModal}
                    setYoutube={setYoutube}
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

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12} sm={3}>
          <Typography
            mb={1}
            sx={{ color: "#2DA373", fontSize: { xs: 20, md: 24 } }}
          >
            {t("about-us-text.about-us1")}
          </Typography>
          <Typography
            mb={1}
            sx={{ color: "#2DA373", fontSize: { xs: 44, md: 48 } }}
            fontWeight={500}
          >
            {t("about-us-text.about-us2")}
          </Typography>
          <Typography mb={3} sx={{ fontSize: { xs: 20, md: 24 } }}>
            {t("about-us-text.about-us3")}
          </Typography>
          <Link sx={{ display: { xs: "none", sm: "block" } }}>
            <img src="/icon/arrow-right-green.svg"></img>
          </Link>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Carousel
            height={matches ? 450 : 400}
            autoPlay={false}
            indicators={false}
            cycleNavigation={false}
            navButtonsAlwaysVisible={true}
          >
            {loopCard()}
          </Carousel>
        </Grid>
      </Grid>
      <Dialog maxWidth={"xl"} open={openModal} onClose={handleClose}>
        <Card>
          <CardContent>
            <iframe
              height={matches ? "576" : "300"}
              width={matches ? "1080" : "260"}
              src={youtube}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </CardContent>
        </Card>
      </Dialog>
    </Container>
  );
};

const Sponsor = ({ locale }) => {
  const classes = useStyles();
  const [sponsor, setSponsor] = useState();
  const { push } = useRouter();
  const t = useTranslations();
  const message = locale === "th" ? th : en;
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
            <Link
              target="_blank"
              href={sponsor[i].link_ref}
              textAlign={"center"}
            >
              <img width={"70%"} src={`${path}${sponsor[i].file_path}`}></img>
            </Link>
          </Grid>
        );
    }
    return rows;
  }

  return (
    <Fragment>
      <div className={classes.sponsor_main}>
        <Container>
          <Grid
            mb={5}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography fontWeight={500} sx={{ fontSize: { xs: 28, sm: 32 } }}>
              {t("sponsor-text.title")}
            </Typography>
            <Link
              component="button"
              onClick={() => push("/sponsor")}
              sx={{
                marginLeft: 1,
                color: "#2DA373",
                textDecorationColor: "#2DA373",
                fontSize: { xs: 28, sm: 32 },
              }}
            >
              {t("sponsor-text.button")}
            </Link>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
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
  const [pageCount, setPageCount] = useState();
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getPageCount();
  }, []);

  async function getPageCount() {
    const data = await Count.getCount();
    setPageCount(data.result);
  }

  function loopCard() {
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["count-user-text"]).length;

    for (let i = 0; i < count; i++) {
      rows.push(
        <Grid key={i} item xs={12} sm={4}>
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
                    {pageCount &&
                      pageCount[t(`count-user-text.count-user${i + 1}.count`)]}
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
    position: "relative",
    height: "90vh",
  },
  banner_text: {
    position: "absolute",
    zIndex: 0,
    top: "calc(75vh - 25vh)",
    left: "calc(35vh - 25vh)",
    // "@media (min-width: 2048px)": {
    //   top: 670,
    // },
    "@media (max-width: 1200px)": {
      top: "calc(90vh - 45vh)",
      left: "calc(90vh - 82vh)",
    },
    "@media (max-width: 850px)": {
      top: "calc(80vh - 45vh)",
      left: "calc(89vh - 82vh)",
    },
    "@media (max-width: 500px)": {
      top: "calc(25vh - 7vh)",
      left: "calc(25vh - 21vh)",
    },
    "@media (max-width: 400px)": {
      top: "calc(25vh - 9vh)",
      left: "calc(25vh - 22vh)",
    },
    "@media (max-width: 350px)": {
      top: "calc(25vh - 11vh)",
      left: "calc(25vh - 22vh)",
    },
  },
  banner_image: {
    position: "absolute",
    zIndex: -1,
  },
  buttonRegister: {
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
    "@media (max-width: 600px)": {
      fontSize: 10,
      width: "100%",
      height: 20,
      minHight: 10,
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
