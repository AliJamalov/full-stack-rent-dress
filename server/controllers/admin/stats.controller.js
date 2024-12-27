import { User } from "../../models/user.model.js";
import { Announcement } from "../../models/announcement.js";
import { Store } from "../../models/store.model.js";

export const fetchStats = async (req, res) => {
  try {
    const [totalUsers, totalAnnouncements, totalStores] = await Promise.all([
      User.countDocuments(), // Подсчет общего количества пользователей
      Announcement.countDocuments(), // Подсчет общего количества объявлений
      Store.countDocuments(), // Подсчет общего количества магазинов
    ]);

    res.status(200).json({
      totalUsers,
      totalAnnouncements,
      totalStores,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
