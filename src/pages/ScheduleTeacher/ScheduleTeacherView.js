import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa";
import api from "../../config/URL";
import toast from "react-hot-toast";

function ScheduleTeacherView({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    try{
      const response = await api.get(`/getAllScheduleTeacherById/${id}`);
      setData(response.data);
      setShow(true);
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
    finally{
      setShow(true);
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await api.get(`/getAllCourseLevels/${id}`);
  //     setData(response.data);
  //   };
  //   getData();
  // }, [id]);

  return (
    <>
       <button className="btn btn-sm" onClick={handleShow}>
          <FaEye />
        </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">View Schedule Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container py-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <div className="col-5">
                    <p className="fw-bold">Centre</p>
                  </div>
                  <div className="col-7">
                    <p>:&nbsp;{data.enrichmentCareName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <div className="col-5">
                    <p className="fw-bold">Course</p>
                  </div>
                  <div className="col-7">
                    <p>:&nbsp;{data.course}</p>
                  </div>
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <div className="col-5">
                    <p className="fw-bold">Class</p>
                  </div>
                  <div className="col-7">
                    <p>:&nbsp;{data.className}</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6 col-12 mb-2">
                <div className="row">
                    <div className="col-6">
                      <p className="fw-bold">Batch</p>
                    </div>
                    <div className="col-6">
                      <p>:&nbsp;{data.batch}</p>
                    </div>
                  </div>

                 </div> */}
              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <div className="col-5">
                    <p className="fw-bold">Teacher</p>
                  </div>
                  <div className="col-7">
                    <p>:&nbsp;{data.teacher}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ScheduleTeacherView;
