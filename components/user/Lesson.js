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
import { Fragment } from "react";

const header_lesson = ["บทเรียนของคุณ", "สถานะ", "ใบเกียรติบัตร"];
const header_homework = ["รายการ", "บทเรียน", "สถานะ", ""];
const body_lesson = [
  { title: "aa", status: "จบแล้ว", certificate: true },
  { title: "bb", status: "กำลังเรียน", certificate: false },
];
const body_homework = [
  { no: "1", title: "aa", status: "ส่งแล้ว", homework: true },
  { no: "2", title: "bb", status: "ยังไม่ส่ง", homework: false },
];

const Lesson = () => {
  const classes = useStyles();
  const { query } = useRouter();
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
              ? body_lesson.map((e, idx) => (
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
                      {e.title}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.status}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.certificate ? (
                        <Button className={classes.button_active}>
                          ดาวน์โหลด
                        </Button>
                      ) : (
                        <Button className={classes.button_inactive}>
                          ขอรับใบเกียรติบัตร
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : body_homework.map((e, idx) => (
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
                      {e.no}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.title}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      <Grid container alignItems={"center"}>
                        {e.homework ? (
                          <CheckCircle
                            sx={{ marginRight: 1, color: "#6ECE5C" }}
                          ></CheckCircle>
                        ) : (
                          ""
                        )}

                        {e.status}
                      </Grid>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      <Button
                        className={
                          e.homework
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
