"use client";

import React, { useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import OrderSummary from "./OrderSummary";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}


const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const ShippingStep = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Full Sleeve Zipper",
      price: 99,
      quantity: 1,
      image: "/images/img12.jpeg",
    },
    {
      id: 2,
      name: "Basic Slim Fit T-Shirt",
      price: 99,
      quantity: 1,
      image: "/images/img13.jpeg",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // Add checkout logic here
  };

  // Calculate order totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  console.log(cart);

  return (
    <CartContainer>
      <ProductList>
        {cart.map((item) => (
          <ProductCard
            key={item.id}
            imageSrc={item.image}
            title={item.name}
            price={item.price}
            quantity={item.quantity}
            onUpdateQuantity={(delta) => updateQuantity(item.id, delta)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </ProductList>

      <OrderSummary 
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onCheckout={handleCheckout}
      />
    </CartContainer>
  );
};

export default ShippingStep;