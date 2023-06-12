import { CardMembership, VerifiedOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Lesson from "../../api/api_lesson";
const path = process.env.NEXT_PUBLIC_BASE_API;

const LessonPreview = ({ lesson, getLesson }) => {
  const classes = useStyles();
  const token = Cookies.get("token");
  const { push, pathname, query, replace } = useRouter();
  const t = useTranslations();
  const matches = useMediaQuery("(min-width:600px)");

  async function registerLesson(id) {
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
      <Grid>
        <Container>
          <Grid
            sx={{ height: matches ? 130 : "100%" }}
            container
            alignItems={"center"}
            justifyContent={matches ? "space-between" : "start"}
          >
            <Grid xs={12} sm={3} pt={matches ? 0 : 3}>
              <Typography fontWeight={500} fontSize={matches ? 32 : 20}>
                {t("learning-online")} :
              </Typography>
            </Grid>
            <Grid xs={12} sm={7} pt={matches ? 0 : 3}>
              <Typography fontWeight={500} fontSize={matches ? 32 : 20}>
                <span style={{ color: "#0076FF" }}>{lesson.lesson_name}</span>
              </Typography>
            </Grid>
            <Grid xs={12} sm={2} py={matches ? 0 : 3}>
              <Button
                className={classes.button_confirm}
                onClick={() => registerLesson(lesson.id)}
              >
                {t("register-free")}
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
            <Grid xs={12} sm={3} pr={3} item>
              <Typography fontWeight={500} fontSize={28}>
                {t("lesson-page.highlight")}
              </Typography>
              <Divider sx={{ marginY: 3 }}></Divider>
              {lesson.prominent_point &&
                lesson.prominent_point.map((e, idx) => {
                  return (
                    <Grid key={idx} mb={3} container>
                      <Grid xs={3} item>
                        <img
                          src={`${path}${e.file_path}`}
                          width={60}
                          height={60}
                        />
                      </Grid>
                      <Grid xs={9} item>
                        <Typography fontWeight={500} fontSize={24}>
                          {e.name}
                        </Typography>
                        <Typography color={"#727272"} fontSize={14}>
                          {e.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
            <Grid xs={12} sm={9} item>
              <Typography fontWeight={500} fontSize={28}>
                {t("lesson-page.description")}
              </Typography>
              <Divider sx={{ marginY: 3 }}></Divider>
              <Typography color={"#727272"} fontSize={16}>
                {lesson.lesson_description}
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
    textTransform: "none",
    "@media (max-width: 600px)": {
      width: 220,
      height: 40,
      fontSize: 18,
    },
  },
});
