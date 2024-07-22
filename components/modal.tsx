// components/Modal.tsx
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setSelectedSymbol } from '../store/slice';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [symbol, setSymbol] = useState('');

  const handleSubmit = () => {
    dispatch(setSelectedSymbol(symbol));
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Select Stock or Crypto</h2>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol (e.g., GOOG, AAPL)"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
