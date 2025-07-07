import React, { useState, useEffect } from 'react';
import Modal from './ui/modal'; // Assuming you have a modal component for the popup
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [address, setAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliveryConfirmed, setIsDeliveryConfirmed] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [quantity, setQuantity] = useState(1); // State to track quantity

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/address/${user}`);
        setAddress(response.data.address);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [user, changeAddress]);

  const handleCreateOrder = async (address: Address) => {
    try {
      console.log('Order created for product:', product, 'and address:', address);

      const orderBody = {
        userId: user,   // Actual logged-in user ID
        totalAmount: product.price * quantity,   // Dynamic total based on quantity
        items: [
          {
            productId: product.id,   // Actual product ID
            quantity: quantity,      // Dynamic quantity
            price: product.price     // Price per unit
          }
        ]
      };

      const res = await axios.post(`${API_URL}/order`, orderBody, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.status === 201) {
        setIsModalOpen(false);
        Swal.fire({
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.',
          icon: 'success',
          background: '#f9fafb',
          color: '#1f2937',
          confirmButtonColor: '#16a34a',
          confirmButtonText: 'Okay',
          iconColor: '#16a34a',
          customClass: {
            popup: 'rounded-lg shadow-lg',
            title: 'text-2xl font-bold',
            confirmButton: 'px-6 py-2 rounded-md'
          }
        });
      } else {
        toast.warning('Something went wrong');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error('Failed to place order.');
    }
  };

  const handleAddressSubmit = (address: Address) => {
    setAddress(address); 
    setIsDeliveryConfirmed(true);
  };

  const handleChangeAddress = () => {
    setIsModalOpen(true);
    setIsDeliveryConfirmed(false);
  };

  return (
    <div>
      <button
        className="border bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800 cursor-pointer"
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

    </div>
  );
};

export default BuyNowButton;
