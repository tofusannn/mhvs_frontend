import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Lesson from "../../api/api_lesson";
import Banner from "../../components/common/Banner";
import LessonLearn from "../../components/lesson/LessonLearn";
import LessonList from "../../components/lesson/LessonList";
import LessonPreview from "../../components/lesson/LessonPreview";

const Home = () => {
  const { query, push, pathname } = useRouter();
  const [lesson, setLesson] = useState({});
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    query.lesson && getDetails(query.lesson);
  }, [query]);

  async function getDetails(lesson) {
    const les = await Lesson.getLessonById(lesson);
    setLesson(les.result);
    const chap = await Lesson.getChapterByLessonId(lesson);
    setChapter(chap.result);
  }

  async function getLesson(action, lesson, chap, menu) {
    getDetails(lesson);
    const q = {};
    switch (action) {
      case "preview":
        q = {
          action: action,
          lesson: lesson,
        };
        break;
      case "learning":
        q = {
          action: action,
          lesson: lesson,
          chapter: chap ? chap : chapter[0].id,
          menu: menu === "chapter" ? "pre_test" : menu,
        };
        break;
    }
    push({
      pathname,
      query: q,
    });
  }

  return (
    <Fragment>
      <Banner
        page={"บทเรียนออนไลน์"}
        subPage={query.action != "list" && lesson.lesson_name}
        hideImage={query.action === "learning"}
      ></Banner>
      {query.action === "list" && (
        <LessonList getLesson={getLesson}></LessonList>
      )}
      {query.action === "preview" && (
        <LessonPreview lesson={lesson} getLesson={getLesson}></LessonPreview>
      )}
      {query.action === "learning" && (
        <LessonLearn
          lesson={lesson}
          chapter={chapter}
          getLesson={getLesson}
        ></LessonLearn>
      )}
    </Fragment>
  );
};

export default Home;
