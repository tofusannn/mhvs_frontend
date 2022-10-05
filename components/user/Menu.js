import { Face, MenuBook, PlayCircle, Quiz } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Menu = ({ payload }) => {
  const classes = useStyles();
  const { push, query } = useRouter();

  function changeMenu(path) {
    push({ pathname: "/user", query: { action: path } });
  }

  function changeSubMenu(path) {
    push({ pathname: "/user", query: { action: "lesson", type: path } });
  }
  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={16}>
        ยินดีต้อนรับ!
      </Typography>
      <Typography fontWeight={500} fontSize={28}>
        คุณ{payload.first_name} {payload.last_name}
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
      <Typography
        className={query.action === "lesson" ? classes.button_active : ""}
        sx={{ cursor: "pointer" }}
        fontWeight={500}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        onClick={() => changeSubMenu("lesson")}
      >
        <MenuBook sx={{ marginRight: 1 }}></MenuBook> บทเรียนของคุณ
      </Typography>
      {query.action === "lesson" ? (
        <Fragment>
          <Typography pl={4} color={"#727272"} fontSize={14}>
            รายการบทเรียนที่คุณลงทะเบียนเรียน
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
            <PlayCircle sx={{ marginRight: 1 }}></PlayCircle> บทเรียน
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
            <Quiz sx={{ marginRight: 1 }}></Quiz> การบ้าน
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
        <Face sx={{ marginRight: 1 }}></Face> ข้อมูลของคุณ
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
  },
});
