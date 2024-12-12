import axios from "axios";

const createForm = async (questions) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/forms/new`,
    questions
  );
  if (response.status === 201) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.data.message };
  }
};

const getFormById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/forms/${id}`
  );
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.data.message };
  }
};

const getAllForms = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms/all`);
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.data.message };
  }
};

const submitResponse = async (responses) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/responses`,
    responses
  );
  if (response.status === 201) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.data.message };
  }
};

const FormService = {
  createForm,
  getFormById,
  getAllForms,
  submitResponse,
};

export default FormService;
