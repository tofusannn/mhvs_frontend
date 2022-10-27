import { Coffee, NavigateNext } from "@mui/icons-material";
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
import { useRouter } from "next/router";
import { Fragment } from "react";

const ModalSuccess = ({ type, openModalSuccess, setOpenModalSuccess }) => {
  const classes = useStyles();
  const { query, push, pathname } = useRouter();

  return (
    <Dialog
      open={openModalSuccess}
      sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
    >
      <Card>
        <CardContent sx={{ paddingX: 8 }}>
          <Grid container justifyContent={"center"}>
            <CardMedia
              sx={{ width: 497 }}
              component="img"
              src="/image/modal_success.png"
            ></CardMedia>
          </Grid>
          <Grid mb={6} container justifyContent={"center"} textAlign={"center"}>
            {type === "homework" ? (
              <Typography fontWeight={500} fontSize={36}>
                สุดยอดไปเลย
                <br />
                คุณส่งการบ้านสำเร็จแล้ว
              </Typography>
            ) : (
              <Fragment>
                <Typography mb={1} fontWeight={500} fontSize={36}>
                  ยินดีด้วย คุณสอบผ่านแล้ว
                </Typography>
                <Typography fontWeight={500} fontSize={24}>
                  คุณได้คะแนน <span style={{ color: "#3CBB8E" }}>90%</span>
                </Typography>
              </Fragment>
            )}
          </Grid>
          <Grid container justifyContent={"center"}>
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
              }}
            >
              <Coffee sx={{ marginRight: 1 }}></Coffee> พักดื่มน้ำ
            </Button>
            {type === "homework" ? (
              ""
            ) : (
              <Button
                sx={{ marginLeft: 3 }}
                className={classes.buttonConfirm}
                onClick={() => setOpenModalSuccess(false)}
              >
                บทต่อไป <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
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
