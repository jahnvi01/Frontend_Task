import axios from "axios";
import { BASE_URL, DOCK_API_TOKEN } from "../utils/constants";

export const fetchCredentials = async () => {
  const response = await axios.get(`${BASE_URL}/credentials`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": DOCK_API_TOKEN,
    },
  });
  return response;
};

export const issueCredential = async (data) => {
  const response = await axios.post(`${BASE_URL}/credentials`, data, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": DOCK_API_TOKEN,
    },
  });

  return response;
};

export const issuePresentation = async (data) => {
  const response = await axios.post(`${BASE_URL}/presentations`, data, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": DOCK_API_TOKEN,
    },
  });

  return response;
};
