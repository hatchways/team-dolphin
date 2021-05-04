import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "./Spinner";
import Mention from "../layout/Mention";

const Scroller = ({ error, loadmore, hasMore, mentionDatas }) => {
  const [likedMentions, setLikedMentions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.likedMentions) {
      setLikedMentions([...user.likedMentions]);
    }
  }, [user.likedMentions]);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadmore}
      hasMore={hasMore}
      loader={<Spinner />}>
      {!error && mentionDatas.length > 0 ? (
        mentionDatas.map((mentionData) => (
          <Mention
            key={mentionData._id}
            mention={mentionData}
            likedMentions={likedMentions}
          />
        ))
      ) : (
        <div>No results found</div>
      )}
    </InfiniteScroll>
  );
};

export default Scroller;
