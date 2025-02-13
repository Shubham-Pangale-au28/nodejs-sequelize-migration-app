import fetch from "node-fetch";

const testServer = async () => {
  try {
    const response = await fetch("http://localhost:5601/api/users");
    const data = await response.json();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Error testing server:", error);
  }
};

testServer();
