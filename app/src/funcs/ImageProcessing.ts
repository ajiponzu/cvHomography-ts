import cv, { Mat } from "opencv-ts";

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