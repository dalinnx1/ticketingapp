import Ticket from "@/models/ticket.model";
import { NextResponse } from "next/server";

type Params = { id: string };

export async function GET(request: Request, context: { params: Params }) {
  const { id } = context.params;

  const foundTicket = await Ticket.findOne({ _id: id });
  if (!foundTicket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }
  const ticket = foundTicket.toObject();
  return NextResponse.json({ ...ticket }, { status: 200 });
}

export async function PUT(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const ticketData = body.formData;

    await Ticket.findByIdAndUpdate(id, { ...ticketData });
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  try {
    const { id } = context.params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
