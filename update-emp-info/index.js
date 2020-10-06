const intercept = require("azure-function-log-intercept");
const shared = require("../shared-folder/boostrap");

module.exports = async function (context, myTimer) {
  // Use console normally
  intercept(context);
  // Start Logging
  context.log(
    `> ${
      myTimer.isPastDue ? "[DELAY] " : ""
    }Start updating employee infomation on`,
    new Date().toISOString()
  );
  await shared.boostrap();
  // End Logging
  context.log(`End updating employee infomation on`, new Date().toISOString());
};
