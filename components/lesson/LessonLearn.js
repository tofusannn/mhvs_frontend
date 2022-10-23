import { Coffee, NavigateNext } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import LessonMenu from "./LessonMenu";
import LessonQuiz from "./LessonQuiz";

const { Fragment, useState, useEffect } = require("react");

const LessonLearn = ({ lesson, chapter }) => {
  const classes = useStyles();
  const { query } = useRouter();
  const [startQuiz, setStartQuiz] = useState(false);
  console.log(chapter);
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
            {/* <Grid>
              <Button className={classes.button_confirm}>
                <Coffee sx={{ marginRight: 1 }}></Coffee>
                บันทึกและพักผ่อน
              </Button>
            </Grid> */}
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
              <LessonMenu chapter={chapter}></LessonMenu>
            </Grid>
            <Grid xs={9} item>
              <LessonQuiz
                chapter={chapter}
                startQuiz={startQuiz}
                setStartQuiz={setStartQuiz}
              ></LessonQuiz>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {startQuiz && (
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
          {/* <Button
          className={classes.button_cancel}
          variant="contained"
          onClick={() => {
            setOpenModal(false);
            setValidate(false);
            setAnswerPayload([]);
          }}
        >
          ยกเลิก
        </Button> */}
          <Button className={classes.button_submit} variant="contained">
            ส่งคำตอบ <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
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
