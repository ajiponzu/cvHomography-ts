import { useState } from 'react';
import { useSrcContext } from './App'
import NumberFormat from 'react-number-format';
import './css/InputPointBox.css'

const SrcInputBox = (props: { idx: number }) => {
  const { srcPoints, setSrcPoints } = useSrcContext();

  /* 入力フォームの数値表示を変更するために, ReactStateを使用. ただし, 元の配列に変更は保存されない */
  const [pointX, setPointX] = useState(srcPoints[props.idx][0]);
  const [pointY, setPointY] = useState(srcPoints[props.idx][1]);
  /* end */

  return (
    <div className="InputPointBox">
      <h3>point{props.idx}: (x, y)</h3>
      <div className='inputs'>
        <NumberFormat
          value={pointX}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            setPointX(input); // 数値表示の変更
            /* 配列を丸ごと作り直すことで，初めて再レンダリングが実行される */
            let newPoints = srcPoints.concat(); // 共有配列のクローン
            newPoints[props.idx][0] = input; // 入力数値の代入
            setSrcPoints(newPoints);
            /* end */
          }}
        />
        <NumberFormat
          value={pointY}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            setPointY(input);
            let newPoints = srcPoints.concat();
            newPoints[props.idx][1] = input;
            setSrcPoints(newPoints);
          }}
        />
      </div>
    </div >
  );
};

export default SrcInputBox;