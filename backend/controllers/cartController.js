import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, customization, totalPrice, image } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = {
        productName: "Кастомный шоколад",
        quantity: 1,
        customization,
        totalPrice,
        image: image || "",
      };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { quantity } = req.body;
    const { itemId } = req.params;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (quantity <= 0) {
      delete cartData[itemId];
    } else if (cartData[itemId]) {
      cartData[itemId].quantity = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
