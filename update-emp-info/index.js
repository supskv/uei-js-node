const moment = require("moment");
const intercept = require("azure-function-log-intercept");
const shared = require("../shared-folder");
const PortfolioHelper = require("../shared-folder/helpers/portfolio-helper");

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
  await PortfolioHelper.getByEmail();
  // End Logging
  context.log(`> End updating employee infomation on`, moment().toISOString());
};
