import { useSrcPointsContext, useSrcFocusIdxContext } from "./App";
import NumberFormat from "react-number-format";
import "./css/InputPointBox.css";
import { useState } from "react";

const SrcInputBox = (props: { idx: number }) => {
  const { srcPoints, setSrcPoints } = useSrcPointsContext();
  const { srcFocusIdx, setSrcFocusIdx } = useSrcFocusIdxContext();
  const [buttonBool, setButtonBool] = useState(false);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentBool = !buttonBool;
    setButtonBool(currentBool);
    if (currentBool) {
      setSrcFocusIdx(props.idx);
    } else {
      setSrcFocusIdx(-1);
    }
  };

  /* 別のidのInputBoxコンポーネントにあるボタンが押されたときにbuttonBoolステートをFalseにする */
  /* ifなしだと無限ループするが, フォーカスがあたっているかどうかとボタンが押されたかどうかが一致するときだけ変更すれば回避できる */
  const onFocused = props.idx === srcFocusIdx;
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
          value={srcPoints[props.idx][0]}
          onValueChange={(values, _sourceInfo) => {
            const input = parseFloat(values.value);
            /* 配列を丸ごと作り直すことで，初めて再レンダリングが実行される */
            let newPoints = srcPoints.concat(); // 共有配列のクローン
            newPoints[props.idx][0] = input; // 入力数値の代入
            setSrcPoints(newPoints);
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
          }}
        />
      </div>
    </div>
  );
};

export default SrcInputBox;
