import Container from "@/components/common/Container";
import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import EditModal from "@/components/myProfile/EditModal";

const MyProfile = () => {
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/announcements/byUser");
      setMyAnnouncements(response.data.announcements);
    } catch (error) {
      console.log("error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async () => {
    setLoading(true);
    try {
      await instance.delete(`/announcements/${announcementToDelete}`);
      fetchAnnouncements();
      toast.success("Elan silindi");
      setIsModalOpen(false); // Закрыть модальное окно
    } catch (error) {
      console.log("error deleting", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (id) => {
    setAnnouncementToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncementToDelete(null);
  };

  const openEditModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="mt-7">
      <Container>
        <h1 className="mb-4 text-[32px] font-medium md:text-[40px]">
          Menim Elanlarim
        </h1>
        <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <TailSpin color="#ab386e" />
            </div>
          ) : myAnnouncements && myAnnouncements.length > 0 ? (
            myAnnouncements.map((item, index) => (
              <div
                className="bg-white shadow-md rounded-md mx-auto w-[170px] h-[280px] md:h-[350px] md:w-[250px] lg:w-[270px] overflow-hidden"
                key={index}
              >
                <div className="h-[150px] md:h-[220px]">
                  <img
                    className="w-full h-full object-cover"
                    src={item.images[0]}
                    alt={item.category}
                  />
                </div>
                <div className="my-3 px-2">
                  <p className="font-semibold">{item.category}</p>
                  <p>{item.pricePerDay} AZN</p>
                  <p className="text-[#ab386e]">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <button
                      onClick={() => openModal(item._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md"
                    >
                      sil
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="bg-black text-white py-1 px-4 rounded-md"
                    >
                      düzəlt
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Elanınız yoxdur.</p>
          )}
        </section>
      </Container>
      {/* Модальное окно для подтверждения удаления */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md w-[300px] text-center">
            <h2 className="mb-4">Bu elanı silmək istədiyinizə əminsiniz?</h2>
            <div className="mx-[40px] flex gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                İmtina et
              </button>
              <button
                onClick={deleteAnnouncement}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Модальное окно для редактирования */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center min-h-screen z-50">
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            announcement={selectedAnnouncement}
            onSave={fetchAnnouncements}
          />
        </div>
      )}
      ;
    </div>
  );
};

export default MyProfile;
