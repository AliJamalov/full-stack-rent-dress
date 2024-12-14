import { ClothingCollection } from "../../models/clothingCollection.model.js";

export const createClothingCollection = async (req, res) => {
  try {
    const { title, image } = req.body;

    if (!title || !image) {
      return res
        .status(400)
        .json({ message: "Название и изображение обязательны." });
    }

    const existingCollection = await ClothingCollection.findOne({ title });
    if (existingCollection) {
      return res
        .status(400)
        .json({ message: "Коллекция с таким названием уже существует." });
    }

    const newCollection = new ClothingCollection({ title, image });
    await newCollection.save();

    res.status(201).json({
      message: "Коллекция успешно создана.",
      collection: newCollection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании коллекции." });
  }
};

export const getAllClothingCollections = async (req, res) => {
  try {
    const collections = await ClothingCollection.find();

    if (!collections.length) {
      return res.status(404).json({ message: "Коллекции не найдены." });
    }

    res.status(200).json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении коллекций." });
  }
};

export const getClothingCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await ClothingCollection.findById(id);

    if (!collection) {
      return res.status(404).json({ message: "Коллекция не найдена." });
    }

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении коллекции." });
  }
};

export const updateClothingCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image } = req.body;

    if (!title && !image) {
      return res
        .status(400)
        .json({ message: "Нужно указать хотя бы одно поле для обновления." });
    }

    const updates = {};
    if (title) updates.title = title;
    if (image) updates.image = image;

    const updatedCollection = await ClothingCollection.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Коллекция не найдена." });
    }

    res.status(200).json({
      message: "Коллекция успешно обновлена.",
      collection: updatedCollection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении коллекции." });
  }
};

export const deleteClothingCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCollection = await ClothingCollection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return res.status(404).json({ message: "Коллекция не найдена." });
    }

    res.status(200).json({ message: "Коллекция успешно удалена." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении коллекции." });
  }
};
