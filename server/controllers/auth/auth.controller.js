import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  try {
    const { userName, firstName, phone, password, role } = req.body;

    if (!userName || !firstName || !password || !phone) {
      return res.status(400).json({ message: "Все поля обязательны." });
    }

    const isUsed = await User.findOne({ userName });

    if (isUsed) {
      return res.json({
        message: "Данный username уже занят.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      userName,
      firstName,
      phone,
      password: hash,
      role: role || "user",
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: "Регистрация прошла успешно.",
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании пользователя." });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({
        message: "Такого юзера не существует.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Неверный пароль.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Вы вошли в систему.",
    });
  } catch (error) {
    res.json({ message: "Ошибка при авторизации." });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого юзера не существует.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: "Нет доступа." });
  }
};
