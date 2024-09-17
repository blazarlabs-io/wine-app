import * as sgMail from "@sendgrid/mail";

export async function POST(request: Request) {
  const data = await request.json();

  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

  const msg = {
    to: "c.tudorcotruta@gmail.com",
    from: "it@blazarlabs.io", // Use the email address or domain you verified above
    subject: "Plan Upgrade Notification",
    text: `Plan upgrade notification received from ${data.email}`,
    html: `<p>Plan upgrade notification received from <strong>${data.email}</strong></p>`,
  };

  const res = await sgMail.send(msg);

  console.log(data);

  return Response.json({
    success: true,
  });
}
