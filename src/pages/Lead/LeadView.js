import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
// import "boxicons";

function Leadview() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [doassesmentData, setDoassesmentData] = useState([]);

  console.log("Doassesment Data:", doassesmentData);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  // Payment Status & Summary Modal

  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleClose = () => {
    setShowPaymentStatusModal(false);
    setShowSummaryModal(false);
  };

  // const handlePaymentStatusShow = () => setShowPaymentStatusModal(true);
  const handleSummaryShow = () => setShowSummaryModal(true);

  // console.log(data);

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

  const handleSavePaymentStatus = async () => {
    try {
      const response = await api.put(`/updateLeadInfo/${id}`, {
        paymentStatus,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        handleClose(); // Close the modal after successful update
        try {
          if (paymentStatus === "PAID") {
            const migrateResponse = await api.post(`/leadToStudentMigrate`, {
              leadId: id,
              status: "paid",
            });
            if (migrateResponse.status === 201) {
              toast.success(migrateResponse.data.message);
            } else {
              toast.error(migrateResponse.data.message);
            }
          }
        } catch (error) {
          console.log("Error Payment Response", error?.response?.status);
          if (error?.response?.status === 409) {
            toast.warning(error?.response?.data.message);
          } else if (error?.response?.status === 404) {
            toast.warning(error?.response?.data.message);
          } else {
            toast.error(error?.response?.data.message);
          }
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating payment status");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllLeadInfoWithReferrerById/${id}`);
        setData(response.data);
        setPaymentStatus(response.data.paymentStatus);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
      // console.log("Lead  :",response);
    };

    const getAssesmentData = async () => {
      try {
        const response = await api.get(`/getLeadAssessmentDataByLeadId/${id}`);
        setDoassesmentData(response.data);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();
    getAssesmentData();

    fetchData();
  }, [id]);

  return (
    <>
      <Modal
        show={showPaymentStatusModal}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-start mt-4">
              <select
                name="paymentStatus"
                onChange={(e) => setPaymentStatus(e.target.value)}
                // onBlur={formik.handleBlur}
                // value={formik.values.paymentStatus}
                value={paymentStatus}
                className="form-select"
                aria-label="example"
              >
                <option value="PENDING" selected>
                  Pending
                </option>
                <option value="PAID">Paid</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-border btn-sm"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-button btn-sm"
            type="submit"
            onClick={handleSavePaymentStatus}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSummaryModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ul>
              <div className="row">
                <div className="d-flex align-items-center mb-3">
                  <box-icon
                    name="check-circle"
                    type="solid"
                    color="#0bda5d"
                  ></box-icon>
                  &nbsp; &nbsp;
                  <li className="list-unstyled d-flex text-start">
                    Student Information
                  </li>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <box-icon
                  name="x-circle"
                  type="solid"
                  color="#d42615"
                ></box-icon>
                &nbsp; &nbsp;
                <li className="list-unstyled d-flex align-items-center">
                  Child Ability
                </li>
              </div>
              <div className="d-flex align-items-center mb-3">
                <box-icon
                  name="x-circle"
                  type="solid"
                  color="#d42615"
                ></box-icon>
                &nbsp; &nbsp;
                <li className="list-unstyled d-flex align-items-center">
                  Parent Information &nbsp; &nbsp;
                </li>
              </div>
              <div className="d-flex align-items-center mb-3">
                <box-icon
                  name="check-circle"
                  type="solid"
                  color="#0bda5d"
                ></box-icon>
                &nbsp; &nbsp;
                <li className="list-unstyled d-flex align-items-center">
                  Address
                </li>
              </div>
              <div className="d-flex align-items-center mb-3">
                <box-icon
                  name="x-circle"
                  type="solid"
                  color="#d42615"
                ></box-icon>
                &nbsp; &nbsp;
                <li className="list-unstyled d-flex align-items-center">
                  Account Information
                </li>
              </div>
              <div className="d-flex align-items-center mb-3">
                <box-icon
                  name="check-circle"
                  type="solid"
                  color="#0bda5d"
                ></box-icon>
                &nbsp; &nbsp;
                <li className="list-unstyled d-flex align-items-center">
                  Authorised Person Address
                </li>
              </div>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-border btn-sm"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-button btn-sm"
            type="submit"
            onClick={handleClose}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid my-4 center">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="mb-5">
            <div className="container-fluid ">
              <div className=" products">
                <div class="container-fluid py-4">
                  <div class="row d-flex  justify-content-end">
                    <div class="col-auto">
                      <div class="hstack gap-2 ">
                        <Link to="/lead/lead">
                          <button type="button" class="btn btn-border btn-sm">
                            <span>Back</span>
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={handleSummaryShow}
                          class="btn btn-border btn-sm"
                        >
                          <span>Summary</span>
                        </button>

                        {/* <button
                          type="button"
                          onClick={handlePaymentStatusShow}
                          class="btn btn-border btn-sm"
                        >
                          <span>Payment Status</span>
                        </button> */}
                        {/* <Link to={`/lead/lead/assessment/${id}`}>
                      <button type="button" class="btn btn-border btn-sm">
                        <span>Do Assessment</span>
                      </button>
                    </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Information */}
            <div className="container-fluid">
              <div className="row">
                <p className="fw-bold fs-4 col-12">Lead Information</p>
              </div>
              <div className="container-fluid">
                <div className="row  m-3">
                  <h5 className="headColor mt-2 mb-4">Student Information</h5>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">Student Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.studentName || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Date Of Birth</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.dateOfBirth
                            ? data.dateOfBirth.substring(0, 10)
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">Gender</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.gender || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Subject</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {subjectData &&
                            subjectData.map((subject) =>
                              parseInt(data.subject) === subject.id
                                ? subject.subjects || "--"
                                : ""
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Medical Condition</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.medicalCondition || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Ethnic Group</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.ethnicGroup || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Status</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.leadStatus || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">School Type</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.schoolType || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Name Of School</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.nameOfSchool || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Number Of Children In Total
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.nameOfChildrenInTotal || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Father's Full Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.fathersFullName || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row  m-3">
                  <h5 className="headColor mt-5 mb-4">Child Ability</h5>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">Pencil Grip</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.pencilGrip || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Writing</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.writing || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">Recognize A-Z</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.recognizeAToZ || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Write A-Z(Uppercase)
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.writeUpperAToZ ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Write a-z(lowercase)
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.writeLowerAToZ ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Sounds of a-z</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.soundOfAToZ ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Can read simple sentence
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.canReadSimpleSentence ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row  m-3">
                  <h5 className="headColor mt-5 mb-4">Parent Information</h5>
                  <div className="d-flex justify-content-between">
                    <div></div>
                    <div>
                      {data.primaryContactMother ? (
                        <p className="badge text-bg-primary">primary</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Mother's Full Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.mothersFullName || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Mother's Occupation
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.mothersOccupation || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Mother's Date Of Birth
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.mothersDateOfBirth
                            ? data.mothersDateOfBirth.substring(0, 10)
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">
                          Mother's Mobile Number
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.mothersMobileNumber || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Mother's Monthly Income{" "}
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.monthlyIncomeOfMother || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Mother's Email Address
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.mothersEmailAddress || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <div>
                    {data.primaryContactFather ? (
                      <p className="badge text-bg-primary">primary</p>
                    ) : null}
                  </div>
                </div>
                <div className="row  m-3">
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Father's Full Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.fathersFullName || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Father's Occupation
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.fathersOccupation || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Father's Date Of Birth
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.fathersDateOfBirth
                            ? data.fathersDateOfBirth.substring(0, 10)
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">
                          Father's Mobile Number
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.fathersMobileNumber || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Father's Monthly Income
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.monthlyIncomeOfFather || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Father's Email Address
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.fathersEmailAddress || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row  m-3">
                  <h5 className="headColor mt-5 mb-4">Address Information</h5>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">Address</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.address || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Postal Code</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.postalCode || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium">
                          Emergency Contact Name
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.nameOfEmergency || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Emergency Contact NRIC
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.emergencyNric || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Emergency Contact Mobile
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.emergencyContact || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Relation To Child</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.relationToChild || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Name Of Authorised Person To Take child From Class
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.nameOfAuthorised || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Relation To Child Of Authorised Person To Take Child
                          From Class
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.relationToChils || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          NRIC/FIN No. Authorised Person To Take Child From
                          Class
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.noAuthorisedNric || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">
                          Contact Number Authorised Person To Take Child From
                          Class
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.contactOfAuthorised || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row m-3">
                  <h5 className="headColor mt-5  mb-4">Account Information</h5>

                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Centre</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {centerData &&
                            centerData.map((center) =>
                              parseInt(data.enrichmentCareId) === center.id
                                ? center.enrichmentCareNames || "--"
                                : ""
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex">
                        <p className="text-sm fw-medium ">Preferred Day</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.preferredDay
                            ? data.preferredDay.join(", ")
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex">
                        <p className="text-sm fw-medium ">Preferred Timeslot</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.preferredTimeSlot
                            ? data.preferredTimeSlot.join(", ")
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Marketing Source</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.marketingSource || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Refer By</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.referBy || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Name Of Referral</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.nameOfReferral || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Refer Center Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.referedStudentCenterName || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Enquiry Date</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {data.enquiryDate
                            ? data.enquiryDate.substring(0, 10)
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          : {data.remark || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leadview;
