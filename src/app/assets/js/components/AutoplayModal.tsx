import React from "react";

interface AutoplayModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const AutoplayModal: React.FC<AutoplayModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Autoplay Permission</h2>
        <p style={{ marginBottom: '24px' }}>Would you like to autoplay videos with audio?</p>
        <div style={{ display: 'flex', gap: '4em', justifyContent: 'center' }}>
          <button
            onClick={onDecline}
            style={{
              border: 'none',
              backgroundColor: '#f54a4a',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            No, thanks
          </button>
          <button
            onClick={onAccept}
            style={{
              border: 'none',
              backgroundColor: '#0066cc',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Allow Autoplay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoplayModal;
