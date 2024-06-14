import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toKoreanTime(date: Date) {
  // 주어진 Date 객체의 시간을 한국 시간 오프셋 (UTC+9)을 적용하여 변환
  const koreanTimeOffset = 9 * 60 * 60 * 1000; // milliseconds
  const koreanTime = new Date(date.getTime() + koreanTimeOffset);

  // 한국 시간을 ISO 형식으로 포맷팅하여 반환
  return koreanTime.toISOString().split(".")[0];
}
