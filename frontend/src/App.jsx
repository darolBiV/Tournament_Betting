import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TournamentsPage from "./pages/TournamentsPage";
import ProfilePage from "./pages/ProfilePage";
import TeamsPage from "./pages/TeamsPage";
import MatchesPage from "./pages/MatchesPage";
import BetsPage from "./pages/BetsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/bets" element={<BetsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;