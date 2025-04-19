import React, { useState, useEffect } from 'react';
import Modal from './ui/modal'; // Assuming you have a modal component for the popup
import { AddressForm } from './addressForm'; // The form you created for adding an address
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface User {
  id: number;
  name: string;
}

interface Address {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface BuyNowButtonProps {
  product: Product;
  user: User;
}

const BuyNowButton = ({ product, user }: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
console.log('user', user)
  const [address, setAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliveryConfirmed, setIsDeliveryConfirmed] = useState(false);

  useEffect(() => {
    // Simulate checking if the user already has an address
    const fetchAddress = async () => {
      const response = await axios.get(`${API_URL}/user/address/${user}`);
      console.log('==address=', response)
        setAddress(response.data);
      
    };

    fetchAddress();
  }, [user]);

  const handleCreateOrder = (address: Address) => {
    // Logic to create order, maybe call API for order creation
    console.log('Order created for product:', product, 'and address:', address);
    setIsModalOpen(false); // Close the modal after order creation
  };

  const handleAddressSubmit = (address: Address) => {
    // Logic to handle address submit (update or create)
    console.log('Address submitted:', address);
    setAddress(address); // Update the address state
    setIsDeliveryConfirmed(true); // Proceed to confirm delivery
  };

  const handleChangeAddress = () => {
    // Open the form to allow the user to update their address
    setIsModalOpen(true);
    setIsDeliveryConfirmed(false);
  };

  return (
    <div>
      <button
        className="border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-100"
        onClick={() => {
          if (!address) {
            // If no address, show the form to add an address
            setIsModalOpen(true);
          } else {
            // If address exists, ask user to confirm delivery or change address
            setIsModalOpen(true);
          }
        }}
      >
        Buy Now
      </button>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title="Address Details"
        >
          {!address || !isDeliveryConfirmed ? (
            <AddressForm
              onSubmit={handleAddressSubmit}
            />
          ) : (
            <div>
              <h3>Deliver to this address?</h3>
              <p>{address?.fullName}</p>
              <p>{address?.addressLine1}, {address?.addressLine2}</p>
              <p>{address?.city}, {address?.state}, {address?.postalCode}</p>
              <p>{address?.country}</p>

              <div className="mt-4">
                <button
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  onClick={() => handleCreateOrder(address)}
                >
                  Deliver to this address
                </button>
                <button
                  className="w-full bg-yellow-600 text-white py-2 mt-2 rounded hover:bg-yellow-700"
                  onClick={handleChangeAddress}
                >
                  Change Address
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BuyNowButton;
