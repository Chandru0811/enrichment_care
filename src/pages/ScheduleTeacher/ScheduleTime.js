import React, { useEffect, useState } from "react";
import DayTableAdd from "./DayTableAdd";
import api from "../../config/URL";
import { Link, useParams, useLocation } from "react-router-dom";
import BlockTimeSlot from "./BlockTimeSlot";
import UnBlockTimeSlot from "./UnBlockTimeSlot";
import ApproveStudentTimeSlot from "./ApproveStudentTimeSlot";
import RemoveStudentTimeSlot from "./RemoveStudentTimeSlot";
import toast from "react-hot-toast";

export default function ScheduleTime() {
  const { id } = useParams();
  const [teacherSchedules, setTeacherSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const enrichmentCareId = searchParams.get("enrichmentCareId");

  // const [selectedDay, setSelectedDay] = useState(null);
  // const [selectedClass, setSelectedClass] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  console.log(enrichmentCareId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`getTeacherSchedulesByTeacherId/${id}`);
        setTeacherSchedules(response.data);
      } catch (error) {
        console.error("Error fetching teacher schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = async () => {
    try {
      const response = await api.get(`getTeacherSchedulesByTeacherId/${id}`);
      setTeacherSchedules(response.data);
    } catch (error) {
      toast.error("Error Fetching Data ", error.message);
    }
  };

  const batchTimes = [
    "2:30 pm",
    "3:30 pm",
    "5:00 pm",
    "7:00 pm",
    "12:00 pm",
    "1:00 pm",
  ];
  return (
    <div className="minHeight center">
    <div className="container-fluid my-4 center">
      <div className="card shadow border-0 mb-2 top-header">
    <div className="container">
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
        <div className="row py-4">
          <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
            <Link to="/scheduleteacher">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
          </div>
          <div className="container-fluid p-0">
           
              <div className="offset-md-1 col-md-10 col-12">
                {teacherSchedules.map((data, index) => {
                  // Default to showing four batch columns and four student columns
                  const maxStudents = 5;

                  return (
                    <div key={index} className="text-center">
                      <p className="fw-bold fs-5">{data.className}</p>
                      <div className="table-responsive">
                        <caption className="d-flex justify-content-center p-3 bg-danger text-white">
                          {data.day}-{data.teacher}
                        </caption>
                        <table className="table bg-white caption-top table-bordered">
                          <thead style={{backgroundColor:"#f7f7bf"}}>
                            <tr className="table-warning">
                              {batchTimes.map((time, timeIndex) => (
                                <th key={timeIndex} className="p-4">
                                  {time}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[...Array(maxStudents)].map((_, rowIndex) => (
                              <tr key={rowIndex}>
                                {batchTimes.map((time, timeIndex) => {
                                  const matchingBatch = data.timetable.find(
                                    (batch) => batch.time === time
                                  );
                                  const student =
                                    matchingBatch?.students.length > rowIndex
                                      ? matchingBatch.students[rowIndex]
                                      : null;
                                  let backgroundColor = "transparent";
                                  let content = null;
                                  console.log("maxStudents",data)
                                  if (student && student.name) {
                                    content = (
                                      <>
                                        <span>{student.name}</span>
                                        <br />
                                        {storedScreens?.timeScheduleDelete && (
                                          <RemoveStudentTimeSlot
                                            id={student.id}
                                            onSuccess={refreshData}
                                          />
                                        )}
                                      </>
                                    );
                                    if (student.blocked) {
                                      backgroundColor = "lightgrey";
                                      content = (
                                        <>
                                          <UnBlockTimeSlot
                                            id={student.id}
                                            onSuccess={refreshData}
                                          />
                                        </>
                                      ); // Clear the content if blocked
                                    } else if (student.status === "pending") {
                                      backgroundColor = "#FAC898";
                                      content = (
                                        <div>
                                          <span>{student.name}</span>
                                          <br />
                                          {storedScreens?.timeScheduleApproved && (
                                            <ApproveStudentTimeSlot
                                              id={student.id}
                                              onSuccess={refreshData}
                                            />
                                          )}
                                          {storedScreens?.timeScheduleDelete && (
                                            <RemoveStudentTimeSlot
                                              id={student.id}
                                              onSuccess={refreshData}
                                            />
                                          )}
                                        </div>
                                      );
                                    }
                                  } else if (student && student.blocked) {
                                    backgroundColor = "lightgrey";
                                    content = (
                                      <>
                                        {storedScreens?.timeScheduleUnBlock && (
                                          <UnBlockTimeSlot
                                            id={student.id}
                                            onSuccess={refreshData}
                                          />
                                        )}
                                      </>
                                    );
                                  } else {
                                    content =
                                      student && student.id ? (
                                        <>
                                          {storedScreens?.timeScheduleAdd && (
                                            <DayTableAdd
                                              id={student.id}
                                              onSuccess={refreshData}
                                              enrichmentCareId={enrichmentCareId}
                                              day={data.day}
                                            />
                                          )}
                                          {storedScreens?.timeScheduleBlock && (
                                            <BlockTimeSlot
                                              id={student.id}
                                              onSuccess={refreshData}
                                            />
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {storedScreens?.timeScheduleAdd && (
                                            <DayTableAdd
                                              onSuccess={refreshData}
                                              enrichmentCareId={enrichmentCareId}
                                              day={data.day}
                                            />
                                          )}
                                          {storedScreens?.timeScheduleBlock && (
                                            <BlockTimeSlot
                                              onSuccess={refreshData}
                                            />
                                          )}
                                        </>
                                      );
                                  }

                                  return (
                                    <td
                                      key={timeIndex}
                                      style={{
                                        backgroundColor,
                                        verticalAlign: "middle",
                                      }}
                                      className="p-2 py-3"
                                    >
                                      {content}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
       
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
}
