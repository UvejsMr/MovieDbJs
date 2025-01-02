// // Initialize Stripe
// const stripe = Stripe("your-publishable-key-here");

// const handlePayment = async () => {
//   const paymentDetails = {
//     amount: 999, // Amount in cents
//     currency: "usd",
//     description: "Movie Purchase",
//   };

//   try {
//     const { id: paymentIntentId } = await createPaymentIntent(paymentDetails);
//     const { error } = await stripe.confirmCardPayment(paymentIntentId, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: { name: "Customer Name" },
//       },
//     });

//     if (error) {
//       console.error("Payment failed:", error);
//       alert("Payment failed. Please try again.");
//     } else {
//       alert("Payment successful!");
//     }
//   } catch (error) {
//     console.error("Error handling payment:", error);
//   }
// };

// // Mock function to create payment intent (you'll replace this with your backend call)
// const createPaymentIntent = async (paymentDetails) => {
//   // Simulate an API call
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ id: "mock-payment-intent-id" }), 1000);
//   });
// };

// document
//   .getElementById("payNowButton")
//   .addEventListener("click", handlePayment);
