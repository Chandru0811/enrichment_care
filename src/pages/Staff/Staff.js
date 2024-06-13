import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/DeleteModel";
import api from "../../config/URL";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
// import { SCREENS } from "../../config/ScreenFilter";

const Staff = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUsersByRole/staff");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
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
      const response = await api.get("/getAllUsersByRole/staff");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
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
        <div className="minHeight center">
        <div className="container-fluid my-4 center">
        <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid px-0">
          <div className="my-3 d-flex justify-content-between mb-5 px-4">
          
            <h2>Staff</h2>
            {storedScreens?.staffCreate && (
              <Link to="/staff/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
          </div>
          <hr/>
          <div className="px-4">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col" className="text-center">Staff Id</th>
                <th scope="col" className="text-center">Staff Name</th>
                <th scope="col" className="text-center">Staff Type</th>
                <th scope="col" className="text-center">Mobile</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">{index + 1}</th>
                  <td className="text-center">
                  {data.userAccountInfoModels?.length > 0 && data.userAccountInfoModels[0].teacherId}
                  </td>
                  {/* <td>{data.teacherId}</td> */}
                  <td className="text-center">{data.teacherName}</td>
                  <td className="text-center">
                    {data.userAccountInfoModels?.length > 0 &&
                      data.userAccountInfoModels[0].teacherType}
                  </td>
                  <td className="text-center">
                    {data.userContactInfoModels?.length > 0 &&
                      data.userContactInfoModels[0].contactNumber}
                  </td>
                  <td className="text-center">
                    {data.userAccountInfoModels?.length > 0 &&
                    data.userAccountInfoModels[0].status === "Active" ? (
                      <span className="badge badges-Green">Active</span>
                    ) : (
                      <span className="badge badges-Red ">Inactive</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div >
                      {storedScreens?.staffRead && (
                        <Link to={`/staff/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.staffUpdate && (
                        <Link to={`/staff/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.staffDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteUser/${data.id}`}
                        />
                      )}
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
        </div>
      )}
    </div>
  );
};

export default Staff;
