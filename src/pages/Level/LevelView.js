import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";

export default function LevelView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseLevels/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container-fluid my-4 center">
    <div className="card shadow border-0 mb-2 top-header">
      <div className="container">
        <div className="row mt-2 pb-3">
          <div className="my-3 d-flex justify-content-end mb-5">
            <Link to={"/level"}>
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
          <div className="col-md-6 col-12">
            <div className="row   mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Level</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.level}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 ">
              <div className="col-6  ">
                <p className="fw-medium">Code</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.levelCode}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
