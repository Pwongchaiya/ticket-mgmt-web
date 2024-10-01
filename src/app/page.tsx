"use client"

import { ReactNode } from 'react';
import TicketList from "./Components/Tickets/TicketList";
import Modal from "./Components/Modal/Modal";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <Layout>
      <Modal />
      <TicketList />
    </Layout>
  );
};

export default Home;
