import { Category } from "../../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Название категории обязательно." });
    }

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Такая категория уже существует." });
    }

    const newCategory = new Category({ title });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Категория успешно создана.", category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании категории." });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).json({ message: "Категории не найдены." });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении категорий." });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении категории." });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Название категории обязательно." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Категория не найдена." });
    }

    res.status(200).json({
      message: "Категория успешно обновлена.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении категории." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Категория не найдена." });
    }

    res.status(200).json({ message: "Категория успешно удалена." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении категории." });
  }
};
