"use client"

import { ReactNode } from 'react';
import TicketList from "./Components/Tickets/TicketList";
import GenericModal from "./Components/Modal/GenericModal";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

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
      <GenericModal />
      <TicketList />
    </Layout>
  );
};

export default Home;
