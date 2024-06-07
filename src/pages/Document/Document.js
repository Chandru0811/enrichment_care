import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../config/URL";
import toast from "react-hot-toast";
import fetchAllStudentsWithIds from "../List/StudentList";
import DocumentEdit from "./DocumentEdit";
// import { SCREENS } from "../../config/ScreenFilter";

const Document = () => {
  const tableRef = useRef(null);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const fetchData = async () => {
    try {
      const studentData = await fetchAllStudentsWithIds();
      setStudentData(studentData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/getAllDocumentFolder");
      setDatas(response.data);
      setLoading(false);
    };
    getData();
    fetchData();
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
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
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
      const response = await api.get("/getAllDocumentFolder");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="minHeight center">
    <div className="container-fluid my-4 center ">
        <div className="card shadow border-0 mb-2 top-header">
    <div className="container-fluid px-0">
      <div className="mb-5 mt-3 d-flex justify-content-between px-4">
        <h2>Document Folder</h2>
        {/* {storedScreens?.documentListingCreate && ( */}
          <Link to="/document/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i className="bx bx-plus"></i>
            </button>
          </Link>
        {/* )} */}
      </div>
      <hr/>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="px-4">
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">Folder Name</th>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Class</th>
              <th scope="col">Batch</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.folderName}</td>
                <td>
                  {studentData &&
                    studentData.map((student) =>
                      parseInt(data.studentId) === student.id
                        ? student.studentNames || "--"
                        : ""
                    )}
                </td>
                <td>{data.course}</td>
                <td>{data.classListing}</td>
                <td>{data.batchTime}</td>
                {/* <td>
                  {data.status === "Active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">In Active</span>
                  )}
                </td> */}
                <td>
                  <div className="d-flex">
                    {/* {storedScreens?.documentListingRead && ( */}
                      <Link to={`/document/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    {/* )} */}
                    <DocumentEdit onSuccess={refreshData} id={data.id} />
                    {/* <DeleteModel
                      onSuccess={refreshData}
                      path={`/deleteCourseClassListing/${data.id}`}
                    /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default Document;
