const BASE_URL = "http://localhost/_projects/03_transapp_backend";

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("Error parsing JSON:", error);
    throw error;
  }
}

async function getAll(url) {
  return await fetchData(url, { method: "GET" });
}

async function getOne(url, id) {
  return await fetchData(`${url}?id=${id}`, { method: "GET" });
}

async function post(url, body) {
  return await fetchData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function put(url, body) {
  return await fetchData(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function deleteOne(url, body) {
  return await fetchData(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export { getAll, getOne, post, put, deleteOne, BASE_URL };
