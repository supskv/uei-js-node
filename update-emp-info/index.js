require("dotenv").config();
const { DateTime } = require("luxon");
const intercept = require("azure-function-log-intercept");

/**
 * Startup with boostrap function.
 */
const shared = require("../shared-folder");

module.exports = async function (context, myTimer) {
  // Use console normally
  intercept(context);

  if (myTimer.isPastDue) {
    context.log(`> [DELAY] It couldn't run any task in past due.`);
  } else {
    // Start Logging
    context.log(
      `> Start updating employee infomation on`,
      DateTime.local().toISO()
    );
    // Run core business logic
    await shared.boostrap();
    // End Logging
    context.log(
      `> End updating employee infomation on`,
      DateTime.local().toISO()
    );
  }

  context.done();
};
