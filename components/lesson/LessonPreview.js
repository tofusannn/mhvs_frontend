import { CardMembership, VerifiedOutlined } from "@mui/icons-material";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
const path = process.env.NEXT_PUBLIC_BASE_API;

const LessonPreview = ({ lesson, getLesson }) => {
  const classes = useStyles();
  const { push, pathname, query } = useRouter();
  const t = useTranslations();

  return (
    <Fragment>
      <Grid>
        <Container>
          <Grid
            sx={{ height: 130 }}
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid xs={3}>
              <Typography fontWeight={500} fontSize={32}>
                {t("learning-online")} :
              </Typography>
            </Grid>
            <Grid xs={7}>
              <Typography fontWeight={500} fontSize={32}>
                <span style={{ color: "#0076FF" }}>{lesson.lesson_name}</span>
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Button
                className={classes.button_confirm}
                onClick={() => getLesson("learning", lesson.id, "", "pre_test")}
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
            <Grid xs={3} pr={3} item>
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
            <Grid xs={9} item>
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
  },
});
