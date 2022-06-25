import cv, {Mat} from "opencv-ts";

const runHomography = (src: Mat, dst: Mat, srcPoints: Mat, dstPoints: Mat) => {
    let retImg = dst.clone();
    const transMat = cv.getPerspectiveTransform(srcPoints, dstPoints);
    cv.warpPerspective(src, retImg, transMat, dst.size());
    transMat.delete();
    return retImg;
};

export default runHomography;