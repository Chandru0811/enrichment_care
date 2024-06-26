import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import fetchAllCentersWithIds from "../../List/CenterList";

const Holiday = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
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
        const response = await api.get("/getAllUserHoliday");
        setDatas(response.data);
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllUserHoliday");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="minHeight center">
    <div className="container-fluid my-4 center">
    <div className="card shadow border-0 mb-2 top-header">
    <div className="container-fluid px-0">
      <div className="my-5 d-flex justify-content-between px-4">
      <h2>Holiday</h2>
        {storedScreens?.holidayCreate && (
          <Link to="/holiday/add">
            <button type="button" className="btn btn-sm btn-button">
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
              <th scope="col" className="text-center">Centre Name</th>
              <th scope="col" className="text-center">Holiday Name</th>
              <th scope="col" className="text-center">Start Data</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
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
                <td className="text-center">{data.holidayName}</td>
                <td className="text-center">{data.startDate.substring(0, 10)}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center align-items-center ">
                    {storedScreens?.holidayRead && (
                      <Link
                        to={`/holiday/list/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.holidayUpdate && (
                      <Link
                        to={`/holiday/edit/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.holidayDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteUserHoliday/${data.id}`}
                        style={{ display: "inline-block" }}
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

export default Holiday;
