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
import Lesson from "../../api/api_lesson";

const LessonMenu = ({ chapter, getLesson }) => {
  const classes = useStyles();
  const { query } = useRouter();

  async function handleClickMenu(chap, name, menu) {
    if (name === "pre_test") {
      return getLesson("learning", query.lesson, chap, name);
    }
    if (name === "post_test") {
      return getLesson("learning", query.lesson, chap, name);
    }
    if (name === "homework") {
      return getLesson("learning", query.lesson, chap, name);
    }
    if (name === "chapter") {
      let pass = 0;
      chapter.forEach(async (e) => {
        if (e.id === chap) {
          e.pre_test.user_action ? (pass += 1) : pass;
          e.video.user_action ? (pass += 1) : pass;
          e.file.user_action ? (pass += 1) : pass;
          e.post_test.user_action ? (pass += 1) : pass;
          e.homework.user_action ? (pass += 1) : pass;
          if (pass === 5) {
            const data = await Lesson.postUserLessonState({
              lesson_id: parseInt(query.lesson),
              chapter_id: chap,
              object_name: name,
              object_id: menu,
            });
            if (data.status) {
              getLesson("learning", query.lesson, chap, name);
            }
          } else {
            getLesson("learning", query.lesson, chap, name);
          }
        }
      });
      return;
    }
    const data = await Lesson.postUserLessonState({
      lesson_id: parseInt(query.lesson),
      chapter_id: chap,
      object_name: name,
      object_id: menu,
    });
    if (data.status) {
      getLesson("learning", query.lesson, chap, name);
    }
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
                : parseInt(query.chapter) === e.id
                ? { color: "#0076FF", cursor: "pointer" }
                : { color: "#121212", cursor: "pointer" }
            }
            onClick={() => handleClickMenu(e.id, "chapter", e.id)}
          >
            {e.chapter_name}
          </Typography>
          {parseInt(query.chapter) === e.id && (
            <Fragment>
              <Typography my={1} fontSize={14} sx={{ color: "#727272" }}>
                {e.chapter_pre_description}
              </Typography>
              <Button
                className={
                  e.pre_test.user_action
                    ? query.menu === "pre_test"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "pre_test"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  handleClickMenu(query.chapter, "pre_test", e.pre_test.id)
                }
              >
                <Grid container>
                  <Quiz sx={{ marginRight: 1 }}></Quiz> Pre-Quiz
                </Grid>
                {e.pre_test.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "pre_test"
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
                    ? query.menu === "video"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "video"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  handleClickMenu(query.chapter, "video", e.video.id)
                }
              >
                <Grid container>
                  <PlayCircle sx={{ marginRight: 1 }}></PlayCircle> Video
                </Grid>
                {e.video.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "video"
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
                    ? query.menu === "file"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "file"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  handleClickMenu(query.chapter, "file", e.file.id)
                }
              >
                <Grid container>
                  <PictureAsPdf sx={{ marginRight: 1 }}></PictureAsPdf> PDF
                </Grid>
                {e.file.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "file"
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
                    ? query.menu === "post_test"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "post_test"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  handleClickMenu(query.chapter, "post_test", e.post_test.id)
                }
              >
                <Grid container>
                  <Quiz sx={{ marginRight: 1 }}></Quiz> Quiz
                </Grid>
                {e.post_test.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "post_test"
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
                    ? query.menu === "homework"
                      ? classes.button_passed_active
                      : classes.button_passed_inactive
                    : query.menu === "homework"
                    ? classes.button_sub_active
                    : classes.button_sub_inactive
                }
                fullWidth
                onClick={() =>
                  handleClickMenu(query.chapter, "homework", e.homework.id)
                }
              >
                <Grid container>
                  <Description sx={{ marginRight: 1 }}></Description> Homework
                </Grid>
                {e.homework.user_action && (
                  <CheckCircle
                    sx={
                      query.menu === "homework"
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
