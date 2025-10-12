import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import MedicinePage from "./pages/MedicinePage";
import ReportScannerPage from "./pages/ReportScannerPage";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import AlternativesPage from "./pages/AlternativesPage";
import Header from "./components/Header";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getAuthUser } from "./lib/api";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./hooks/useAuthUser";

const App = () => {
  // const data = getAuthUser().then(user => {
  //   console.log(user);
  // }) ;

  // useEffect(() => {
  //   console.log(data) ;
  // },[data]);

  const {authUser , isLoading} = useAuthUser();

  const isUser = Boolean(authUser);;

  console.log(authUser);

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            // <Layout>
            isUser ? <Navigate to ="/" /> : <LoginPage />
            // </Layout>
          }
        />
        <Route
          path="/register"
          element={
            // <Layout>
            isUser ? <Navigate to ="/" /> : <RegisterPage />
            // </Layout>
          }
        />
        <Route
          path="/"
          element={
            isUser ? (
              <Layout>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/medicine-id"
          element={
            isUser ? (
              <Layout>
                <MedicinePage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/report-scanner"
          element={
            isUser ? (
              <Layout>
                <ReportScannerPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/symptom-checker"
          element={
            isUser ? (
              <Layout>
                <SymptomCheckerPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/alternatives"
          element={
            isUser ? (
              <Layout>
                <AlternativesPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
