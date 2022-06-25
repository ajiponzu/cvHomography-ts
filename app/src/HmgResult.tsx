import React from "react";
import cv, { Mat } from "opencv-ts";

const HmgResult = (props: { canvasName: string; img: Mat | null }) => {
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image();
      img.onload = () => {
        props.img = cv.imread(img);
        cv.imshow(props.canvasName, props.img);
      };
      img.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const onMouseMoveInImg = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;
    console.log(`${props.canvasName}::: ${x}:${y}`);
  };

  return (
    <div className="ImageCanvas">
      <div>
        <input type="file" onChange={onChangeFile} />
      </div>
      <canvas id={props.canvasName} onMouseMove={onMouseMoveInImg} />
    </div>
  );
};

export default HmgResult;
