import { Quiz } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment } from "react";

const LessonMenu = () => {
  const classes = useStyles();
  const { query } = useRouter();

  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={28}>
        ความคืบหน้า
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
      <Typography
        fontWeight={500}
        fontSize={20}
        sx={query.chapter === "1" ? { color: "#0076FF" } : { color: "#3CBB8E" }}
      >
        บทที่ 1
      </Typography>
      <Typography fontSize={14} sx={{ color: "#727272" }}>
        ความรู้เบื้องต้นเกี่ยวกับไวรัสโรคทางเดินหายใจอุบัติใหม่
        ไวรัสโคโรนาพันธุ์ใหม่ (โควิด-19)
      </Typography>
      <Button
        className={
          query.chapter === "1"
            ? classes.button_sub_active
            : classes.button_sub_inactive
        }
        disabled={query.chapter != "1"}
        fullWidth
      >
        <Quiz sx={{ marginRight: 1 }}></Quiz> Pre-Quiz
      </Button>
      {/* <Button
        className={
          query.chapter === "2"
            ? classes.button_sub_active
            : classes.button_sub_inactive
        }
        disabled={query.chapter != "2"}
        fullWidth
      >
        <Quiz sx={{ marginRight: 1 }}></Quiz> Quiz
      </Button> */}
    </Fragment>
  );
};

export default LessonMenu;

const useStyles = makeStyles({
  button_active: {
    color: "#0076FF",
  },
  button_sub_active: {
    fontSize: 16,
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #50AFFF 0%, #0076FF 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #0076FF7A",
    borderRadius: "100px",
    textTransform: "none",
  },
  button_sub_inactive: {
    fontSize: 16,
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#000000",
    background: "#F1F1F1 0% 0% no-repeat padding-box",
    boxShadow: "none",
    borderRadius: "100px",
    textTransform: "none",
  },
});
