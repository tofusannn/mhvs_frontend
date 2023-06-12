import { Description, NavigateNext } from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Link,
  Radio,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Lesson from "../../api/api_lesson";
import Question from "../../api/api_question";
import ModalSuccess from "../common/ModalSuccess";
import ModalFail from "../common/ModalFail";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import ModalPopup from "../common/ModalPopup";
import Image from "next/image";
import popupImage from "../../public/image/popup-image/PopUp_png_Pop Up 02.png";
const path = process.env.NEXT_PUBLIC_BASE_API;

const LessonQuiz = ({
  chapter,
  startQuiz,
  setStartQuiz,
  confirm,
  setButtonNext,
  handleClickNext,
  setConfirm,
}) => {
  const classes = useStyles();
  const { pathname, query, push } = useRouter();
  const [question, setQuestion] = useState({});
  const [answerPayload, setAnswerPayload] = useState([]);
  const [validate, setValidate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFail, setOpenModalFail] = useState(false);
  const [payloadSnackbar, setPayloadSnackbar] = useState({
    msg: "",
    status: false,
  });
  const [questPayload, setQuestPayload] = useState({ type: "", id: "" });
  const [score, setScore] = useState("");
  const [objectId, setObjectId] = useState();
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");
  const count = Cookies.get("count");
  useEffect(() => {
    confirm && handleClick();
  }, [confirm]);

  useEffect(() => {}, [answerPayload]);

  useEffect(() => {
    setScore("");
    setPayloadSnackbar({
      msg: "",
      status: false,
    });
    setAnswerPayload([]);
    setValidate(false);
  }, [query]);

  async function startQuizClick(type, id) {
    setQuestPayload({ type: type, id: id });
    const data = await Question.getQuestionList(id);
    setQuestion(data.result);
    setStartQuiz(true);
  }

  function questionList() {
    const rows = [];
    question &&
      question.question.forEach((header, idx) => {
        rows.push(
          <Grid mt={5} key={header.index}>
            <Grid container>
              <Typography fontWeight={500} fontSize={20}>
                {header.index}.{header.question}
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
              className={checkValidate(header.question_id, ans.answer_id)}
              size="small"
              checked={checkPayload(header.question_id, ans.answer_id)}
              // disabled={confirm}
              onChange={() =>
                handleChangeRadio(header.question_id, ans.answer_id)
              }
              value={ans.answer_id}
            ></Radio>
            <Typography
              className={checkValidate(header.question_id, ans.answer_id)}
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
                  !checkPayload(header.question_id, ans.answer_id) || confirm
                }
                className={classes.text_field}
                fullWidth
                size="small"
                onChange={(e) =>
                  handleChangeTextField(header.question_id, ans.answer_id, e)
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
      if (item.question_id === quest) {
        if (item.answer_id === answer) {
          bl = true;
        }
      }
    });
    return bl;
  }

  function checkValidate(quest, answer) {
    const bl = "";
    answerPayload.forEach((item) => {
      if (item.question_id === quest) {
        if (item.answer_id === answer) {
          bl = classes.select_choice;
        }
      }
    });
    if (
      validate &&
      answerPayload.map((e) => e.question_id).indexOf(quest) === -1
    ) {
      bl = classes.validate_choice;
    }
    return bl;
  }

  function handleChangeRadio(quest, answer) {
    setConfirm(false);
    const newArr = [];
    if (answerPayload.length) {
      answerPayload.forEach((item) => {
        newArr.push(item);
        if (item.question_id === quest) {
          const idx = newArr.map((e) => e.question_id).indexOf(quest);
          newArr.splice(idx, 1);
        }
      });
    }
    newArr.push({
      question_id: quest,
      answer_id: answer,
      input_text: "",
    });
    setAnswerPayload(newArr);
  }

  function handleChangeTextField(quest, answer, e) {
    const idx = answerPayload.map((i) => i.question_id).indexOf(quest);
    answerPayload[idx].input_text = e.target.value;
  }

  async function handleClick() {
    const valid = true;
    question.question.forEach((header) => {
      if (
        answerPayload.map((e) => e.question_id).indexOf(header.question_id) ===
        -1
      ) {
        valid = false;
      } else {
        header.answer.forEach((ans) => {
          if (ans.is_input) {
            const idx = answerPayload
              .map((e) => e.question_id)
              .indexOf(header.question_id);
            if (answerPayload[idx].input_text === "") {
              valid = false;
            }
          }
        });
      }
    });
    if (valid) {
      const data = await Question.postQuestion({
        question_detail_id: questPayload.id,
        quiz_type: questPayload.type,
        answer: answerPayload,
      });
      setOpenSnackbar(true);
      setPayloadSnackbar(data);
      if (data.status) {
        if (count === "2") {
          await Lesson.postUserLessonState({
            lesson_id: parseInt(query.lesson),
            chapter_id: parseInt(query.chapter),
            object_name: query.name,
            object_id: objectId,
          });
          setScore(`${data.result.total_score} / ${data.result.max_score}`);
          setButtonNext(true);
          setOpenModalSuccess(true);
          await Lesson.postUserLessonState({
            lesson_id: parseInt(query.lesson),
            chapter_id: parseInt(query.chapter),
            object_name: "chapter",
            object_id: parseInt(query.chapter),
          });
        } else {
          if (data.result.estimate) {
            await Lesson.postUserLessonState({
              lesson_id: parseInt(query.lesson),
              chapter_id: parseInt(query.chapter),
              object_name: query.name,
              object_id: objectId,
            });
            setScore(`${data.result.total_score} / ${data.result.max_score}`);
            setButtonNext(true);
            setOpenModalSuccess(true);
          } else {
            setOpenModalFail(true);
            setScore(`${data.result.total_score} / ${data.result.max_score}`);
            checkCount();
          }
        }
      }
    }
    setValidate(true);
  }

  function checkCount() {
    if (count) {
      if (count === "1") {
        Cookies.set("count", "2");
      } else {
        Cookies.set("count", "");
      }
    } else {
      Cookies.set("count", "1");
    }
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  function getDetails(name) {
    const chap = {};
    chapter.forEach((e) => {
      const b = parseInt(query.chapter);
      if (e.id === b) {
        chap = e;
      }
    });
    switch (name) {
      case "pre_test":
        return (
          <Fragment>
            <Grid container alignItems={"center"}>
              <Typography fontWeight={500} fontSize={28}>
                {chap.pre_test.name}
              </Typography>
              {/* {score && (
                <Typography
                  ml={3}
                  sx={{
                    width: 114,
                    color: "#0076FF",
                    border: "1px solid #0076FF",
                  }}
                  fontSize={16}
                  textAlign={"center"}
                >
                  {score} คะแนน
                </Typography>
              )} */}
            </Grid>
            <Divider sx={{ marginY: 3 }}></Divider>
            {startQuiz ? (
              <Fragment>{questionList()}</Fragment>
            ) : (
              <Fragment>
                <Typography fontSize={16}>
                  {chap.pre_test.description}
                </Typography>
                {chap.pre_test.user_action ? (
                  <Grid
                    item
                    mt={5}
                    sx={{
                      border: "3px solid #3CBB8E",
                      padding: 1,
                      textAlign: "center",
                    }}
                    xs={12}
                    sm={3}
                  >
                    <Typography
                      color={"#3CBB8E"}
                      fontSize={24}
                      fontWeight={700}
                    >
                      {t("lesson-page.passed")}
                    </Typography>
                  </Grid>
                ) : (
                  <Button
                    className={classes.button_start}
                    sx={{ width: 225 }}
                    onClick={() => {
                      startQuizClick(
                        chap.pre_test.test_type,
                        chap.pre_test.test_id
                      );
                      setObjectId(chap.pre_test.id);
                    }}
                  >
                    {t("lesson-page.start")}{" "}
                    <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
                  </Button>
                )}
              </Fragment>
            )}
          </Fragment>
        );
        break;
      case "video":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chap.video.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>{chap.video.description}</Typography>
              {chap.video.link.map((e, idx) => (
                <Grid mt={3} key={idx}>
                  <Typography mb={1} fontWeight={500} fontSize={16}>
                    {e.name}
                  </Typography>
                  <Typography mb={3} fontSize={14}>
                    {e.description}
                  </Typography>
                  <iframe
                    height="576"
                    width="100%"
                    src={e.link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Grid>
              ))}
            </Fragment>
          </Fragment>
        );
        break;
      case "file":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chap.file.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography mb={3} fontSize={16}>
                {chap.file.description}
              </Typography>
              {chap.file.file.map((e, idx) => (
                <Grid mt={3} key={idx}>
                  {/* <Link
                    href={`${path}${e.file_path}`}
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        color: "#1B6665",
                        background: "#D8F8E4",
                        fontSize: 24,
                        textTransform: "none",
                      }}
                    >
                      <Description
                        sx={{ marginRight: 1, color: "#1B6665" }}
                        fontSize="large"
                      ></Description>
                      {e.file_name}
                    </Button>
                  </Link> */}
                  <img width="100%" src={`${path}${e.file_path}`}></img>
                </Grid>
              ))}
            </Fragment>
          </Fragment>
        );
        break;
      case "post_test":
        return (
          <Fragment>
            <Grid container alignItems={"center"}>
              <Typography fontWeight={500} fontSize={28}>
                {chap.post_test.name}
              </Typography>
              {/* {score && (
                <Typography
                  ml={3}
                  sx={{
                    width: 114,
                    color: "#0076FF",
                    border: "1px solid #0076FF",
                  }}
                  fontSize={16}
                  textAlign={"center"}
                >
                  {score} คะแนน
                </Typography>
              )} */}
            </Grid>
            <Divider sx={{ marginY: 3 }}></Divider>
            {startQuiz ? (
              <Fragment>{questionList()}</Fragment>
            ) : (
              <Fragment>
                <Typography fontSize={16}>
                  {chap.post_test.description}
                </Typography>
                {chap.post_test.user_action ? (
                  <Grid
                    item
                    mt={5}
                    sx={{ border: "3px solid #3CBB8E", padding: 1 }}
                    xs={12}
                    sm={3}
                  >
                    <Typography
                      color={"#3CBB8E"}
                      fontSize={24}
                      fontWeight={700}
                    >
                      {t("lesson-page.passed")}
                    </Typography>
                  </Grid>
                ) : (
                  <Button
                    className={classes.button_start}
                    sx={{ width: 225 }}
                    onClick={() => {
                      startQuizClick(
                        chap.post_test.test_type,
                        chap.post_test.test_id
                      );
                      setObjectId(chap.post_test.id);
                    }}
                  >
                    {t("lesson-page.start")}{" "}
                    <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
                  </Button>
                )}
              </Fragment>
            )}
          </Fragment>
        );
        break;
      case "homework":
        return (
          <Fragment>
            <Typography fontWeight={500} fontSize={28}>
              {chap.homework.name}
            </Typography>
            <Divider sx={{ marginY: 3 }}></Divider>
            <Fragment>
              <Typography fontSize={16}>{chap.homework.description}</Typography>
              <Button
                className={classes.button_start}
                variant="contained"
                onClick={() => setOpen(true)}
              >
                {t("profile-page.sent-homework")}{" "}
                <NavigateNext sx={{ marginLeft: 1 }}></NavigateNext>
              </Button>
              <Typography
                sx={{ marginTop: 2, color: "#666666" }}
                fontWeight={300}
                fontSize={12}
              >
                *{t("lesson-page.homework-des")}
              </Typography>
            </Fragment>
          </Fragment>
        );
        break;
    }
  }

  return (
    <Fragment>
      {chapter.length ? getDetails(query.name) : ""}
      <ModalPopup
        open={open}
        setOpen={setOpen}
        textButton={"ส่งงาน"}
        funcButton={async () => {
          setOpen(false);
          push({
            pathname: "/user",
            query: {
              action: "lesson",
              type: "homework",
              lesson: query.lesson,
            },
          });
        }}
      >
        <Image alt="img" src={popupImage} objectFit="cover"></Image>
        <Typography textAlign={"center"} fontWeight={600} fontSize={20}>
          กรุณาแนบภาพให้ครบจํานวน 3 ภาพ
        </Typography>
      </ModalPopup>
      <ModalSuccess
        type={query.name}
        openModalSuccess={openModalSuccess}
        setOpenModalSuccess={setOpenModalSuccess}
        handleClickNext={handleClickNext}
        setOpenSnackbar={setOpenSnackbar}
        score={score}
      ></ModalSuccess>
      <ModalFail
        openModalFail={openModalFail}
        setOpenModalFail={setOpenModalFail}
        handleClickNext={handleClickNext}
        setOpenSnackbar={setOpenSnackbar}
        score={score}
      ></ModalFail>
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
    minWidth: 174,
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
