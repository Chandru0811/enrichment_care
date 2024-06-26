import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";

const validationSchema = Yup.object().shape({
  studentRelationStudentName: Yup.string().required("*Student Name is required!"),
});

const EditStudentRelation = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {

  const [centerData, setCenterData] = useState(null);
  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentDetails/${formData.id}`
        );
        if (
          response.data.studentRelationModels &&
          response.data.studentRelationModels.length > 0
        ) {
          formik.setValues({
            ...response.data.studentRelationModels[0],
            stdRealtionId: response.data.studentRelationModels[0].id,
          });
        } else {
          // If there are no emergency contacts, set default values or handle the case as needed
          formik.setValues({
            stdRealtionId: null,
            studentRelationEnrichmentCare: "",
            studentRelation: "",
            studentRelationStudentName: "",
          });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
          // toast.error(errorMessage);
        console.error("Error fetching data:", errorMessage);
      }
    };
    // console.log(formik.values);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      studentRelationEnrichmentCare: formData.studentRelationEnrichmentCare || "",
      studentRelation: formData.studentRelation || "",
      studentRelationStudentName: formData.studentRelationStudentName || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicators(true);
      try {
        if (data.stdRealtionId !== null) {
            const response = await api.put(
                `/updateStudentRelation/${data.stdRealtionId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toast.success(response.data.message);
                handleNext();
            } else {
                toast.error(response.data.message);
            }
        } else {
            const response = await api.post(
                `/createStudentRelations/${data.id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 201) {
                toast.success(response.data.message);
                handleNext();
            } else {
                toast.error(response.data.message);
            }
        }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }finally {
      setLoadIndicators(false);
    }
    },
  });

  useImperativeHandle(ref, () => ({
    Studentrelation: formik.handleSubmit,
  }));
  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="border-0 mb-5">
          <div className="mb-5">
            <div className="border-0 my-2 px-2">
              <p class="headColor">Student Relation</p>
              <div className="container py-3">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Centre</small>
                      </label>
                      <br />
                      <select
                        name="studentRelationEnrichmentCare"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentRelationEnrichmentCare}
                        className="form-select "
                      >
                        <option selected></option>
                         {centerData &&
                          centerData.map((studentRelationEnrichmentCare) => (
                        <option key={studentRelationEnrichmentCare.id} value={studentRelationEnrichmentCare.id}>{studentRelationEnrichmentCare.enrichmentCareNames}</option>
                      ))}
                      </select>
                    </div>
                    <div className="text-start mt-2">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Relation</small>
                      </label>
                      <br />
                      <select
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentRelation}
                        className="form-select "
                        name="studentRelation"
                      >
                        <option value=""></option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Student Name</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        name="studentRelationStudentName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentRelationStudentName}
                        className="form-control "
                      />
                      {formik.touched.studentRelationStudentName &&
                        formik.errors.studentRelationStudentName && (
                          <div className="text-danger">
                            <small>{formik.errors.studentRelationStudentName}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
export default EditStudentRelation;
