import {
  Logout,
  ManageAccounts,
  MenuBook,
  NotificationsOutlined,
  Quiz,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
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
  Drawer,
  List,
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
import Image from "next/image";
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
  const [anchorElTrans, setAnchorElTrans] = useState(null);
  const openTrans = Boolean(anchorElTrans);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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
        <Grid key={i} sx={{ paddingLeft: 5, margin: "15px 0px" }}>
          <Link
            component="button"
            sx={{
              color: { xs: "#000000", sm: "#ffffff" },
              fontSize: 16,
              textDecoration: "none",
            }}
            onClick={() => {
              push(t(`navbar-menu.menu${i}.link`));
              handleDrawerClose();
            }}
          >
            {t(`navbar-menu.menu${i}.title`)}
          </Link>
        </Grid>
      );
    }
    return rows;
  }

  function translationClick(name) {
    handleCloseTrans();
    push("/", "/", { locale: name });
  }

  function getNameTranslate(locale) {
    let name;
    switch (locale) {
      case "th":
        name = "TH";
        break;
      case "mm":
        name = "MM";
        break;
      case "ls":
        name = "LS";
        break;
      case "cd":
        name = "CD";
        break;
      default:
        name = "TH";
        break;
    }
    return name;
  }

  const handleClickTrans = (event) => {
    setAnchorElTrans(event.currentTarget);
  };

  const handleCloseTrans = () => {
    setAnchorElTrans(null);
  };

  async function logoutUser() {
    await auth.logout(token);
    reload();
  }

  return (
    <>
      <AppBar
        sx={{
          position: { xs: "fixed", sm: "static" },
          backgroundColor: "#0076FF",
          height: { sm: 90, xs: "auto" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container
          className={classes.container_main}
          sx={{ display: { sm: "flex", xs: "none" } }}
        >
          <Toolbar sx={{ height: "100%" }} disableGutters>
            <Grid
              container
              alignSelf={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={locale === "th" ? 3 : 1}>
                <img
                  src="/image/aorsortor_online.png"
                  width={locale === "th" ? "60%" : "150%"}
                ></img>
              </Grid>
              <Grid
                item
                xs={locale === "th" ? 9 : 11}
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
                      {t("register")}
                    </Button>
                  </Grid>
                )}
                <Grid sx={{ marginLeft: 4 }}>
                  <Button
                    className={classes.buttonTranslation}
                    variant="outlined"
                    size="small"
                    onClick={handleClickTrans}
                  >
                    {getNameTranslate(locale)}
                  </Button>
                  <Menu
                    sx={{ marginTop: 1 }}
                    anchorEl={anchorElTrans}
                    open={openTrans}
                    onClose={handleCloseTrans}
                    transformOrigin={{ horizontal: "center", vertical: "top" }}
                    anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                  >
                    <MenuItem
                      name="th"
                      disabled={locale === "th"}
                      onClick={() => translationClick("th")}
                    >
                      ภาษาไทย
                    </MenuItem>
                    <MenuItem
                      name="mm"
                      disabled={locale === "mm"}
                      onClick={() => translationClick("mm")}
                    >
                      မြန်မာဘာသာ
                    </MenuItem>
                    {/* <MenuItem
                    name="ls"
                    disabled={locale === "ls"}
                    onClick={() => translationClick("ls")}
                  >
                    ພາສາລາວ
                  </MenuItem>
                  <MenuItem
                    name="cd"
                    disabled={locale === "cd"}
                    onClick={() => translationClick("cd")}
                  >
                    ភាសាខ្មែរ
                  </MenuItem> */}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Container sx={{ display: { sm: "none" } }}>
          <Toolbar disableGutters>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={5} sx={{ display: "flex", alignItems: " center" }}>
                {/* Menu */}
                <Grid item xs={3}>
                  <IconButton
                    color="inherit"
                    onClick={handleDrawerOpen}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                {/* LOGO */}
                <Grid
                  item
                  xs={9}
                  sx={{
                    position: "sticky",
                    height: 56,
                  }}
                >
                  <Image
                    sx={{ objectFit: "cover" }}
                    src={"/image/aorsortor_online.png"}
                    layout="fill"
                    alt="logo"
                  ></Image>
                </Grid>
              </Grid>
              {/* Profile BT */}
              <Grid>
                {token ? (
                  <>
                    <IconButton>
                      <NotificationsOutlined
                        sx={{
                          width: 18,
                          height: 18,
                          color: "#ffffff",
                        }}
                      ></NotificationsOutlined>
                    </IconButton>
                    <IconButton
                      sx={{ padding: 0, border: "1px solid #ffffff" }}
                      onClick={handleClick}
                    >
                      <Avatar
                        sx={{ width: 18, height: 18 }}
                        src={imageUser && `${path}${imageUser}`}
                      ></Avatar>
                    </IconButton>
                  </>
                ) : (
                  <Button
                    sx={{
                      width: { xs: locale === "th" ? 90 : 120, sm: 200 },
                      fontSize: 10,
                      borderRadius: 20,
                      textTransform: "none",
                      fontWeight: 500,
                      color: "#ffffff",
                      background:
                        "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
                    }}
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleClickRegister}
                  >
                    {t("register")}
                  </Button>
                )}
                <Button
                  sx={{
                    margin: "8px",
                    fontSize: 10,
                    width: 18,
                    height: 18,
                    minWidth: 10,
                    minHeight: 10,
                  }}
                  className={classes.buttonTranslation}
                  variant="outlined"
                  onClick={handleClickTrans}
                >
                  {getNameTranslate(locale)}
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Profile */}
      <Menu
        sx={{ marginTop: 1 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
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
          <Typography>{t("lesson-page.lesson")}</Typography>
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
          <Typography>{t("lesson-menu.homework")}</Typography>
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
          <Typography>{t("profile-page.information")}</Typography>
        </MenuItem>
        <MenuItem onClick={() => logoutUser()}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography>{t("logout")}</Typography>
        </MenuItem>
      </Menu>
      {/* Translate */}
      <Menu
        sx={{ marginTop: 1 }}
        anchorEl={anchorElTrans}
        open={openTrans}
        onClose={handleCloseTrans}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem
          name="th"
          disabled={locale === "th"}
          onClick={() => translationClick("th")}
        >
          ภาษาไทย
        </MenuItem>
        <MenuItem
          name="mm"
          disabled={locale === "mm"}
          onClick={() => translationClick("mm")}
        >
          မြန်မာဘာသာ
        </MenuItem>
        {/* <MenuItem
      name="ls"
      disabled={locale === "ls"}
      onClick={() => translationClick("ls")}
    >
      ພາສາລາວ
    </MenuItem>
    <MenuItem
      name="cd"
      disabled={locale === "cd"}
      onClick={() => translationClick("cd")}
    >
      ភាសាខ្មែរ
    </MenuItem> */}
      </Menu>
      {/* Menu */}
      <Drawer
        sx={{
          width: 240,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <Toolbar />
        {loopMenuBar()}
      </Drawer>
    </>
  );
};

export default NavBar;

const useStyles = makeStyles((theme) => ({
  container_main: {
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
}));
