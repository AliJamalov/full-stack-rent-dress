import { Announcement } from "../../models/announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    const {
      description,
      clothingCollection,
      brand,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
      userPhone,
      userName,
    } = req.body;

    // Проверка на пустые поля
    if (
      !description ||
      !clothingCollection ||
      !gender ||
      !category ||
      !brand ||
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

    // Проверка на обязательность userName для обычных пользователей
    if (!storeId && !userName) {
      return res
        .status(400)
        .json({ message: "Для пользователя обязательное поле: userName." });
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
      brand,
      gender,
      category,
      size,
      color,
      pricePerDay,
      images,
      city,
      userPhone,
      userName: storeId ? undefined : userName, // Если это магазин, userName не передаем
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

export const getFilteredAnnouncements = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      gender,
      category,
      brand,
      clothingCollection,
      color,
      size,
      sortBy = "lowtohigh",
      search, // Добавляем параметр поиска
    } = req.query;

    const sort = {};

    switch (sortBy) {
      case "lowtohigh":
        sort.pricePerDay = 1;
        break;

      case "hightolow":
        sort.pricePerDay = -1;
        break;

      case "newest":
        sort.createdAt = -1;
        break;

      case "oldest":
        sort.createdAt = 1;
        break;

      default:
        sort.pricePerDay = 1;
        break;
    }

    const filters = {};

    if (gender) filters.gender = gender;
    if (category) filters.category = category;
    if (clothingCollection) filters.clothingCollection = clothingCollection;
    if (color) filters.color = color;
    if (size) filters.size = size;
    if (brand) filters.brand = brand;

    // Добавляем фильтрацию по поисковому запросу
    if (search) {
      const searchRegex = new RegExp(search, "i"); // i — для нечувствительности к регистру
      filters.$or = [
        { category: { $regex: searchRegex } },
        { brand: { $regex: searchRegex } },
        { clothingCollection: { $regex: searchRegex } },
        { color: { $regex: searchRegex } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalAnnouncements = await Announcement.countDocuments(filters);

    const announcements = await Announcement.find(filters)
      .skip(skip)
      .limit(limitNumber)
      .sort(sort);

    res.status(200).json({
      announcements,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalAnnouncements / limitNumber),
      totalAnnouncements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
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
