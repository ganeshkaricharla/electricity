import "./Edit.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Edit() {
  const { id } = useParams();
  const [bills, setBills] = useState(null);

  useEffect(() => {
    axios
      .get("https://electricityserver.herokuapp.com/bill/" + id)
      .then((res) => {
        console.log(res.data);
        setBills(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "paid") {
      if (e.target.value === "true") {
        setBills({ ...bills, paid: true });
      } else {
        setBills({ ...bills, paid: false });
      }
    } else {
      setBills({ ...bills, [e.target.name]: e.target.value });
      console.log(bills);
    }
  };

  const updateBill = () => {
    axios
      .put("https://electricityserver.herokuapp.com/" + id + "/edit", bills)
      .then((res) => {
        console.log(res);
        alert("Bill updated successfully");
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page_edit">
      <h1 className="page_edit_title">Bill Summary</h1>
      {bills && (
        <div className="page_edit_area">
          <div className="page_edit_legend">
            <h1>{bills._id}</h1>
            <div className="page_edit_icons">
              <i className="fa-solid fa-floppy-disk" onClick={updateBill}></i>
            </div>
          </div>
          <div className="page_edit_details">
            <div className="page_edit_row">
              <div className="page_edit_label">Bill Date</div>
              <input
                type="date"
                value={bills.billdate.slice(0, 10)}
                onChange={handleChange}
                name="billdate"
              />
            </div>
            <div className="page_edit_row">
              <div className="page_edit_label">Units</div>
              <input
                type="text"
                value={bills.units}
                onChange={handleChange}
                name="units"
              />
            </div>
            <div className="page_add_row">
              <div className="page_add_label">Bill Amount</div>
              <input
                type="text"
                value={bills.billamount}
                onChange={handleChange}
                name="billamount"
              />
            </div>
            <div className="page_edit_row">
              <div className="page_edit_label">Bill Status</div>
              <select name="paid" onChange={handleChange} value={bills.paid}>
                <option value={true}>PAID</option>
                <option value={false}>NOT PAID</option>
              </select>
            </div>
            {bills.paid && (
              <div className="page_edit_row">
                <div className="page_edit_label">Payment Date</div>
                <input
                  type="date"
                  value={bills.paidDate.slice(0, 10)}
                  onChange={handleChange}
                  name="paidDate"
                  min={bills.billdate.slice(0, 10)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
