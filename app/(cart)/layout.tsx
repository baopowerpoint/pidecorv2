import React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden p-3">
      {children}
    </main>
  );
};

export default CartLayout;
