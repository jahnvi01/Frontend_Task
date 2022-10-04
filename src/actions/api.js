import axios from "axios";

/**
 * It fetches a list of items from the API
 * @param [params] - The parameters that will be passed to the API.
 * @returns The response from the API call.
 */
export const fetchList = async (params = "") => {
  const response = await axios.get(
    `https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis${params}`
  );
  return response;
};

/**
 * It fetches a list item from the API
 * @param id - The id of the item to be fetched.
 * @returns The response from the API call.
 */
export const fetchListItem = async (id) => {
  const response = await axios.get(
    `https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis/${id}`
  );
  return response;
};

export const editListItem = async (id, data) => {
  const response = await axios.put(
    `https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis/${id}`,
    data
  );
  return response;
};

export const deleteListItem = async (id) => {
  const response = await axios.delete(
    `https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis/${id}`
  );
  return response;
};
