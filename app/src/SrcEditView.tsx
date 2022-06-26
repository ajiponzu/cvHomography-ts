import cv from "opencv-ts";
import { useSrcContext } from './App';

const SrcEditView = () => {
  const { srcPoints, setSrcPoints } = useSrcContext();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(srcPoints);
      const img = new Image();
      img.onload = () => {
        const mat = cv.imread(img);
        cv.imshow('src', mat);
        mat.delete();
      };
      img.src = URL.createObjectURL(e.target.files[0]);
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
        <input id="fileButton" type="file" onChange={onChangeFile} />
      </div>
      <div>
        <canvas id='src' onMouseMove={onMouseMoveInImg} />
      </div>
    </div>
  );
};

export default SrcEditView;