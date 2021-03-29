import React, { useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { UserContext } from "../context/user";
import { getMentions } from "../hooks/getMentions";
import Spinner from "./Spinner";
import Mention from "../layout/Mention";

const Scroller = ({
  sort,
  error,
  loadmore,
  hasMore,
  setHasMore,
  mentionDatas,
  setMentionDatas,
}) => {
  const { dispatch, searchTerm, user } = useContext(UserContext);

  useEffect(() => {
    getMentions(dispatch, searchTerm, user.platforms, 1, sort)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
      })
      .catch((err) => alert("Cookie expired. Please log in again"));
  }, [sort]);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadmore}
      hasMore={hasMore}
      loader={<Spinner />}>
      {!error && mentionDatas.length > 0 ? (
        mentionDatas.map((mentionData) => (
          <Mention key={mentionData._id} mention={mentionData} />
        ))
      ) : (
        <div>No results found</div>
      )}
    </InfiniteScroll>
  );
};

export default Scroller;
