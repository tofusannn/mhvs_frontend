import { NavigateNext, Save } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../api/api_auth";
import Banner from "../../components/common/Banner";
import ModalSuccess from "../../components/common/ModalSuccess";
import Lesson from "../../components/user/Lesson";
import Menu from "../../components/user/Menu";
import Profile from "../../components/user/Profile";
import { userProfile } from "../../redux/authSlice";
import { useTranslations } from "next-intl";

const { Fragment, useState, useEffect } = require("react");

const Home = () => {
  const classes = useStyles();
  const { asPath, prefetch, push, reload, query } = useRouter();
  const dispatch = useDispatch();
  const authPayload = useSelector((state) => state.auth);
  const [payload, setPayload] = useState();
  const [payloadAuth, setPayloadAuth] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [changeMenu, setChangeMenu] = useState("");
  const [payloadSnackbar, setPayloadSnackbar] = useState({
    msg: "",
    status: false,
  });
  const [confirm, setConfirm] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setPayloadAuth(authPayload);
  }, [authPayload]);

  useEffect(() => {}, [query]);

  async function confirmProfile() {
    const data = await auth.putUser(payload);
    setPayloadSnackbar(data);
    setOpenSnackbar(true);
    if (data.status) {
      reload();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  return (
    <Fragment>
      <Banner
        page={"สมาชิก"}
        subPage={
          changeMenu.action === "lesson"
            ? changeMenu.type === "lesson"
              ? "บทเรียน"
              : "การบ้าน"
            : null
        }
      ></Banner>
      <Grid>
        <Container>
          <Grid my={3} container>
            <Grid xs={3} pr={3} item>
              <Menu
                payload={payloadAuth ? payloadAuth.result : null}
                setChangeMenu={setChangeMenu}
              ></Menu>
            </Grid>
            <Grid sx={{ minHeight: "595px" }} xs={9} mt={3} item>
              {query.action === "lesson" ? (
                <Lesson
                  confirm={confirm}
                  setOpenSnackbar={setOpenSnackbar}
                  setPayloadSnackbar={setPayloadSnackbar}
                  setOpenModalSuccess={setOpenModalSuccess}
                ></Lesson>
              ) : (
                ""
              )}
              {query.action === "profile" ? (
                <Profile
                  setPayload={setPayload}
                  setOpenSnackbar={setOpenSnackbar}
                  setPayloadSnackbar={setPayloadSnackbar}
                ></Profile>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {query.action === "profile" ? (
        <Grid
          className={classes.background_button}
          py={3}
          container
          justifyContent={"center"}
        >
          <Button
            className={classes.button_confirm}
            variant="contained"
            onClick={confirmProfile}
          >
            <Save sx={{ marginRight: 1 }}></Save> {t("save-data")}
          </Button>
        </Grid>
      ) : (
        ""
      )}
      {query.type === "homework" && query.id ? (
        <Grid
          className={classes.background_button}
          py={3}
          container
          justifyContent={"center"}
        >
          <Button
            className={classes.button_confirm}
            variant="contained"
            onClick={() => setConfirm(true)}
          >
            {t("profile-page.sent-homework")}{" "}
            <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
          </Button>
        </Grid>
      ) : (
        ""
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={payloadSnackbar.status ? "success" : "error"}
          sx={{ width: 250 }}
        >
          {payloadSnackbar.msg}
        </Alert>
      </Snackbar>
      <ModalSuccess
        type={"homework"}
        openModalSuccess={openModalSuccess}
        setOpenModalSuccess={setOpenModalSuccess}
      ></ModalSuccess>
    </Fragment>
  );
};

export default Home;

const useStyles = makeStyles({
  background_button: {
    width: "100%",
    height: "100%",
    background: "#F1F8FE 0% 0% no-repeat padding-box",
  },
  button_confirm: {
    width: 228,
    height: 48,
    background: "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%)",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    borderRadius: 100,
    fontSize: 20,
    fontWeight: 500,
    color: "#ffffff",
    textTransform: "none"
  },
});
