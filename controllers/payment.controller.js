const processPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;

    const paymentStatus = Math.random() > 0.2 ? "success" : "failed";

    if (paymentStatus === "failed") {
      return res.status(400).json({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }

    const transactionId = `TXN_${Date.now()}`;

    res.status(200).json({
      success: true,
      message: "Payment Successful",
      transactionId,
      orderId,
      amount,
      paymentMethod,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment processing error",
      error: error.message,
    });
  }
};


module.exports = {processPayment}