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
  srcImg: HTMLImageElement,
  dstImg: HTMLImageElement,
  srcPoints: number[][],
  dstPoints: number[][]
) => {
  try {
    const srcPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat());
    const dstPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints.flat());

    const srcMat = cv.imread(srcImg);
    const dstMat = cv.imread(dstImg);

    const srcRect = cv.boundingRect(srcPointsMat);
    const dstRect = cv.boundingRect(dstPointsMat);

    const srcCrop = srcMat.roi(srcRect);
    const dstCrop = dstMat.roi(dstRect);

    // 射影変換後の座標の原点をそろえる
    const srcPtsCrop = srcPointsMat.clone();
    const dstPtsCrop = dstPointsMat.clone();
    for (let i = 0; i < 4; i++) {
      srcPtsCrop.data32F[2 * i] -= srcRect.x;
      srcPtsCrop.data32F[2 * i + 1] -= srcRect.y;

      dstPtsCrop.data32F[2 * i] -= dstRect.x;
      dstPtsCrop.data32F[2 * i + 1] -= dstRect.y;
    }

    // 射影変換後の画像作成
    const newCrop = srcCrop.clone();
    const transMat = cv.getPerspectiveTransform(srcPtsCrop, dstPtsCrop);
    cv.warpPerspective(
      srcCrop,
      newCrop,
      transMat,
      new cv.Size(dstRect.width, dstRect.height)
    );

    // 貼り合わせ元の歪み画像のマスク
    const mask = new cv.Mat.zeros(
      new cv.Size(dstRect.width, dstRect.height),
      cv.CV_8UC4 // デフォルトの画像データはRGBA
    );

    // 点から領域を作り, 内部を塗りつぶす
    const dstPtsCropS = new cv.Mat();
    dstPtsCrop.convertTo(dstPtsCropS, cv.CV_32SC2);
    cv.fillConvexPoly(
      mask,
      // @ts-ignore
      dstPtsCropS, // なぜかopencv.d.tsファイルではMatVector型になっているが，Mat型である. ts-ignoreで踏み倒す
      new cv.Scalar(255, 255, 255, 255), // RGBAにおける白
      cv.LINE_AA
    );

    /* 反転マスク作成，のりづけ部分 */
    const revMask = new cv.Mat();
    cv.bitwise_not(mask, revMask);
    /* end */

    /* マスク・論理演算による貼り合わせ */
    const newCropC = new cv.Mat();
    const newCropCC = new cv.Mat();
    const newCropCCC = new cv.Mat();
    cv.bitwise_and(newCrop, mask, newCropC);
    cv.bitwise_and(dstCrop, revMask, newCropCC);
    cv.add(newCropC, newCropCC, newCropCCC);
    newCropCCC.copyTo(dstCrop);
    /* end */

    cv.imshow(canvasName, dstMat);

    /* cv.Matはdelete()しなければならない．めんどくさっ */
    srcPointsMat.delete();
    dstPointsMat.delete();
    srcMat.delete();
    dstMat.delete();
    srcCrop.delete();
    dstCrop.delete();
    srcPtsCrop.delete();
    dstPtsCrop.delete();
    newCrop.delete();
    transMat.delete();
    mask.delete();
    dstPtsCropS.delete();
    revMask.delete();
    newCropC.delete();
    newCropCC.delete();
    newCropCCC.delete();
    /* end */
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
