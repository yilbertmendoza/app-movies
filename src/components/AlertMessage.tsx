import React, { useState, useEffect } from 'react';
import '../assets/AlertMessage.css';

interface AlertMessageProps {
  message?: string | null;
  type?: string;
  onHide:(show: boolean) => void;
  show: boolean;
}

const AlertMessag: React.FC<AlertMessageProps> = ({ 
  message='Error', 
  type='success',
  show=false,
  onHide
}) => {
  const [visible, setVisible] = useState<boolean>(show);

  const handleHide = () => {
    setVisible(false);
    onHide(false);
  }

  useEffect(() => {
    setVisible(show);
    if (show) {
      setTimeout(() => handleHide(), 5000);
    }
  }, [show])
  
  return visible && (
    <div className={`alert ${type}`}>
      <span className="closebtn" onClick={handleHide}>
        &times;
      </span>
      { message }
    </div>
  )
}

export default AlertMessag;