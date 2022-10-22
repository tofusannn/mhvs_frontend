import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import Banner from "../../components/common/Banner";
import LessonLearn from "../../components/lesson/LessonLearn";
import LessonList from "../../components/lesson/LessonList";
import LessonPreview from "../../components/lesson/LessonPreview";

const Home = () => {
  const { query, push } = useRouter();

  return (
    <Fragment>
      <Banner
        page={"บทเรียนออนไลน์"}
        subPage={query.action != "list" && "เรียนรู้สู้ โควิด19"}
        hideImage={query.action === "learning"}
      ></Banner>
      {query.action === "list" && <LessonList></LessonList>}
      {query.action === "preview" && <LessonPreview></LessonPreview>}
      {query.action === "learning" && <LessonLearn></LessonLearn>}
    </Fragment>
  );
};

export default Home;
