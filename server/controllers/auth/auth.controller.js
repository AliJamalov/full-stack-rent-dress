import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  try {
    const { userName, firstName, phone, password, role } = req.body;

    // Проверка на обязательные поля
    if (!userName || !firstName || !phone || !password) {
      return res.status(400).json({
        message: "Bütün sahələr doldurulmalıdır.",
        success: false,
      });
    }

    // Проверка длины имени пользователя
    if (userName.length < 3 || userName.length > 30) {
      return res.status(400).json({
        message: "İstifadəçi adı 3-dən 30 simvola qədər olmalıdır.",
        success: false,
      });
    }

    // Проверка длины имени
    if (firstName.length < 2) {
      return res.status(400).json({
        message: "Ad ən azı 2 simvoldan ibarət olmalıdır.",
        success: false,
      });
    }

    // Проверка телефона (формат: от 10 до 15 символов)
    const phoneRegex = /^\+994[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Telefon nömrəsi düzgün formatda olmalıdır: +994XXXXXXXXX.",
        success: false,
      });
    }

    // Проверка длины пароля
    if (password.length < 8) {
      return res.status(400).json({
        message: "Şifrə ən azı 8 simvoldan ibarət olmalıdır.",
        success: false,
      });
    }

    // Проверка на существующий userName
    const isUsed = await User.findOne({ userName });
    if (isUsed) {
      return res.status(400).json({
        message: "Bu istifadəçi adı artıq mövcuddur.",
        success: false,
      });
    }

    // Хеширование пароля
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Создание нового пользователя
    const newUser = new User({
      userName,
      firstName,
      phone,
      password: hash,
      role: role || "user",
    });

    // Генерация токена
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Сохранение пользователя в базе данных
    await newUser.save();

    // Возвращаем результат с флагом успеха
    res.json({
      success: true,
      message: "Qeydiyyat uğurla başa çatdı.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "İstifadəçi yaradılarkən xəta baş verdi.",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    // Проверяем наличие пользователя
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        success: false,
        message: "Yanlış istifadəçi adı və ya şifrə.", // "Неверный пароль или имя пользователя"
      });
    }

    // Если имя пользователя и пароль верные
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      success: true,
      token,
      user,
      message: "Sistəmdə daxil oldunuz.", // "Вы вошли в систему."
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Autentifikasiya zamanı xəta baş verdi.", // "Ошибка при авторизации."
    });
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
