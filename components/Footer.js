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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import en from "../messages/en.json";
import th from "../messages/th.json";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = (props) => {
  const { locale } = props;
  const router = useRouter();
  const classes = useStyles();
  const t = useTranslations();

  return (
    <Fragment>
      <div className={classes.footer_main}>
        <Container>
          <Grid mb={5}>
            <Typography fontWeight={700} fontSize={45} color="white">
              MHVS Online
            </Typography>
          </Grid>
          <Grid container alignItems={"start"} justifyContent={"space-between"}>
            <Grid item xs={3}>
              <Typography fontSize={16} color="white">
                <Typography fontWeight={700}>
                  {t("footer-text.footer1.title")}
                </Typography>
                {t("footer-text.footer1.des")}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={16} color="white">
                <Typography fontWeight={700}>{t("footer-text.footer2.title")}</Typography>
                {t("footer-text.footer2.des")}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography mb={1} fontWeight={700} fontSize={16} color="white">
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
            <Grid item xs={6}>
              <Typography mb={1} fontWeight={700} fontSize={16} color="white">
                ©2021 MHVS Online, All Rights Reserved.
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
            <Grid item xs={6} textAlign="end">
              <IconButton sx={{ color: "#ffffff" }}>
                <Instagram></Instagram>
              </IconButton>
              <IconButton sx={{ color: "#ffffff" }}>
                <Facebook></Facebook>
              </IconButton>
              <IconButton sx={{ color: "#ffffff" }}>
                <Twitter></Twitter>
              </IconButton>
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
