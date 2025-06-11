import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false  // 헤더 숨기기
    }}
  />;
}
