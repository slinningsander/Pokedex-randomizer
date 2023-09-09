import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentTestPage from "./pages/componentTestPage/ComponentTestPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<ComponentTestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
