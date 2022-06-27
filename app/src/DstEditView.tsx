import { useDstPointsContext, useDstImgPathContext, useSrcPointsContext } from './App';
import { showImageOnCanvas } from './funcs/ImageProcessing'

const DstEditView = () => {
  const canvasName = 'dst';
  const { dstPoints, setDstPoints } = useDstPointsContext();
  const { dstImgPath, setDstImgPath } = useDstImgPathContext();
  const { srcPoints } = useSrcPointsContext();

  const img = new Image();
  img.onload = () => {
    showImageOnCanvas(canvasName, img);
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
      console.log('dst:' + srcPoints);
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

export default DstEditView;