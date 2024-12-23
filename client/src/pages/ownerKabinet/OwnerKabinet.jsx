import Announcements from "@/components/ownerKabinet/Announcements";
import Store from "@/components/ownerKabinet/Store";
import Container from "@/components/common/Container";
import React from "react";

const OwnerKabinet = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="font-semibold md:text-[40px]">Magaza və elanlar</h1>
      </div>
      <Container>
        <div className="md:px-[100px] my-6">
          <Store />
          <Announcements />
        </div>
      </Container>
    </div>
  );
};

export default OwnerKabinet;
