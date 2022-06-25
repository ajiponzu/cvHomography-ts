import "./css/App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import HomePage from './pages/HomePage'
import SrcPage from './pages/SrcPage'
import DstPage from './pages/DstPage'
import HmgPage from './pages/HmgPage'

const App = () => {
  const srcCanvas: string = "src";
  const dstCanvas: string = "dst";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/src" element={<SrcPage canvasName={srcCanvas} />} />
          <Route path="/dst" element={<DstPage canvasName={dstCanvas} />} />
          <Route path="/hmg" element={<HmgPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
