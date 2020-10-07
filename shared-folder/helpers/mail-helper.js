const { DateTime } = require("luxon");
const sendgrid = require("@sendgrid/mail");

/**
 * Mail base on Sendgrid library.
 * Sendgrid Doc: https://github.com/sendgrid/sendgrid-nodejs/tree/main/docs
 * Azure + Sendgrid Guide: https://docs.microsoft.com/en-us/azure/store-sendgrid-nodejs-how-to-send-email
 * Please access sendgrid via azure portal.
 */
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

/**
 * Contant Variables
 */
const SENDER_EMAIL = process.env.SENDGRID_SENDER || "suphawich.skv@gmail.com";
const REPORT_DEV_EMAILS = process.env.REPORT_DEV_EMAILS
  ? process.env.REPORT_DEV_EMAILS.split(",")
  : "lanjakorn.dev@gmail.com";

/**
 * @param {SendGrid.Email} msg
 */
const send = async (msg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await sendgrid.send(msg);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Edit template on: https://mc.sendgrid.com/dynamic-templates
 * Dynamic Template Doc: https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/transactional-templates.md
 * @param {Exception} err
 */
const sendError = async (err) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await send({
        to: REPORT_DEV_EMAILS,
        from: SENDER_EMAIL,
        templateId: "d-c510b5ffa69b4b3280cc16782ad54b31",
        dynamicTemplateData: {
          create_date: DateTime.local().toFormat("dd/LL/yyyy"),
          error: {
            name: err.name || "",
            message: err.message || "",
            stack: err.stack || "",
          },
        },
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

// Export
module.exports.send = send;
module.exports.sendError = sendError;
