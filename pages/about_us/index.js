import { Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import sponsorApi from "../../api/api_sponsor";
const path = process.env.NEXT_PUBLIC_BASE_API;

const Home = () => {
  return (
    <Fragment>
      <Banner></Banner>
      <Grid mt={6} mb={15}>
        <Container>
          <Grid my={3}>
            <Typography fontWeight={500} fontSize={32}>
              โครงการ
            </Typography>
            <Typography fontWeight={500} fontSize={24}>
              “สร้างระบบอาสาสมัครสาธารณสุขต่างด้าวเรียนรู้แบบออนไลน์เพื่อป้องกันและเฝ้าระวังการแพร่ระบาดของโรคโควิด
              19”
            </Typography>
            <Typography mt={3}>
              นำเสนอหลักสูตรสำหรับอาสาสมัครต่างด้าว (อสต.)
              ในสถานประกอบการหรือในชุมชน ผ่านทางเครือข่ายระบบสื่อสังคมออนไลน์
              โดยใช้ระบบเรียนออนไลน์ (E-learning) บนหน้าเว็บไซต์
              โดยผู้คนสามารถเข้าถึงแหล่งการเรียนรู้นี้ได้อย่างทั่วถึง
              และสะดวกรวดเร็ว โดยไร้ข้อจำกัดด้านสถานที่และเวลา{" "}
              <span style={{ fontWeight: 500 }}>มีเป้าหมาย </span>
              เพื่อให้เกิดการสนับสนุนการพัฒนาเทคโนโลยีในการสนับสนุนให้เกิดการเรียนรู้แบบอนไลน์และรูปแบบการอบรมการสื่อสารเรื่องความรอบรู้ทางด้านสุขภาพเรื่องโรคโควิด-19
              ควบคู่กับการส่งเสริมความรอบรู้ด้านสุขภาพและป้องกันโรคติดต่อในกลุ่มของชุมชนไทยและแรงงานข้ามชาติ
              3 สัญชาติ ชาวเมียนมา กัมพูชา และลาว
            </Typography>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  );
};

export default Home;

const Banner = () => {
  const classes = useStyles();
  const t = useTranslations();
  return (
    <Grid
      className={classes.banner_main}
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid className={classes.banner_text} item>
        <Container>
          <Typography fontWeight={500} fontSize={60}>
            aorsortor.online
          </Typography>
        </Container>
      </Grid>
      <Grid className={classes.banner_image} item>
        <img width={850} src="/image/banner_sub.svg"></img>
      </Grid>
      <div className={classes.banner_background}></div>
    </Grid>
  );
};

const useStyles = makeStyles({
  banner_main: {
    height: "55vh",
    position: "relative",
  },
  banner_background: {
    width: "100%",
    height: "100%",
    background:
      "transparent linear-gradient(180deg, #FFFFFF 0%, #F1F8FE 100%) 0% 0% no-repeat padding-box",
    position: "static",
    zIndex: -2,
  },
  banner_text: {
    position: "absolute",
    top: 100,
    left: 70,
  },
  banner_image: {
    position: "absolute",
    zIndex: -1,
    bottom: -7,
    right: 100,
  },
});
