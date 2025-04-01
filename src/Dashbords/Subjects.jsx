import Navigation from "./Navigation";
import "../Styles/Table.css";
import SubjectRow from "../Components/Subject-row";
import axiosInstance from "../HelperFiles/axiosInstance.js";
import { useEffect, useState } from "react";
export default function Subjects() {
  let [tableData, setTableData] = useState(null);
  let [isAdd, setIsAdd] = useState(false);
  let [triggered, setTriggered] = useState();
  let [formData, setFormData] = useState({
  name:"", mNumber:"", address:"", entryt:"", exitet:"", date:""
  });
  useEffect(() => {
    axiosInstance
      .get("/visitors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
      });
  }, [triggered]);

  const handleAdd = (event) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const addData = () => {
    console.log(formData);
    setFormData({});
    axiosInstance
      .put(
        "/subjects",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(res.data);
        setIsAdd(false);
        setTriggered((prev) => !prev);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
      <Navigation subj={true} />
      <div className="t-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mob-no</th>
              <th>Address</th>
              <th>Enter-time</th>
              <th>Exite-time</th>
              <th>Date</th>
              <th>Edite</th>
            </tr>
          </thead>
          <tbody>
            {tableData != null &&
              tableData.map((data, index) => (
                <SubjectRow
                  key={index}
                  id={data.visitor_id}
                  name={data.visitor_name}
                  mNumber={data.visitor_mno}
                  address={data.address}
                  entryt={data.entry_time}
                  exitet={data.exite_time}
                  date={data.date}
                />
              ))}
            {isAdd ? (
              <tr>
                <td>
                  <input
                    className="editeInput"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="mNumber"
                    value={formData.mNumber || ""}
                    onChange={handleAdd}
                    type="number"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleAdd}
                    type="textarea"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="entryt"
                    value={formData.entryt || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="exitet"
                    value={formData.exitet || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <button onClick={addData} className="btn-editeRow">
                    Save
                  </button>
                  <button
                    onClick={() => setIsAdd(false)}
                    className="btn-deleteRow"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td>+ Add</td>
                <td></td>

                <td>
                  <button
                    onClick={() => setIsAdd(true)}
                    className="btn-editeRow"
                  >
                    click
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
