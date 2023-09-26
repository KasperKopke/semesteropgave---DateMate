const service = {};

service.getProfiles = async () => {
  try {
    const response = await fetch("../js/data.json");
    const personsfromjson = await response.json();
    return personsfromjson;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
};

export default service;
