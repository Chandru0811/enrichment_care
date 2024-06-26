import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import api from "../../config/URL";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import ScheduleTeacherAdd from "../ScheduleTeacher/ScheduleTeacherAdd";
// import ScheduleTeacherEdit from "../ScheduleTeacher/ScheduleTeacherEdit";
import ScheduleTeacherView from "../ScheduleTeacher/ScheduleTeacherView";
import { Link } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import { Button } from "react-bootstrap";

const ScheduleTeacher = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRowData(rowData);
    setShow(true);
  };

  const handelDelete = async (rowData) => {
    try {
      const { enrichmentCareId, userId, courseId, classId, days } = rowData;
      const formData = new FormData();
      formData.append("enrichmentCareId", enrichmentCareId);
      formData.append("userId", userId);
      formData.append("courseId", courseId);
      formData.append("classId", classId);
      formData.append("dayOfWeek", days);

      // const requestBody = {
      //   enrichmentCareId: 8,
      //   userId,
      //   courseId: 11,
      //   classId: 20,
      //   dayOfWeek: days,
      // };
      const response = await api.delete("deleteAllScheduleTeacher", {
        data: formData,
      });

      if (response.status === 200) {
        refreshData();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllScheduleTeacher");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllScheduleTeacher");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
       <div className="card shadow border-0 mb-2 top-header">
    <div className="container-fluid px-0">
    
      <div className="my-3 d-flex justify-content-between mb-5 px-4">
    
              <h2>Schedule</h2>
          
                
              {storedScreens?.scheduleTeacherCreate && ( <ScheduleTeacherAdd onSuccess={refreshData}/> )}
      </div>
      <hr />
      {loading ? (
        <div className="loader-container">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <>
          {/* <ScheduleTeacherAdd onSuccess={refreshData} /> */}
          <div className="table-responsive px-4">
            <table ref={tableRef} className="display">
              {/* Table Header */}
              <thead>
                <tr>
                  <th scope="col" className="text-center">S No</th>
                  <th scope="col" className="text-center">Centre</th>
                  <th scope="col" className="text-center">Teacher</th>
                  <th scope="col" className="text-center">Course</th>
                  <th scope="col" className="text-center">Class</th>
                  <th scope="col" className="text-center">Day</th>
                  <th scope="col" className="text-center">Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row" className="text-center">{index + 1}</th>
                    <td className="text-center">{data.enrichmentCareName}</td>
                    <td className="text-center">{data.teacher}</td>
                    <td className="text-center">{data.course}</td>
                    <td className="text-center">{data.className}</td>
                    <td className="text-center">{data.days}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-item-center">
                        {storedScreens?.scheduleTeacherRead && (
                          <ScheduleTeacherView id={data.id} />
                        )}
                        {/* {storedScreens?.scheduleTeacherUpdate && (
                        <ScheduleTeacherEdit
                          id={data.id}
                          onSuccess={refreshData}
                        />
                      )} */}
                        {storedScreens?.scheduleTeacherDelete && (
                          <button
                            className="btn btn-sm"
                            onClick={() => handleShow(data)}
                          >
                            <FaTrash />
                          </button>
                        )}
                        {storedScreens?.timeScheduleIndex && (
                          <Link
                            to={`/scheduleteacher/scheduletime/${data.userId}?enrichmentCareId=${data.enrichmentCareId}`}
                          >
                            <button className="btn">
                              <BsTable className="text-dark" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Delete Confirmation Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => handelDelete(selectedRowData)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
    </div>
    </div>
  );
};

export default ScheduleTeacher;
