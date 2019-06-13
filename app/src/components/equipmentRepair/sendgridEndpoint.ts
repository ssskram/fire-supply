import * as types from "../../store/types";

// handles sendgrid POSTs
export default async function sendgridEndpoint(args) {
  let postSuccess = true;
  const to = "joe.lang@pittsburghpa.gov";
  let sendgridLoad = {
    to: to,
    from: {
      email: args.user.email,
      name: "PGH Supply"
    },
    subject: "Equipment Repair Request",
    html: args.email
  };

  // endpoint
  const post = async load =>
    fetch("https://sendgridproxy.azurewebsites.us/sendMail/single", {
      method: "POST",
      body: load,
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_SENDGRID_API,
        "Content-type": "application/json"
      })
    }).catch(err => (postSuccess = false));

  await post(JSON.stringify(sendgridLoad));
  return postSuccess;
}
