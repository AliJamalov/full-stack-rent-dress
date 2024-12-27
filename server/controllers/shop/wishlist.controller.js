import Wishlist from "../../models/wishlist.model.js";

export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId; // userId из мидлвара
    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "items",
      select: "category pricePerDay images", // Укажите, какие поля вы хотите получить
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addItemToWishlist = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId; // Получаем userId из middleware

  try {
    // Ищем существующий wishlist пользователя
    let wishlist = await Wishlist.findOne({ userId });

    // Если wishlist не найден, создаем новый
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [itemId],
      });
      await wishlist.save();
      return res.status(201).json(wishlist); // Возвращаем созданный wishlist
    }

    // Если wishlist существует, добавляем новый элемент
    if (!wishlist.items.includes(itemId)) {
      wishlist.items.push(itemId);
      await wishlist.save();
    }

    res.status(200).json(wishlist); // Возвращаем обновленный wishlist
  } catch (error) {
    console.error("Ошибка при добавлении в wishlist:", error);
    res.status(500).json({ message: "Ошибка при добавлении в wishlist" });
  }
};

export const removeItemFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // userId из мидлвара

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.toString() !== itemId
    );
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
