const processPayment = async ({ orderId, amount, paymentMethod }) => {
  try {
    if (!orderId || !amount || !paymentMethod) {
      return { success: false, message: "Missing required payment details" };
    }

    console.log("Processing Payment:", { orderId, amount, paymentMethod });


    const paymentStatus = Math.random() > 0.2 ? "success" : "failed";

    if (paymentStatus === "failed") {
      return { success: false, message: "Payment failed. Please try again." };
    }

    const transactionId = `TXN_${Date.now()}`;

    console.log("Payment Successful - Transaction ID:", transactionId);

    return {
      success: true,
      message: "Payment Successful",
      transactionId,
      orderId,
      amount,
      paymentMethod,
    };
  } catch (error) {
    console.error("Payment Processing Error:", error);

    return { success: false, message: "Payment processing error", error: error.message };
  }
};


module.exports = { processPayment };
