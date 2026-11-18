"use client";

import { useState } from "react";
import { sections } from "./data";

const ROUTE = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

// 원본 안내도 이미지 위 라벨 위치 (% 좌표)
const POS: Record<string, { x: number; y: number }> = {
  // 2F (744×650)
  rebels: { x: 54, y: 20 },
  realism: { x: 32, y: 32.5 },
  impressionism: { x: 69, y: 35 },
  artist: { x: 83, y: 58 },
  academy: { x: 60, y: 69 },
  landscape: { x: 79, y: 84 },
  // 1F (970×688)
  figuration: { x: 14, y: 17 },
  expression: { x: 44.5, y: 12 },
  abstraction: { x: 30.5, y: 38.5 },
  post: { x: 67.5, y: 38.5 },
};

const chapterKo: Record<number, string> = { 1: "서장", 2: "전통", 3: "혁명", 4: "모더니즘" };

export default function FloorMap({ onJump }: { onJump: (sectionId: string) => void }) {
  const [floor, setFloor] = useState<"2F" | "1F">("2F");
  const list = sections.filter((s) => s.floor === floor);

  return (
    <section id="map" className="map">
      <h2 className="block-title">
        층별 안내도 <em>Floor Map</em>
      </h2>
      <p className="map-lead">
        관람은 <b>2층 서장</b>에서 시작해 계단으로 내려가 <b>1층 모더니즘</b>에서 끝납니다. 방 이름을 누르면 해당 작품 목록으로 이동해요.
      </p>
      <div className="floor-tabs" role="tablist">
        {(["2F", "1F"] as const).map((f) => (
          <button key={f} role="tab" aria-selected={floor === f} className={floor === f ? "on" : ""} onClick={() => setFloor(f)}>
            {f} <small>{f === "2F" ? "① – ⑥" : "⑦ – ⑩"}</small>
          </button>
        ))}
      </div>

      <div className={`plan plan-${floor}`}>
        <div className="plan-inner">
        <img src={floor === "2F" ? "/img/2nd_floor.jpg" : "/img/1st_floor.jpg"} alt={`${floor} 전시실 평면도`} />
        {list.map((s) => (
          <button
            key={s.id}
            className={`plan-label ch${s.chapter}`}
            data-id={s.id}
            style={{ left: `${POS[s.id].x}%`, top: `${POS[s.id].y}%` }}
            onClick={() => onJump(s.id)}
            aria-label={`${ROUTE[s.route - 1]} ${chapterKo[s.chapter]} ${s.ko} 작품 목록으로 이동`}
          >
            <span className="pl-route">{s.route}</span>
          </button>
        ))}
        </div>
      </div>

      <ol className="route-list">
        {sections.map((s) => (
          <li key={s.id} className={`ch${s.chapter}`}>
            <button onClick={() => onJump(s.id)}>
              <span className="rl-no">{ROUTE[s.route - 1]}</span>
              <span className="rl-name">
                {chapterKo[s.chapter]} · {s.ko}
              </span>
              <span className={`floor f${s.floor}`}>{s.floor}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
