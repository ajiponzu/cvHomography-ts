import { useDstPointsContext } from "./App";
import NumberFormat from "react-number-format";
import "./css/InputPointBox.css";

const DstInputBox = (props: { idx: number }) => {
  const { dstPoints, setDstPoints } = useDstPointsContext();

  return (
    <div className="InputPointBox">
      <h3>point{props.idx}: (x, y)</h3>
      <div className="inputs">
        <NumberFormat
          value={dstPoints[props.idx][0]}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            let newPoints = dstPoints.concat();
            newPoints[props.idx][0] = input;
            setDstPoints(newPoints);
          }}
        />
        <NumberFormat
          value={dstPoints[props.idx][1]}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            let newPoints = dstPoints.concat();
            newPoints[props.idx][1] = input;
            setDstPoints(newPoints);
          }}
        />
      </div>
    </div>
  );
};

export default DstInputBox;
