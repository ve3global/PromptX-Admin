import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
const validateResponse = (status) => {
  if (status === 403) {
    localStorage.clear();
    sessionStorage.clear();
    //window.location.href = "/";
  }
};

export const callPostAPI = async (endpoint, parameters, headers = {}) => {
  try {
    const response = await api.post(endpoint, parameters, {
      withCredentials: true,
    });
    validateResponse(response?.status);

    return response.data;
  } catch (error) {
    console.log(error);
    validateResponse(error.response?.status);
    throw error;
  }
};

// export const callPostAPI = async (api, parameters, headers = {}) => {
//   try {
//     // console.log(api)
//     // axios.defaults.withCredentials = true;
//     const response = await axios.post(
//       import.meta.env.VITE_BASE_URL + api,
//       parameters,
//       { withCredentials: true }
//     );
//     validateResponse(response?.status);
//     // console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     validateResponse(error.response?.status);
//     throw error;
//     // return false
//   }
// };

export const callDeleteAPI = async (endpoint, parameters, headers = {}) => {
  try {
    console.log(endpoint);
    const response = await api.delete(endpoint, parameters, {
      withCredentials: true,
    });
    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    validateResponse(error.response.status);
    throw error;
  }
};

export const callGetAPI = async (endpoint, header = {}) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await api.get(endpoint, {
      withCredentials: true,
    });
    console.log("get req response:", response);
    validateResponse(response.status);
    return response.data;
  } catch (error) {
    validateResponse(error.response.status);
    // console.log("Get API Error : ",error);
    // console.log("Get API response status: ",error.response.status);
    throw error;
  }
};

export const callPatchAPI = async (endpoint, parameters, header = {}) => {
  try {
    const response = await api.patch(endpoint, parameters, {
      withCredentials: true,
    });
    // const response = await axios.patch(
    //   process.env.REACT_APP_BASE_URL + api,
    //   parameters,
    //   { headers: header },
    //   { withCredentials: true }
    // );
    console.log("response:", response);

    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    // validateResponse(error.response.status);
    throw error;
  }
};
export const callPutAPI = async (endpoint, parameters, header = {}) => {
  try {
    const response = await api.put(endpoint, parameters, {
      withCredentials: true,
    });
    // const response = await axios.patch(
    //   process.env.REACT_APP_BASE_URL + api,
    //   parameters,
    //   { headers: header },
    //   { withCredentials: true }
    // );
    console.log("response:", response);

    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    // validateResponse(error.response.status);
    throw error;
  }
};

export const callBlockAPI = async (endpoint, parameters, header = {}) => {
  try {
    const response = await api.patch(endpoint, parameters, {
      withCredentials: true,
    });
    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    validateResponse(error.response.status);
    throw error;
  }
};

export const callRenameAPI = async (endpoint, parameters, header = {}) => {
  try {
    const response = await api.patch(endpoint, parameters, {
      withCredentials: true,
    });
    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    validateResponse(error.response.status);
    throw error;
  }
};

export const callRoleAPI = async (endpoint, parameters, header = {}) => {
  try {
    const response = await api.patch(endpoint, parameters, {
      withCredentials: true,
    });
    validateResponse(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    validateResponse(error.response.status);
    throw error;
  }
};
