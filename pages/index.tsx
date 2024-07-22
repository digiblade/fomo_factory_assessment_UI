// pages/index.tsx
import { useState } from 'react';
import DataTable from '../components/datatable';
import Modal from '../components/modal';
// import Modal from '../components/modal';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Change Stock or Crypto</button>
      <DataTable />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
