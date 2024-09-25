import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const ws: WebSocket = new WebSocket("ws://135.181.98.23:4001");

  ws.onmessage = (event) => {
    console.log(JSON.parse(event.data));
  };

  return Response.json({ message: "WS client initialized!", status: 200 });
}
