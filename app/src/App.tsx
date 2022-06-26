import "./css/App.css";

import React, { useContext, useState } from "react";

import Sidebar from './Sidebar';
import TabView from './TabView';

/* ReactContextを使いやすくするためのインターフェース群 */
interface ISrcContext {
  readonly srcPoints: number[][];
  setSrcPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};
interface IDstContext {
  readonly dstPoints: number[][];
  setDstPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};
/* end */

/* ReactContext群 */
const SrcContext = React.createContext<ISrcContext | undefined>(undefined);
const DstContext = React.createContext<IDstContext | undefined>(undefined);
/* end */

/* ReactContext解凍関数群 */
export const useSrcContext = () => {
  const context = useContext(SrcContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};
export const useDstContext = () => {
  const context = useContext(DstContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};
/* end */

const App = () => {
  /* 射影変換行列作成のための座標. ReactStateを使用して変更を監視 */
  const [srcPoints, setSrcPoints] = useState([[0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0]]);
  const [dstPoints, setDstPoints] = useState([[0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0]]);

  const srcValue = {
    srcPoints,
    setSrcPoints,
  };
  const dstValue = {
    dstPoints,
    setDstPoints,
  };
  /* end */

  return (
    <div className="App">
      {/* providerに値を渡し，タグで囲むことでContextの使用を制限することができる */}
      <SrcContext.Provider value={srcValue}>
        <DstContext.Provider value={dstValue}>
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <TabView />
        </DstContext.Provider>
      </SrcContext.Provider>
    </div>
  );
};

export default App;
