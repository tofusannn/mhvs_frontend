import { CheckCircle } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import certificate from "../../api/api_certificate";
import CertificateModal from "./CertificateModal";
import lessonApi from "../../api/api_lesson";
import Homework from "../../api/api_homework";

const header_lesson = ["บทเรียนของคุณ", "สถานะ", "ใบเกียรติบัตร"];
const header_homework = ["รายการ", "บทเรียน", "สถานะ", ""];

const Lesson = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const [lesson, setLesson] = useState([]);
  const [homework, setHomework] = useState([]);
  const [question, setQuestion] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getLessonList();
    getHomeworkList();
  }, []);

  async function getHomeworkList() {
    const data = await Homework.getUserHomework();
    setHomework(data.result);
  }

  async function getLessonList() {
    const data = await lessonApi.getUserLessonList();
    setLesson(data.result);
  }

  async function getQuestion() {
    const data = await certificate.getQuestCertificate();
    setOpenModal(data.status);
    setQuestion(data.result);
  }

  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={28}>
        บทเรียนของคุณ
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, boxShadow: "none", border: "1px solid #D6D6D6" }}
      >
        <Table>
          <TableHead sx={{ background: "#1276FF" }}>
            <TableRow>
              {query.type === "lesson"
                ? header_lesson.map((e) => (
                    <TableCell
                      key={e}
                      sx={{
                        width: "33%",
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#ffffff",
                      }}
                    >
                      {e}
                    </TableCell>
                  ))
                : header_homework.map((e) => (
                    <TableCell
                      key={e}
                      sx={{
                        width: "25%",
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#ffffff",
                      }}
                    >
                      {e}
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {query.type === "lesson"
              ? lesson.map((e, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#F9F9F9",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.lesson_name}
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems={"center"}>
                        {e.status ? (
                          <Fragment>
                            <CheckCircle
                              sx={{ marginRight: 1, color: "#6ECE5C" }}
                            ></CheckCircle>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: 14,
                                color: "#121212",
                              }}
                            >
                              เรียนจบแล้ว
                            </Typography>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: 14,
                                color: "#121212",
                              }}
                            >
                              กำลังเรียน
                            </Typography>
                          </Fragment>
                        )}
                      </Grid>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.is_certificate ? (
                        <Button className={classes.button_active}>
                          ดาวน์โหลด
                        </Button>
                      ) : (
                        <Button
                          className={
                            e.status
                              ? classes.button_inactive
                              : classes.button_disabled
                          }
                          disabled={!e.status}
                          onClick={() => getQuestion()}
                        >
                          ขอรับใบเกียรติบัตร
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : homework.map((e, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#F9F9F9",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      การบ้าน {e.chapter_homework_id}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.lesson_name} / {e.chapter_name}
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems={"center"}>
                        {e.status ? (
                          <Fragment>
                            <CheckCircle
                              sx={{ marginRight: 1, color: "#6ECE5C" }}
                            ></CheckCircle>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: 14,
                                color: "#121212",
                              }}
                            >
                              ส่งแล้ว
                            </Typography>
                          </Fragment>
                        ) : (
                          <Typography
                            sx={{
                              fontWeight: 300,
                              fontSize: 14,
                              color: "#121212",
                            }}
                          >
                            กำลังทำ
                          </Typography>
                        )}
                      </Grid>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      <Button
                        disabled={e.status}
                        className={
                          e.status
                            ? classes.button_disabled
                            : classes.button_inactive
                        }
                      >
                        ส่งการบ้าน
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CertificateModal
        question={question}
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></CertificateModal>
    </Fragment>
  );
};

export default Lesson;

const useStyles = makeStyles({
  button_active: {
    width: 150,
    height: 28,
    fontWeight: 500,
    fontSize: 14,
    color: "#ffffff",
    background:
      "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    borderRadius: 100,
  },
  button_inactive: {
    width: 150,
    height: 28,
    fontWeight: 500,
    fontSize: 14,
    color: "#3CBB8E",
    border: "2px solid #3CBB8E",
    borderRadius: 100,
  },
  button_disabled: {
    width: 150,
    height: 28,
    fontWeight: 500,
    fontSize: 14,
    color: "#CBCBCB",
    border: "2px solid #F1F1F1",
    background: "#F1F1F1",
    borderRadius: 100,
  },
});
