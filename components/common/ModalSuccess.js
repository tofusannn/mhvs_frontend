import { Coffee, NavigateNext } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const ModalSuccess = ({
  type,
  openModalSuccess,
  setOpenModalSuccess,
  setOpenSnackbar,
  score,
  handleClickNext,
}) => {
  const classes = useStyles();
  const { query, push, pathname, reload } = useRouter();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  function handleClick() {}
  useEffect(() => {}, [type]);

  return (
    <Dialog
      open={openModalSuccess}
      // open={true}
      sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
    >
      <Card>
        <CardContent sx={{ paddingX: matches ? 8 : 3 }}>
          <Grid container justifyContent={"center"}>
            <CardMedia
              sx={{ width: 497 }}
              component="img"
              src="/image/modal_success.png"
            ></CardMedia>
          </Grid>
          <Grid mb={6} container justifyContent={"center"} textAlign={"center"}>
            {type === "homework" ? (
              <Typography fontWeight={500} fontSize={matches ? 36 : 20}>
                {t("modal-text.text1")}
                <br />
                {t("modal-text.text2")}
              </Typography>
            ) : (
              <Fragment>
                {
                  (type === "post_test" ? (
                    <Typography
                      mb={1}
                      fontWeight={500}
                      fontSize={matches ? 36 : 20}
                    >
                      {t("modal-text.text3")}
                    </Typography>
                  ) : (
                    // <Typography
                    //   mb={1}
                    //   fontWeight={500}
                    //   fontSize={matches ? 36 : 20}
                    // >
                    //   {t("modal-text.text3")}
                    // </Typography>
                    <></>
                  ))
                }
                <Typography fontWeight={500} fontSize={matches ? 24 : 18}>
                  {t("modal-text.text4")}{" "}
                  <span style={{ color: "#3CBB8E" }}>{score}</span>
                </Typography>
              </Fragment>
            )}
          </Grid>
          <Grid container justifyContent={"center"}>
            {type === "homework" ? (
              <Button
                className={
                  type === "homework"
                    ? classes.buttonConfirm
                    : classes.buttonConfirm2
                }
                onClick={() => {
                  setOpenModalSuccess(false);
                  push({
                    pathname,
                    query: {
                      action: "lesson",
                      type: "homework",
                    },
                  });
                  reload();
                }}
              >
                <Coffee sx={{ marginRight: 1 }}></Coffee>
                {t("modal-text.text5")}
              </Button>
            ) : (
              <Button
                // sx={{ marginLeft: 3 }}
                className={classes.buttonConfirm}
                onClick={() => {
                  setOpenSnackbar(false);
                  setOpenModalSuccess(false);
                  handleClickNext();
                }}
              >
                {t("lesson-page.next-chapter")}{" "}
                <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
              </Button>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ModalSuccess;

const useStyles = makeStyles({
  buttonConfirm: {
    width: 184,
    color: "#ffffff",
    borderRadius: 100,
    borderColor: "#ffffff",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 18,
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #3CBB8E7A",
  },
  buttonConfirm2: {
    width: 184,
    color: "#2DA373",
    borderRadius: 100,
    textTransform: "none",
    fontWeight: 500,
    fontSize: 18,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "2px solid #2DA373",
  },
});
