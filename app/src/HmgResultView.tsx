import {
  useDstImgPathContext,
  useDstPointsContext,
  useHmgImgPathContext,
  useHmgRectContext,
  useSrcImgPathContext,
  useSrcPointsContext,
  useWindowDimensions,
} from "./App";
import {
  showHomographyImage,
  showImageOnCanvas,
} from "./funcs/ImageProcessing";

const HmgResultView = () => {
  const canvasName = "hmgResult";
  const { hmgImgPath, setHmgImgPath } = useHmgImgPathContext();
  const { srcImgPath } = useSrcImgPathContext();
  const { dstImgPath } = useDstImgPathContext();
  const { srcPoints } = useSrcPointsContext();
  const { dstPoints } = useDstPointsContext();
  const { wWidth, wHeight } = useWindowDimensions();

  const showImage = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const wWid = wWidth - (canvas?.getBoundingClientRect().left as number);
    const wHigh = wHeight - (canvas?.getBoundingClientRect().top as number);
    showImageOnCanvas(canvasName, img, wWid, wHigh);
  };

  const img = new Image();
  img.onload = () => {
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    showImage(img, canvas); // イベント処理内で呼び出す
  };
  img.src = hmgImgPath;

  const onButtonClick = () => {
    const srcImg = new Image();
    srcImg.onload = () => {
      const dstImg = new Image();
      dstImg.onload = () => {
        showHomographyImage(
          canvasName,
          srcImg,
          dstImg,
          srcPoints.slice(0, 4).concat(),
          dstPoints
        );
        const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        setHmgImgPath(canvas.toDataURL());
      };
      dstImg.src = dstImgPath; // opencv関数に渡すために, あえてdstのイメージを渡す(これをしないとそもそもonloadが呼ばれない)
    };
    srcImg.src = srcImgPath; // そして，もう一つ画像を関数に渡すために，コールバックを二重にする
  };

  return (
    <div className="HmgResultView">
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

export default HmgResultView;
