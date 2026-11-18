"use client";

import { useMemo, useState } from "react";
import { chapters, exhibition, sections, works as baseWorks, type Work } from "./data";
import FloorMapSheet from "./FloorMap";
import WorkSheet from "./WorkSheet";

type Filter = "all" | "highlight";

const pad = (n: number) => String(n).padStart(2, "0");
const ROUTE = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[\s·・=＝\-–]/g, "");
}

export default function Catalogue({ images }: { images: Record<number, string> }) {
  const works = useMemo(() => baseWorks.map((w) => ({ ...w, image: images[w.no] })), [images]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openNo, setOpenNo] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [currentSec, setCurrentSec] = useState<string | null>(null);

  // 안내도를 여는 순간, 목록에서 지금 보고 있는 섹션을 계산해 강조
  const openMap = () => {
    let cur: string | null = null;
    for (const el of document.querySelectorAll<HTMLElement>(".sub[id^='sec-']")) {
      if (el.getBoundingClientRect().top <= 180) cur = el.id.slice(4);
      else break;
    }
    const list = document.getElementById("list");
    if (list && list.getBoundingClientRect().bottom < 180) cur = null; // 목록 아래(관람 안내)까지 내려온 경우
    setCurrentSec(cur);
    setMapOpen(true);
  };

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return works.filter((w) => {
      if (filter === "highlight" && !w.highlight) return false;
      if (!q) return true;
      if (/^\d+$/.test(q)) return w.no === Number(q) || pad(w.no) === q;
      return [w.artistKo, w.artist, w.titleKo, w.title, w.titleJa].some((f) => normalize(f).includes(q));
    });
  }, [query, filter, works]);

  const visibleSet = useMemo(() => new Set(visible.map((w) => w.no)), [visible]);
  const openIndex = openNo == null ? -1 : visible.findIndex((w) => w.no === openNo);
  const openWork = openNo == null ? null : works.find((w) => w.no === openNo) ?? null;

  const go = (id: string, smooth = true) =>
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });

  return (
    <>
      {/* ───────── HERO ───────── */}
      <header className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url(/img/poster.jpg)" }} aria-hidden />
        <div className="hero-vertical" aria-hidden>CINCINNATI</div>
        <div className="hero-inner">
          <figure className="hero-poster">
            <img src="/img/poster.jpg" alt="신시내티 미술관전 포스터 — 빈센트 반 고흐 〈포플러 숲 속의 두 사람〉" />
            <figcaption>포스터 작품 · 빈센트 반 고흐 〈포플러 숲 속의 두 사람〉 1890</figcaption>
          </figure>
          <div className="hero-text">
            <p className="hero-kicker">{exhibition.titleEn}</p>
            <h1>
              <span className="t1">신시내티</span>
              <span className="t2">미술관전</span>
            </h1>
            <p className="hero-sub">{exhibition.subtitleKo}</p>
            <p className="hero-ja" lang="ja">
              {exhibition.titleJa} — {exhibition.subtitleJa}
            </p>
            <div className="hero-date">
              <span className="yr">2026</span>
              <b>10.10</b>
              <small>토</small>
              <span className="dash">–</span>
              <span className="yr">2027</span>
              <b>1.10</b>
              <small>일</small>
            </div>
            <p className="hero-venue">
              {exhibition.venueKo} <span lang="ja">{exhibition.venueJa}</span>
            </p>
            <p className="hero-tag">고흐 최만년의 걸작, 일본에 오다 · 84점 중 81점 일본 첫 공개</p>
            <div className="hero-cta">
              <button className="btn-lime" onClick={() => go("list")}>작품 목록 보기</button>
              <button className="btn-ghost" onClick={openMap}>층별 안내도</button>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── STICKY TOOLBAR ───────── */}
      <nav className="toolbar" aria-label="작품 목록 도구">
        <div className="toolbar-row">
          <label className="search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              inputMode="search"
              placeholder="작가·작품명·번호 검색 (예: 고흐, 46)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="작품 검색"
            />
          </label>
        </div>
        <div className="toolbar-row chips">
          {chapters.map((c) => (
            <button key={c.no} className="chip chip-chapter" onClick={() => go(`ch-${c.no}`)}>
              <b>{c.no}</b> {c.ko}
            </button>
          ))}
          <span className="chip-sep" aria-hidden />
          {(
            [
              ["all", "전체"],
              ["highlight", "★ 주요작"],
            ] as [Filter, string][]
          ).map(([f, label]) => (
            <button
              key={f}
              className={`chip ${filter === f ? "on" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main id="list">
        <p className="list-note">
          작품 번호는 전시 순서와 일치하지 않지만, 도록 및 전시장 내 번호와 일치합니다. 작품을 누르면 도슨트 해설과 상세 정보, 실제 크기
          비교를 볼 수 있어요.
        </p>

        {visible.length === 0 && <p className="empty">조건에 맞는 작품이 없습니다.</p>}

        {chapters.map((c) => {
          const secs = sections.filter((s) => s.chapter === c.no);
          const count = works.filter((w) => visibleSet.has(w.no) && secs.some((s) => s.id === w.section)).length;
          if (count === 0) return null;
          return (
            <section key={c.no} id={`ch-${c.no}`} className="chapter">
              <div className="chapter-band">
                <span className="chapter-no">{c.no}</span>
                <h2>
                  {c.ko} <em>{c.en}</em>
                </h2>
                <span className="chapter-ja" lang="ja">
                  {c.ja}
                </span>
              </div>
              <p className="chapter-intro">{c.intro}</p>

              {secs.map((s) => {
                const list = works.filter((w) => w.section === s.id && visibleSet.has(w.no));
                if (list.length === 0) return null;
                return (
                  <div key={s.id} id={`sec-${s.id}`} className="sub">
                    <div className="sub-band">
                      <h3>
                        {s.ko} <em>{s.en}</em>
                      </h3>
                      <span className="sub-meta">
                        <span className={`floor f${s.floor}`}>{s.floor}</span>
                        <span className="route">{ROUTE[s.route - 1]}</span>
                      </span>
                    </div>
                    <ol className="rows">
                      {list.map((w) => (
                        <WorkRow key={w.no} w={w} onOpen={() => setOpenNo(w.no)} />
                      ))}
                    </ol>
                  </div>
                );
              })}
            </section>
          );
        })}
      </main>

      {/* ───────── INFO ───────── */}
      <section id="info" className="info">
        <h2 className="block-title">
          관람 안내 <em>Information</em>
        </h2>
        <dl className="info-grid">
          <div>
            <dt>회기</dt>
            <dd>2026년 10월 10일(토) – 2027년 1월 10일(일)</dd>
          </div>
          <div>
            <dt>장소</dt>
            <dd>
              우에노노모리 미술관 <span lang="ja">上野の森美術館</span>
              <br />
              <small>도쿄도 다이토구 우에노 공원 내 · JR 우에노역 공원 출구 도보 약 3분</small>
            </dd>
          </div>
          <div>
            <dt>개관 시간</dt>
            <dd>
              10:00 – 17:00 <small>(입장은 폐관 30분 전까지)</small>
            </dd>
          </div>
          <div>
            <dt>관람료</dt>
            <dd>
              <table className="fee">
                <tbody>
                  <tr>
                    <th>일반</th>
                    <td>당일 2,400엔 · 예매 2,200엔</td>
                  </tr>
                  <tr>
                    <th>고교·전문·대학생</th>
                    <td>당일 1,500엔</td>
                  </tr>
                  <tr>
                    <th>초·중학생</th>
                    <td>당일 800엔</td>
                  </tr>
                </tbody>
              </table>
              <small>요금·휴관일 등 최신 정보는 공식 사이트를 확인하세요.</small>
            </dd>
          </div>
          <div>
            <dt>오디오 가이드</dt>
            <dd>배우 세토 고지(瀬戸康史) 내레이션</dd>
          </div>
          <div>
            <dt>순회</dt>
            <dd>도야마현 미술관 (2027.1.23 – 4.11) → 나고야 → 오사카시립미술관</dd>
          </div>
        </dl>

        <div className="rules">
          <h3>전시장 유의사항</h3>
          <ul>
            <li>일부 작품은 사진 촬영이 가능합니다. 단, 동영상 촬영은 삼가 주세요. (회기 중 예고 없이 촬영 불가로 바뀔 수 있습니다.)</li>
            <li>촬영 시 플래시·삼각대·셀카봉 사용은 삼가 주시고, 감상 중인 관람객을 우선해 주세요.</li>
            <li>작품 보호를 위해 전시실의 온도·습도·조도를 조절하고 있습니다.</li>
          </ul>
        </div>

        <p className="credits">
          주최: 후지TV, 도쿄신문, 우에노노모리 미술관 · 후원: 주일 미국대사관, BS후지 · 감수: 센조쿠 노부유키(미술평론가, 세이조대학 명예교수)
        </p>
        <a className="site-link" href={exhibition.site} target="_blank" rel="noreferrer">
          공식 사이트 cincinnati-art2026.jp ↗
        </a>
      </section>

      <footer className="footer">
        <p>
          이 페이지는 전시장 배포 작품 목록을 바탕으로 만든 비공식 한국어 번역본입니다. 작품 제목의 한국어 표기는 번역자 임의 번역이며, 정식
          명칭은 일본어·영어 원제를 참고하세요.
        </p>
        <p className="footer-logo">cincinnati ✻ art museum</p>
      </footer>

      {!openWork && !mapOpen && (
        <button className="map-fab" onClick={openMap} aria-label="층별 안내도 열기">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z M9 4v13.5 M15 6.5V20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span>안내도</span>
        </button>
      )}

      {mapOpen && (
        <FloorMapSheet
          current={currentSec}
          onClose={() => setMapOpen(false)}
          onJump={(id) => {
            setMapOpen(false);
            if (!document.getElementById(`sec-${id}`)) {
              setQuery("");
              setFilter("all");
            }
            // 시트가 닫히고 스크롤 잠금이 풀린 뒤 이동 (멀리 이동하므로 즉시 스크롤)
            setTimeout(() => go(`sec-${id}`, false), 50);
          }}
        />
      )}

      {openWork && (
        <WorkSheet
          work={openWork}
          onClose={() => setOpenNo(null)}
          onPrev={openIndex > 0 ? () => setOpenNo(visible[openIndex - 1].no) : undefined}
          onNext={openIndex >= 0 && openIndex < visible.length - 1 ? () => setOpenNo(visible[openIndex + 1].no) : undefined}
        />
      )}
    </>
  );
}

function WorkRow({ w, onOpen }: { w: Work; onOpen: () => void }) {
  return (
    <li className={`row ${w.highlight ? "is-hl" : ""}`}>
      <button className="row-main" onClick={onOpen}>
        <span className="row-no">{pad(w.no)}</span>
        <span className={`row-thumb ${w.image ? "" : "none"}`} aria-hidden>
          {w.image && <img src={w.image} alt="" loading="lazy" />}
        </span>
        <span className="row-body">
          <span className="row-title">
            {w.highlight && <span className="star" aria-label="주요작">★</span>}
            {w.titleKo}
          </span>
          <span className="row-artist">
            {w.artistKo} <span className="en">{w.artist}</span>
          </span>
          <span className="row-meta">
            {w.year} · {w.mediumKo} · {w.size}
          </span>
        </span>
      </button>
    </li>
  );
}
