import {
  useSrcPointsContext,
  useSrcImgPathContext,
  useWindowDimensions,
} from "./App";
import { showImageOnCanvas } from "./funcs/ImageProcessing";

const colorStyles = [
  "rgba(255, 0, 0, 255)",
  "rgba(0, 255, 0, 255)",
  "rgba(0, 0, 255, 255)",
  "rgba(255, 255, 0, 255)",
  "rgba(255, 0, 255, 255)",
];

const arcRad = 20;

const SrcEditView = () => {
  const canvasName = "src";
  const { srcPoints, setSrcPoints } = useSrcPointsContext();
  const { srcImgPath, setSrcImgPath } = useSrcImgPathContext();
  const { wWidth, wHeight } = useWindowDimensions();

  const canvasArcPoints: number[][] = [];
  let [diffX, diffY] = [0.0, 0.0];
  let [moveX, moveY] = [0.0, 0.0];
  let focusIdx = -1;
  let ratio = 1.0;

  const showImage = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const wWid = wWidth - (canvas?.getBoundingClientRect().left as number);
    const wHigh = wHeight - (canvas?.getBoundingClientRect().top as number);
    ratio = showImageOnCanvas(canvasName, img, wWid, wHigh);
  };

  const drawArcOnCanvas = (ctx: CanvasRenderingContext2D, idx: number) => {
    const [x, y] = canvasArcPoints[idx];
    ctx.beginPath(); // これがないとほかの描画図形と連結したり面を貼ったりしてしまう. 毎回描画情報をリセットするために必要
    ctx.arc(x, y, arcRad, 0, 2 * Math.PI, false);
    ctx.fillStyle = colorStyles[Math.min(idx, 4)];
    ctx.fill();
    ctx.stroke();
  };

  const img = new Image();
  img.onload = () => {
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    showImage(img, canvas);

    for (const srcPoint of srcPoints) {
      const newPoint = [srcPoint[0] * ratio, srcPoint[1] * ratio];
      canvasArcPoints.push(newPoint);
    }

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < canvasArcPoints.length; i++) {
      drawArcOnCanvas(ctx, i);
    }
  };
  img.src = srcImgPath; // 画像のプリロード．プリロードが終わると, おそらくonloadが実行される

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImg = new Image();
      newImg.onload = () => {
        const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        showImage(img, canvas);
        setSrcImgPath(newImg.src);
      };
      newImg.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const onCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    moveX = e.clientX - rect.left;
    moveY = e.clientY - rect.top;
    for (let i = 0; i < canvasArcPoints.length; i++) {
      const xColl =
        moveX > canvasArcPoints[i][0] - 20 &&
        moveX < canvasArcPoints[i][0] + 20;
      const yColl =
        moveY > canvasArcPoints[i][1] - 20 &&
        moveY < canvasArcPoints[i][1] + 20;
      if (xColl && yColl) {
        diffX = canvasArcPoints[i][0] - moveX;
        diffX = canvasArcPoints[i][1] - moveY;
        focusIdx = i;
        break;
      }
    }
  };

  const onCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    moveX = e.clientX - rect.left;
    moveY = e.clientY - rect.top;

    if (focusIdx === -1) return;

    canvasArcPoints[focusIdx][0] = moveX + diffX;
    canvasArcPoints[focusIdx][1] = moveY + diffY;

    const newImg = new Image();
    newImg.onload = () => {
      const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
      showImage(img, canvas);
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      for (let i = 0; i < canvasArcPoints.length; i++) {
        drawArcOnCanvas(ctx, i);
      }
    };
    newImg.src = srcImgPath;
  };

  const onCanvasUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (focusIdx === -1) return;

    const newPoints = srcPoints.concat();
    newPoints[focusIdx][0] = canvasArcPoints[focusIdx][0] / ratio;
    newPoints[focusIdx][1] = canvasArcPoints[focusIdx][1] / ratio;
    focusIdx = -1;
    setSrcPoints(newPoints);
  };

  return (
    <div className="SrcEditView">
      <div>
        <input className="fileButton" type="file" onChange={onChangeFile} />
      </div>
      <div>
        <canvas
          id={canvasName}
          className="outputCanvas"
          width={wWidth}
          height={wHeight}
          onMouseDown={onCanvasMouseDown}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={onCanvasUp}
        />
      </div>
    </div>
  );
};

export default SrcEditView;
