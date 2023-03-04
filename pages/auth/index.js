import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { Fragment } = require("react");
import { useSelector, useDispatch } from "react-redux";
import auth from "../../api/api_auth";
import { login, register, forgotPassword } from "../../redux/authSlice";

const register_payload = {
  phone: "",
  gender: "",
  nationality: "",
  pre_name: "",
  first_name: "",
  last_name: "",
};

const forgot_password_payload = {
  phone: "",
  password: "",
};

const Auth = () => {
  const classes = useStyles();
  const t = useTranslations();
  const { push, query } = useRouter();
  const payload = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginPhonePayload, setLoginPhonePayload] = useState("");
  const [registerPayload, setRegisterPayload] = useState(register_payload);
  const [forgotPasswordPayload, setForgotPasswordPayload] = useState(
    forgot_password_payload
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonAction, setButtonAction] = useState([]);
  const [checkPhoneTh, setCheckPhoneTh] = useState(false);
  const [checkButtonConfirm, setCheckButtonConfirm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setCheckPhoneTh(false);
    setCheckButtonConfirm(false);
    checkActions(query.action);
  }, [query]);

  function checkActions(a) {
    if (a === "register") {
      setButtonAction([classes.button_active, classes.button_inactive]);
    }
    if (a === "login") {
      setButtonAction([classes.button_inactive, classes.button_active]);
    }
  }

  function changeField(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone" || name === "forgot" || name === "confirmPassword") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length < 11) {
        if (query.action === "register") {
          setRegisterPayload((element) => ({ ...element, [name]: onlyNums }));
        }
        if (query.action === "login") {
          setLoginPhonePayload(onlyNums);
        }
        if (query.action === "forgot-password") {
          setForgotPasswordPayload((element) => ({
            ...element,
            ["phone"]: onlyNums,
          }));
        }
        if (query.action === "change-password") {
          if (name === "confirmPassword") {
            setConfirmPassword(onlyNums);
          } else {
            setForgotPasswordPayload((element) => ({
              ...element,
              ["password"]: onlyNums,
            }));
          }
        }
        const titlePhone = value.substr(0, 2);
        if (titlePhone === "06") {
          return setCheckPhoneTh(false);
        }
        if (titlePhone === "08") {
          return setCheckPhoneTh(false);
        }
        if (titlePhone === "09") {
          return setCheckPhoneTh(false);
        }
        setCheckPhoneTh(true);
      }
    } else {
      setRegisterPayload((element) => ({ ...element, [name]: value }));
    }
  }

  function buttonActionClick(e) {
    const name = e.target.name;
    const query = {};
    if (name === "login") {
      query = { action: name, type: "phone" };
    }
    if (name === "register") {
      query = { action: name };
    }
    push({ pathname: "/auth", query: query });
  }

  async function buttonConfirmClick(e) {
    setCheckButtonConfirm(true);
    const name = e.target.name;
    if (name === "register") {
      for (const key in registerPayload) {
        if (
          registerPayload[key] === "" ||
          registerPayload["phone"].length < 10
        ) {
          return;
        }
      }
      if (checkPhoneTh) {
        return;
      }
      setCheckButtonConfirm(true);
      const data = await auth.register({
        username: "",
        password: "",
        email: "",
        ...registerPayload,
        idcard: "",
        date_of_birth: null,
        img_id: null,
      });
      dispatch(register(data));
      setOpenSnackbar(true);
      if (data.status) {
        await auth.login({ phone: registerPayload.phone });
        push({ pathname: "/user", query: { action: "profile" } });
      }
    }
    if (name === "login") {
      if (loginPhonePayload === "" || loginPhonePayload.length < 10) {
        return;
      }
      if (checkPhoneTh) {
        return;
      }
      setCheckButtonConfirm(true);
      const data = await auth.login({ phone: loginPhonePayload });
      dispatch(login(data));
      setOpenSnackbar(true);
      data.status && push("/");
    }
    if (name === "forgot-password" || name === "change-password") {
      if (payload.status === "success") {
        const query = { action: "login", type: "phone" };
        push({ pathname: "/auth", query: query });
        return;
      }
      if (
        name === "change-password" &&
        forgotPasswordPayload.password === confirmPassword
      ) {
        if (forgotPasswordPayload.password === "") {
          return;
        }
        setCheckButtonConfirm(true);
        dispatch(forgotPassword(forgotPasswordPayload));
        setOpenSnackbar(true);
      } else {
        if (forgotPasswordPayload.phone === "") {
          return;
        }
        if (checkPhoneTh) {
          return;
        }
        setCheckButtonConfirm(true);
        dispatch(forgotPassword(forgotPasswordPayload));
        const query = { action: "change-password" };
        push({ pathname: "/auth", query: query });
      }
    }
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  const ButtonActions = () => {
    return (
      <ButtonGroup
        sx={{ width: "100%", boxShadow: "none" }}
        variant="contained"
        size="large"
      >
        <Button
          name="register"
          className={buttonAction[0]}
          fullWidth
          onClick={buttonActionClick}
        >
          {t("register")}
        </Button>
        <Button
          name="login"
          className={buttonAction[1]}
          fullWidth
          onClick={buttonActionClick}
        >
          {t("login")}
        </Button>
      </ButtonGroup>
    );
  };

  const ButtonConfirm = () => {
    return (
      <CardContent
        className={query.action === "login" ? classes.card_action : null}
      >
        <Grid mb={2} container justifyContent={"center"}>
          <Button
            name={query.action}
            className={classes.button_confirm}
            variant="contained"
            onClick={buttonConfirmClick}
          >
            {query.action === "login" && t("login")}
            {query.action === "register" && t("register")}
            {query.action === "forgot-password" && t("reset-password")}
            {query.action === "change-password" &&
              t(
                payload.status === "success"
                  ? "button-login-confirm"
                  : "button-change-confirm"
              )}
          </Button>
        </Grid>
        {query.action === "login" && (
          <Grid container justifyContent={"center"}>
            {/* <Link
              className={classes.link_forgot_pw}
              // href="/auth/?action=forgot-password"
            >
              {t("forgot-password-text")}
            </Link> */}
          </Grid>
        )}
        {query.action === "forgot-password" && (
          <Grid container justifyContent={"center"}>
            <Link
              className={classes.link_forgot_pw}
              href="/auth/?action=login&type=phone"
            >
              ยกเลิก {t("cancel")}
            </Link>
          </Grid>
        )}
        {query.action === "change-password" && payload.status != "success" && (
          <Grid container justifyContent={"center"}>
            <Link
              className={classes.link_forgot_pw}
              href="/auth/?action=forgot-password"
            >
              ยกเลิก {t("cancel")}
            </Link>
          </Grid>
        )}
      </CardContent>
    );
  };

  return (
    <Fragment>
      <Container sx={{ marginY: 5 }}>
        <Grid container justifyContent={"center"}>
          <img src="/icon/logo-blue.svg"></img>
        </Grid>
        <Grid container my={3} justifyContent={"center"}>
          <Card
            className={
              query.action === "forgot-password" ||
              query.action === "change-password"
                ? classes.card_main_forgot
                : classes.card_main
            }
          >
            {query.action === "forgot-password" ||
            query.action === "change-password" ? (
              <Grid
                container
                className={classes.card_title}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Typography fontSize={22} fontWeight={500}>
                  {t("change-password")}
                </Typography>
              </Grid>
            ) : (
              <ButtonActions></ButtonActions>
            )}
            <CardContent className={classes.card_content}>
              {query.action === "login" && (
                <Fragment>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography mr={5}>{t("login-page.login-for")}</Typography>
                    <Button
                      className={classes.button_type_active}
                      variant="contained"
                    >
                      {t("phone")}
                    </Button>
                    {/* <Button
                      disabled
                      className={classes.button_type_inactive}
                      variant="contained"
                    >
                      อีเมล
                    </Button> */}
                  </Grid>
                  <Grid my={5} container justifyContent={"center"}>
                    <Divider width="240px"></Divider>
                  </Grid>
                  <Typography>
                    {t("phone")}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Grid mt={1} mb={3} container>
                    <TextField
                      name="phone"
                      size="small"
                      fullWidth
                      error={
                        (checkButtonConfirm && loginPhonePayload === "") ||
                        checkPhoneTh
                      }
                      value={loginPhonePayload}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                </Fragment>
              )}
              {query.action === "register" && (
                <Fragment>
                  <Typography>
                    {t("register-page.title")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Grid mt={1} mb={3} container>
                    <TextField
                      name="pre_name"
                      size="small"
                      fullWidth
                      error={
                        checkButtonConfirm && registerPayload.pre_name === ""
                      }
                      value={registerPayload.pre_name}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                  <Typography>
                    {t("register-page.firstname")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Grid mt={1} mb={3} container>
                    <TextField
                      name="first_name"
                      size="small"
                      fullWidth
                      error={
                        checkButtonConfirm && registerPayload.first_name === ""
                      }
                      value={registerPayload.first_name}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                  <Typography>
                    {t("register-page.lastname")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Grid mt={1} mb={3} container>
                    <TextField
                      name="last_name"
                      size="small"
                      fullWidth
                      error={
                        checkButtonConfirm && registerPayload.last_name === ""
                      }
                      value={registerPayload.last_name}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                  <Typography>
                    {t("phone")}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Grid mt={1} mb={3} container>
                    <TextField
                      name="phone"
                      size="small"
                      fullWidth
                      error={
                        (checkButtonConfirm && registerPayload.phone === "") ||
                        checkPhoneTh
                      }
                      value={registerPayload.phone}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                  <Grid
                    xs={6}
                    mt={1}
                    mb={3}
                    item
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography>
                      {t("gender")} <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Button
                      name="male"
                      className={
                        registerPayload.gender === "male"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          gender: e.target.name,
                        }))
                      }
                    >
                      {t("male")}
                    </Button>
                    <Button
                      name="female"
                      className={
                        registerPayload.gender === "female"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          gender: e.target.name,
                        }))
                      }
                    >
                      {t("female")}
                    </Button>
                  </Grid>
                  <Grid
                    mt={1}
                    mb={3}
                    item
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography>
                      {t("nationality")} <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Button
                      name="thai"
                      className={
                        registerPayload.nationality === "thai"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          nationality: e.target.name,
                        }))
                      }
                    >
                      {t("thailand")}
                    </Button>
                    <Button
                      name="myanmar"
                      className={
                        registerPayload.nationality === "myanmar"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          nationality: e.target.name,
                        }))
                      }
                    >
                      {t("myanmar")}
                    </Button>
                    <Button
                      name="laos"
                      className={
                        registerPayload.nationality === "laos"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          nationality: e.target.name,
                        }))
                      }
                    >
                      {t("laos")}
                    </Button>
                    <Button
                      name="cambodia"
                      className={
                        registerPayload.nationality === "cambodia"
                          ? classes.button_register_active
                          : classes.button_register_inactive
                      }
                      onClick={(e) =>
                        setRegisterPayload((ele) => ({
                          ...ele,
                          nationality: e.target.name,
                        }))
                      }
                    >
                      {t("cambodia")}
                    </Button>
                  </Grid>
                </Fragment>
              )}
              {query.action === "forgot-password" && (
                <Fragment>
                  <Grid textAlign={"center"}>
                    <Typography fontSize={24}>
                      กรุณาใส่หมายเลขโทรศัพท์
                      <br />
                      เพื่อรีเซ็ตรหัสผ่าน
                    </Typography>
                  </Grid>
                  <Grid my={3} container>
                    <TextField
                      name="forgot"
                      size="small"
                      fullWidth
                      error={
                        (checkButtonConfirm &&
                          forgotPasswordPayload.phone === "") ||
                        checkPhoneTh
                      }
                      value={forgotPasswordPayload.phone}
                      onChange={changeField}
                    ></TextField>
                  </Grid>
                </Fragment>
              )}
              {query.action === "change-password" &&
                (payload.status === "success" ? (
                  <Fragment>
                    <Grid my={5} textAlign={"center"}>
                      <Typography fontSize={24}>
                        ตั้งรหัสผ่านใหม่สำเร็จแล้ว
                      </Typography>
                    </Grid>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Grid mb={3} textAlign={"center"}>
                      <Typography fontSize={24}>
                        กรุณาใส่รหัสผ่านใหม่
                      </Typography>
                    </Grid>
                    <Typography>
                      รหัสผ่านใหม่ <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Grid mb={3} container>
                      <TextField
                        name="forgot"
                        size="small"
                        fullWidth
                        error={
                          checkButtonConfirm &&
                          forgotPasswordPayload.password === ""
                        }
                        value={forgotPasswordPayload.password}
                        onChange={changeField}
                      ></TextField>
                    </Grid>
                    <Typography>
                      ยืนยันรหัสผ่าน <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Grid mb={3} container>
                      <TextField
                        name="confirmPassword"
                        size="small"
                        fullWidth
                        error={
                          (checkButtonConfirm && confirmPassword === "") ||
                          (checkButtonConfirm &&
                            confirmPassword !== forgotPasswordPayload.password)
                        }
                        value={confirmPassword}
                        onChange={changeField}
                      ></TextField>
                    </Grid>
                  </Fragment>
                ))}
            </CardContent>
            <ButtonConfirm></ButtonConfirm>
          </Card>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={payload.status ? "success" : "error"}
          sx={{ width: 250 }}
        >
          {payload.msg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Auth;

const useStyles = makeStyles({
  card_main: {
    width: 634,
    minHeight: 583,
    background: "#FFFFFF",
    boxShadow: "10px 20px 60px #12121214",
    position: "relative",
  },
  card_main_forgot: {
    width: 634,
    minHeight: 421,
    background: "#FFFFFF",
    boxShadow: "10px 20px 60px #12121214",
    position: "relative",
  },
  card_content: {
    marginRight: "108px",
    marginLeft: "108px",
    marginTop: "36px",
  },
  card_action: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  card_title: {
    height: 72,
    color: "#ffffff",
    background: "#0076FF",
  },
  button_active: {
    height: 72,
    fontSize: 22,
    fontWeight: 500,
    textTransform: "none",
    color: "#FFFFFF",
    background: "#0076FF",
    "&:hover": {
      color: "#FFFFFF",
      background: "#0076FF",
    },
  },
  button_inactive: {
    height: 72,
    fontSize: 22,
    fontWeight: 500,
    textTransform: "none",
    color: "#0076FF",
    background: "#DCEFFF",
    "&:hover": {
      color: "#0076FF",
      background: "#DCEFFF",
    },
  },
  button_type_active: {
    height: 42,
    fontWeight: 500,
    textTransform: "none",
    color: "#2DA373",
    background: "#D8F8E4",
    boxShadow: "none",
    "&:hover": {
      color: "#2DA373",
      background: "#D8F8E4",
      boxShadow: "none",
    },
  },
  button_type_inactive: {
    height: 42,
    fontWeight: 500,
    textTransform: "none",
    color: "#2DA373",
    background: "#ffffff",
    boxShadow: "none",
    "&:hover": {
      color: "#2DA373",
      background: "#ffffff",
      boxShadow: "none",
    },
  },
  button_register_active: {
    fontWeight: 500,
    textTransform: "none",
    color: "#2DA373",
    background: "#D8F8E4",
    boxShadow: "none",
    "&:hover": {
      color: "#2DA373",
      background: "#D8F8E4",
      boxShadow: "none",
    },
  },
  button_register_inactive: {
    fontWeight: 500,
    textTransform: "none",
    color: "#2DA373",
    background: "#ffffff",
    boxShadow: "none",
    "&:hover": {
      color: "#2DA373",
      background: "#ffffff",
      boxShadow: "none",
    },
  },
  button_confirm: {
    textTransform: "none",
    width: 228,
    height: 48,
    background: "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%)",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    borderRadius: 100,
    fontSize: 24,
    fontWeight: 500,
    color: "#ffffff",
  },
  link_forgot_pw: {
    color: "#3CBB8E",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
});
