import {
  Cancel,
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
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Badge,
  styled,
  ListItemText,
  Paper,
  MenuList,
  CardContent,
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
import logo from "../public/image/aorsortor_online.png";
import thFlag from "../public/icon/thailand.png";
import mmFlag from "../public/icon/myanmar.png";
import cdFlag from "../public/icon/cambodia.png";
import lsFlag from "../public/icon/laos.png";
import Notification from "../api/api_noti";
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
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [anchorElTrans, setAnchorElTrans] = useState(null);
  const [openTrans, setOpenTrans] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const firstWeb = localStorage.getItem("first");
    if (pathname === "/" && !firstWeb) {
      setOpenTrans(true);
      localStorage.setItem("first", true);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    const data = Cookies.get("token");
    setToken(data ? data : authPayload ? authPayload.token : null);
    if (data) {
      getProfile(token);
      getNotification();
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

  async function getNotification() {
    const data = await Notification.getNotification(locale);
    if (data.status) {
      setNotification(data.result);
      if (data.result.length === 0) {
        setAnchorEl2(null);
      }
    }
  }

  async function deleteNotification(id) {
    const data = await Notification.putNotification(id);
    if (data.status) {
      getNotification();
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    if (notification.length) {
      setAnchorEl2(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
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
        <Box
          key={i}
          sx={{
            paddingLeft: { xs: 3, sm: 0 },
            margin: { xs: "30px 0px 0px 0px", sm: "0px 28px 0px 0px" },
          }}
        >
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
        </Box>
      );
    }
    return rows;
  }

  async function translationClick(name) {
    handleCloseTrans();
    await push("/", "/", { locale: name });
    location.reload();
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
    setOpenTrans(true);
  };

  const handleCloseTrans = () => {
    setOpenTrans(false);
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
          height: { md: 90, xs: "auto" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ paddingRight: "10px" }} disableGutters>
          <Box
            sx={{ display: { xs: "none", sm: "flex" } }}
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Image
              alt="logo"
              src={logo}
              width={"150px"}
              height={"90px"}
              objectFit="cover"
            ></Image>

            {/* BTUserActions */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* Menubar */}
              {loopMenuBar()}
              {token ? (
                <Fragment>
                  <Divider
                    sx={{ opacity: 0.16, height: 44 }}
                    orientation="vertical"
                    color="white"
                  ></Divider>
                  <IconButton sx={{ marginLeft: 3 }} onClick={handleClick2}>
                    <Badge
                      color="error"
                      badgeContent={notification.length}
                      overlap="circular"
                    >
                      <NotificationsOutlined sx={{ color: "#ffffff" }} />
                    </Badge>
                  </IconButton>
                  <IconButton
                    sx={{ padding: 0, border: "2px solid #ffffff", marginX: 3 }}
                    onClick={handleClick}
                  >
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      src={imageUser && `${path}${imageUser}`}
                    ></Avatar>
                  </IconButton>
                </Fragment>
              ) : (
                <Box>
                  <Button
                    className={classes.buttonRegister}
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleClickRegister}
                  >
                    {t("register")}
                  </Button>
                </Box>
              )}
              {/* BTTranslate */}
              <Button
                className={classes.buttonTranslation}
                variant="outlined"
                onClick={handleClickTrans}
              >
                {getNameTranslate(locale)}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ display: { xs: "flex", sm: "none" } }}
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              sx={{ display: "flex" }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <IconButton
                sx={{ margin: "0px 10px" }}
                color="inherit"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Image
                alt="logo"
                src={logo}
                width={"120px"}
                height={"56px"}
                objectFit="cover"
              ></Image>
            </Box>
            <Box
              sx={{ display: "flex" }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {token ? (
                <Box mr={1}>
                  <IconButton sx={{ marginRight: 1 }} onClick={handleClick2}>
                    <Badge
                      color="error"
                      badgeContent={notification.length}
                      overlap="circular"
                    >
                      <NotificationsOutlined sx={{ color: "#ffffff" }} />
                    </Badge>
                  </IconButton>
                  <IconButton
                    sx={{ padding: 0, border: "1px solid #ffffff" }}
                    onClick={handleClick}
                  >
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={imageUser && `${path}${imageUser}`}
                    ></Avatar>
                  </IconButton>
                </Box>
              ) : (
                <Box>
                  <Button
                    className={classes.buttonRegister}
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleClickRegister}
                  >
                    {t("register")}
                  </Button>
                </Box>
              )}
              {/* BTTranslate */}
              <Button
                className={classes.buttonTranslation}
                variant="outlined"
                onClick={handleClickTrans}
              >
                {getNameTranslate(locale)}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Notification */}
      <Menu
        sx={{ marginTop: 1 }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        // onClick={handleClose2}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        {notification.map((i, idx) => {
          return (
            <div style={{ padding: "12px 24px" }} key={idx}>
              <Divider />
              <Grid
                sx={{
                  padding:
                    idx + 1 === notification.length
                      ? "16px 0px 16px 0px"
                      : "16px 0px 0px 0px",
                  width: "375px",
                  wordBreak: "break-all",
                }}
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item xs={11}>
                  <Typography>{i.msg}</Typography>
                </Grid>

                <Grid item>
                  <IconButton
                    sx={{
                      alignItems: "end",
                      padding: 0,
                      fontSize: 16,
                      width: 22,
                      height: 22,
                      color: "#9e9e9e",
                    }}
                    onClick={() => deleteNotification(i.id)}
                  >
                    x
                  </IconButton>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  display: idx + 1 === notification.length ? "box" : "none",
                }}
              />
            </div>
          );
        })}
      </Menu>
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
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "256px",
          },
        }}
        fullWidth
        open={openTrans}
        onClose={handleCloseTrans}
      >
        <DialogTitle textAlign={"center"}>
          <Typography fontWeight={500} fontSize={20}>
            เลือกภาษา
          </Typography>
        </DialogTitle>
        <DialogContent>
          <MenuItem
            sx={{ paddingY: 1 }}
            name="th"
            disabled={locale === "th"}
            onClick={() => translationClick("th")}
          >
            <Image
              alt={"th"}
              src={thFlag}
              width={"40"}
              height={"40"}
              objectFit="cover"
            ></Image>
            <Typography sx={{ marginLeft: 3 }} fontWeight={500} fontSize={20}>
              ภาษาไทย
            </Typography>
          </MenuItem>
          <MenuItem
            sx={{ paddingY: 1 }}
            name="mm"
            disabled={locale === "mm"}
            onClick={() => translationClick("mm")}
          >
            <Image
              alt={"mm"}
              src={mmFlag}
              width={"40"}
              height={"40"}
              objectFit="cover"
            ></Image>
            <Typography sx={{ marginLeft: 3 }} fontWeight={500} fontSize={20}>
              မြန်မာ
            </Typography>
          </MenuItem>
          <MenuItem
            sx={{ paddingY: 1 }}
            name="cd"
            disabled={locale === "cd"}
            onClick={() => translationClick("cd")}
          >
            <Image
              alt={"cd"}
              src={cdFlag}
              width={"40"}
              height={"40"}
              objectFit="cover"
            ></Image>
            <Typography sx={{ marginLeft: 3 }} fontWeight={500} fontSize={20}>
              ភាសាខ្មែរ
            </Typography>
          </MenuItem>
          <MenuItem
            sx={{ paddingY: 1 }}
            name="ls"
            disabled={locale === "ls"}
            onClick={() => translationClick("ls")}
          >
            <Image
              alt={"ls"}
              src={lsFlag}
              width={"40"}
              height={"40"}
              objectFit="cover"
            ></Image>
            <Typography sx={{ marginLeft: 3 }} fontWeight={500} fontSize={20}>
              ພາສາລາວ
            </Typography>
          </MenuItem>
          <Button
            sx={{
              marginTop: 3,
              height: 30,
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
              color: "#ffffff",
              background:
                "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
            }}
            fullWidth
            onClick={handleCloseTrans}
          >
            {t("first-page")}
          </Button>
        </DialogContent>
      </Dialog>
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
    padding: "0px",
  },
  buttonRegister: {
    marginRight: "15px",
    width: 200,
    height: 30,
    borderRadius: 20,
    textTransform: "none",
    fontWeight: 500,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
    "@media (max-width: 800px)": {
      width: 90,
      fontSize: 10,
      marginRight: "10px",
    },
  },
  buttonTranslation: {
    color: "#ffffff",
    height: 28,
    borderRadius: 20,
    borderColor: "#ffffff",
    fontWeight: 500,
    "&:hover": {
      borderColor: "#ffffff",
    },
    "@media (max-width: 800px)": {
      fontSize: 10,
      height: 24,
      minWidth: 10,
      minHeight: 10,
    },
    "@media (max-width: 350px)": {
      display: "none",
    },
  },
}));
