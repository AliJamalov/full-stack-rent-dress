import Announcements from "@/components/storeDetail/Announcements";
import Store from "@/components/storeDetail/Store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const StoreDetail = () => {
  const { storeId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Store storeId={storeId} />
      <Announcements storeId={storeId} />
    </section>
  );
};

export default StoreDetail;
