"use client";

import { useEffect, useState } from "react";
import PreLoader from "./PreLoader";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hueborn_loaded");

    if (hasLoaded) {
      setShowLoader(false);
      return;
    }

    const timer = setTimeout(() => {
      setExiting(true);

      setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("hueborn_loaded", "true");
      }, 700);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center
          transition-all duration-700 ease-in-out
          ${exiting ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <PreLoader />
        </div>
      )}

      {!showLoader && children}
    </>
  );
}
