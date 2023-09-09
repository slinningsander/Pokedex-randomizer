import { Routes, Route } from "react-router-dom";
import ComponentTestPage from "./pages/componentTestPage/ComponentTestPage";


function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<ComponentTestPage/>} />
        </Routes>
    </>
  );
}

export default App;
