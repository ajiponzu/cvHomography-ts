import {
  showImageOnCanvas,
  showDstImageAddedRect,
} from "./funcs/ImageProcessing";

import {
  useSrcPointsContext,
  useDstPointsContext,
  useDstImgPathContext,
  useHmgRectContext,
  useHmgRectImgPathContext,
  useWindowDimensions,
} from "./App";

const HmgRectResultView = () => {
  const canvasName = "hmgRect";
  const { hmgRectImgPath, setHmgRectImgPath } = useHmgRectImgPathContext();
  const { dstImgPath } = useDstImgPathContext();
  const { srcPoints } = useSrcPointsContext();
  const { dstPoints } = useDstPointsContext();
  const { hmgRect, setHmgRect } = useHmgRectContext();
  const { wWidth, wHeight } = useWindowDimensions();

  const canvas = document.getElementById(canvasName);
  const wWid = wWidth - (canvas?.getBoundingClientRect().left as number);
  const wHigh = wHeight - (canvas?.getBoundingClientRect().top as number);

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img, wWid, wHigh); // イベント処理内で呼び出す
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.fillStyle = "rgba(255, 0, 255, 255)";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); // これがないとほかの描画図形と連結したり面を貼ったりしてしまう. 毎回描画情報をリセットするために必要
      const [x, y] = hmgRect[i];
      ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    }
  };
  img.src = hmgRectImgPath;

  const onButtonClick = () => {
    const inputPoints = srcPoints.slice(4);
    const dstImg = new Image();
    dstImg.onload = () => {
      const outputPoints = showDstImageAddedRect(
        canvasName,
        dstImg,
        inputPoints,
        srcPoints.slice(0, 4),
        dstPoints
      );
      const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
      setHmgRectImgPath(canvas.toDataURL());
      setHmgRect(outputPoints);
    };
    dstImg.src = dstImgPath; // opencv関数に渡すために, あえてdstのイメージを渡す(これをしないとそもそもonloadが呼ばれない)
  };

  return (
    <div className="HmgRectResultView">
      <div>
        <button onClick={onButtonClick}>Run!!</button>
      </div>
      <div>
        <canvas
          id={canvasName}
          className="outputCanvas"
          width={wWidth}
          height={wHeight}
        />
      </div>
    </div>
  );
};

export default HmgRectResultView;
