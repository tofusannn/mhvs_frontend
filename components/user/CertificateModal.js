import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  IconButton,
  Radio,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import certificate from "../../api/api_certificate";
import { useTranslations } from "next-intl";

const CertificateModal = ({ question, openModal, setOpenModal, lesson }) => {
  const t = useTranslations();
  const classes = useStyles();
  const router = useRouter();
  const [answerPayload, setAnswerPayload] = useState([]);
  const [validate, setValidate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [payloadSnackbar, setPayloadSnackbar] = useState({
    msg: "",
    status: false,
  });
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {}, [answerPayload]);

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
        questionnaire_cer_id: question.id,
        answer: answerPayload,
        lesson_id: lesson
      });
      setOpenSnackbar(true);
      setPayloadSnackbar(data);
      if (data.status) {
        setOpenModal(false);
        router.reload();
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

  return (
    <Dialog
      open={openModal}
      scroll={"body"}
      maxWidth={"md"}
      sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
    >
      <Card>
        <CardContent sx={{ paddingX: matches ? 22 : 3 }}>
          <Grid container justifyContent={"center"}>
            <CardMedia
              component="img"
              src="/image/modal_success.png"
            ></CardMedia>
          </Grid>
          <Typography fontWeight={500} fontSize={36} textAlign={"center"}>
            {t("certificate-page.title")}
          </Typography>
          {questionList()}
          <Grid mt={10} mb={1} container justifyContent={"space-between"}>
            <Button
              className={classes.button_cancel}
              variant="contained"
              onClick={() => {
                setOpenModal(false);
                setValidate(false);
                setAnswerPayload([]);
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              className={classes.button_confirm}
              variant="contained"
              onClick={() => handleClick()}
            >
              {t("certificate-page.button")}
            </Button>
          </Grid>
        </CardContent>
      </Card>
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
    </Dialog>
  );
};

export default CertificateModal;

const useStyles = makeStyles({
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
  button_confirm: {
    width: 228,
    height: 48,
    background: "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%)",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    borderRadius: 100,
    fontSize: 20,
    fontWeight: 500,
    color: "#ffffff",
    "@media (max-width: 600px)": {
      width: "100%",
      marginTop: "15px",
    },
  },
  button_cancel: {
    width: 228,
    height: 48,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "none",
    border: "2px solid #2DA373",
    borderRadius: 100,
    fontSize: 20,
    fontWeight: 500,
    color: "#2DA373",
    "&:hover": {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
    },
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
});
