import WishList from "../../models/wishlist.model.js";
import { Announcement } from "../../models/announcement.js";

export const toggleWishList = async (req, res) => {
  try {
    const { productId } = req.body; // Получаем ID товара из тела запроса
    const userId = req.userId; // Извлекаем userId из middleware

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required!",
      });
    }

    // Проверяем, существует ли такой товар (объявление)
    const product = await Announcement.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Проверяем, добавлен ли товар в список желаемого
    const existingWish = await WishList.findOne({ userId, productId });

    if (existingWish) {
      // Если товар уже в списке желаемого, удаляем его
      await WishList.deleteOne({ userId, productId });
      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist successfully",
      });
    } else {
      // Если товара нет в списке, добавляем его
      const newWishItem = new WishList({
        userId,
        productId,
      });
      await newWishItem.save();
      return res.status(201).json({
        success: true,
        message: "Product added to wishlist successfully",
        data: newWishItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error toggling product in wishlist",
    });
  }
};

export const getWishListItems = async (req, res) => {
  try {
    const userId = req.userId; // Извлекаем userId из middleware

    // Получаем все товары в списке желаемого для текущего пользователя
    const wishItems = await WishList.find({ userId }).populate({
      path: "productId", // Заполняем данные товара (объявления)
      select:
        "description clothingCollection brand gender category size color pricePerDay images userId city userPhone userName",
    });

    if (!wishItems.length) {
      return res.status(404).json({
        success: false,
        message: "No items found in wishlist",
      });
    }

    // Формируем массив с нужной информацией о товарах
    const populateCartItems = wishItems.map((item) => ({
      productId: item.productId._id,
      description: item.productId.description,
      clothingCollection: item.productId.clothingCollection,
      brand: item.productId.brand,
      gender: item.productId.gender,
      category: item.productId.category,
      size: item.productId.size,
      color: item.productId.color,
      pricePerDay: item.productId.pricePerDay,
      images: item.productId.images,
      userId: item.productId.userId,
      city: item.productId.city,
      userPhone: item.productId.userPhone,
      userName: item.productId.userName,
    }));

    res.status(200).json({
      success: true,
      data: populateCartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving wishlist items",
    });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const { productId } = req.params; // Получаем ID товара из параметров запроса
    const userId = req.userId; // Извлекаем userId из middleware

    // Проверяем, есть ли товар в списке желаемого пользователя
    const existingWish = await WishList.findOne({ userId, productId });

    if (!existingWish) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    // Удаляем товар из списка желаемого
    await WishList.deleteOne({ userId, productId });

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error removing product from wishlist",
    });
  }
};
