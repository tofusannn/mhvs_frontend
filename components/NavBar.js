import { NotificationsOutlined } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment } from "react";
import en from "../messages/en.json";
import th from "../messages/th.json";

const mock_token = "pppppppp";

const NavBar = (props) => {
  const { locale } = props;
  const router = useRouter();
  const classes = useStyles();
  const t = useTranslations();

  function loopMenuBar() {
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["navbar-menu"]).length;
    for (let i = 1; i <= count; i++) {
      if (mock_token && i === 5) return rows;
      rows.push(
        <Grid key={i} item xs={2}>
          <Link sx={{ color: "#ffffff" }} href={t(`navbar-menu.menu${i}.link`)}>
            {t(`navbar-menu.menu${i}.title`)}
          </Link>
        </Grid>
      );
    }
    return rows;
  }

  function translationClick(e) {
    const locale = e.target.name;
    router.push("/", "/", { locale: locale });
  }

  return (
    <AppBar sx={{ backgroundColor: "#0076FF" }} position="static">
      <Container>
        <Toolbar disableGutters>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item xs={3}>
              <img src="/icon/logo.svg"></img>
            </Grid>
            <Grid
              xs={5}
              item
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {loopMenuBar()}
              {mock_token ? (
                <Grid item container xs={3}>
                  <Divider
                    orientation="vertical"
                    color="white"
                    flexItem
                  ></Divider>
                  <IconButton>
                    <NotificationsOutlined></NotificationsOutlined>
                  </IconButton>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    className={classes.buttonRegister}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    {t("button-register-text")}
                  </Button>
                </Grid>
              )}
            </Grid>

            {/* <Grid item>
              <Button
                name={locale === "th" ? "en" : "th"}
                className={classes.buttonTranslation}
                variant="outlined"
                fullWidth
                size="small"
                onClick={translationClick}
              >
                {locale === "th" ? "EN" : "TH"}
              </Button>
            </Grid> */}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

const useStyles = makeStyles({
  buttonRegister: {
    width: 200,
    color: "#ffffff",
    borderRadius: 20,
    borderColor: "#ffffff",
    textTransform: "none",
    fontWeight: 700,
    "&:hover": {
      borderColor: "#ffffff",
    },
  },
  buttonTranslation: {
    color: "#ffffff",
    borderRadius: 20,
    borderColor: "#ffffff",
    fontWeight: 700,
    "&:hover": {
      borderColor: "#ffffff",
    },
  },
});
