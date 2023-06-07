import { Coffee, NavigateNext, Replay } from "@mui/icons-material";
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
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const ModalFail = ({
  type,
  openModalFail,
  setOpenModalFail,
  setOpenSnackbar,
  score,
  handleClickNext,
}) => {
  const classes = useStyles();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Dialog
      open={openModalFail}
      // open={true}
      sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
    >
      <Card>
        <CardContent>
          <Grid container justifyContent={"center"}>
            <CardMedia
              sx={{ width: 341 }}
              component="img"
              src="/image/modal_fail.png"
            ></CardMedia>
          </Grid>
          <Grid mb={6} textAlign={"center"}>
            <Typography
              mt={1}
              mb={1}
              fontWeight={500}
              fontSize={matches ? 32 : 24}
            >
              {t("modal-text.text6").slice(0, 14)}
              <br />
              {t("modal-text.text6").slice(14)}
            </Typography>
            <Typography fontWeight={500} fontSize={matches ? 24 : 18}>
              {t("modal-text.text4")}{" "}
              <span style={{ color: "#FF698B" }}>{score}</span>
            </Typography>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button
              className={
                type === "homework"
                  ? classes.buttonConfirm
                  : classes.buttonConfirm2
              }
              sx={{ textTransform: "none" }}
              onClick={() => {
                setOpenModalFail(false);
                location.reload();
              }}
            >
              <Coffee sx={{ marginRight: 1 }}></Coffee> {t("modal-text.text5")}
            </Button>
            {type === "homework" ? (
              ""
            ) : (
              <Button
                sx={{ marginLeft: matches ? 3 : 1 }}
                className={classes.buttonConfirm}
                onClick={() => {
                  setOpenSnackbar(false);
                  setOpenModalFail(false);
                  location.reload();
                }}
              >
                {t("modal-text.text7")} <Replay sx={{ marginLeft: 1 }}></Replay>
              </Button>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ModalFail;

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
    "@media (max-width: 600px)": {
      width: 125,
      fontSize: 11,
    },
  },
  buttonConfirm2: {
    width: 184,
    color: "#2DA373",
    borderRadius: 100,
    boxShadow: "none",
    fontWeight: 500,
    fontSize: 18,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "2px solid #2DA373",
    "@media (max-width: 600px)": {
      width: 125,
      fontSize: 11,
    },
  },
});
