import {
  Logout,
  ManageAccounts,
  MenuBook,
  NotificationsOutlined,
  Quiz,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Link,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import en from "../messages/en.json";
import th from "../messages/th.json";
import auth from "../api/api_auth";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/authSlice";
import Cookies from "js-cookie";
import upload from "../api/api_upload";
const path = process.env.NEXT_PUBLIC_BASE_API;

const NavBar = (props) => {
  const { locale } = props;
  const { pathname, query, push, replace, reload } = useRouter();
  const classes = useStyles();
  const t = useTranslations();
  const dispatch = useDispatch();
  const authPayload = useSelector((state) => state.auth.result);
  const [token, setToken] = useState();
  const [imageUser, setImageUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data ? data : authPayload ? authPayload.token : null);
    if (data) {
      getProfile(token);
    } else {
      if (pathname === "/user") {
        return push("/");
      }
      if (query.action === "learning") {
        return replace({
          pathname: "/auth",
          query: { action: "login", type: "phone" },
        });
      }
    }
  }, [token, query]);

  async function getProfile(token) {
    const data = await auth.getUser(token);
    if (data.result.img_id) {
      const img = await upload.show(data.result.img_id);
      setImageUser(img.result.path);
    }
    dispatch(userProfile(data));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickRegister() {
    push({ pathname: "/auth", query: { action: "register" } });
  }

  function loopMenuBar() {
    const rows = [];
    const message = locale === "th" ? th : en;
    const count = Object.keys(message["navbar-menu"]).length;
    for (let i = 1; i <= count; i++) {
      if (token && i === 6) return rows;
      rows.push(
        <Grid key={i} sx={{ paddingLeft: 5 }}>
          <Link
            component="button"
            sx={{ color: "#ffffff", fontSize: 16 }}
            onClick={() => push(t(`navbar-menu.menu${i}.link`))}
          >
            {t(`navbar-menu.menu${i}.title`)}
          </Link>
        </Grid>
      );
    }
    return rows;
  }

  function translationClick(e) {
    const locale = e.target.name;
    push("/", "/", { locale: locale });
  }
  async function logoutUser() {
    await auth.logout(token);
    reload();
  }

  return (
    <AppBar sx={{ backgroundColor: "#0076FF", height: 90 }} position="static">
      <Container className={classes.containre_main}>
        <Toolbar sx={{ height: "100%" }} disableGutters>
          <Grid container alignSelf={"center"} justifyContent={"space-between"}>
            <Grid item xs={3}>
              <img src="/image/aorsortor_online.png" width={"60%"}></img>
            </Grid>
            <Grid
              item
              xs={9}
              container
              columnSpacing={10}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"end"}
            >
              {loopMenuBar()}
              {token ? (
                <Fragment>
                  <Divider
                    sx={{ marginLeft: 4, opacity: 0.16, height: 44 }}
                    orientation="vertical"
                    color="white"
                  ></Divider>
                  <IconButton sx={{ marginX: 3 }}>
                    <NotificationsOutlined
                      sx={{
                        width: 36,
                        height: 36,
                        color: "#ffffff",
                      }}
                    ></NotificationsOutlined>
                  </IconButton>
                  <IconButton
                    sx={{ padding: 0, border: "2px solid #ffffff" }}
                    onClick={handleClick}
                  >
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      src={imageUser && `${path}${imageUser}`}
                    ></Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() =>
                        push({
                          pathname: "/user",
                          query: { action: "lesson", type: "lesson" },
                        })
                      }
                    >
                      <ListItemIcon>
                        <MenuBook></MenuBook>
                      </ListItemIcon>
                      <Typography>Lesson</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        push({
                          pathname: "/user",
                          query: { action: "lesson", type: "homework" },
                        })
                      }
                    >
                      <ListItemIcon>
                        <Quiz></Quiz>
                      </ListItemIcon>
                      <Typography>Homework</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        push({
                          pathname: "/user",
                          query: { action: "profile" },
                        })
                      }
                    >
                      <ListItemIcon>
                        <ManageAccounts></ManageAccounts>
                      </ListItemIcon>
                      <Typography>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => logoutUser()}>
                      <ListItemIcon>
                        <Logout />
                      </ListItemIcon>
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Fragment>
              ) : (
                <Grid sx={{ marginLeft: 4 }}>
                  <Button
                    className={classes.buttonRegister}
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleClickRegister}
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
  containre_main: {
    height: "100%",
    paddingLeft: 0,
  },
  buttonRegister: {
    width: 200,
    borderRadius: 20,
    textTransform: "none",
    fontWeight: 500,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
  },
  buttonTranslation: {
    color: "#ffffff",
    borderRadius: 20,
    borderColor: "#ffffff",
    fontWeight: 500,
    "&:hover": {
      borderColor: "#ffffff",
    },
  },
});
