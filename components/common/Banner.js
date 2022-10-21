import { NavigateNext } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

const Banner = ({ page, subPage, hideImage }) => {
  const classes = useStyles();
  const t = useTranslations();
  return (
    <Grid className={!hideImage ? classes.banner_main : ""} container>
      <Grid
        sx={
          !hideImage
            ? { position: "absolute", top: 40, left: 70 }
            : { justifyContent: "start", marginTop: 5, marginLeft: 9 }
        }
        item
      >
        <Container>
          <Typography fontSize={16} display={"flex"} alignItems={"center"}>
            หน้าแรก <NavigateNext></NavigateNext>
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
        </Container>
      </Grid>
      {!hideImage && (
        <Fragment>
          <Grid className={classes.banner_text} item>
            <Container>
              <Typography mb={1} fontWeight={500} fontSize={72}>
                {t("banner-text.banner2")}
              </Typography>
              <Typography mb={3} fontWeight={500} fontSize={48}>
                {t("banner-text.banner3")}
              </Typography>
              <Typography fontWeight={500} fontSize={16}>
                ขณะที่ผู้คนทั่วโลกกำลังใช้ความระมัดระวังในการปกป้องตนเอง
                ครอบครัว และชุมชน
                <br />
                จากโรคไวรัสโคโรน่า (โควิด-19)
              </Typography>
            </Container>
          </Grid>
          <Grid className={classes.banner_image} item>
            <img width={850} src="/image/banner_sub.svg"></img>
          </Grid>
          <div className={classes.banner_background}></div>
        </Fragment>
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
