import Ticket from "@/models/ticket.model";

type Params = {
  id: string;
};

// Assuming this is a server-side function for fetching ticket data
export async function getServerSideProps({ params }: { params: Params }) {
  const { id } = params;

  const ticket = await Ticket.findById(id).lean(); // Use lean() to get plain JS object
  if (!ticket) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ticket,
    },
  };
}

// Your component
const TicketPage = ({ ticket }: { ticket: any }) => {
  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      {/* Render other ticket details here */}
    </div>
  );
};

export default TicketPage;
