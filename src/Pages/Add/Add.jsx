import "./Add.css";
import { useState, useEffect } from "react";
import axios from "axios";
function Add() {
  const [bills, setBills] = useState({
    billdate: new Date().toISOString().slice(0, 10),
    units: 0,
    billamount: 0,
    paid: false,
    paidDate: new Date().toISOString().slice(0, 10),
  });

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

  const addBill = () => {
    axios
      .post("https://electricityserver.herokuapp.com/", bills)
      .then((res) => {
        console.log(res);
        alert("Bill added successfully");
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
      });
  };

  return (
    <div className="page_add">
      <h1 className="page_add_title">Add New Bill</h1>
      {bills && (
        <div className="page_add_area">
          <div className="page_add_legend">
            <h1>Create a new Bill</h1>
            <div className="page_add_icons">
              <i className="fa-solid fa-floppy-disk" onClick={addBill}></i>
            </div>
          </div>
          <div className="page_add_details">
            <div className="page_add_row">
              <div className="page_add_label">Bill Date</div>
              <input
                type="date"
                value={bills.billdate.slice(0, 10)}
                onChange={handleChange}
                name="billdate"
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="page_add_row">
              <div className="page_add_label">Units</div>
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
            <div className="page_add_row">
              <div className="page_add_label">Bill Status</div>
              <select name="paid" onChange={handleChange} value={bills.paid}>
                <option value={true}>PAID</option>
                <option value={false}>NOT PAID</option>
              </select>
            </div>

            {bills.paid && (
              <div className="page_add_row">
                <div className="page_add_label">Payment Date</div>
                <input
                  type="date"
                  value={bills.paidDate.slice(0, 10)}
                  onChange={handleChange}
                  name="paidDate"
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Add;
