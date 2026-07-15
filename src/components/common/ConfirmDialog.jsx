import React from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Are you sure?', message, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-6 text-sm text-gray-600">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
