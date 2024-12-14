import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { userName, firstName, phone, password, role } = req.body;

    if (!userName || !firstName || !phone || !password) {
      return res.status(400).json({ message: "Все поля обязательны." });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Имя пользователя уже занято." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      firstName,
      phone,
      password: hashedPassword,
      role: role || "user", // Если роль не указана, устанавливаем "user"
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Пользователь успешно создан.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании пользователя." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Исключаем пароль из ответа
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при получении списка пользователей." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при получении данных пользователя." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, firstName, phone, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, firstName, phone, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    res.status(200).json({
      message: "Данные пользователя успешно обновлены.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при обновлении данных пользователя." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    res.status(200).json({ message: "Пользователь успешно удалён." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении пользователя." });
  }
};
