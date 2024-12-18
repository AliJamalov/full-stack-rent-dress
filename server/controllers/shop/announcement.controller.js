import { Announcement } from "../../models/announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    const {
      description,
      clothingCollection,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
      userPhone,
    } = req.body;
    console.log(req.body);
    // Проверка на пустые поля
    if (
      !description ||
      !clothingCollection ||
      !gender ||
      !category ||
      !size ||
      !color ||
      !pricePerDay ||
      !images ||
      !userPhone ||
      !images.length ||
      !city
    ) {
      return res
        .status(400)
        .json({ message: "Все поля должны быть заполнены." });
    }

    // Проверка на авторизацию и определение, кто создает объявление
    const userId = req.userId;
    const storeId = req.storeId; // Здесь предполагается, что это поле доступно для магазинов

    if (!userId && !storeId) {
      return res.status(401).json({ message: "Не авторизован." });
    }

    // В зависимости от того, кто создает объявление, выбираем нужный ID
    let creatorId = userId;
    if (!creatorId && storeId) {
      creatorId = storeId;
    }

    if (!creatorId) {
      return res
        .status(400)
        .json({ message: "ID пользователя или магазина не найдено." });
    }

    // Создание нового объявления
    const newAnnouncement = new Announcement({
      description,
      clothingCollection,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
      userPhone,
      userId: userId || null, // Если это обычный пользователь
      storeId: storeId || null, // Если это магазин
    });

    // Сохранение объявления
    await newAnnouncement.save();

    // Ответ при успешном создании
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
    const { page = 1, limit } = req.query; // Дефолтные значения: 1-я страница,

    // Преобразование строковых параметров в числа
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Определяем пропуск (skip) и лимит
    const skip = (pageNumber - 1) * limitNumber;

    // Получаем общее количество объявлений
    const totalAnnouncements = await Announcement.countDocuments();

    // Получаем данные с учетом пагинации
    const announcements = await Announcement.find()
      .skip(skip)
      .limit(limitNumber);

    // Возвращаем данные с информацией о пагинации
    res.status(200).json({
      announcements,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalAnnouncements / limitNumber),
      totalAnnouncements,
    });
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

export const getUserAnnouncements = async (req, res) => {
  try {
    // req.userId берётся из checkAuth
    const userId = req.userId;

    const announcements = await Announcement.find({ userId });

    if (!announcements.length) {
      return res.status(200).json({
        success: true,
        message: "Sizin yaratdığınız elan yoxdur.",
        announcements: [],
      });
    }

    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error("Error fetching user announcements:", error);
    res.status(500).json({
      success: false,
      message:
        "Elanları yükləyərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.",
    });
  }
};
