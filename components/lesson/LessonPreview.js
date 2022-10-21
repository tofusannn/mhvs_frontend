import { CardMembership, VerifiedOutlined } from "@mui/icons-material";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { Fragment } from "react";

const LessonPreview = () => {
  const classes = useStyles();
  const { push, pathname } = useRouter();

  function handleClick() {
    push({
      pathname,
      query: { action: "learning", course: "1", chapter: "1" },
    });
  }

  return (
    <Fragment>
      <Grid>
        <Container>
          <Grid
            sx={{ height: 130 }}
            container
            alignContent={"center"}
            justifyContent={"space-between"}
          >
            <Grid>
              <Typography fontWeight={500} fontSize={32}>
                บทเรียนออนไลน์ :{" "}
                <span style={{ color: "#0076FF" }}>เรียนรู้สู้ โควิด19</span>
              </Typography>
            </Grid>
            <Grid>
              <Button className={classes.button_confirm} onClick={handleClick}>
                ลงทะเบียนเรียนฟรี
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid
        sx={{
          background:
            "transparent linear-gradient(180deg, #F7F7F7 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box;",
        }}
        py={3}
      >
        <Container>
          <Grid
            sx={{
              minHeight: 750,
            }}
            container
          >
            <Grid xs={3} pr={3} item>
              <Typography fontWeight={500} fontSize={28}>
                จุดเด่น
              </Typography>
              <Divider sx={{ marginY: 3 }}></Divider>
              <Grid mb={3} container>
                <Grid xs={3} item>
                  <CardMembership
                    sx={{ color: "#0076FF", width: 48, height: 48 }}
                  ></CardMembership>
                </Grid>
                <Grid xs={9} item>
                  <Typography fontWeight={500} fontSize={24}>
                    เกียรติบัตรฟรี
                  </Typography>
                  <Typography color={"#727272"} fontSize={14}>
                    เรียนจบรับเกียรติบัตรฟรี สามารถใช้ประกอบการสมัครงานได้
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={3} item>
                  <VerifiedOutlined
                    sx={{ color: "#0076FF", width: 48, height: 48 }}
                  ></VerifiedOutlined>
                </Grid>
                <Grid xs={9} item>
                  <Typography fontWeight={500} fontSize={24}>
                    หลักสูตรคุณภาพ
                  </Typography>
                  <Typography color={"#727272"} fontSize={14}>
                    ผ่านการรับรองหลักสูตรการเรียนการสอนจากกระทรวงศึกษา ปี 2564
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={9} item>
              <Typography fontWeight={500} fontSize={28}>
                รายละเอียด
              </Typography>
              <Divider sx={{ marginY: 3 }}></Divider>
              <Typography color={"#727272"} fontSize={16}>
                ท่ามกลางสถานการณ์ COVID-19 ทั้งแพทย์ พยาบาล บุคลากรทางการแพทย์
                ผู้ป่วย และทุกคนล้วนมีความเครียดและความกังวลใจ ลองมาดูสักนิดว่า
                เราจะช่วยกันรับมือ ดูแลจิตใจ และผ่านวิกฤตินี้ไปด้วยกันได้อย่างไร
                กับการจัดการความเครียดเพื่อรับมือ COVID-19
                อย่างถูกวิธีที่จิตแพทย์อยากแนะนำ ทำให้สะดวกมากขึ้น
              </Typography>
              <Typography sx={{ marginTop: 3 }} fontWeight={500} fontSize={20}>
                ความรู้สึกกังวลที่เกิดขึ้นเป็นกลไกธรรมชาติของมนุษย์ในการเผชิญวิกฤติ
              </Typography>
              <Typography color={"#727272"} fontSize={16}>
                ความเครียดเป็นกลไกโดยธรรมชาติที่ช่วยให้มนุษย์เตรียมตัว วางแผน
                และรับมือกับสถานการณ์ได้อย่างมีประสิทธิภาพ
                ถ้ามีใครสักคนที่ไม่รู้สึกเครียด ไม่กลัวติดเชื้อ
                ไม่สนใจว่าจะต้องปฏิบัติตัวอย่างไร ไม่ฟังการประกาศจากรัฐบาล
                กลุ่มนี้ถือว่าผิดปกติและอาจนำพาไปสู่ความเสี่ยงมากมายทั้งต่อตนเองและผู้อื่น
                ดังนั้นการที่รู้สึกเครียด กังวล กลัว ตื่นตระหนกนั้นถูกต้องแล้ว
                และควรจะเป็นแบบนั้นเพื่อที่ทุกคนจะได้ขวนขวายหาความรู้
                หาข้อมูลมาประกอบการตัดสินใจ มีการวางแผน และเตรียมการอย่างถูกวิธี
              </Typography>
              <Typography sx={{ marginTop: 3 }} color={"#727272"} fontSize={16}>
                สิ่งสำคัญคือ คนจำนวนมากไม่ตระหนักว่ามีความผิดปกติด้านอารมณ์
                เมื่อไม่รู้ตัวก็ไม่ได้จัดการอย่างถูกต้อง
                จนอาจส่งผลกระทบกับประสิทธิภาพในการทำงาน สมาธิไม่ดี
                ทำงานบกพร่องหรืออารมณ์แปรปรวนจนมีปัญหาความสัมพันธ์
                ทั้งเรื่องส่วนตัวและกับเพื่อนร่วมงาน
                ความเครียดสะสมยังอาจนำไปสู่การตัดสินใจผิดพลาดนำชีวิตดิ่งลงได้โดยง่าย
              </Typography>
              <Typography sx={{ marginTop: 3 }} fontWeight={500} fontSize={20}>
                ผู้ป่วยที่มีปัญหาสุขภาพจิต (Mental Health) อยู่เดิม
                อาการอาจกำเริบรุนแรง
              </Typography>
              <Typography color={"#727272"} fontSize={16}>
                ก่อนเกิดวิกฤติ COVID-19 มีผู้คนจำนวนมากตกอยู่ในภาวะเครียด
                องค์การอนามัยโลกได้มีรายงานเมื่อต้นปี 1616 ว่า
                ทั่วโลกมีคนป่วยเป็นโรคซึมเศร้าประมาณ 264 ล้านคน
                โดยประเทศไทยพบอัตราการฆ่าตัวตายเพิ่มขึ้นจากปี 2560 คือ 4.94
                ต่อประชากรแสนคน เป็น 5.33 ต่อประชากรแสนคนในปี 2561
                นอกจากนี้ยังมีโรควิตกกังวล
                ซึ่งในสหรัฐอเมริกามีรายงานผู้ป่วยวิตกกังวลโดย The Anxiety and
                Depression Association of America สูงถึง 18.1% ของประชากร
                หรือประมาณ 40 ล้านคน และยังไม่นับรวมผู้ที่มีปัญหาติดแอลกอฮอล์
                จึงเป็นที่แน่นอนว่า เมื่อเกิดวิกฤติ COVID-19 เข้ามา
                ผู้ป่วยเหล่านี้อาจมีอาการกำเริบหรือแย่ลง
                แม้ยังได้รับการรักษาอย่างสม่ำเสมอ
                ดังนั้นหากคุณหรือคนใกล้ชิดเป็นคนหนึ่งที่อยู่ในกลุ่มผู้ป่วยหรือสงสัยว่าจะป่วยอยู่ก่อน
                ช่วงนี้ควรพบจิตแพทย์เพื่อประเมินและรักษาอย่างเหมาะสม
                หรือหากมีนัดสม่ำเสมอก็ไม่ควรหยุดพบแพทย์
                เพราะอาจนำไปสู่อาการรุนแรง และเป็นอันตรายได้
                ซึ่งปัจจุบันมีการให้บริการการรักษาทางไกล (E – Mental Health)
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  );
};

export default LessonPreview;

const useStyles = makeStyles({
  button_confirm: {
    width: 220,
    height: 60,
    background: "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%)",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    borderRadius: 100,
    fontSize: 24,
    fontWeight: 500,
    color: "#ffffff",
  },
});
