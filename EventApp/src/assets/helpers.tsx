import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

//Guideline sizes are based on iPhone 11 (means all project written based on this measure, now we have to scale it in compare to this measure)
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;
//hs - horizontal scale - use for only-widths (marginHorizonal,paddingHorizontal,width,left,right)
export const hs = (size: any) => (width / guidelineBaseWidth) * size;
//vs - vertical scale - use for only-heights (marginVertical,paddingVertical,height,top,bottom)
export const vs = (size: any) => (height / guidelineBaseHeight) * size;
//hs - moderate scale - use for both height-width (fontSize,padding,margin (both vertical and horizontal))
export const ms = (size: any, factor = 2) => size + (hs(size) - size) * factor;
