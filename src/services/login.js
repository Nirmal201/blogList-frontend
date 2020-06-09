import axios from "axios";
const baseUrl = "/api/login";

const login = async (creadentials) => {
  const response = await axios.post(baseUrl, creadentials);
  console.log("login", response);

  return response.data;
};

export default { login };
