import "./css/App.css";

import React, { useContext, useEffect, useState } from "react";

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
interface IHmgRectContext {
  readonly hmgRect: number[][];
  setHmgRect: React.Dispatch<React.SetStateAction<number[][]>>;
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
interface IHmgImgPathContext {
  readonly hmgImgPath: string;
  setHmgImgPath: React.Dispatch<React.SetStateAction<string>>;
}
/* end */

/* ReactContext群 */
const SrcPointsContext = React.createContext<ISrcPointsContext | undefined>(
  undefined
);
const DstPointsContext = React.createContext<IDstPointsContext | undefined>(
  undefined
);
const HmgRectContext = React.createContext<IHmgRectContext | undefined>(
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
const HmgImgPathContext = React.createContext<IHmgImgPathContext | undefined>(
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
export const useHmgRectContext = () => {
  const context = useContext(HmgRectContext);
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
export const useHmgImgPathContext = () => {
  const context = useContext(HmgImgPathContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
/* end */

/* ウィンドウサイズの変化に頑健なウィンドウ情報の取得フック */
// 「https://ryotarch.com/javascript/react/get-window-size-with-react-hooks/」より引用
export const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerWidth: wWidth, innerHeight: wHeight } = window;
    return {
      wWidth,
      wHeight,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return windowDimensions;
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
  const [hmgRect, setHmgRect] = useState([
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
  const hmgRectValue = {
    hmgRect,
    setHmgRect,
  };
  /* end */

  /* 射影変換対象の画像群. ReactStateを使用して変更を監視 */
  const [srcImgPath, setSrcImgPath] = useState("");
  const [dstImgPath, setDstImgPath] = useState("");
  const [hmgRectImgPath, setHmgRectImgPath] = useState("");
  const [hmgImgPath, setHmgImgPath] = useState("");

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
  const hmgImgPathValue = {
    hmgImgPath,
    setHmgImgPath,
  };
  /* end */

  return (
    <div className="App">
      {/* providerに値を渡し，タグで囲むことでContextの使用を制限することができる */}
      <HmgRectContext.Provider value={hmgRectValue}>
        <HmgImgPathContext.Provider value={hmgImgPathValue}>
          <HmgRectImgPathContext.Provider value={hmgRectImgPathValue}>
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
          </HmgRectImgPathContext.Provider>
        </HmgImgPathContext.Provider>
      </HmgRectContext.Provider>
    </div>
  );
};

export default App;
