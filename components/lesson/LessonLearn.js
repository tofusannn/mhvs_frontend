import { Coffee, NavigateNext } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Lesson from "../../api/api_lesson";
import LessonMenu from "./LessonMenu";
import LessonQuiz from "./LessonQuiz";

const { Fragment, useState, useEffect } = require("react");

const LessonLearn = ({ lesson, chapter, getLesson }) => {
  const classes = useStyles();
  const { push, pathname, query } = useRouter();
  const [startQuiz, setStartQuiz] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    setStartQuiz(false);
    setConfirm(false);
    setButtonNext(false);
  }, [query]);

  async function handleClick() {
    let chap = 0;
    let name = "";
    let menu = 0;
    const idxChapter = chapter
      .map((e) => e.id)
      .indexOf(parseInt(query.chapter));
    const chapArray = chapter[idxChapter];
    switch (query.name) {
      case "pre_test":
        if (chapArray.video.display) {
          chap = query.chapter;
          name = "video";
          menu = chapArray.video.id;
        } else if (chapArray.file.display) {
          chap = query.chapter;
          name = "file";
          menu = chapArray.file.id;
        } else {
          chap = query.chapter;
          name = "post_test";
          menu = chapArray.post_test.id;
        }
        break;
      case "video":
        if (chapArray.file.display) {
          chap = query.chapter;
          name = "file";
          menu = chapArray.file.id;
        } else {
          chap = query.chapter;
          name = "post_test";
          menu = chapArray.post_test.id;
        }
        break;
      case "file":
        chap = query.chapter;
        name = "post_test";
        menu = chapArray.post_test.id;
        break;
      case "post_test":
        if (chapArray.homework.display) {
          chap = query.chapter;
          name = "homework";
          menu = chapArray.homework.id;
        } else {
          if (chapter[idxChapter + 1]) {
            chap = chapter[idxChapter + 1].id;
            name = "pre_test";
            menu = chapter[idxChapter + 1].pre_test.id;
          } else {
            chap = query.chapter;
            name = "post_test";
            menu = chapArray.post_test.id;
          }
          const data = await Lesson.postUserLessonState({
            lesson_id: parseInt(query.lesson),
            chapter_id: parseInt(query.chapter),
            object_name: "chapter",
            object_id: parseInt(query.chapter),
          });
        }
        break;
    }
    const data = await Lesson.postUserLessonState({
      lesson_id: parseInt(query.lesson),
      chapter_id: parseInt(query.chapter),
      object_name: query.name,
      object_id: parseInt(query.menu),
    });
    if (data.status) {
      getLesson("learning", query.lesson, chap, name, menu);
    }
  }

  return (
    <Fragment>
      <Grid>
        <Container>
          <Grid
            sx={{ height: 130 }}
            container
            alignContent={"center"}
            justifyContent={"space-between"}
          >
            <Grid>
              <Typography fontWeight={500} fontSize={32}>
                บทเรียนออนไลน์ :{" "}
                <span style={{ color: "#0076FF" }}>{lesson.lesson_name}</span>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid
        sx={{
          background:
            "transparent linear-gradient(180deg, #F7F7F7 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box;",
        }}
        py={3}
        mb={10}
      >
        <Container>
          <Grid container>
            <Grid xs={3} pr={3} item>
              <LessonMenu chapter={chapter} getLesson={getLesson}></LessonMenu>
            </Grid>
            <Grid xs={9} item>
              <LessonQuiz
                chapter={chapter}
                startQuiz={startQuiz}
                setStartQuiz={setStartQuiz}
                confirm={confirm}
                setButtonNext={setButtonNext}
                handleClickNext={handleClick}
              ></LessonQuiz>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {startQuiz && !buttonNext && (
        <Grid
          mt={10}
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            background: "#F1F8FE 0% 0% no-repeat padding-box",
            minHeight: 90,
          }}
        >
          <Button
            className={classes.button_submit}
            variant="contained"
            onClick={() => setConfirm(true)}
          >
            ส่งคำตอบ <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
          </Button>
        </Grid>
      )}
      {query.name != "pre_test" && query.name != "post_test" && (
        <Grid
          mt={10}
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            background: "#F1F8FE 0% 0% no-repeat padding-box",
            minHeight: 90,
          }}
        >
          <Button
            className={classes.button_submit}
            variant="contained"
            onClick={() => handleClick()}
          >
            บทถัดไป <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
          </Button>
        </Grid>
      )}
    </Fragment>
  );
};

export default LessonLearn;

const useStyles = makeStyles({
  button_confirm: {
    width: 225,
    color: "#2DA373",
    borderRadius: 100,
    boxShadow: "none",
    fontWeight: 500,
    fontSize: 18,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "2px solid #2DA373",
  },
  button_submit: {
    width: 225,
    height: 48,
    color: "#ffffff",
    borderRadius: 100,
    borderColor: "#ffffff",
    textTransform: "none",
    fontWeight: 500,
    fontSize: 20,
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #3CBB8E7A",
  },
  button_cancel: {
    marginRight: 30,
    width: 225,
    height: 48,
    color: "#2DA373",
    borderRadius: 100,
    boxShadow: "none",
    fontWeight: 500,
    fontSize: 18,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "2px solid #2DA373",
  },
});
