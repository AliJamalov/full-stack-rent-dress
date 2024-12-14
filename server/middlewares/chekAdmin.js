export const checkAdmin = (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Доступ запрещён. Только для администраторов." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при проверке прав доступа." });
  }
};
