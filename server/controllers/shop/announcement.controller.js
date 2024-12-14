import { Announcement } from "../../models/announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      description,
      clothingCollection,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
    } = req.body;

    if (
      !title ||
      !description ||
      !clothingCollection ||
      !gender ||
      !category ||
      !size ||
      !color ||
      !pricePerDay ||
      !images.length ||
      !city
    ) {
      return res
        .status(400)
        .json({ message: "Все поля должны быть заполнены." });
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      clothingCollection,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
      userId: req.userId, // ID пользователя из middleware
    });

    await newAnnouncement.save();

    res.status(201).json({
      message: "Объявление успешно создано.",
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании объявления." });
  }
};

export const getAllAnnouncements = async (req, res) => {
  try {
    const { gender, category, city } = req.query; // Фильтры из query-параметров
    const filter = {};

    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (city) filter.city = city;

    const announcements = await Announcement.find(filter);

    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении объявлений." });
  }
};

export const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: "Объявление не найдено." });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении объявления." });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAnnouncement = await Announcement.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({
        message: "Объявление не найдено или у вас нет доступа для обновления.",
      });
    }

    res.status(200).json({
      message: "Объявление успешно обновлено.",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении объявления." });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedAnnouncement) {
      return res.status(404).json({
        message: "Объявление не найдено или у вас нет доступа для удаления.",
      });
    }

    res.status(200).json({ message: "Объявление успешно удалено." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении объявления." });
  }
};
