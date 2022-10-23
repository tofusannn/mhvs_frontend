import { NavigateNext } from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Radio,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const mockQuestion = {
  question: [
    {
      index: 1,
      question: "เพศตามที่ใช้ชีวิตปัจจุบัน",
      question_cer_id: 11,
      answer: [
        {
          index: 1,
          choice: "ผู้ชาย",
          is_input: false,
          answer_cer_id: 1,
        },
        {
          index: 2,
          choice: "ผู้หญิง",
          is_input: false,
          answer_cer_id: 2,
        },
        {
          index: 3,
          choice: "เพศทางเลือก",
          is_input: false,
          answer_cer_id: 3,
        },
      ],
    },
    {
      index: 2,
      question: "ท่านนับถือศาสนา",
      question_cer_id: 12,
      answer: [
        {
          index: 1,
          choice: "พุทธ",
          is_input: false,
          answer_cer_id: 4,
        },
        {
          index: 2,
          choice: "คริสต์",
          is_input: false,
          answer_cer_id: 5,
        },
        {
          index: 3,
          choice: "อิสลาม",
          is_input: false,
          answer_cer_id: 6,
        },
        {
          index: 4,
          choice: "ผี/บรรพบุรุษ",
          is_input: false,
          answer_cer_id: 7,
        },
        {
          index: 5,
          choice: "ไม่นับถือศาสนา",
          is_input: false,
          answer_cer_id: 8,
        },
      ],
    },
    {
      index: 3,
      question: "ปัจจุบันท่านอายุ....ปี",
      question_cer_id: 13,
      answer: [
        {
          index: 1,
          choice: "อายุ",
          is_input: true,
          answer_cer_id: 9,
        },
      ],
    },
  ],
};

const LessonQuiz = ({ chapter, startQuiz, setStartQuiz }) => {
  const classes = useStyles();
  const { query } = useRouter();
  const [question, setQuestion] = useState({});
  const [answerPayload, setAnswerPayload] = useState([]);
  const [validate, setValidate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [payloadSnackbar, setPayloadSnackbar] = useState({
    msg: "",
    status: false,
  });

  useEffect(() => {}, [answerPayload]);

  function startQuizClick(params) {
    setStartQuiz(true);
    setQuestion(mockQuestion);
  }

  function questionList() {
    const rows = [];
    question &&
      question.question.forEach((header, idx) => {
        rows.push(
          <Grid mt={5} key={header.index}>
            <Grid container>
              <Typography fontWeight={500} fontSize={20} mr={1}>
                {header.index}.
              </Typography>
              <Typography fontWeight={500} fontSize={20}>
                {header.question}
              </Typography>
            </Grid>
            {answerList(header, idx)}
          </Grid>
        );
      });
    return rows;
  }

  function answerList(header) {
    const rows = [];
    header.answer.forEach((ans) => {
      rows.push(
        <Grid ml={1} key={ans.index}>
          <Grid container alignItems={"center"}>
            <Radio
              className={checkValidate(
                header.question_cer_id,
                ans.answer_cer_id
              )}
              size="small"
              checked={checkPayload(header.question_cer_id, ans.answer_cer_id)}
              onChange={() =>
                handleChangeRadio(header.question_cer_id, ans.answer_cer_id)
              }
              value={ans.answer_cer_id}
            ></Radio>
            <Typography
              className={checkValidate(
                header.question_cer_id,
                ans.answer_cer_id
              )}
              fontWeight={400}
              fontSize={20}
            >
              {ans.choice}
            </Typography>
          </Grid>
          {ans.is_input && (
            <Grid mt={1} ml={5} xs={7} item>
              <TextField
                disabled={
                  !checkPayload(header.question_cer_id, ans.answer_cer_id)
                }
                className={classes.text_field}
                fullWidth
                size="small"
                onChange={(e) =>
                  handleChangeTextField(
                    header.question_cer_id,
                    ans.answer_cer_id,
                    e
                  )
                }
              ></TextField>
            </Grid>
          )}
        </Grid>
      );
    });
    return rows;
  }

  function checkPayload(quest, answer) {
    const bl = false;
    answerPayload.forEach((item) => {
      if (item.question_cer_id === quest) {
        if (item.answer_cer_id === answer) {
          bl = true;
        }
      }
    });
    return bl;
  }

  function checkValidate(quest, answer) {
    const bl = "";
    answerPayload.forEach((item) => {
      if (item.question_cer_id === quest) {
        if (item.answer_cer_id === answer) {
          bl = classes.select_choice;
        }
      }
    });
    if (
      validate &&
      answerPayload.map((e) => e.question_cer_id).indexOf(quest) === -1
    ) {
      bl = classes.validate_choice;
    }
    return bl;
  }

  function handleChangeRadio(quest, answer) {
    const newArr = [];
    if (answerPayload.length) {
      answerPayload.forEach((item) => {
        newArr.push(item);
        if (item.question_cer_id === quest) {
          const idx = newArr.map((e) => e.question_cer_id).indexOf(quest);
          newArr.splice(idx, 1);
        }
      });
    }
    newArr.push({
      question_cer_id: quest,
      answer_cer_id: answer,
      input_text: "",
    });
    setAnswerPayload(newArr);
  }

  function handleChangeTextField(quest, answer, e) {
    const idx = answerPayload.map((i) => i.question_cer_id).indexOf(quest);
    answerPayload[idx].input_text = e.target.value;
  }

  async function handleClick() {
    const valid = true;
    question.question.forEach((header) => {
      if (
        answerPayload
          .map((e) => e.question_cer_id)
          .indexOf(header.question_cer_id) === -1
      ) {
        valid = false;
      } else {
        header.answer.forEach((ans) => {
          if (ans.is_input) {
            const idx = answerPayload
              .map((e) => e.question_cer_id)
              .indexOf(header.question_cer_id);
            if (answerPayload[idx].input_text === "") {
              valid = false;
            }
          }
        });
      }
    });
    if (valid) {
      const data = await certificate.postUserQuestCertificate({
        answer: answerPayload,
      });
      setOpenSnackbar(true);
      setPayloadSnackbar(data);
      if (data.status) {
        setOpenModal(false);
        // router.reload();
      }
    }
    setValidate(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  function getDetails(menu) {
    switch (menu) {
      case "1":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chapter[parseInt(query.chapter) - 1].pre_test.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>
                {chapter[parseInt(query.chapter) - 1].pre_test.description}
              </Typography>
              <Button
                className={classes.button_start}
                onClick={() => startQuizClick()}
              >
                เริ่มทำแบบทดสอบ{" "}
                <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
              </Button>
            </Fragment>
          </Fragment>
        );
        break;
      case "2":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chapter[parseInt(query.chapter) - 1].video.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>
                {chapter[parseInt(query.chapter) - 1].video.description}
              </Typography>
            </Fragment>
          </Fragment>
        );
        break;
      case "3":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chapter[parseInt(query.chapter) - 1].file.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>
                {chapter[parseInt(query.chapter) - 1].file.description}
              </Typography>
            </Fragment>
          </Fragment>
        );
        break;
      case "4":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chapter[parseInt(query.chapter) - 1].post_test.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>
                {chapter[parseInt(query.chapter) - 1].post_test.description}
              </Typography>
              <Button
                className={classes.button_start}
                onClick={() => startQuizClick()}
              >
                เริ่มทำแบบทดสอบ{" "}
                <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
              </Button>
            </Fragment>
          </Fragment>
        );
        break;
      case "5":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chapter[parseInt(query.chapter) - 1].homework.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>
                {chapter[parseInt(query.chapter) - 1].homework.description}
              </Typography>
            </Fragment>
          </Fragment>
        );
        break;
    }
  }

  return (
    <Fragment>
      {chapter.length ? getDetails(query.menu) : ""}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={payloadSnackbar.status ? "success" : "error"}
          sx={{ width: 250 }}
        >
          {payloadSnackbar.msg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LessonQuiz;

const useStyles = makeStyles({
  button_start: {
    marginTop: 26,
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
  select_choice: {
    color: "#3CBB8E",
    "&.Mui-checked": {
      color: "#3CBB8E",
    },
  },
  validate_choice: {
    color: "red",
  },
  text_field: {
    "& input:hover + fieldset": {
      borderColor: "#3CBB8E",
    },
    "& input + fieldset": {
      borderColor: "#3CBB8E",
    },
  },
});
