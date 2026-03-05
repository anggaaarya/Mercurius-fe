interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
  }
  
  export default function ConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    message 
  }: ConfirmModalProps) {
    
    // Tambahin console.log buat ngecek
    console.log("ConfirmModal - isOpen:", isOpen);
    console.log("ConfirmModal - message:", message);
    
    if (!isOpen) return null;
  
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleBackgroundClick}
      >
        
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 mx-4">
          
          <p className="text-black text-center mb-6">
            {message}
          </p>
  
          <div className="flex gap-3">
            
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              BATAL
            </button>
            
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
              HAPUS
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }