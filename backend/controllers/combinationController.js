import popularCombinationModel from "../models/popularCombinationModel.js";

const addCombination = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Изображение обязательно",
      });
    }

    const imageUrl = `/uploads/${imageFile.filename}`;

    const { name, description, price, options } = req.body;

    const combinationData = {
      name,
      description,
      price: Number(price),
      options: JSON.parse(options),
      image: imageUrl,
      isActive: true,
    };

    const combination = new popularCombinationModel(combinationData);
    await combination.save();

    res.json({ success: true, message: "Комбинация добавлена" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listCombinations = async (req, res) => {
  try {
    const combinations = await popularCombinationModel.find({ isActive: true });
    res.json({ success: true, combinations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleCombination = async (req, res) => {
  try {
    const { combinationId } = req.params;
    const combination = await popularCombinationModel.findById(combinationId);
    res.json({ success: true, combination });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeCombination = async (req, res) => {
  try {
    const { combinationId } = req.params;
    await popularCombinationModel.findByIdAndDelete(combinationId);
    res.json({ success: true, message: "Комбинация удалена" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addCombination,
  listCombinations,
  singleCombination,
  removeCombination,
};
