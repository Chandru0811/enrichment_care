import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
// import LevelAdd from "./LevelAdd";
import LevelEdit from "./LevelEdit";
import Delete from "../../components/common/DeleteModel";
import api from "../../config/URL";
import LevelAdd from "./LevelAdd";


const Level = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourseLevels");
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
      const response = await api.get("/getAllCourseLevels");
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

          <div className="my-3 d-flex justify-content-between mb-5 px-4">
            <h2>Level</h2>

            {/* <Link to="/level/add">
              <button type="button" className="btn btn-button btn-sm">
                Add <i class="bx bx-plus"></i>
              </button>
            </Link> */}
 {storedScreens?.levelCreate && (<LevelAdd /> )}
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
            <div className="table-responsive px-4">
              <table ref={tableRef} className="display">
                <thead>
                  <tr>
                    <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>S No</th>
                    <th scope="col" className="text-center">Level</th>
                    <th scope="col" className="text-center">Code</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">{index + 1}</th>
                      <td className="text-center">{data.level}</td>
                      <td className="text-center">{data.levelCode}</td>
                      <td className="text-center">
                        {data.status === "Active" ? (
                          <span className="badge badges-Green">Active</span>
                        ) : (
                          <span className="badge badges-Red">Inactive</span>
                        )} 
                      </td>
                      <td className="text-center">
                        {storedScreens?.levelRead && (
                          <Link to={`/level/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}
                        {storedScreens?.levelUpdate && (
                          <LevelEdit id={data.id} onSuccess={refreshData} />
                        )}
                        {storedScreens?.levelDelete && (
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourseLevel/${data.id}`}
                    />
                  )}
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

export default Level;
