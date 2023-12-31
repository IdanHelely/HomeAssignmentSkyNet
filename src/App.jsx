import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { useUserStore } from './context/usersContext';

function App() {
  const { setInitialData } = useUserStore();

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
