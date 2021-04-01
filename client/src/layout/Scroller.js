import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "./Spinner";
import Mention from "../layout/Mention";

const Scroller = ({ error, loadmore, hasMore, mentionDatas }) => {
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
