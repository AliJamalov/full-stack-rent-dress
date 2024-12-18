import React from "react";
import Container from "@/components/common/Container";
import GenderFilter from "@/components/catalog/GenderFilter";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import CollectionsFilter from "@/components/catalog/СollectionsFilter";
import SizeFilter from "@/components/catalog/SizeFilter";
import ColorFilter from "@/components/catalog/ColorFilter";

const Catalog = () => {
  return (
    <div className="bg-[#f5f5f5] py-[40px]">
      <Container>
        <div>
          <section>
            <GenderFilter />
            <CategoryFilter />
            <CollectionsFilter />
            <SizeFilter />
            <ColorFilter />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
