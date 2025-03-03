import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPage"
import HistoryPage from "./pages/HistoryPage"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <Outlet />
    </div>
  )
}

export default App

