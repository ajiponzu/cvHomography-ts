import { useSrcPointsContext, useSrcImgPathContext } from './App';
import { showImageOnCanvas } from './funcs/ImageProcessing'

const SrcEditView = () => {
  const canvasName = 'src';
  const { srcPoints, setSrcPoints } = useSrcPointsContext();
  const { srcImgPath, setSrcImgPath } = useSrcImgPathContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img); // イベント処理内で呼び出す
  };
  img.src = srcImgPath; // 画像のプリロード．プリロードが終わると, おそらくonloadが実行される

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(srcPoints);
      const img = new Image();
      img.onload = () => {
        showImageOnCanvas(canvasName, img);
      };
      img.src = URL.createObjectURL(e.target.files[0]);
      setSrcImgPath(img.src);
    }
  };

  const onMouseMoveInImg = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;
    // console.log(`${props.canvasName}::: ${x}:${y}`);
  };
  return (
    <div className='SrcEditView'>
      <div>
        <input className="fileButton" type="file" onChange={onChangeFile} />
      </div>
      <div>
        <canvas id={canvasName} className="outputCanvas" onMouseMove={onMouseMoveInImg} />
      </div>
    </div>
  );
};

export default SrcEditView;