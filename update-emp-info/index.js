const moment = require("moment");
const intercept = require("azure-function-log-intercept");
require("dotenv").config();

const shared = require("../shared-folder");

module.exports = async function (context, myTimer) {
  // Use console normally
  intercept(context);
  // Start Logging
  context.log(
    `> ${
      myTimer.isPastDue ? "[DELAY] " : ""
    }Start updating employee infomation on`,
    moment().toISOString()
  );
  await shared.boostrap();
  // End Logging
  context.log(`> End updating employee infomation on`, moment().toISOString());
};
