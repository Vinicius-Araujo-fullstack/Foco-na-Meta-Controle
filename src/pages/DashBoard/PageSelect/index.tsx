import { useContext } from "react";
import { ContextSideMenuController } from "../../../context/context.ts";
import ClassPage from "./ClassPage/index.tsx";
import ReviewsPage from "./ReviewsPage/index.tsx";
import SimulatedPage from "./SimulatedPage/index.tsx";
import ArchivePage from "./ArchivePage/index.tsx";
import NotifyPage from "./NotifyPage/index.tsx";
import ArticlePage from "./ArticlePage/index.tsx";

const PageSelect = () => {
  const { activeItemId } = useContext(ContextSideMenuController);
  return (
    <>
      {activeItemId == "0" ? <ClassPage></ClassPage> : null}
      {activeItemId == "1" ? <ReviewsPage></ReviewsPage> : null}
      {activeItemId == "2" ? <SimulatedPage></SimulatedPage> : null}
      {activeItemId == "3" ? <ArchivePage></ArchivePage> : null}
      {activeItemId == "4" ? <NotifyPage></NotifyPage> : null}
      {activeItemId == "5" ? <ArticlePage></ArticlePage> : null}
    </>
  );
};

export default PageSelect;
