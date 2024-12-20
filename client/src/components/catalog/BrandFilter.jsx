import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const clothingBrands = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "Under Armour",
  "Levi's",
  "Zara",
  "H&M",
  "Gucci",
  "Chanel",
  "Prada",
  "Louis Vuitton",
  "Calvin Klein",
  "Tommy Hilfiger",
  "Ralph Lauren",
  "The North Face",
  "Columbia",
  "Patagonia",
  "Uniqlo",
  "New Balance",
  "Vans",
  "Converse",
  "Fendi",
  "Balenciaga",
  "Burberry",
  "Saint Laurent",
  "Alexander McQueen",
  "BOSS",
  "Skechers",
  "Forever 21",
  "Mango",
  "Stradivarius",
  "Bershka",
  "Pull&Bear",
  "Superdry",
  "Jack & Jones",
  "Tommy Jeans",
  "Wrangler",
  "Diesel",
  "Lacoste",
  "Fila",
  "Carhartt",
  "Lee",
  "Wrangler",
  "Ted Baker",
  "Vivienne Westwood",
  "A Bathing Ape",
  "Stone Island",
  "Moncler",
  "Canada Goose",
];

const BrandFilter = ({ setFilters, filters }) => {
  const handleBrandChange = (brand) => {
    if (filters?.brand === brand) {
      setFilters("brand", null);
    } else {
      setFilters("brand", brand);
    }
  };

  return (
    <section className="w-[250px] border-[#ab386e] border-b pb-[25px]">
      <div>
        <h2 className="text-[22px] my-3">Brendlər</h2>
        <ScrollArea className="h-[150px]">
          <ul>
            {clothingBrands.length > 0 ? (
              clothingBrands.map((brand, index) => (
                <li key={index} className="p-2">
                  <span
                    onClick={() => handleBrandChange(brand)}
                    className={`${
                      filters?.brand === brand
                        ? "text-[#ab386e] text-[20px]"
                        : ""
                    } cursor-pointer text-sm`}
                  >
                    {brand}
                  </span>
                </li>
              ))
            ) : (
              <p>No brands available.</p>
            )}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
};

export default BrandFilter;
