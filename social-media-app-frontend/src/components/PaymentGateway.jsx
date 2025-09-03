import React from 'react';

const PaymentGateway = ({ userId = 1, amount = 500 }) => {
  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();

    const isLoaded = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!isLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: 'INR',
      name: 'Test Corp',
      description: 'Test Transaction',
      order_id: data.id,
      handler: async function (response) {
        await fetch(`${process.env.REACT_APP_API_BASE}/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...response,
            user_id: userId,
            amount,
          }),
        });
        alert('✅ Payment successful!');
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Razorpay Payment Gateway</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          background: '#528FF0',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay ₹{amount}
      </button>
    </div>
  );
};

export default PaymentGateway;
