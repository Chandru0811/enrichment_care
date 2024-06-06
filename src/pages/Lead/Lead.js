import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import toast from "react-hot-toast";
import DeleteModel from "../../components/common/DeleteModel";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
// import { SCREENS } from "../../config/ScreenFilter";

const Lead = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllLeadInfo");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getCenterData();
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
      const response = await api.get("/getAllLeadInfo");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="minHeight center">
    <div>
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
        <div className="container-fluid my-4 center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid px-0">
          <div className="my-3 d-flex justify-content-between mb-5 px-4">
          <h2>Lead Listing</h2>
              <Link to="/lead/lead/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            
          </div>
          <hr/>
          <div className="px-4">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col" className="text-start">Centre</th>
                <th scope="col">Student Name</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">{index + 1}</th>
                  <td className="text-start">
                    {" "}
                    {centerData &&
                      centerData.map((center) =>
                        parseInt(data.enrichmentCareId) === center.id
                          ? center.enrichmentCareNames || "--"
                          : ""
                      )}
                  </td>
                  <td>{data.studentName}</td>
                  <td>
                    {data.paymentStatus === "REJECTED" ? (
                      <span className="badge bg-danger">Rejected</span>
                    ) : data.paymentStatus === "PAID" ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    {data.leadStatus === "Arranging assessment" ? (
                      <span className="badge bg-warning">
                        Arranging assessment
                      </span>
                    ) : data.leadStatus === "Assessment confirmed" ? (
                      <span className="badge bg-primary">Assessment confirmed</span>
                    ) : data.leadStatus === "Waiting for payment" ? (
                      <span className="badge bg-primary">Waiting for payment</span>
                    ) : data.leadStatus === "Rejected" ? (
                      <span className="badge bg-info">Rejected</span>
                    ) : (
                      <span className="badge bg-danger">Pending</span>
                    )}
                  </td>

                  <td>
                    <div className="d-flex justify-content-between">
                      {/* {storedScreens?.leadListingRead && (
                        <Link to={`/lead/lead/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      )} */}
                      <Link to={`/lead/lead/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      {/* {storedScreens?.leadListingUpdate && (
                        <Link to={`/lead/lead/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )} */}
                      <Link to={`/lead/lead/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      {/* {storedScreens?.leadListingDelete && (
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`/deleteLeadInfo/${data.id}`}
                        />
                      )} */}
                       <DeleteModel
                          onSuccess={refreshData}
                          path={`/deleteLeadInfo/${data.id}`}
                        />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default Lead;
