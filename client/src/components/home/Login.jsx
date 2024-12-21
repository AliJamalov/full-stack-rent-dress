import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const Login = ({ handleOpenLogin }) => {
  const { login, isLoading, error } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage("Bütün sahələr doldurulmalıdır.");
      return;
    }

    try {
      const response = await login(userName, password);
      console.log(response);

      // Проверяем, был ли ответ успешным
      if (response.success) {
        toast.success("Sistemə uğurla daxil oldunuz");
        setPassword("");
        setUserName("");
        handleOpenLogin();
      } else {
        setErrorMessage(response.message); // Если ответ не успешен, показываем ошибку
      }
    } catch (error) {
      console.log("error login", error);
      setErrorMessage("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."); // Добавляем общий fallback для ошибок
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setErrorMessage("");
  };

  return (
    <section className="flex justify-center items-center min-h-screen mx-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Giriş</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <div className="mb-4">
            <Label htmlFor="userName">istifadəçi adı</Label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => handleInputChange(e, setUserName)}
              placeholder="istifadəçi adı"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Şifrə</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              placeholder="Şifrə"
            />
          </div>
          <p>
            hesabınız yoxdur ?
            <Link onClick={handleOpenLogin} to={"/register"}>
              <span className="text-blue-600 ml-2">qeydiyyatdan keç</span>
            </Link>
          </p>
          <Button disabled={isLoading} type="submit" className="w-full mt-4">
            {isLoading ? "Gözləyin..." : "Daxil ol"}
          </Button>
          <Button onClick={handleOpenLogin} className="w-full mt-4">
            Bagla
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
