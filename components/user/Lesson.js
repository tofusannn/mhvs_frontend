import {
  AccessTime,
  AddCircle,
  CheckCircle,
  Delete,
  Error,
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
import Cookies from "js-cookie";
import ModalPopup from "../common/ModalPopup";
import Image from "next/image";
import popupImage from "../../public/image/popup-image/PopUp_png_Pop Up 05.png";
import popupImage2 from "../../public/image/popup-image/PopUp_png_Pop Up 02.png";

const path = process.env.NEXT_PUBLIC_BASE_API;

const Lesson = ({
  setOpenSnackbar,
  setPayloadSnackbar,
  trigger,
  setOpenModalSuccess,
}) => {
  const classes = useStyles();
  const { query, push, pathname, locale } = useRouter();
  const [lesson, setLesson] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [question, setQuestion] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [homework, setHomework] = useState({});
  const [lessonId, setLessonId] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [sentHomework, setSentHomework] = useState();
  const [lessonQuery, setLessonQuery] = useState([]);

  const [linkPayload, setLinkPayload] = useState([
    { link: "" },
    { link: "" },
    { link: "" },
  ]);
  const [filePayload, setFilePayload] = useState([]);
  const [fileList, setFileList] = useState([
    { file_id: "", file_name: "", file_path: "" },
    { file_id: "", file_name: "", file_path: "" },
    { file_id: "", file_name: "", file_path: "" },
  ]);
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
    if (trigger) {
      handleConfirm();
    }
  }, [trigger]);

  async function getHomeworkList() {
    const data = await Homework.getUserHomework(locale);
    const list = [];
    Object.keys(data.result).length &&
      data.result.map((e) => {
        if (e.practical) {
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
    const data = await lessonApi.getUserLessonList(locale);
    setLesson(data.result);
  }

  async function getQuestion(id, lesson) {
    const data = await certificate.getQuestCertificate(id);
    setOpenModal(data.status);
    setQuestion(data.result);
    setLessonId(lesson);
  }

  function pageSentHomework(e, title) {
    setOpen2(false);
    push({
      pathname,
      query: {
        ...query,
        type: 'homework',
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
    if (linkPayload.length === 3) {
      return;
    }
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
        <Grid key={idx} mb={3} container sx={{ display: "none" }}>
          {/* <Grid xs={1} item>
            <Typography textAlign={"center"}>{idx + 1}.</Typography>
          </Grid> */}
          <Grid
            xs={12}
            sm={2}
            item
            sx={{
              paddingLeft: { xs: 1, sm: 0 },
              paddingBottom: { xs: 1, sm: 0 },
            }}
          >
            <Typography textAlign={"start"}>
              {idx === 0
                ? t("for-myself")
                : idx === 1
                ? t("for-society")
                : idx === 2 && t("for")}
            </Typography>
          </Grid>
          <TextField
            value={e.link}
            size="small"
            sx={{ marginLeft: 1, width: 408 }}
            placeholder="Google drive หรือ YouTube"
            onChange={(e) => changeTextFieldLink(e, idx)}
          ></TextField>
          {/* {linkPayload.length != 3 && idx === linkPayload.length - 1 ? (
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
          )} */}
        </Grid>
      );
    });
    return rows;
  }

  async function uploadFile({ target }, idx) {
    const files = [];
    const data = await upload.upload(target.files[0]);
    filePayload.forEach((e) => {
      files.push(e);
    });
    setOpenSnackbar(true);
    setPayloadSnackbar(data);
    files.push({ file_id: data.result.id });
    // fileList.push(data.result);
    fileList[idx] = data.result;
    setFileList(fileList);
    setFilePayload(files);
  }

  function deleteFile(idx) {
    const files = [];
    // filePayload.forEach((e) => {
    //   files.push(e);
    // });
    // files.splice(idx, 1);
    // fileList.splice(idx, 1);
    // setFileList(fileList);
    // setFilePayload(files);
    filePayload.forEach((e) => {
      files.push(e);
    });
    files.splice(idx, 1);
    fileList[idx] = { file_name: "", file_path: "" };
    setFileList(fileList);
    setFilePayload(files);
  }

  async function handleConfirm() {
    // let count = 0;
    if (filePayload.length === 3) {
      // linkPayload.forEach((e) => {
      //   if (e.link === "") {
      //     count += 1;
      //   } else {
      //     count -= 1;
      //   }
      // });
      // if (count < 0) {
      const linkList = [];
      linkPayload.forEach((e, idx) => {
        if (e.link != "") {
          linkList.push(e);
        }
      });
      const hw = await lessonApi.getChapterHomework(parseInt(query.id));
      const payload = {
        lesson_id: hw.result.lesson_id,
        chapter_id: hw.result.chapter_id,
        chapter_homework_id: hw.result.id,
        file: filePayload,
        link: linkList,
      };
      const data = await Homework.postUserHomework(payload);
      setOpenSnackbar(true);
      setPayloadSnackbar(data);
      if (data.status) {
        await lessonApi.postUserLessonState({
          lesson_id: hw.result.lesson_id,
          chapter_id: hw.result.chapter_id,
          object_name: "homework",
          object_id: hw.result.id,
        });
        setOpenModalSuccess(true);
      }
      // } else {
      //   setOpenSnackbar(true);
      //   setPayloadSnackbar({
      //     msg: "กรอกข้อมูลไม่ครบ",
      //     status: false,
      //   });
      // }
    } else {
      setOpenSnackbar(true);
      setPayloadSnackbar({
        msg: "กรอกข้อมูลไม่ครบ",
        status: false,
      });
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
  const token = Cookies.get("token");
  async function downloadCertificate(id) {
    // const data = await certificate.getCertificate(id);
    fetch(`http://116.204.182.19:8000/v1/certificate/${id}`, {
      method: "GET",
      headers: { token: token },
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "certificate.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openModalPopup(e) {
    setOpen(true);
    setLessonQuery(e);
  }

  function openModalPopup2(params) {
    setOpen2(true);
    setSentHomework(params);
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
          {/* <Grid mt={3} container>
            <Typography
              sx={{ marginRight: 5, paddingBottom: { xs: 1, sm: 0 } }}
              fontSize={16}
            >
              {t("attach-link")}
            </Typography>
            <Grid xs={12} sm={8} item>
              {loopTextField()}
            </Grid>
          </Grid> */}
          <Grid mt={3} container>
            <Typography
              sx={{ marginRight: 8, paddingBottom: { xs: 1, sm: 0 } }}
              fontSize={16}
            >
              {t("attach-file")}
            </Typography>
            <Grid xs={12} sm={8} item>
              {/* {fileList.length != 3 ? (
                <Button
                  sx={{marginBottom: 3}}
                  className={classes.button_active}
                  variant="contained"
                  component="label"
                >
                  {t("upload-file")}
                  <input hidden multiple type="file" onChange={uploadFile} />
                </Button>
              ) : (
                ""
              )} */}
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  border: "1px solid #D6D6D6",
                }}
              >
                <Table>
                  <TableHead sx={{ background: "#1276FF" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: "40%",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "#ffffff",
                        }}
                      >
                        {t("file-list")}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
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
                        {e.file_name === "" ? (
                          <>
                            <TableCell>
                              <Button
                                className={classes.button_active}
                                variant="contained"
                                component="label"
                              >
                                {t("upload-file")}
                                <input
                                  hidden
                                  multiple
                                  type="file"
                                  onChange={(e) => uploadFile(e, idx)}
                                />
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Typography textAlign={"start"}>
                                {idx === 0
                                  ? `1. ${t("profile-page.for-myself")}`
                                  : idx === 1
                                  ? `2. ${t("profile-page.for-society")}`
                                  : idx === 2 && `3. ${t("profile-page.for")}`}
                              </Typography>
                            </TableCell>
                            <TableCell></TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell
                              sx={{
                                fontWeight: 300,
                                fontSize: 14,
                                color: "#121212",
                              }}
                            >
                              {e.file_name}
                            </TableCell>
                            <TableCell>
                              <Typography textAlign={"start"}>
                                {idx === 0
                                  ? `1. ${t("profile-page.for-myself")}`
                                  : idx === 1
                                  ? `2. ${t("profile-page.for-society")}`
                                  : idx === 2 && `3. ${t("profile-page.for")}`}
                              </Typography>
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
                          </>
                        )}
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
            <Table sx={{ minWidth: "700px" }}>
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
                              e.homework_is_check ? (
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
                              ) : e.homework_is_check === null ? (
                                <Fragment>
                                  <AccessTime
                                    sx={{ marginRight: 1, color: "#CBCBCB" }}
                                  ></AccessTime>
                                  <Typography
                                    sx={{
                                      fontWeight: 300,
                                      fontSize: 14,
                                      color: "#121212",
                                    }}
                                  >
                                    {t("approve")}
                                  </Typography>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <Error
                                    sx={{ marginRight: 1, color: "#fdd835" }}
                                  ></Error>
                                  <Typography
                                    sx={{
                                      fontWeight: 300,
                                      fontSize: 14,
                                      color: "#121212",
                                    }}
                                  >
                                    {t("lesson-page.homework-dont-pass")}
                                  </Typography>
                                </Fragment>
                              )
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
                            e.homework_is_check ? (
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
                                    !e.is_approve
                                      ? classes.button_inactive
                                      : classes.button_disabled
                                  }
                                  disabled={e.is_approve}
                                  onClick={() =>
                                    getQuestion(e.questionnaire_cer_id, e.id)
                                  }
                                >
                                  {e.is_approve
                                    ? t("approve")
                                    : t("certificate")}
                                </Button>
                              )
                            ) : e.homework_is_check === null ? (
                              <Button
                                className={classes.button_disabled}
                                disabled={e.is_approve}
                              >
                                {t("approve")}
                              </Button>
                            ) : (
                              <Button
                                className={classes.button_active}
                                onClick={() =>
                                  homeworkList.filter((i, idxx) => {
                                    i.lesson_id === e.id;
                                    openModalPopup2(
                                      i,
                                      `${t("profile-menu.homework")} ${
                                        idxx + 1
                                      }`
                                    );
                                  })
                                }
                              >
                                {t("profile-page.send-homework-again")}
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
                            disabled={
                              lesson.length && lesson[idx].is_certificate
                            }
                            className={
                              lesson.length && lesson[idx].is_certificate
                                ? classes.button_disabled
                                : classes.button_inactive
                            }
                            onClick={() => {
                              if (e.status) {
                                openModalPopup2(
                                  e,
                                  `${t("profile-menu.homework")} ${idx + 1}`
                                );
                              } else {
                                openModalPopup(e);
                              }
                            }}
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
      <ModalPopup
        open={open}
        setOpen={setOpen}
        textButton={t("popup-text.popup-lesson-continue.text-button")}
        funcButton={() => {
          setOpen(false);
          push({
            pathname: "/lesson",
            query: {
              action: "learning",
              lesson: lessonQuery.lesson_id,
              chapter: lessonQuery.chapter_id,
              name: "homework",
              menu: lessonQuery.chapter_id,
            },
          });
        }}
      >
        <Image alt="img" src={popupImage} objectFit="cover"></Image>
        <Typography
          whiteSpace={"pre-line"}
          textAlign={"center"}
          fontWeight={600}
          fontSize={20}
        >
          {t("popup-text.popup-lesson-continue.description")}
        </Typography>
      </ModalPopup>
      <ModalPopup
        open={open2}
        setOpen={setOpen2}
        textButton={t("popup-text.popup-homework.text-button")}
        funcButton={() => pageSentHomework(sentHomework)}
      >
        <Image alt="img" src={popupImage2} objectFit="cover"></Image>
        <Typography
          whiteSpace={"pre-line"}
          textAlign={"center"}
          fontWeight={600}
          fontSize={20}
        >
          {t("popup-text.popup-homework.description")}
        </Typography>
      </ModalPopup>
      <CertificateModal
        question={question}
        openModal={openModal}
        setOpenModal={setOpenModal}
        lesson={lessonId}
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
