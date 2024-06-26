import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/DeleteModel";
import api from "../../config/URL";
import toast from "react-hot-toast";

const Center = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllEnrichmentCare");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
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
      const response = await api.get("/getAllEnrichmentCare");
      setDatas(response.data);
      initializeDataTable();
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
      <div className="mb-5 mt-3 d-flex justify-content-between px-4">
      
              <h2>Centre Listing</h2>
            
              {storedScreens?.enrichmentCareListingCreate && (
          <Link to="/center/add">
            <button
              type="button"
              className="btn btn-button btn-sm "
              // style={{ fontWeight: "600px !important" }}
            >
              Add <i className="bx bx-plus"></i>
            </button>
          </Link>
              )}
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
        <div className="table-responsive px-4">
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col" className="text-center">Centre Name</th>
              <th scope="col" className="text-center">Centre Manager</th>
              <th scope="col" className="text-center">Code</th>
              <th scope="col" className="text-center">UEN Number</th>
              <th scope="col" className="text-center">Mobile</th>
              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row" className="text-center">{index + 1}</th>
                <td className="text-center">{data.enrichmentCareName}</td>
                <td className="text-center">{data.enrichmentCareManager}</td>
                <td className="text-center">{data.code}</td>
                <td className="text-center">{data.uenNumber}</td>
                <td className="text-center">{data.mobile}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center ">
                    {storedScreens?.enrichmentCareListingCreate && (
                      <div class="dropdown" style={{ display: "inline-block" }}>
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <IoMdAdd />
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <AddRegister id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddBreak id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddClass id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddPackage id={data.id} onSuccess={refreshData} />
                          </li>
                        </ul>
                      </div>
                   )} 
                    {storedScreens?.enrichmentCareListingRead && (
                      <Link
                        to={`/center/view/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                     )}
                    {storedScreens?.enrichmentCareListingUpdate && (
                      <Link
                        to={`/center/edit/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )} 
                    {storedScreens?.enrichmentCareListingDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteEnrichmentCare/${data.id}`}
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

export default Center;
