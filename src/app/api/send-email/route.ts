import * as sgMail from "@sendgrid/mail";

export async function POST(request: Request) {
  const data = await request.json();

  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

  let msg: any = {};

  if (data.attachments !== undefined) {
    console.log(data.attachments);
    msg = {
      to: data.to,
      from: "it@blazarlabs.io", // Use the email address or domain you verified above
      templateId: data.templateId,
      personalizations: [
        {
          to: [{ email: data.to }],
          attachments: data.attachments,
          dynamic_template_data: data.dynamic_template_data,
        },
      ],
    };
  } else {
    msg = {
      to: data.to,
      from: "it@blazarlabs.io", // Use the email address or domain you verified above
      templateId: data.templateId,
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamic_template_data: data.dynamic_template_data,
        },
      ],
    };
  }

  const res = await sgMail.send(msg);

  console.log(data);

  return Response.json({
    success: true,
  });
}
