// The arm the plain fixture never exercised: rewriting a *wrapped* Hangul line
// in place, the way a streaming agent redraws a line as it grows.
//
// Orca's own source describes this shape for ASCII — "Claude Code echoes prompt
// keystrokes by redrawing the input line in place (CR + CHA/erase + reprint)
// ... xterm's buffer ends up correct, but its DOM renderer can paint these rapid
// rewrites one frame late ... that only a window resize clears." A wide glyph
// spans two cells, so the same late paint has more room to go wrong.
//
//   node hangul-rewrite.mjs [runId]

const RUN_ID = process.argv[2] ?? '1'
const COLS = process.stdout.columns ?? 80

const SENTENCE =
  '이 영상은 클로드 코드를 처음 쓰는 사람이 알아야 할 내용을 정리한 것으로, 설치부터 실제 작업 흐름까지 순서대로 다룹니다. 결론부터 말씀드리면 시각적 피로도가 가장 큰 문제였습니다.'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Rows a string of wide characters occupies at this width. */
function rowsFor(text) {
  let cells = 0
  for (const ch of text) {
    const c = ch.codePointAt(0)
    const wide =
      (c >= 0x1100 && c <= 0x115f) ||
      (c >= 0x2e80 && c <= 0xa4cf) ||
      (c >= 0xac00 && c <= 0xd7a3) ||
      (c >= 0xff00 && c <= 0xff60)
    cells += wide ? 2 : 1
  }
  return Math.max(1, Math.ceil(cells / COLS))
}

/** Erase the wrapped line just written, leaving the cursor where it started. */
function eraseWrapped(rows) {
  let out = '\r'
  for (let i = 1; i < rows; i++) {
    out += '\x1b[A'
  }
  out += '\x1b[1G'
  for (let i = 0; i < rows; i++) {
    out += '\x1b[2K'
    if (i < rows - 1) out += '\x1b[B'
  }
  for (let i = 1; i < rows; i++) {
    out += '\x1b[A'
  }
  return out + '\x1b[1G'
}

async function main() {
  process.stdout.write(`\n=== REWRITE RUN ${RUN_ID} cols=${COLS} ===\n`)

  for (let round = 0; round < 5; round++) {
    let shown = ''
    // Grow the sentence a few characters at a time, redrawing the whole wrapped
    // line each step instead of appending — the streaming-agent shape.
    for (let end = 6; end <= SENTENCE.length; end += 6) {
      const next = SENTENCE.slice(0, end)
      if (shown) {
        process.stdout.write(eraseWrapped(rowsFor(shown)))
      }
      process.stdout.write(next)
      shown = next
      await sleep(6)
    }
    process.stdout.write('\r\n')
    // A Latin control line, so contamination can be attributed.
    process.stdout.write(
      'roadmap/complete-overhaul-backlog-history.md (1.75) R-08) verified against the pinned baseline\r\n'
    )
    await sleep(30)
  }

  process.stdout.write(`=== REWRITE RUN ${RUN_ID} END ===\n`)
}

main()
