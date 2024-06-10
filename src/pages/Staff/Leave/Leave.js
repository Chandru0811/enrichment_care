import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import fetchAllCentersWithIds from "../../List/CenterList";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import api from "../../../config/URL";

const Leave = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  // const userId = sessionStorage.getItem("userId");
  const userId = 8;
  // console.log("Data:", datas.employeeData);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  // console.log("centerData", centerData);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getUserLeaveRequestByUserId/${userId}`
        );
        setDatas(response.data);
        console.log("responsedata", response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
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

 
  return (
    <div className="minHeight center">
    <div className="container-fluid my-4 center">
    <div className="card shadow border-0 mb-2 top-header">
    <div className="container-fluid px-0">
      <div className="my-5 d-flex justify-content-between px-4">
        {/* {storedScreens?.leaveCreate && ( */}
        <h2>Leave Request</h2>
          <Link to="/leave/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
            </button>
          </Link>
        {/* )} */}
      </div>
      <hr />
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
        <div>
          <div className="row pb-3">
            <div className="col-md-6 col-12">
              <div className="row mt-3 mb-2">
                <div className="col-6">
                  <p className="fw-medium">Employee Name :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {datas.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Leave Limit :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {datas.leaveLimit || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col" className="text-center">Centre Name</th>
                <th scope="col" className="text-center">Employee Name</th>
                <th scope="col" className="text-center">Leave Type</th>
                <th scope="col" className="text-center">Leave Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas?.employeeData?.map((data, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">{index + 1}</th>
                  <td className="text-center">
                    {centerData &&
                      centerData.map((enrichmentCareId) =>
                        parseInt(data.enrichmentCareId) === enrichmentCareId.id
                          ? enrichmentCareId.enrichmentCareNames || "--"
                          : ""
                      )}
                  </td>
                  <td className="text-center">{data.employeeName}</td>
                  <td className="text-center">{data.leaveType}</td>
                  <td className="text-center">
                    {data.leaveStatus === "APPROVED" ? (
                      <span className="badge badges-Green">Approved</span>
                    ) : data.leaveStatus === "REJECTED" ? (
                      <span className="badge badges-Red">Rejected</span>
                    ) : (
                      <span className="badge badges-Yellow">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center ">
                      <Link
                        to={`/leave/view/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default Leave;
