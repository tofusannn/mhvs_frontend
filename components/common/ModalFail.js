import { Coffee, NavigateNext, Replay } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const ModalFail = ({
  type,
  openModalFail,
  setOpenModalFail,
  setOpenSnackbar,
  score,
  handleClickNext,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={openModalFail}
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
          <Grid mb={6} container justifyContent={"center"} textAlign={"center"}>
            <Typography mb={1} fontWeight={500} fontSize={32}>
              พยายามอีกนิดนะ พวกเราเป็นกำลังใจให้
            </Typography>
            <Typography fontWeight={500} fontSize={24}>
              คุณได้คะแนน <span style={{ color: "#FF698B" }}>{score}</span>
            </Typography>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button
              className={
                type === "homework"
                  ? classes.buttonConfirm
                  : classes.buttonConfirm2
              }
              onClick={() => setOpenModalFail(false)}
            >
              <Coffee sx={{ marginRight: 1 }}></Coffee> พักดื่มน้ำ
            </Button>
            {type === "homework" ? (
              ""
            ) : (
              <Button
                sx={{ marginLeft: 3 }}
                className={classes.buttonConfirm}
                onClick={() => {
                  setOpenSnackbar(false);
                  setOpenModalFail(false);
                }}
              >
                พยายามอีกครั้ง <Replay sx={{ marginLeft: 1 }}></Replay>
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
  },
});
