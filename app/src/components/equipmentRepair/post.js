/*
 * Ships off equipment repair requests via Sendgrid
 */

import sendgridPost from "./sendgridEndpoint";

export default async function sendEmail(request, user) {
  // prepare email
  let emailBody;
  await fetch("emailTemplates/equipmentRepair.html")
    .then(response => response.text())
    .then(
      text =>
        (emailBody = String.format(
          text,
          user.name, // 0
          request.location, // 1
          request.make, // 2
          request.model, // 3
          request.serialNumber, // 4
          request.reasonForRepair // 5
        ))
    );

  let args = {
    user: user,
    email: emailBody
  };

  let success = await sendgridPost(args);
  return success;
}
