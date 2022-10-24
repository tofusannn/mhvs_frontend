import {
  CheckCircle,
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

  function handleClickMenu(menu) {
    push({ pathname, query: { ...query, menu: menu } });
  }

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
                ? { color: "#3CBB8E", cursor: "pointer" }
                : parseInt(query.chapter) === e.index
                ? { color: "#0076FF", cursor: "pointer" }
                : { color: "#121212", cursor: "pointer" }
            }
            onClick={() =>
              push({
                pathname,
                query: { ...query, chapter: e.index, menu: "1" },
              })
            }
          >
            {e.chapter_name}
          </Typography>
          {parseInt(query.chapter) === e.index && (
            <Fragment>
              <Typography my={1} fontSize={14} sx={{ color: "#727272" }}>
                {e.chapter_pre_description}
              </Typography>
              <Button
                className={
                  e.pre_test.user_action
                    ? query.menu === "1"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "1"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={e.pre_test.user_action}
                fullWidth
                onClick={() => handleClickMenu("1")}
              >
                <Grid container>
                  <Quiz sx={{ marginRight: 1 }}></Quiz> Pre-Quiz
                </Grid>
                {e.pre_test.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "1"
                        ? { color: "#ffffff" }
                        : { color: "#3CBB8E" }
                    }
                    fontSize={"large"}
                  ></CheckCircle>
                )}
              </Button>
              <Button
                className={
                  e.video.user_action
                    ? query.menu === "2"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "2"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() => handleClickMenu("2")}
              >
                <Grid container>
                  <PlayCircle sx={{ marginRight: 1 }}></PlayCircle> Video
                </Grid>
                {e.video.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "2"
                        ? { color: "#ffffff" }
                        : { color: "#3CBB8E" }
                    }
                    fontSize={"large"}
                  ></CheckCircle>
                )}
              </Button>
              <Button
                className={
                  e.file.user_action
                    ? query.menu === "3"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "3"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() => handleClickMenu("3")}
              >
                <Grid container>
                  <PictureAsPdf sx={{ marginRight: 1 }}></PictureAsPdf> PDF
                </Grid>
                {e.file.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "3"
                        ? { color: "#ffffff" }
                        : { color: "#3CBB8E" }
                    }
                    fontSize={"large"}
                  ></CheckCircle>
                )}
              </Button>
              <Button
                className={
                  e.post_test.user_action
                    ? query.menu === "4"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "4"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={e.post_test.user_action || !e.file.user_action}
                fullWidth
                onClick={() => handleClickMenu("4")}
              >
                <Grid container>
                  <Quiz sx={{ marginRight: 1 }}></Quiz> Quiz
                </Grid>
                {e.post_test.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "4"
                        ? { color: "#ffffff" }
                        : { color: "#3CBB8E" }
                    }
                    fontSize={"large"}
                  ></CheckCircle>
                )}
              </Button>
              <Button
                className={
                  e.homework.user_action
                    ? query.menu === "5"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "5"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                disabled={!e.post_test.user_action}
                fullWidth
                onClick={() => handleClickMenu("5")}
              >
                <Grid container>
                  <Description sx={{ marginRight: 1 }}></Description> Homework
                </Grid>
                {e.homework.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "5"
                        ? { color: "#ffffff" }
                        : { color: "#3CBB8E" }
                    }
                    fontSize={"large"}
                  ></CheckCircle>
                )}
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
  button_passed_active: {
    fontSize: 16,
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #3CBB8E 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #3CBB8E",
    borderRadius: "100px",
    textTransform: "none",
  },
  button_passed_inactive: {
    fontSize: 16,
    justifyContent: "start",
    paddingLeft: 16,
    marginTop: 16,
    height: 50,
    color: "#000000",
    background: "#DBFFF2",
    boxShadow: "none",
    borderRadius: "100px",
    textTransform: "none",
  },
});
