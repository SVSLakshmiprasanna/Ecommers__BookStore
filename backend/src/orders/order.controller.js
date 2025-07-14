const Order = require("./order.model");
const Book = require("../books/book.model");

const createAOrder = async (req, res) => {
  try {
    const { name, email, phone, address, productIds, totalPrice } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !address?.city || !productIds || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      productIds,
      totalPrice
    });

    const savedOrder = await newOrder.save();

    // Update the sold count for each book in the order
    for (const productId of productIds) {
      await Book.findByIdAndUpdate(productId, {
        $inc: { sold: 1 }
      });
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createdAt: -1});
    if(!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

module.exports = {
  createAOrder,
  getOrderByEmail
};
