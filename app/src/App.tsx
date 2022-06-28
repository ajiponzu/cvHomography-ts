import "./css/App.css";

import React, { useContext, useState } from "react";

import Sidebar from "./Sidebar";
import TabView from "./TabView";

/* ReactContextを使いやすくするためのインターフェース群 */
interface ISrcPointsContext {
  readonly srcPoints: number[][];
  setSrcPoints: React.Dispatch<React.SetStateAction<number[][]>>;
}
interface IDstPointsContext {
  readonly dstPoints: number[][];
  setDstPoints: React.Dispatch<React.SetStateAction<number[][]>>;
}

interface ISrcImgPathContext {
  readonly srcImgPath: string;
  setSrcImgPath: React.Dispatch<React.SetStateAction<string>>;
}
interface IDstImgPathContext {
  readonly dstImgPath: string;
  setDstImgPath: React.Dispatch<React.SetStateAction<string>>;
}
interface IHmgRectImgPathContext {
  readonly hmgRectImgPath: string;
  setHmgRectImgPath: React.Dispatch<React.SetStateAction<string>>;
}

interface ISrcFocusIdxContext {
  readonly srcFocusIdx: number;
  setSrcFocusIdx: React.Dispatch<React.SetStateAction<number>>;
}
interface IDstFocusIdxContext {
  readonly dstFocusIdx: number;
  setDstFocusIdx: React.Dispatch<React.SetStateAction<number>>;
}
/* end */

/* ReactContext群 */
const SrcPointsContext = React.createContext<ISrcPointsContext | undefined>(
  undefined
);
const DstPointsContext = React.createContext<IDstPointsContext | undefined>(
  undefined
);

const SrcImgPathContext = React.createContext<ISrcImgPathContext | undefined>(
  undefined
);
const DstImgPathContext = React.createContext<IDstImgPathContext | undefined>(
  undefined
);
const HmgRectImgPathContext = React.createContext<
  IHmgRectImgPathContext | undefined
>(undefined);

const SrcFocusIdxContext = React.createContext<ISrcFocusIdxContext | undefined>(
  undefined
);
const DstFocusIdxContext = React.createContext<IDstFocusIdxContext | undefined>(
  undefined
);
/* end */

/* ReactContext解凍関数群 */
export const useSrcPointsContext = () => {
  const context = useContext(SrcPointsContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
export const useDstPointsContext = () => {
  const context = useContext(DstPointsContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export const useSrcImgPathContext = () => {
  const context = useContext(SrcImgPathContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
export const useDstImgPathContext = () => {
  const context = useContext(DstImgPathContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
export const useHmgRectImgPathContext = () => {
  const context = useContext(HmgRectImgPathContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export const useSrcFocusIdxContext = () => {
  const context = useContext(SrcFocusIdxContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
export const useDstFocusIdxContext = () => {
  const context = useContext(DstFocusIdxContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
/* end */

const App = () => {
  /* 射影変換行列作成のための座標. ReactStateを使用して変更を監視 */
  const [srcPoints, setSrcPoints] = useState([
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
  ]);
  const [dstPoints, setDstPoints] = useState([
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [0.0, 0.0],
  ]);

  const srcPointsValue = {
    srcPoints,
    setSrcPoints,
  };
  const dstPointsValue = {
    dstPoints,
    setDstPoints,
  };
  /* end */

  /* 射影変換対象の画像群. ReactStateを使用して変更を監視 */
  const [srcImgPath, setSrcImgPath] = useState("");
  const [dstImgPath, setDstImgPath] = useState("");
  const [hmgRectImgPath, setHmgRectImgPath] = useState("");

  const srcImgPathValue = {
    srcImgPath,
    setSrcImgPath,
  };
  const dstImgPathValue = {
    dstImgPath,
    setDstImgPath,
  };
  const hmgRectImgPathValue = {
    hmgRectImgPath,
    setHmgRectImgPath,
  };
  /* end */

  /* クリックイベントで代入できる座標の添え字をReactStateを使用して監視 */
  const [srcFocusIdx, setSrcFocusIdx] = useState(-1);
  const [dstFocusIdx, setDstFocusIdx] = useState(-1);

  const srcFocusIdxValue = {
    srcFocusIdx,
    setSrcFocusIdx,
  };
  const dstFocusIdxValue = {
    dstFocusIdx,
    setDstFocusIdx,
  };
  /* end */

  return (
    <div className="App">
      {/* providerに値を渡し，タグで囲むことでContextの使用を制限することができる */}
      <HmgRectImgPathContext.Provider value={hmgRectImgPathValue}>
        <SrcFocusIdxContext.Provider value={srcFocusIdxValue}>
          <DstFocusIdxContext.Provider value={dstFocusIdxValue}>
            <SrcImgPathContext.Provider value={srcImgPathValue}>
              <DstImgPathContext.Provider value={dstImgPathValue}>
                <SrcPointsContext.Provider value={srcPointsValue}>
                  <DstPointsContext.Provider value={dstPointsValue}>
                    <Sidebar
                      pageWrapId={"page-wrap"}
                      outerContainerId={"outer-container"}
                    />
                    <TabView />
                  </DstPointsContext.Provider>
                </SrcPointsContext.Provider>
              </DstImgPathContext.Provider>
            </SrcImgPathContext.Provider>
          </DstFocusIdxContext.Provider>
        </SrcFocusIdxContext.Provider>
      </HmgRectImgPathContext.Provider>
    </div>
  );
};

export default App;
