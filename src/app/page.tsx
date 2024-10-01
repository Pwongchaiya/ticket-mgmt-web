"use client"

import TicketList from "./Components/Tickets/TicketList";
import Modal from "./Components/Modal/Modal";

const Home: React.FC = () => {
  return (
    <div>
      <Modal />
      <TicketList />
    </div>
  );
};

export default Home;
