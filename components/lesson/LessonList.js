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

const { Fragment } = require("react");

const header_lesson = ["บทเรียน", "รายละเอียด", "สถานะ", ""];
const body_lesson = [
  {
    title: "เรียนรู้สู้ โควิด19",
    sub_title:
      "ท่ามกลางสถานการณ์ COVID-19 ทั้งแพทย์ พยาบาล บุคลากรทางการแพทย์ ผู้ป่วย และทุกคนล้วนมีความเครียดและความกังวลใจ ลองมาดูสักนิดว่า เราจะช่วยกันรับมือ ดูแลจิตใจ และผ่านวิกฤตินี้ไปด้วยกันได้อย่างไร กับการจัดการความเครียดเพื่อรับมือ COVID-19 อย่างถูกวิธีที่จิตแพทย์อยากแนะนำ ทำให้สะดวกมากขึ้น",
    status: "ยังไม่ได้ลงทะเบียนเรียน",
    button_confirm: true,
  },
  {
    title: "เรียนรู้สู้ โควิด19 ภาค 2",
    sub_title:
      "ท่ามกลางสถานการณ์ COVID-19 ทั้งแพทย์ พยาบาล บุคลากรทางการแพทย์ ผู้ป่วย และทุกคนล้วนมีความเครียดและความกังวลใจ ลองมาดูสักนิดว่า เราจะช่วยกันรับมือ ดูแลจิตใจ และผ่านวิกฤตินี้ไปด้วยกันได้อย่างไร กับการจัดการความเครียดเพื่อรับมือ COVID-19 อย่างถูกวิธีที่จิตแพทย์อยากแนะนำ ทำให้สะดวกมากขึ้น",
    status: "ลงทะเบียนเรียนแล้ว",
    button_confirm: false,
  },
];

const LessonList = () => {
  const classes = useStyles();
  const { push } = useRouter();
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
                {body_lesson.map((e, idx) => (
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
                      {e.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "40%",
                        fontWeight: 300,
                        fontSize: 14,
                        color: "#121212",
                      }}
                    >
                      {e.sub_title}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 300, fontSize: 14, color: "#121212" }}
                    >
                      {e.status}
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
                            pathname: "/lesson",
                            query: { action: "preview" },
                          })
                        }
                      >
                        ดูรายละเอียด
                      </Button>
                      {e.button_confirm ? (
                        <Button className={classes.button_active}>
                          ลงทะเบียนเรียน
                        </Button>
                      ) : (
                        <Button disabled className={classes.button_disabled}>
                          ลงทะเบียนเรียน
                        </Button>
                      )}
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
