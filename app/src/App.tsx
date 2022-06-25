import "./css/App.css";

import ImageCanvas from "./ImageCanvas";

const App = () => {
  const srcCanvas: string = "src";
  const dstCanvas: string = "dst";

  return (
    <div className="App">
      <ImageCanvas canvasName={srcCanvas} />
      <ImageCanvas canvasName={dstCanvas} />
    </div>
  );
};

export default App;
