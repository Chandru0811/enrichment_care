
import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import SendNotificationAdd from "./SendNotificationAdd";
import SendNotificationEdit from "./SendNotificationEdit";
import api from "../../config/URL";
import Delete from "../../components/common/DeleteModel";

const SendNotification = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllEnrichmentCarePushNotifications");
        setDatas(response.data);
        console.log("message", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const table = $(tableRef.current).DataTable({
  //     responsive: true,
  //   });

  //   return () => {
  //     table.destroy();
  //   };
  // }, []);

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
      const response = await api.get("/getAllEnrichmentCarePushNotifications");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      {storedScreens?.sendNotificationCreate && (
        <SendNotificationAdd onSuccess={refreshData} />
      )}

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
        <div className="minHeight center">
          <div className="card shadow border-0  top-header">
            <div className="d-flex justify-content-between m-2 pt-2">
              <div>
                <h2>Send Notification</h2>
              </div>
              {storedScreens?.sendNotificationCreate && (  <SendNotificationAdd /> )}
            </div>
            <hr />
            <div className="table-response px-4">
              <table ref={tableRef} className="display ">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">S No</th>
                    <th scope="col" className="text-center">Event Name</th>
                    <th scope="col" className="text-center">Message</th>
                    <th scope="col" className="text-center">Created At</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">{index + 1}</th>
                      <td className="text-center">{data.messageTitle}</td>
                      <td className="text-center">{data.messageDescription}</td>
                      <td className="text-center">{data.datePosted}</td>
                      <td className="text-center">
                        {storedScreens?.sendNotificationUpdate && (
                          <SendNotificationEdit
                            id={data.id}
                            onSuccess={refreshData}
                          />
                        )}
                         {storedScreens?.subjectDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCourseSubject/${data.id}`}
                      />
                    )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendNotification;
