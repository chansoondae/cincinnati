import { docentA } from "./docent-a";
import { docentB } from "./docent-b";
import { docentC } from "./docent-c";

/** 작품별 도슨트 해설: script = 문단 목록, look = 감상 포인트 */
export type Docent = { script: string[]; look: string[] };

// 주요작 (★)
export const HIGHLIGHTS = new Set([4, 10, 12, 23, 29, 40, 44, 46, 76]);

export const docent: Record<number, Docent> = { ...docentA, ...docentB, ...docentC };
