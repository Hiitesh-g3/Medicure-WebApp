import { LogOutIcon, Stethoscope } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentPage } from "../store/useCurrentPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../lib/api";
import { useAuthUser } from "../hooks/useAuthUser";

const Header = () => {
  // const [currentPage,setCurrentPage] = useState("home");
  // console.log(currentPage);

  const queryClient = useQueryClient();

  const {authUser : user} = useAuthUser();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  // const handleLogout = () => {
  //   logoutMutation();
  // }

  const { currentPage, setCurrentPage } = useCurrentPage();
  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 text-white p-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="rounded-xl">
            <img src="/logo1.avif" alt="MediCure Logo" className="h-12" />
          </div>
          <h1 className="text-2xl font-bold">MediCure</h1>
        </div>
        <nav className="flex space-x-2">
          {[
            { id: "home", label: "Home", page: "" },
            { id: "medicine-id", label: "Medicine ID", page: "medicine-id" },
            {
              id: "report-scanner",
              label: "Report Scanner",
              page: "report-scanner",
            },
            {
              id: "symptom-checker",
              label: "Symptom Checker",
              page: "symptom-checker",
            },
            { id: "alternatives", label: "Alternatives", page: "alternatives" },
          ].map((nav) => (
            <Link
              to={`/${nav.page}`}
              onClick={() => setCurrentPage(nav.id)}
              key={nav.id}
            >
              <button
                key={nav.id}
                onClick={() => setCurrentPage(nav.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === nav.id
                    ? "bg-white text-blue-600 shadow-lg "
                    : "hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {nav.label}
              </button>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <span className="text-sm">🌐 EN</span>
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content " />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
