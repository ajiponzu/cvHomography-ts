import {
  showDstImageAddedRect,
  showImageOnCanvas,
} from "./funcs/ImageProcessing";

import {
  useDstPointsContext,
  useHmgRectImgPathContext,
  useDstImgPathContext,
  useSrcPointsContext,
} from "./App";

const HmgRectResultView = () => {
  const canvasName = "hmgRect";
  const { hmgRectImgPath, setHmgRectImgPath } = useHmgRectImgPathContext();
  const { dstImgPath } = useDstImgPathContext();
  const { srcPoints } = useSrcPointsContext();
  const { dstPoints } = useDstPointsContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img); // イベント処理内で呼び出す
  };
  img.src = hmgRectImgPath;

  const onButtonClick = () => {
    const inputPoints = srcPoints.slice(4);
    const dstImg = new Image();
    dstImg.onload = () => {
      showDstImageAddedRect(
        canvasName,
        dstImg,
        inputPoints,
        srcPoints.slice(0, 4),
        dstPoints
      );
      const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
      setHmgRectImgPath(canvas.toDataURL());
    };
    dstImg.src = dstImgPath;
  };

  return (
    <div className="HmgRectResultView">
      <div>
        <button onClick={onButtonClick}>Run!!</button>
      </div>
      <div>
        <canvas id={canvasName} className="outputCanvas" />
      </div>
    </div>
  );
};

export default HmgRectResultView;
