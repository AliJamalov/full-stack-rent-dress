import { HeroSection } from "../../models/heroSection.model.js";

export const createHeroSection = async (req, res) => {
  try {
    const { description, image } = req.body;

    if (!description || !image) {
      return res
        .status(400)
        .json({ message: "Описание и изображение обязательны." });
    }

    const newHeroSection = new HeroSection({ description, image });
    await newHeroSection.save();

    res.status(201).json({
      message: "Hero section успешно создана.",
      heroSection: newHeroSection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании Hero section." });
  }
};

export const getAllHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find();

    if (!heroSections.length) {
      return res.status(404).json({ message: "Hero sections не найдены." });
    }

    res.status(200).json(heroSections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении Hero sections." });
  }
};

export const getHeroSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const heroSection = await HeroSection.findById(id);

    if (!heroSection) {
      return res.status(404).json({ message: "Hero section не найдена." });
    }

    res.status(200).json(heroSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении Hero section." });
  }
};

export const updateHeroSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, image } = req.body;

    if (!description && !image) {
      return res
        .status(400)
        .json({ message: "Нужно указать хотя бы одно поле для обновления." });
    }

    const updates = {};
    if (description) updates.description = description;
    if (image) updates.image = image;

    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedHeroSection) {
      return res.status(404).json({ message: "Hero section не найдена." });
    }

    res.status(200).json({
      message: "Hero section успешно обновлена.",
      heroSection: updatedHeroSection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении Hero section." });
  }
};

export const deleteHeroSection = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHeroSection = await HeroSection.findByIdAndDelete(id);

    if (!deletedHeroSection) {
      return res.status(404).json({ message: "Hero section не найдена." });
    }

    res.status(200).json({ message: "Hero section успешно удалена." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении Hero section." });
  }
};
