import { useRouter } from "next/router";
import { Fragment } from "react";
import Banner from "../../components/common/Banner";
import LessonList from "../../components/lesson/LessonList";
import LessonPreview from "../../components/lesson/LessonPreview";

const Home = () => {
  const { query } = useRouter();
  return (
    <Fragment>
      <Banner page={"บทเรียนออนไลน์"} subPage={query.action === "preview" && "เรียนรู้สู้ โควิด19"}></Banner>
      {query.action === "list" && <LessonList></LessonList>}
      {query.action === "preview" && <LessonPreview></LessonPreview>}
    </Fragment>
  );
};

export default Home;
