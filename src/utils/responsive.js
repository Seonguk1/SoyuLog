import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 기준 디바이스 크기 (ex: iPhone 11)
const BASE_WIDTH = 500;
const BASE_HEIGHT = 1000;

// 상대 너비 비율 (widthPercent(50) → 전체 너비의 50%)
export const widthPercent = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// 상대 높이 비율
export const heightPercent = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// 기준 비율에 따른 폰트 크기 조정
export const scaleFont = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// 디바이스별 조건 분기
export const isSmallDevice = SCREEN_WIDTH < 360;
export const isTablet = SCREEN_WIDTH >= 768;

// 현재 디바이스 정보 출력
export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice,
  isTablet,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};
