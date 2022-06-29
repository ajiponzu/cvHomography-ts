import {
  useSrcPointsContext,
  useSrcImgPathContext,
  useSrcFocusIdxContext,
} from "./App";
import { showImageOnCanvas } from "./funcs/ImageProcessing";

const colorStyles = [
  "rgba(255, 0, 0, 255)",
  "rgba(0, 255, 0, 255)",
  "rgba(0, 0, 255, 255)",
  "rgba(255, 255, 0, 255)",
  "rgba(255, 0, 255, 255)",
];

const SrcEditView = () => {
  const canvasName = "src";
  const { srcPoints, setSrcPoints } = useSrcPointsContext();
  const { srcImgPath, setSrcImgPath } = useSrcImgPathContext();
  const { srcFocusIdx } = useSrcFocusIdxContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img);
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < 8; i++) {
      ctx.beginPath(); // これがないとほかの描画図形と連結したり面を貼ったりしてしまう. 毎回描画情報をリセットするために必要
      const [x, y] = srcPoints[i];
      ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
      ctx.fillStyle = colorStyles[Math.min(i, 4)];
      ctx.fill();
      ctx.stroke();
    }
  };
  img.src = srcImgPath; // 画像のプリロード．プリロードが終わると, おそらくonloadが実行される

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImg = new Image();
      newImg.onload = () => {
        showImageOnCanvas(canvasName, newImg);
      };
      newImg.src = URL.createObjectURL(e.target.files[0]);
      setSrcImgPath(newImg.src);
    }
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (srcFocusIdx === -1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;

    let newPoints = srcPoints.concat();
    newPoints[srcFocusIdx] = [x, y];
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
          onClick={onCanvasClick}
        />
      </div>
    </div>
  );
};

export default SrcEditView;
