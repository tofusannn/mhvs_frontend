import { Fragment } from "react";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import en from "../messages/en.json";
import th from "../messages/th.json";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const Footer = (props) => {
  const { locale } = props;
  const router = useRouter();
  const classes = useStyles();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Fragment>
      <div className={classes.footer_main}>
        <Container>
          <Grid mb={5}>
            <Typography fontWeight={500} fontSize={45} color="white">
              AORSORTOR Online
            </Typography>
          </Grid>
          <Grid container alignItems={"start"} justifyContent={"space-between"}>
            <Grid item xs={12} sm={3} sx={{ paddingBottom: { xs: 3, sm: 0 } }}>
              <Typography fontWeight={500} fontSize={16} color="white">
                {t("footer-text.footer1.title")}
              </Typography>
              <Typography fontSize={16} color="white">
                {t("footer-text.footer1.des")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} sx={{ paddingBottom: { xs: 3, sm: 0 } }}>
              <Typography fontWeight={500} fontSize={16} color="white">
                {t("footer-text.footer2.title")}
              </Typography>
              <Typography fontSize={16} color="white">
                {t("footer-text.footer2.des")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ paddingBottom: { xs: 3, sm: 0 } }}>
              <Typography mb={1} fontWeight={500} fontSize={16} color="white">
                {t("footer-text.footer3.title")}
              </Typography>
              <TextField
                className={classes.input_subscribe}
                placeholder="E-mail"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <Button className={classes.button_subscribe}>
                      subscribe
                    </Button>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 5 }} color="white"></Divider>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} sx={{ paddingBottom: { xs: 3, sm: 0 } }}>
              <Typography mb={1} fontWeight={500} fontSize={16} color="white">
                ©2022 Aorsortor Online, All Rights Reserved.
              </Typography>
              <Link
                sx={{ color: "#ffffff", fontSize: 16, marginRight: 3 }}
                href="#"
              >
                Privacy Policy
              </Link>
              <Link sx={{ color: "#ffffff", fontSize: 16 }} href="#">
                Terms of Use
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ paddingBottom: { xs: 3, sm: 0 } }}
              textAlign={matches ? "end" : "start"}
            >
              <Link
                target="_blank"
                href="https://www.facebook.com/aorsortor.online"
              >
                <IconButton sx={{ color: "#ffffff" }}>
                  <Facebook></Facebook>
                </IconButton>
              </Link>
              <Link
                target="_blank"
                href="https://www.youtube.com/channel/UC1V-Vvkf9hwtRJe5oEd-7DQ"
              >
                <IconButton sx={{ color: "#ffffff" }}>
                  <YouTube></YouTube>
                </IconButton>
              </Link>
              <Link target="_blank" href="mailto: aorsortor.onlineth@gmail.com">
                <IconButton sx={{ color: "#ffffff" }}>
                  <Mail></Mail>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

export default Footer;

const useStyles = makeStyles({
  footer_main: {
    background: "#0076FF",
    padding: "45px 0px",
  },
  input_subscribe: {
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "& .MuiInputBase-root": {
      padding: 0,
    },
  },
  button_subscribe: {
    width: 120,
    borderRadius: 0,
    background: "#AEF9EC",
    color: "#0076FF",
    textTransform: "none",
    "&:hover": {
      background: "#AEF9EC",
      color: "#0076FF",
      textTransform: "none",
    },
  },
});
