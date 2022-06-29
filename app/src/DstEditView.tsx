import {
  useDstPointsContext,
  useDstImgPathContext,
  useDstFocusIdxContext,
} from "./App";
import { showImageOnCanvas } from "./funcs/ImageProcessing";

const colorStyles = [
  "rgba(255, 0, 0, 255)",
  "rgba(0, 255, 0, 255)",
  "rgba(0, 0, 255, 255)",
  "rgba(255, 255, 0, 255)",
];

const DstEditView = () => {
  const canvasName = "dst";
  const { dstPoints, setDstPoints } = useDstPointsContext();
  const { dstImgPath, setDstImgPath } = useDstImgPathContext();
  const { dstFocusIdx } = useDstFocusIdxContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img);
    const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); // これがないとほかの描画図形と連結したり面を貼ったりしてしまう. 毎回描画情報をリセットするために必要
      const [x, y] = dstPoints[i];
      ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
      ctx.fillStyle = colorStyles[i];
      ctx.fill();
      ctx.stroke();
    }
  };
  img.src = dstImgPath; // 画像のプリロード．プリロードが終わると, おそらくonloadが実行される
  /* end */

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image();
      img.onload = () => {
        showImageOnCanvas(canvasName, img);
      };
      img.src = URL.createObjectURL(e.target.files[0]);
      setDstImgPath(img.src);
    }
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;
    let newPoints = dstPoints.concat();
    newPoints[dstFocusIdx] = [x, y];
    setDstPoints(newPoints);
  };

  return (
    <div className="DstEditView">
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

export default DstEditView;
