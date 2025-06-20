// AddressModal.tsx

import AddressForm from "../addressForm";

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
};

const AddressModal = ({ isOpen, onClose, initialData }: AddressModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ overflowY: "auto" }}
    >
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white rounded-xl shadow-lg p-6 my-8 mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
        >
          &times;
        </button>
        <AddressForm initialData={initialData} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default AddressModal;
