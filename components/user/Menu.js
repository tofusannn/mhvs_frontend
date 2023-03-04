import { Face, MenuBook, PlayCircle, Quiz } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Menu = ({ payload, setChangeMenu }) => {
  const classes = useStyles();
  const { push, query } = useRouter();
  const t = useTranslations();

  function changeMenu(path) {
    const newQuery = { action: path };
    setChangeMenu(newQuery);
    push({ pathname: "/user", query: newQuery });
  }

  function changeSubMenu(path) {
    const newQuery = { action: "lesson", type: path };
    setChangeMenu(newQuery);
    push({ pathname: "/user", query: newQuery });
  }
  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={16}>
        {t("profile-menu.welcome")}!
      </Typography>
      <Typography fontWeight={500} fontSize={28}>
        {payload && payload.pre_name} {payload && payload.first_name}{" "}
        {payload && payload.last_name}
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
      <Typography
        className={query.action === "lesson" ? classes.button_active : ""}
        sx={{ cursor: "pointer", textTransform: "none" }}
        fontWeight={500}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        onClick={() => changeSubMenu("lesson")}
      >
        <MenuBook sx={{ marginRight: 1 }}></MenuBook>{" "}
        {t("profile-menu.your-lesson")}
      </Typography>
      {query.action === "lesson" ? (
        <Fragment>
          <Typography pl={4} color={"#727272"} fontSize={14}>
            {t("profile-menu.lesson-enroll")}
          </Typography>
          <Button
            className={
              query.type === "lesson"
                ? classes.button_sub_active
                : classes.button_sub_inactive
            }
            fullWidth
            onClick={() => changeSubMenu("lesson")}
          >
            <PlayCircle sx={{ marginRight: 1 }}></PlayCircle>{" "}
            {t("lesson-page.lesson")}
          </Button>
          <Button
            className={
              query.type === "homework"
                ? classes.button_sub_active
                : classes.button_sub_inactive
            }
            fullWidth
            onClick={() => changeSubMenu("homework")}
          >
            <Quiz sx={{ marginRight: 1 }}></Quiz> {t("profile-menu.homework")}
          </Button>
        </Fragment>
      ) : (
        ""
      )}
      <Divider sx={{ marginY: 3 }}></Divider>
      <Typography
        className={query.action === "profile" ? classes.button_active : ""}
        sx={{ cursor: "pointer" }}
        fontWeight={500}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        onClick={() => changeMenu("profile")}
      >
        <Face sx={{ marginRight: 1 }}></Face>
        {t("profile-page.information")}
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
    </Fragment>
  );
};

export default Menu;

const useStyles = makeStyles({
  button_active: {
    color: "#0076FF",
  },
  button_sub_active: {
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #50AFFF 0%, #0076FF 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #0076FF7A",
    borderRadius: "100px",
    textTransform: "none"
  },
  button_sub_inactive: {
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#000000",
    background: "#F1F8FE 0% 0% no-repeat padding-box",
    boxShadow: "none",
    borderRadius: "100px",
    textTransform: "none"
  },
});
