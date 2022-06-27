import cv, { Mat } from "opencv-ts";

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
紐づけの際は必ずコールバック処理をすることになるので，結局コールバック内で呼ぶ以外の使い方はおかしい．
*/

/* canvas要素に画像を表示する */
export const showImageOnCanvas = (canvasName: string, img: HTMLImageElement) => {
    try { // 一応例外処理
        const mat = cv.imread(img);
        cv.imshow(canvasName, mat);
        mat.delete();
    } catch (err) {
        console.log('opencv is not initialized.');
    }
};

export const GetHomographyImage = (src: Mat, dst: Mat, srcPoints: Mat, dstPoints: Mat) => {
    let retImg = dst.clone();
    const transMat = cv.getPerspectiveTransform(srcPoints, dstPoints);
    cv.warpPerspective(src, retImg, transMat, dst.size());
    transMat.delete();
    return retImg;
};

export const GetDstImageAddedRect = (inputPoints: Mat, dst: Mat, srcPoints: Mat, dstPoints: Mat) => {
    let retImg = dst.clone();
    let outputPoints = inputPoints.clone();
    const transMat = cv.getPerspectiveTransform(srcPoints, dstPoints);
    cv.perspectiveTransform(srcPoints, outputPoints, transMat);
    const center = cv.minAreaRect(outputPoints).center;
    cv.circle(retImg, center, 5, new cv.Scalar(0, 0, 255));
    transMat.delete();
    return retImg;
}