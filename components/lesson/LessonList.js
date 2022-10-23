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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Lesson from "../../api/api_lesson";

const { Fragment, useEffect, useState } = require("react");

const header_lesson = ["บทเรียน", "รายละเอียด", ""];

const LessonList = () => {
  const classes = useStyles();
  const { push, pathname } = useRouter();
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    getLessonList();
  }, []);

  async function getLessonList() {
    const data = await Lesson.getLessonList();
    setLessonList(data.result);
  }

  return (
    <Fragment>
      <Grid my={6}>
        <Container>
          <Typography fontWeight={500} fontSize={28}>
            บทเรียนทั้งหมด
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
                  {header_lesson.map((e) => (
                    <TableCell
                      key={e}
                      sx={{
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
                {lessonList.map((e, idx) => (
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
                        onClick={() =>
                          push({
                            pathname,
                            query: { action: "preview", lesson: e.id },
                          })
                        }
                      >
                        ดูรายละเอียด
                      </Button>
                      <Button
                        className={classes.button_active}
                        onClick={() =>
                          push({
                            pathname,
                            query: {
                              action: "learning",
                              lesson: e.id,
                            },
                          })
                        }
                      >
                        ลงทะเบียนเรียน
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
  },
});
