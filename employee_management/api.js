const BASE_URL = "http://localhost/_projects/transapp_backend";

async function fetchData(url, options) {
  let response = new Response();
  let request = () => fetch(url, options);
  let text;

  try {
    response = await request();
  } catch (err) {
    console.error("Error fetching response ", err);
    throw err;
  }
  try {
    text = await response.text();
  } catch (err) {
    console.error("Error getting text data ", err);
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("Error parsing JSON:", err);
    throw err;
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
