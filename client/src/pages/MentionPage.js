import React, { useState, useEffect } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { useParams } from "react-router-dom";
import { getOneMention } from "../hooks/getOneMention";

const MentionPage = () => {
  const { id } = useParams();
  const [mention, setMention] = useState({});

  useEffect(() => {
    getOneMention(id)
      .then((data) => {
        setMention(data);
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  return (
    <>
      <AppBarLoggedIn />
      <div>Mention Page here</div>
    </>
  );
};

export default MentionPage;
