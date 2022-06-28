import {
  useSrcPointsContext,
  useSrcImgPathContext,
  useSrcFocusIdxContext,
} from "./App";
import { showImageOnCanvas } from "./funcs/ImageProcessing";

const SrcEditView = () => {
  const canvasName = "src";
  const { srcPoints, setSrcPoints } = useSrcPointsContext();
  const { srcImgPath, setSrcImgPath } = useSrcImgPathContext();
  const { srcFocusIdx } = useSrcFocusIdxContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img); // イベント処理内で呼び出す
  };
  img.src = srcImgPath; // 画像のプリロード．プリロードが終わると, おそらくonloadが実行される

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let points = srcPoints.concat();
      setSrcPoints(points);
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
