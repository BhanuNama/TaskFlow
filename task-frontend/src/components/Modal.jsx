import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText, cancelText }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> 
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="p-6">
          {children}
          {onConfirm && (
            <div className="flex gap-3 mt-4">
              <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg">
                {confirmText || 'Confirm'}
              </button>
              <button onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 font-medium py-3 rounded-lg">
                {cancelText || 'Cancel'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
