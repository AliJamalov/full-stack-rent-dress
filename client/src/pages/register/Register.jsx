import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  const initialForm = {
    userName: "",
    firstName: "",
    phone: "+994",
    password: "",
  };

  const [isOpenRegisterForUser, setIsOpenRegisterForUser] = useState(false);
  const [isOpenRegisterForStore, setIsOpenRegisterForStore] = useState(false);
  const [hideButtons, setHideButtons] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formattedPhone = formData.phone.replace(/\s+/g, "");
    const updatedFormData = { ...formData, phone: formattedPhone };

    try {
      const response = await register(updatedFormData);
      if (response.success) {
        toast.success("Qeydiyyat uğurla başa çatdı");
        setFormData(initialForm);
        navigate("/");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log("Error registering user", error);
    }
  };

  return (
    <div>
      {hideButtons && (
        <div className="flex flex-col items-center gap-4 absolute top-[30%] left-1/2 transform -translate-x-1/2 lg:flex-row">
          <button
            onClick={() => {
              setHideButtons(false);
              setIsOpenRegisterForUser(!isOpenRegisterForUser);
            }}
            className="bg-black flex items-center gap-2 rounded-md shadow-md text-white py-5 px-10"
          >
            <User />
            istifadəçi
          </button>
          <button
            onClick={() => {
              setHideButtons(false);
              setIsOpenRegisterForStore(!isOpenRegisterForStore);
            }}
            className="bg-black flex items-center gap-2 rounded-md shadow-md text-white py-5 px-11"
          >
            <Store />
            mağaza
          </button>
        </div>
      )}

      {isOpenRegisterForUser && (
        <section className="flex justify-center items-center min-h-screen mx-4">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Qeydiyyat</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <Label htmlFor="userName">İstifadəçi adı</Label>
                <Input
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  id="userName"
                  placeholder="İstifadəçi adı"
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Ad"
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="phone">Telefon</Label>
                <PhoneInput
                  defaultCountry="AZ"
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData({ ...formData, phone: phone })
                  }
                  placeholder="+994 99 999 99 99"
                  className="w-full outline-none p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="password">Şifrə</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Şifrə"
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Gözləyin..." : "Qeydiyyatdan Keç"}
              </Button>
            </form>
          </div>
        </section>
      )}

      {isOpenRegisterForStore && (
        <section className="flex justify-center items-center min-h-screen mx-4">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Mağaza Sahibi Olmaq</h2>
            <p className="mb-4">
              Mağaza sahibi olmaqla siz aşağıdakı üstünlüklərdən faydalana
              bilərsiniz:
            </p>
            <ul className="mb-4 list-disc pl-5">
              <li>Öz məhsullarınızı təqdim edə bilərsiniz.</li>
              <li>Platformada satışa başlamaq çox sadədir.</li>
              <li>
                Mağazanızın performansını izləyərək təkmilləşdirə bilərsiniz.
              </li>
            </ul>
            <p className="mb-4">
              Mağaza sahibi olaraq qeydiyyatdan keçmək üçün bizimlə əlaqə
              saxlayın:
            </p>
            <p className="font-semibold">Telefon: +994 50 123 45 67</p>
            <Link to={"/"}>
              <Button
                onClick={() => setIsOpenRegisterForStore(false)}
                className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md shadow-md"
              >
                əsas səhifəyə
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Register;
