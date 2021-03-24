import React, { useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { UserContext } from "../context/user";
import { getMentions } from "../hooks/getMentions";
import Spinner from "./Spinner";

const Scroller = ({
  sort,
  items,
  loadmore,
  hasMore,
  setHasMore,
  setMentionDatas,
}) => {
  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  useEffect(() => {
    getMentions(dispatch, searchTerm, user.platforms, 1, sort)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
      })
      .catch((err) => alert("Cookie expired. Please log in again"));
    // setCurrentPage(1);
  }, [sort]);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadmore}
      hasMore={hasMore}
      loader={<Spinner />}>
      {items}
    </InfiniteScroll>
  );
};

export default Scroller;
