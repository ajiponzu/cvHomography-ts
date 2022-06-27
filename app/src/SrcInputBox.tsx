import { useSrcPointsContext } from "./App";
import NumberFormat from "react-number-format";
import "./css/InputPointBox.css";

const SrcInputBox = (props: { idx: number }) => {
  const { srcPoints, setSrcPoints } = useSrcPointsContext();

  return (
    <div className="InputPointBox">
      <h3>point{props.idx}: (x, y)</h3>
      <div className="inputs">
        <NumberFormat
          value={srcPoints[props.idx][0]}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            /* 配列を丸ごと作り直すことで，初めて再レンダリングが実行される */
            let newPoints = srcPoints.concat(); // 共有配列のクローン
            newPoints[props.idx][0] = input; // 入力数値の代入
            setSrcPoints(newPoints);
            console.log("inputX");
            /* end */
          }}
        />
        <NumberFormat
          value={srcPoints[props.idx][1]}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            let newPoints = srcPoints.concat();
            newPoints[props.idx][1] = input;
            setSrcPoints(newPoints);
            console.log("inputY");
          }}
        />
      </div>
    </div>
  );
};

export default SrcInputBox;
