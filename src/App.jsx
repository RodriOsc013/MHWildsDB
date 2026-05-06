import { Routes, Route } from "react-router-dom";
import MonsterList from "./pages/MonsterList";
import MonsterDetail from "./pages/MonsterDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MonsterList />} />
      <Route path="/monster/:id" element={<MonsterDetail />} />
    </Routes>
  );
}
export default App;