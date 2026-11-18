"use client";

import { useEffect, useRef, useState } from "react";
import { chapters, sections, type Work } from "./data";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  work: Work;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function WorkSheet({ work: w, onClose, onPrev, onNext }: Props) {
  const sec = sections.find((s) => s.id === w.section)!;
  const ch = chapters.find((c) => c.no === sec.chapter)!;
  const panelRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.focus();
  }, [w.no]);

  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label={`${w.no}번 ${w.titleKo}`}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div
        className="sheet"
        ref={panelRef}
        tabIndex={-1}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (dx > 70) onPrev?.();
          if (dx < -70) onNext?.();
        }}
      >
        <div className="sheet-grip" aria-hidden />
        <div className="sheet-head">
          <span className="sheet-crumb">
            {ch.no} {ch.ko} › {sec.ko} · <b>{sec.floor}</b>
          </span>
          <button className="sheet-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <ArtImage w={w} />

        <div className="sheet-no">
          {pad(w.no)}
          {w.highlight && <span className="sheet-hl">★ 주요작</span>}
        </div>
        <h2 className="sheet-title">{w.titleKo}</h2>
        <p className="sheet-title-en">{w.title}</p>
        <p className="sheet-title-ja" lang="ja">
          {w.titleJa}
        </p>

        <p className="sheet-artist">
          {w.artistKo}
          <span>{w.artist}</span>
        </p>

        <DocentBlock key={w.no} w={w} />

        <dl className="sheet-facts">
          <div>
            <dt>제작연도</dt>
            <dd>{w.year}</dd>
          </div>
          <div>
            <dt>기법·재료</dt>
            <dd>
              {w.mediumKo}
              <small>{w.medium}</small>
            </dd>
          </div>
          <div>
            <dt>크기</dt>
            <dd>
              {w.size} cm<small>{w.size.split("×").length === 3 ? "높이 × 너비 × 깊이" : "세로 × 가로"}</small>
            </dd>
          </div>
        </dl>

        <SizeCompare size={w.size} sculpture={w.size.split("×").length === 3} />

        <div className="sheet-actions">
          <button className="nav-btn" onClick={onPrev} disabled={!onPrev} aria-label="이전 작품">
            ‹ 이전
          </button>
          <button className="nav-btn" onClick={onNext} disabled={!onNext} aria-label="다음 작품">
            다음 ›
          </button>
        </div>
      </div>
    </div>
  );
}

/** 키 170cm 사람과 작품 크기를 같은 축척으로 비교 */
function SizeCompare({ size, sculpture }: { size: string; sculpture: boolean }) {
  const [h, wd] = size.split("×").map(Number);
  const PERSON = 170;
  const plinth = sculpture ? 95 : 0;
  // 회화: 중심 높이 150cm에 건다고 가정, 조각: 95cm 좌대 위
  const bottom = sculpture ? plinth : Math.max(20, 150 - h / 2);
  const top = bottom + h;
  const sceneH = Math.max(PERSON, top) + 15;
  const gap = 30;
  const personW = 46;
  const sceneW = 20 + personW + gap + Math.max(wd, sculpture ? 40 : 0) + 20;
  const artX = 20 + personW + gap;
  const y = (v: number) => sceneH - v; // 바닥 = 0
  const plinthW = Math.max(wd + 12, 40);

  return (
    <figure className="size-compare">
      <svg viewBox={`0 0 ${sceneW} ${sceneH}`} role="img" aria-label={`키 170cm 사람과 비교한 작품 크기 ${size}cm`}>
        <line x1="0" x2={sceneW} y1={y(0)} y2={y(0)} className="sc-floor" />
        {/* person */}
        <g className="sc-person" transform={`translate(${20}, ${y(PERSON)})`}>
          <circle cx={personW / 2} cy="12" r="11" />
          <path
            d="M6 30 h34 a6 6 0 0 1 6 6 v52 h-8 v-44 h-3 v126 h-11 v-74 h-2 v74 h-11 v-126 h-3 v44 h-8 v-52 a6 6 0 0 1 6 -6z"
          />
        </g>
        {sculpture && (
          <rect x={artX + wd / 2 - plinthW / 2} y={y(plinth)} width={plinthW} height={plinth} className="sc-plinth" />
        )}
        <rect x={artX} y={y(top)} width={wd} height={h} className={sculpture ? "sc-sculpt" : "sc-art"} />
        <text x={artX + wd / 2} y={y(top) - 5} textAnchor="middle" className="sc-label">
          {wd}cm
        </text>
      </svg>
      <figcaption>키 170cm 사람과의 크기 비교 {sculpture ? "(좌대 위 조각)" : "(화면 중심 150cm 높이 기준)"}</figcaption>
    </figure>
  );
}

function ArtImage({ w }: { w: Work }) {
  const search = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${w.artist} ${w.title} Cincinnati Art Museum`)}`;
  if (w.image) {
    return (
      <figure className="art">
        <div className="art-frame">
          <img src={w.image} alt={`${w.artistKo} 〈${w.titleKo}〉`} loading="lazy" />
        </div>
      </figure>
    );
  }
  return (
    <figure className="art art-empty">
      <div className="art-frame">
        <span>{w.artistKo}</span>
        <b>〈{w.titleKo}〉</b>
        <small>{COPYRIGHTED.has(w.artist) ? "저작권 보호 기간 중인 작품이라 이미지를 싣지 않았습니다." : "공개된 이미지를 찾지 못했습니다."}</small>
        <a href={search} target="_blank" rel="noreferrer">이미지 검색 ↗</a>
      </div>
    </figure>
  );
}

const COPYRIGHTED = new Set([
  "Pablo Picasso", "Marc Chagall", "Georges Braque", "Pierre Soulages", "Alberto Giacometti", "Georges Rouault",
  "Hans (Jean) Arp", "Marie Laurencin", "Marino Marini", "Oskar Kokoschka", "Jean Metzinger", "Lotte Laserstein",
]);

function DocentBlock({ w }: { w: Work }) {
  const [speaking, setSpeaking] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);

  useEffect(() => {
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const text = [`${w.no}번. ${w.artistKo}, ${w.titleKo}.`, ...w.docent.script, "이렇게 보세요.", ...w.docent.look].join(" ");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = 1;
    const ko = synth.getVoices().find((v) => v.lang.startsWith("ko"));
    if (ko) u.voice = ko;
    u.onend = u.onerror = () => setSpeaking(false);
    synth.speak(u);
    setSpeaking(true);
  };

  return (
    <section className={`docent ${w.highlight ? "hl" : ""}`} aria-label="도슨트 해설">
      <div className="docent-head">
        <h3>도슨트</h3>
        {canSpeak && (
          <button className={`listen ${speaking ? "on" : ""}`} onClick={toggle} aria-pressed={speaking}>
            {speaking ? "■ 정지" : "▶ 듣기"}
          </button>
        )}
      </div>
      {w.docent.script.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="look">
        <h4>이렇게 보세요</h4>
        <ul>
          {w.docent.look.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
