import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/DeleteModel";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllStudentsWithIds from "../List/StudentList";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// import { SCREENS } from "../../config/ScreenFilter";

const Invoice = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [packageData, setPackageData] = useState(null);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      const studentData = await fetchAllStudentsWithIds();
      const packageData = await api.get("getAllEnrichmentCarePackageWithIds");
      setPackageData(packageData.data);
      setCenterData(centerData);
      setCourseData(courseData);
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllGenerateInvoices");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
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
      const response = await api.get("/getAllGenerateInvoices");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="minHeight center">
    <div className="container-fluid my-4 center ">
      <div className="card shadow border-0 mb-2 top-header">
    <div className="container px-0">
      <div className="my-3 d-flex justify-content-between mb-5 px-4">
        <h2>Invoice</h2>
        {storedScreens?.invoiceCreate && (
          <Link to="/invoice/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
            </button>
          </Link>
        )}
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
              <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col" className="text-center">Course</th>
              <th scope="col" className="text-center">Centre</th>
              <th scope="col" className="text-center">Student</th>
              <th scope="col" className="text-center">Package</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row" className="text-center">{index + 1}</th>
                <td className="text-center">
                  {courseData &&
                    courseData.map((course) =>
                      parseInt(data.courseId) === course.id
                        ? course.courseNames || "--"
                        : ""
                    )}
                </td>
                <td className="text-center">
                  {centerData &&
                    centerData.map((center) =>
                      parseInt(data.enrichmentCareId) === center.id
                        ? center.enrichmentCareNames || "--"
                        : ""
                    )}
                </td>
                <td className="text-center"> 
                  {studentData &&
                    studentData.map((student) =>
                      parseInt(data.studentId) === student.id
                        ? student.studentNames || "--"
                        : ""
                    )}
                </td>
                <td className="text-center">
                  {packageData &&
                    packageData.map((packages) =>
                      parseInt(data.packageId) === packages.id
                        ? packages.packageNames || "--"
                        : ""
                    )}
                </td>
                <td className="text-center">
                  <div className="">
                    {storedScreens?.invoiceRead && (
                      <Link to={`/invoice/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.invoiceUpdate && (
                      <Link to={`/invoice/edit/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.invoiceDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteGenerateInvoice/${data.id}`}
                      />
                    )}
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

export default Invoice;
