import {
  AddCircle,
  CheckCircle,
  Delete,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import certificate from "../../api/api_certificate";
import CertificateModal from "./CertificateModal";
import lessonApi from "../../api/api_lesson";
import Homework from "../../api/api_homework";
import upload from "../../api/api_upload";
import { useTranslations } from "next-intl";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Lesson = ({
  setOpenSnackbar,
  setPayloadSnackbar,
  confirm,
  setOpenModalSuccess,
}) => {
  const classes = useStyles();
  const { query, push, pathname } = useRouter();
  const [lesson, setLesson] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [question, setQuestion] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [homework, setHomework] = useState({});
  const [linkPayload, setLinkPayload] = useState([]);
  const [filePayload, setFilePayload] = useState([]);
  const [fileList, setFileList] = useState([]);
  const t = useTranslations();
  const header_lesson = [
    t("profile-menu.your-lesson"),
    t("status"),
    t("certificate"),
  ];
  const header_homework = [t("list"), t("lesson-page.lesson"), t("status"), ""];

  useEffect(() => {
    getLessonList();
    getHomeworkList();
    !linkPayload.length && addTextFieldLink();
    query.id &&
      push({ pathname, query: { action: "lesson", type: "homework" } });
  }, []);

  useEffect(() => {}, [linkPayload, filePayload]);

  useEffect(() => {
    confirm && handleConfirm();
  }, [confirm]);

  async function getHomeworkList() {
    const data = await Homework.getUserHomework();
    const list = [];
    Object.keys(data.result).length &&
      data.result.map((e) => {
        if (e.chapter_name === "ภาคปฏิบัติ") {
          list.push(e);
        }
      });
    setHomeworkList(list);
  }

  useEffect(() => {
    homeworkList.map((e, idx) => {
      if (parseInt(query.lesson) === e.lesson_id) {
        pageSentHomework(e, `${t("profile-menu.homework")} ${idx + 1}`);
      }
    });
  }, [homeworkList]);

  async function getLessonList() {
    const data = await lessonApi.getUserLessonList();
    setLesson(data.result);
  }

  async function getQuestion() {
    const data = await certificate.getQuestCertificate();
    setOpenModal(data.status);
    setQuestion(data.result);
  }

  function pageSentHomework(e, title) {
    push({
      pathname,
      query: {
        ...query,
        lesson: e.lesson_id,
        chapter: e.chapter_id,
        id: e.chapter_homework_id,
      },
    });
    const hw = {
      ...e,
      title: title,
    };
    setHomework(hw);
  }

  function changeTextFieldLink(e, idx) {
    const cols = [];
    linkPayload.forEach((e) => {
      cols.push(e);
    });
    cols[idx].link = e.target.value;
    setLinkPayload(cols);
  }

  function addTextFieldLink() {
    const cols = [];
    linkPayload.forEach((e) => {
      cols.push(e);
    });
    cols.push({ link: "" });
    setLinkPayload(cols);
  }

  function deleteTextFieldLink(idx) {
    const cols = [];
    linkPayload.forEach((e) => {
      cols.push(e);
    });
    if (linkPayload.length != 1) {
      cols.splice(idx, 1);
    }
    setLinkPayload(cols);
  }

  function loopTextField() {
    const rows = [];
    linkPayload.forEach((e, idx) => {
      rows.push(
        <Grid key={idx} mb={3} container>
          <Grid xs={1} item>
            <Typography textAlign={"center"}>{idx + 1}.</Typography>
          </Grid>
          <TextField
            value={e.link}
            size="small"
            sx={{ marginLeft: 1, width: 408 }}
            placeholder="Google drive หรือ YouTube"
            onChange={(e) => changeTextFieldLink(e, idx)}
          ></TextField>
          {idx === linkPayload.length - 1 ? (
            <IconButton
              sx={{ marginLeft: 2 }}
              onClick={() => addTextFieldLink()}
            >
              <AddCircle sx={{ color: "#3CBB8E" }}></AddCircle>
            </IconButton>
          ) : (
            <IconButton
              sx={{ marginLeft: 2 }}
              onClick={() => deleteTextFieldLink(idx)}
            >
              <Delete sx={{ color: "#3CBB8E" }}></Delete>
            </IconButton>
          )}
        </Grid>
      );
    });
    return rows;
  }

  async function uploadFile({ target }) {
    const files = [];
    const data = await upload.upload(target.files[0]);
    filePayload.forEach((e) => {
      files.push(e);
    });
    setOpenSnackbar(true);
    setPayloadSnackbar(data);
    files.push({ file_id: data.result.id });
    fileList.push(data.result);
    setFileList(fileList);
    setFilePayload(files);
  }

  function deleteFile(idx) {
    const files = [];
    filePayload.forEach((e) => {
      files.push(e);
    });
    files.splice(idx, 1);
    fileList.splice(idx, 1);
    setFileList(fileList);
    setFilePayload(files);
  }

  async function handleConfirm() {
    const hw = await lessonApi.getChapterHomework(parseInt(query.id));
    const payload = {
      lesson_id: hw.result.lesson_id,
      chapter_id: hw.result.chapter_id,
      chapter_homework_id: hw.result.id,
      file: filePayload,
      link: linkPayload,
    };
    const data = await Homework.postUserHomework(payload);
    setOpenSnackbar(true);
    setPayloadSnackbar(data);
    if (data.status) {
      setOpenModalSuccess(true);
    }
  }

  async function pushLearning(lesson) {
    const data = await lessonApi.getChapterByLessonId(lesson);
    push({
      pathname: "/lesson",
      query: {
        action: "learning",
        lesson: lesson,
        chapter: data.result[0].id,
        name: "pre_test",
        menu: "",
      },
    });
  }

  async function downloadCertificate(id) {
    const data = await certificate.getCertificate(id);
    console.log(data);
  }

  return (
    <Fragment>
      {query.id ? (
        <Fragment>
          <Typography fontWeight={500} fontSize={28}>
            {homework.title}
          </Typography>
          <Divider sx={{ marginY: 3 }}></Divider>
          <Typography fontSize={16}>{homework.homework_description}</Typography>
          <Grid mt={3} container>
            <Typography sx={{ marginRight: 5 }} fontSize={16}>
              {t("attach-link")}
            </Typography>
            <Grid xs={8} item>
              {loopTextField()}
            </Grid>
          </Grid>
          <Grid mt={3} container>
            <Typography sx={{ marginRight: 8 }} fontSize={16}>
              {t("attach-file")}
            </Typography>
            <Grid xs={8} item>
              <Button
                className={classes.button_active}
                variant="contained"
                component="label"
              >
                {t("upload-file")}
                <input hidden multiple type="file" onChange={uploadFile} />
              </Button>
              <TableContainer
                component={Paper}
                sx={{
                  marginTop: 3,
                  boxShadow: "none",
                  border: "1px solid #D6D6D6",
                }}
              >
                <Table>
                  <TableHead sx={{ background: "#1276FF" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: "33%",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "#ffffff",
                        }}
                      >
                        {t("file-list")}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "33%",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "#ffffff",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileList.map((e, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#F9F9F9",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          {e.file_name}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          <Link
                            href={`${path}${e.file_path}`}
                            target="_blank"
                            sx={{ textDecoration: "none" }}
                          >
                            <IconButton>
                              <Visibility
                                sx={{ color: "#3CBB8E" }}
                              ></Visibility>
                            </IconButton>
                          </Link>
                          <IconButton
                            sx={{ marginLeft: 1 }}
                            onClick={() => deleteFile(idx)}
                          >
                            <Delete sx={{ color: "#3CBB8E" }}></Delete>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Typography fontWeight={500} fontSize={28}>
            {query.type === "lesson"
              ? t("profile-menu.your-lesson")
              : t("profile-menu.your-homework")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 3,
              boxShadow: "none",
              border: "1px solid #D6D6D6",
            }}
          >
            <Table>
              <TableHead sx={{ background: "#1276FF" }}>
                <TableRow>
                  {query.type === "lesson"
                    ? header_lesson.map((e, idx) => (
                        <TableCell
                          key={e}
                          sx={
                            idx === 2
                              ? {
                                  textAlign: "center",
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: "#ffffff",
                                }
                              : {
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: "#ffffff",
                                }
                          }
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
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
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
                                  {t("lesson-page.graduated")}
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
                                  {t("lesson-page.studying")}
                                </Typography>
                              </Fragment>
                            )}
                          </Grid>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          {e.status ? (
                            e.is_certificate ? (
                              <Button
                                className={classes.button_active}
                                onClick={() => downloadCertificate(e.id)}
                              >
                                {t("download")}
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
                                {t("certificate")}
                              </Button>
                            )
                          ) : (
                            <Button
                              className={classes.button_active}
                              onClick={() => pushLearning(e.id)}
                            >
                              {t("profile-page.continue-studying")}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : homeworkList.map((e, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#F9F9F9",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          {t("profile-menu.homework")} {idx + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
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
                                  {t("profile-page.sent-success")}
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
                                {t("profile-page.doing")}
                              </Typography>
                            )}
                          </Grid>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          <Button
                            disabled={e.status}
                            className={
                              e.status
                                ? classes.button_disabled
                                : classes.button_inactive
                            }
                            onClick={() =>
                              pageSentHomework(
                                e,
                                `${t("profile-menu.homework")} ${idx + 1}`
                              )
                            }
                          >
                            {t("profile-page.sent-homework")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
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
    textTransform: "none",
  },
  button_inactive: {
    width: 150,
    height: 28,
    fontWeight: 500,
    fontSize: 14,
    color: "#3CBB8E",
    border: "2px solid #3CBB8E",
    borderRadius: 100,
    textTransform: "none",
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
    textTransform: "none",
  },
});
