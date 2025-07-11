"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   collection,
//   doc,
//   getDocs,
//   getDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db, auth } from "../utils/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userManagement, setuserManagement] = useState([]);
  const [categoryManagement, setCategoryManagement] = useState([]);
  const [productManagement, setProductManagement] = useState([]);
  const [colorManagement, setColorManagement] = useState([]);
  const [orderManagement, setOrderManagement] = useState([]);



  return (
    <AppContext.Provider
      value={{
        user,
        userManagement,
        categoryManagement,
        productManagement,
        colorManagement,
        orderManagement,
        setUser,
        setuserManagement,
        setCategoryManagement,
        setProductManagement,
        setColorManagement,
        setOrderManagement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};