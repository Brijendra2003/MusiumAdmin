import Navigation from "./Navigation";
import Fileinpute from "../Components/Fileinpute";
import Notification from "../Components/Notification";
import { useEffect, useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance.js";

import "../Styles/Home.css";
export default function Home() {
  let username = localStorage.getItem("username");
  let [Subject, setSubject] = useState(false);
  let [Teacher, setTeacher] = useState(false);
  let [Timetable, setTimetable] = useState(false);
  // console.log("current ", Timetable);

  let [triggerd, setTriggered] = useState(false);

  let handletrigger = () => {};

  useEffect(() => {
    axiosInstance
      .get("/home", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log("Api called");
        // setSubject(res.data.sub > 0);
        setTeacher(res.data.empoyees > 0);
        setTimetable(res.data.timetable > 0);
      })
      .catch((res) => {
        console.log(res);
        if (res.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (res.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
        // console.log("Api called err");

        // alert("Unauthorized, please log in");
      });
  }, [triggerd]);

  return (
    <>
      <Navigation home={true} />
      {username != null && (
        <h3 className="home-hellow">
          Hello {username}, welcome to our Institute
        </h3>
      )}
      <h3 className="home-heading">Kindly upload all required files.</h3>
      <div className="home-container">
        <Fileinpute
          lable={"Employee"}
          verified={Teacher}
          uploaded={Teacher}
          tblname={""}
          columns={["id", "name", "department","doj"]}
          refresh={() => setTriggered((prev) => !prev)}
        />
             
        
      </div>
    </>
  );
}
