import { useDstPointsContext, useDstFocusIdxContext } from "./App";
import NumberFormat from "react-number-format";
import "./css/InputPointBox.css";
import { useState } from "react";

const DstInputBox = (props: { idx: number }) => {
  const { dstPoints, setDstPoints } = useDstPointsContext();
  const { dstFocusIdx, setDstFocusIdx } = useDstFocusIdxContext();
  const [buttonBool, setButtonBool] = useState(false);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentBool = !buttonBool;
    setButtonBool(currentBool);
    if (currentBool) {
      setDstFocusIdx(props.idx);
    } else {
      setDstFocusIdx(-1);
    }
  };

  /* 別のidのInputBoxコンポーネントにあるボタンが押されたときにbuttonBoolステートをFalseにする */
  /* ifなしだと無限ループするが, フォーカスがあたっているかどうかとボタンが押されたかどうかが一致するときだけ変更すれば回避できる */
  const onFocused = props.idx === dstFocusIdx;
  if (buttonBool && !onFocused) {
    setButtonBool(onFocused);
  }

  return (
    <div className="InputPointBox">
      <h3>point{props.idx}: (x, y)</h3>
      <button
        className="focusButton"
        onClick={onButtonClick}
        style={
          buttonBool ? { background: "#ff0000" } : { background: "#00ff00" }
        }
      />
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
