import Announcements from "@/components/storeDetail/Announcements";
import Store from "@/components/storeDetail/Store";
import React from "react";
import { useParams } from "react-router-dom";

const StoreDetail = () => {
  const { storeId } = useParams();

  return (
    <section>
      <Store storeId={storeId} />
      <Announcements storeId={storeId} />
    </section>
  );
};

export default StoreDetail;
