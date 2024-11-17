import Ticket from "@/models/ticket.model";
import { NextResponse } from "next/server";

// Adjust the type of `params` to match Next.js requirements
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Ticket ID not provided" },
        { status: 400 }
      );
    }

    const foundTicket = await Ticket.findOne({ _id: id });
    if (!foundTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    const ticket = foundTicket.toObject();
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Ticket ID not provided" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const ticketData = body.formData;

    await Ticket.findByIdAndUpdate(id, ticketData);
    // sendEmail(ticketData.title, ticketData.description);
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Ticket ID not provided" },
        { status: 400 }
      );
    }

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
