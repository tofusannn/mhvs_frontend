import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Lesson from "../../api/api_lesson";
import { useTranslations } from "next-intl";

const { Fragment, useEffect, useState } = require("react");

const LessonList = ({ getLesson }) => {
  const classes = useStyles();
  const { push, pathname, replace, locale } = useRouter();
  const [lessonList, setLessonList] = useState([]);
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  const header_lesson = [
    `${t("lesson-page.lesson")}`,
    `${t("lesson-page.description")}`,
    "",
  ];

  useEffect(() => {
    getLessonList();
  }, []);

  async function getLessonList() {
    const data = await Lesson.getLessonList(locale);
    setLessonList(data.result);
  }

  function previewLesson(id) {
    getLesson("preview", id, "", "");
  }

  async function registerLesson(id) {
    const token = Cookies.get("token");
    if (token) {
      const data = await Lesson.postUserLesson({ lesson_id: id });
      if (data.status) {
        getLesson("learning", id, "", "pre_test");
      }
    } else {
      replace({
        pathname: "/auth",
        query: { action: "login", type: "phone" },
      });
    }
  }

  return (
    <Fragment>
      <Grid my={6}>
        <Container>
          <Typography fontWeight={500} fontSize={28}>
            {t("lesson-page.lesson-list")}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 3,
              boxShadow: "none",
              border: "1px solid #D6D6D6",
            }}
          >
            <Table sx={{ minWidth: matches ? "1000px" : "" }}>
              <TableHead sx={{ background: "#1276FF" }}>
                <TableRow>
                  {header_lesson.map((e, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        display: matches ? "" : idx >= 1 && "none",
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
                {lessonList.map((e, idx) =>
                  matches ? (
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
                          width: "20%",
                          fontWeight: 300,
                          fontSize: 14,
                          color: "#121212",
                        }}
                      >
                        {e.lesson_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "40%",
                          fontWeight: 300,
                          fontSize: 14,
                          color: "#121212",
                        }}
                      >
                        {e.lesson_description.length > "100"
                          ? e.lesson_description.substr(0, 150).concat("...")
                          : e.lesson_description}
                      </TableCell>
                      <TableCell
                        align={"right"}
                        sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                      >
                        <Button
                          sx={{ marginRight: 2 }}
                          className={classes.button_details}
                          onClick={() => previewLesson(e.id)}
                        >
                          {t("lesson-page.details")}
                        </Button>
                        <Button
                          className={classes.button_active}
                          onClick={() => registerLesson(e.id)}
                        >
                          {t("lesson-page.enroll")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#F9F9F9",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          {e.lesson_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                          }}
                        >
                          {e.lesson_description.length > "100"
                            ? e.lesson_description.substr(0, 150).concat("...")
                            : e.lesson_description}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ justifyContent: "space-between" }}>
                        <TableCell
                          sx={{
                            fontWeight: 300,
                            fontSize: 14,
                            color: "#121212",
                            justifyContent: "space-between",
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <Button
                            sx={{ width: "140px !important" }}
                            className={classes.button_details}
                            onClick={() => previewLesson(e.id)}
                          >
                            {t("lesson-page.details")}
                          </Button>
                          <Button
                            sx={{ width: "140px !important" }}
                            className={classes.button_active}
                            onClick={() => registerLesson(e.id)}
                          >
                            {t("lesson-page.enroll")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </Fragment>
  );
};

export default LessonList;

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
  button_details: {
    width: 150,
    height: 28,
    fontWeight: 500,
    fontSize: 14,
    color: "#3CBB8E",
    border: "2px solid #3CBB8E",
    borderRadius: 100,
    textTransform: "none",
  },
});
