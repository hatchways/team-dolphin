import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        console.log(res);
      } catch (error) {
        console.log("error");
      }
    };

    isAuthenticated();
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
