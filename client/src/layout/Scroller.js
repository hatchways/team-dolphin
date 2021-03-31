import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
