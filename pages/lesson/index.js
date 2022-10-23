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
    query.lesson && getLesson(query.lesson);
    query.lesson && !query.chapter && getChapter(query.lesson);
  }, [query]);

  async function getLesson(id) {
    const data = await Lesson.getLessonById(id);
    setLesson(data.result);
  }

  async function getChapter(id) {
    const end = false;
    const data = await Lesson.getChapterByLessonId(id);
    setChapter(data.result)
    data.result.forEach((e) => {
      if (end) return;
      if (!e.user_action) {
        if (!e.pre_test.user_action) {
          end = true;
          return push({
            pathname,
            query: { ...query, chapter: e.index, menu: 1 },
          });
        }
        if (!e.video.user_action) {
          end = true;
          return push({
            pathname,
            query: { ...query, chapter: e.index, menu: 2 },
          });
        }
        if (!e.file.user_action) {
          end = true;
          return push({
            pathname,
            query: { ...query, chapter: e.index, menu: 3 },
          });
        }
        if (!e.post_test.user_action) {
          end = true;
          return push({
            pathname,
            query: { ...query, chapter: e.index, menu: 4 },
          });
        }
        if (!e.homework.user_action) {
          end = true;
          return push({
            pathname,
            query: { ...query, chapter: e.index, menu: 5 },
          });
        }
      }
    });
  }

  return (
    <Fragment>
      <Banner
        page={"บทเรียนออนไลน์"}
        subPage={query.action != "list" && lesson.lesson_name}
        hideImage={query.action === "learning"}
      ></Banner>
      {query.action === "list" && <LessonList></LessonList>}
      {query.action === "preview" && (
        <LessonPreview lesson={lesson}></LessonPreview>
      )}
      {query.action === "learning" && (
        <LessonLearn lesson={lesson} chapter={chapter}></LessonLearn>
      )}
    </Fragment>
  );
};

export default Home;
