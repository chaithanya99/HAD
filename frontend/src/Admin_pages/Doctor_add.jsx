import React, { useState } from "react";
import "./CSS/Doctor_add.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // Import Axios for making HTTP requests
import Sidebar from "../components/misc/Sidebar";

const DoctorAdd = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: "",
    name: "",
    abha_id: "",
    email_Id: "",
    mobile: "",
    address: "",
    gender: "",
    YearofBirth: ""
  });
  const token = localStorage.getItem('token');
  const handleInputChange = (e) => {
    console.log("input has changed");
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server endpoint
      const response = await axios.post("http://localhost:8080/admin/createdoc", doctorDetails,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Handle success response
      if (response.status === 200) {
        toast("Doctor Added Successfully");
        console.log("values are being set now");
        setDoctorDetails({
          specialization: "",
          name: "",
          abha_id: "",
          email_Id: "",
          mobile: "",
          address: "",
          gender: "",
          YearofBirth: ""
        });
      } else {
        toast("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle error
      toast("Error: Unable to add doctor. Please try again later.");
    } finally {
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar/>
        <div className="main-content">
          <div className="card">
            <h1 className="card-title">Add Doctor</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={doctorDetails.specialization}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={doctorDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Abha ID</label>
                <input
                  type="text"
                  name="abha_id"
                  value={doctorDetails.abha_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email_Id"
                  value={doctorDetails.email_Id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={doctorDetails.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={doctorDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={doctorDetails.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year of Birth</label>
                <input
                  type="text"
                  name="YearofBirth"
                  value={doctorDetails.YearofBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                {"Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorAdd;
