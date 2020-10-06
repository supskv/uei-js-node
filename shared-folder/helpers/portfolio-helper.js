const axios = require("axios");

/**
 * get employee data from portfolio
 * @param {{email}, {create_date}} data
 */
const getData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = process.env.PORT_URL || "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PORT_TOKEN || ""}`,
        },
      };

      const { data: resData } = await axios.post(url, data, config);
      resolve(resData);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.getData = getData;
