import { Link } from "react-router-dom";
import "../Styles/Navigation.css";
import axiosInstance from "../HelperFiles/axiosInstance";
export default function Navigation({ home, teacher, subj, timet }) {
  let logout = () => {
    axiosInstance
      .post("/logout", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert(res.data.message);
        localStorage.clear();
        location.reload();
      })
      .catch((err) => {
        // console.log(err);
        alert(err.message);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
      });
  };
  return (
    <>
      <div className="top-navgation">
        <div className="menu">The Museum</div>
        <ul className="links">
          <Link className={home ? "link-visited link" : "link"} to="/">
            Home
          </Link>
          <Link className={subj ? "link-visited link" : "link"} to="/Subjects">
            Visitors entry
          </Link>
          <Link
            className={teacher ? "link-visited link" : "link"}
            to="/Teachers"
          >
            Employee
          </Link>
         
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}
