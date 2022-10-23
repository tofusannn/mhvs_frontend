import {
  Description,
  PictureAsPdf,
  PlayCircle,
  Quiz,
} from "@mui/icons-material";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment } from "react";

const LessonMenu = ({ chapter }) => {
  const classes = useStyles();
  const { push, pathname, query } = useRouter();

  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={28}>
        ความคืบหน้า
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
      {chapter.map((e, idx) => (
        <Grid key={idx}>
          <Typography
            fontWeight={500}
            fontSize={20}
            sx={
              e.user_action
                ? { color: "#3CBB8E" }
                : parseInt(query.chapter) === e.index
                ? { color: "#0076FF" }
                : { color: "#121212" }
            }
          >
            {e.chapter_name}
          </Typography>
          {parseInt(query.chapter) === e.index && (
            <Fragment>
              <Typography fontSize={14} sx={{ color: "#727272" }}>
                {e.chapter_pre_description}
              </Typography>
              <Button
                className={
                  query.menu === "1"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  push({ pathname, query: { ...query, menu: "1" } })
                }
              >
                <Quiz sx={{ marginRight: 1 }}></Quiz> Pre-Quiz
              </Button>
              <Button
                className={
                  query.menu === "2"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={!e.pre_test.user_action}
                fullWidth
                onClick={() =>
                  push({ pathname, query: { ...query, menu: "2" } })
                }
              >
                <PlayCircle sx={{ marginRight: 1 }}></PlayCircle> Video
              </Button>
              <Button
                className={
                  query.menu === "3"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={!e.video.user_action}
                fullWidth
                onClick={() =>
                  push({ pathname, query: { ...query, menu: "3" } })
                }
              >
                <PictureAsPdf sx={{ marginRight: 1 }}></PictureAsPdf> PDF
              </Button>
              <Button
                className={
                  query.menu === "4"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={!e.file.user_action}
                fullWidth
                onClick={() =>
                  push({ pathname, query: { ...query, menu: "4" } })
                }
              >
                <Quiz sx={{ marginRight: 1 }}></Quiz> Quiz
              </Button>
              <Button
                className={
                  query.menu === "5"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={!e.post_test.user_action}
                fullWidth
                onClick={() =>
                  push({ pathname, query: { ...query, menu: "5" } })
                }
              >
                <Description sx={{ marginRight: 1 }}></Description> Homework
              </Button>
            </Fragment>
          )}
          {chapter.length != idx + 1 && <Divider sx={{ marginY: 3 }}></Divider>}
        </Grid>
      ))}
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
