// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllStudentListByCenter = async (id) => {
  try {
    const response = await api.get(`getIdsAndStudentNamesByEnrichmentCareId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default fetchAllStudentListByCenter;
