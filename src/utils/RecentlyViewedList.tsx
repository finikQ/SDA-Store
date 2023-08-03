"use client";

import React, { useEffect } from "react";
import { addRecentlyViewed, typeCartItem } from "@/redux/features/cart-slice";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";

const RecentlyViewedList: React.FC<{ props: typeCartItem }> = ({ props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addRecentlyViewed(props));
  }, [dispatch, props]);
  return <></>;
};

export default dynamic(() => Promise.resolve(RecentlyViewedList), {
  ssr: false,
});
