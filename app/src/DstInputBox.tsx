import { useState } from 'react';
import { useDstContext } from './App'
import NumberFormat from 'react-number-format';
import './css/InputPointBox.css'

const DstInputBox = (props: { idx: number }) => {
  const { dstPoints, setDstPoints } = useDstContext();
  const [pointX, setPointX] = useState(dstPoints[props.idx][0]);
  const [pointY, setPointY] = useState(dstPoints[props.idx][1]);

  return (
    <div className="InputPointBox">
      <h3>point{props.idx}: (x, y)</h3>
      <div className='inputs' >
        <NumberFormat
          value={pointX}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            setPointX(input);
            let newPoints = dstPoints.concat();
            newPoints[props.idx][0] = input;
            setDstPoints(newPoints);
          }}
        />
        <NumberFormat
          value={pointY}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            setPointY(input);
            let newPoints = dstPoints.concat();
            newPoints[props.idx][1] = input;
            setDstPoints(newPoints);
          }}
        />
      </div>
    </div >
  );
};

export default DstInputBox;