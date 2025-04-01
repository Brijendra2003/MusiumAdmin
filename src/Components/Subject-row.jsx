import { useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance";
import Notification from "./Notification";
export default function SubjectRow({ id, name, mNumber, address, entryt, exitet, date }) {
  const [isedit, setEdit] = useState(false);
  const [editbtn, setEditbtn] = useState(false);
  const [editData, setEditData] = useState({
 id, name, mNumber, address, entryt, exitet, date
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  let showEdit = () => {
    setEdit(true);
    setEditbtn(true);
  };

  let submit = () => {
    console.log(editData);
    axiosInstance
      .post(
        `/visitors${id}`,
        { ...editData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(res.data);
        // console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <tr>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="name"
              value={editData.name}
              onChange={handleInput}
              type="text"
            />
          ) : (
            name
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="mNumber"
              value={editData.mNumber}
              onChange={handleInput}
              type="number"
            />
          ) : (
            mNumber
          )}
        </td>
        <td>{isedit ? (
            <input
              className="editeInput"
              name="address"
              value={editData.address}
              onChange={handleInput}
              type="textarea"
            />
          ) : (
            address
          )}</td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="entryt"
              value={editData.entryt}
              onChange={handleInput}
              type="text"
            />
          ) : (
            entryt
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="exitet"
              value={editData.exitet}
              onChange={handleInput}
              type="text"
            />
          ) : (
            exitet
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="date"
              value={editData.date}
              onChange={handleInput}
              type="text"
            />
          ) : (
            date
          )}
        </td>
        <td className="btn-editeDelete">
          {editbtn ? (
            <button onClick={submit} className="btn-editeRow">
              Submit
            </button>
          ) : (
            <button onClick={showEdit} className="btn-editeRow">
              Edite
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
