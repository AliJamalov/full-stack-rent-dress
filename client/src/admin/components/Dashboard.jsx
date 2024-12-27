import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await instance.get("/stats");
      setStats(response.data);
    } catch (error) {
      console.log("error fetching stats", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Административная панель</h1>
      {stats ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl">Пользователи</h2>
            <p>Всего: {stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl">Магазины</h2>
            <p>Всего: {stats.totalStores}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl">Объявления</h2>
            <p>Активные: {stats.totalAnnouncements}</p>
          </div>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default Dashboard;
