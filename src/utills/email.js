const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, templateId, params }) => {
  const email = new SibApiV3Sdk.SendSmtpEmail();

  email.to = [{ email: to }];
  email.templateId = templateId;
  email.params = params;

  try {
    const response = await apiInstance.sendTransacEmail(email);
    return response;
  } catch (error) {
    console.log("Email send failed:", error);
    throw error;
  }
};

module.exports = { sendEmail };