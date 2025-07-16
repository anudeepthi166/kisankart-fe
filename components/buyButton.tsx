import React, { useState, useEffect } from 'react';
import Modal from './ui/modal'; // Assuming you have a modal component for the popup
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Address from './ui/address';

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <div>
      <button
        className="border bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800 cursor-pointer"
        onClick={() => {setIsModalOpen(true)}}
      >
        Buy Now
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={'Address'} >
        <Address/>
      </Modal>

    </div>
  );
};

export default BuyNowButton;
