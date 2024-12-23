import { Store } from "../../models/store.model.js";

export const createStore = async (req, res) => {
  try {
    const { storeName, storeDescription, storePhoto, storeAddress, phone } =
      req.body;

    if (!storeName || !storePhoto || !storeAddress || !phone) {
      return res
        .status(400)
        .json({ message: "Все обязательные поля должны быть заполнены." });
    }

    const newStore = new Store({
      storeName,
      storeDescription,
      storePhoto,
      storeAddress,
      phone,
      ownerId: req.userId, // ID владельца из токена
    });

    await newStore.save();
    console.log(newStore);

    res
      .status(201)
      .json({ message: "Магазин успешно создан", store: newStore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании магазина." });
  }
};

export const getStoresByOwner = async (req, res) => {
  try {
    const stores = await Store.find({ ownerId: req.userId });

    if (!stores.length) {
      return res.status(404).json({ message: "Магазины не найдены." });
    }

    res.status(200).json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении магазинов." });
  }
};

export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({ message: "Магазин не найден." });
    }

    res.status(200).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении данных магазина." });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({});

    if (!stores) {
      return res.status(404).json({ message: "Магазины не найдены." });
    }

    res.status(200).json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении данных магазина." });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeName, storeDescription, storePhoto, storeAddress } = req.body;

    const store = await Store.findOneAndUpdate(
      { _id: id, ownerId: req.userId }, // Убедитесь, что магазин принадлежит текущему владельцу
      { storeName, storeDescription, storePhoto, storeAddress },
      { new: true } // Вернуть обновлённый документ
    );

    if (!store) {
      return res
        .status(404)
        .json({ message: "Магазин не найден или у вас нет доступа." });
    }

    res.status(200).json({ message: "Магазин успешно обновлён", store });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении магазина." });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findOneAndDelete({
      _id: id,
      ownerId: req.userId,
    });

    if (!store) {
      return res
        .status(404)
        .json({ message: "Магазин не найден или у вас нет доступа." });
    }

    res.status(200).json({ message: "Магазин успешно удалён." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении магазина." });
  }
};

export const getStoresByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;

    if (!ownerId) {
      return res.status(400).json({ message: "ID владельца обязателен." });
    }

    const stores = await Store.find({ ownerId });

    if (!stores.length) {
      return res.status(404).json({ message: "Магазины не найдены." });
    }

    res.status(200).json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении магазинов." });
  }
};
