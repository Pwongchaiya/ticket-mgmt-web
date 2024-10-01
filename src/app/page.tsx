"use client"

import React, { useState, useCallback } from "react";
import Image from "next/image";
import TicketList from "./Components/Tickets/TicketList";
import TicketForm from "./Components/Tickets/TicketForm";
import Modal from "./Components/Modal/Modal";

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<{ title: string; description: string }[]>([]);

  const handleAddTicket = useCallback((ticket: { title: string; description: string }) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  }, []);

  return (
    <div>
      <Modal />
      {/* <TicketForm /> */}
      <TicketList />
    </div>
  );
};

export default Home;
