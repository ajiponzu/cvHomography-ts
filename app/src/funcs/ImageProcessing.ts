import cv from "opencv-ts";

/* 
opencvの初期化タイミングによって，関数が見つからないなどの実行時エラーが発生するかもしれない 
そこで, 一つのソースにopencvの関数群を作成し，外部から呼び出す形にする．
そして，そういったソースでも実行時エラーが発生するかもしれないので，
関数の中身に例外処理を一応施しておく.
引数はopencvをimportしていない外部から呼び出すため, 
opencvの型を使用しないようにする．
また, 例外処理を施しているとはいえ，イベントのコールバックあるいは処理の一環として呼ぶ場合以外での使用は禁止する

->そもそも画像を扱うためにはimage要素やcanvas要素が必要になるので，そこに紐づける直前に画像処理をする，
といった形が望ましい. 
紐づけの際は必ずコールバック処理をすることになるので，結局コールバック内で呼ぶ以外の使い方はあまりない．
このソース内ではしょうがないかもしれない．
*/

const calcAdaptiveRatio = (
  wid: number,
  high: number,
  wWid: number,
  wHigh: number
) => {
  const widFlag = wid < wWid;
  const highFlag = high < wHigh;
  let ratio = 1.0;

  if (widFlag && highFlag) {
    ratio = 1.0;
  } else if (!widFlag && !highFlag) {
    ratio = Math.min(wWid / wid, wHigh / high);
  } else if (!widFlag) {
    ratio = wWid / wid;
  } else if (!highFlag) {
    ratio = wHigh / high;
  }

  return ratio;
};

/* canvas要素に画像を表示する */
export const showImageOnCanvas = (
  canvasName: string,
  img: HTMLImageElement,
  wWid: number,
  wHigh: number
) => {
  let ratio = 1.0;
  try {
    // 一応例外処理
    const mat = cv.imread(img);
    const dstMat = new cv.Mat();
    ratio = calcAdaptiveRatio(mat.cols, mat.rows, wWid, wHigh);
    cv.resize(mat, dstMat, new cv.Size(0.0, 0.0), ratio, ratio);
    cv.imshow(canvasName, dstMat);
    mat.delete();
    dstMat.delete();
  } catch (err) {
    console.log("opencv's error.");
  }
  return ratio;
};

/* 射影変換後の貼り合わせ画像を表示する */
/* キャンバスはもう生成されていると考え，canvasNameによる表示・読み込みを用いる */
export const showHomographyImage = (
  canvasName: string,
  srcCanvasName: string,
  dstCanvasName: string,
  srcPoints: number[][],
  dstPoints: number[][]
) => {
  try {
    const srcPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat());
    const dstPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints.flat());

    const srcMat = cv.imread(srcCanvasName);
    const dstMat = cv.imread(dstCanvasName);

    const transMat = cv.getPerspectiveTransform(srcPointsMat, dstPointsMat);
    cv.warpPerspective(srcMat, dstMat, transMat, dstMat.size());
    transMat.delete();
  } catch (err) {
    console.log("opencv's error.");
  }
};

/* 射影変換後の対応座標点の表示 */
export const showDstImageAddedRect = (
  canvasName: string,
  dstImg: HTMLImageElement,
  inputPoints: number[][],
  srcPoints: number[][],
  dstPoints: number[][]
) => {
  const outputPoints: number[][] = [];
  try {
    const dstMat = cv.imread(dstImg);

    const inputPointsMat = cv.matFromArray(
      4,
      1,
      cv.CV_32FC2,
      inputPoints.flat()
    );
    const outputPointsMat = inputPointsMat.clone();
    const srcPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat()); // 二次元配列を一次元配列に直す
    const dstPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints.flat());
    /* [x, y, x, y, ....]のようになるため, 4, 1, CV_32FC2より
      [
        (x, y), 
        (x, y),
        .........
      ]
      のようなMatが出来上がる
      */

    const transMat = cv.getPerspectiveTransform(srcPointsMat, dstPointsMat);
    cv.perspectiveTransform(inputPointsMat, outputPointsMat, transMat);
    cv.imshow(canvasName, dstMat);

    const outputPointsMat32F = outputPointsMat.data32F;
    for (let i = 0; i < 4; i++) {
      outputPoints.push([
        outputPointsMat32F[2 * i],
        outputPointsMat32F[2 * i + 1],
      ]);
    }

    transMat.delete();
    dstMat.delete();
    srcPointsMat.delete();
    dstPointsMat.delete();
    inputPointsMat.delete();
    outputPointsMat.delete();
  } catch (err) {
    console.log("opencv's error.");
  }
  return outputPoints;
};
