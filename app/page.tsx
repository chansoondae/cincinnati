import fs from "node:fs";
import path from "node:path";
import Catalogue from "./Catalogue";

// public/works/ 안에서 "숫자 + 제목/작가.확장자" 형식의 파일을 찾아 작품 번호와 연결
function loadImages(): Record<number, string> {
  const dir = path.join(process.cwd(), "public", "works");
  const map: Record<number, string> = {};
  if (!fs.existsSync(dir)) return map;
  for (const name of fs.readdirSync(dir).sort()) {
    const m = name.match(/^(\d{1,2})(?!\d)/);
    if (!m || !/\.(jpe?g|png|webp|avif)$/i.test(name)) continue;
    const no = Number(m[1]);
    if (no >= 1 && no <= 84 && !map[no]) map[no] = `/works/${encodeURIComponent(name)}`;
  }
  return map;
}

export default function Page() {
  return <Catalogue images={loadImages()} />;
}
