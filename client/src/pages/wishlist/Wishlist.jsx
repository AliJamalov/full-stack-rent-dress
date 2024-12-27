import React, { useEffect } from "react";
import Container from "@/components/common/Container";
import { useWishlist } from "@/stores/useWishlist";

const Wishlist = () => {
  const { fetchWishlist, wishItems, removeItemFromWishlist } = useWishlist();

  const fetchWishitems = async () => {
    try {
      await fetchWishlist();
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeItemFromWishlist(id);
      fetchWishitems();
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchWishitems();
  }, []);

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-semibold mb-4">Seçilmişlər</h1>
        {wishItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {wishItems.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                {/* Проверка на существование images и его длину */}
                {item?.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.category}
                    className="w-full h-40 object-cover mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-300 mb-3 flex items-center justify-center text-gray-600">
                    No image available
                  </div>
                )}
                <p className="text-lg font-semibold">{item.category}</p>
                <p className="text-sm text-gray-600">{item.pricePerDay} AZN</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="my-2 bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Sizin bəyənilənlər siyahınızda heç bir əşya yoxdur.</p>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
