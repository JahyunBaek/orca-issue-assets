// Streams Korean text that wraps, with Latin controls, in the cadence an agent
// prints at. Identical bytes in every arm, so only the terminal differs.
//
// Usage: node hangul-repro.mjs [runId]

const RUN_ID = process.argv[2] ?? '1'

// Why markdown-ish: the report's screenshots are agent answers, and the
// corruption lands on the wrapped continuation rows of long Korean sentences.
const KOREAN_LINES = [
  '이 영상은 클로드 코드를 처음 쓰는 사람이 알아야 할 내용을 정리한 것으로, 설치부터 실제 작업 흐름까지 순서대로 다룹니다.',
  '결론부터 말씀드리면 시각적 피로도가 가장 큰 문제였고, 터미널 렌더링이 느려지는 구간이 반복해서 관찰되었습니다.',
  '한글 자모가 조합되는 과정에서 커서 위치가 어긋나면, 다음 줄로 넘어갈 때 앞 글자가 다시 그려지는 현상이 생깁니다.',
  '빨강 파랑 초록 원색 배지를 나란히 배치하면 대비가 지나치게 강해져서 오래 보기 어렵다는 지적이 있었습니다.'
]

const LATIN_LINES = [
  'roadmap/complete-overhaul-backlog-history.md (1.75) R-08) verified against the pinned baseline',
  'src/main/providers/windows-conpty-wide-char-duplication.node-pty.test.ts passed in 8.51s'
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  // Recorded so the comparison arm can be matched to the same wrap geometry.
  process.stdout.write(`\n=== RUN ${RUN_ID} START cols=${process.stdout.columns} ===\n`)
  for (let round = 0; round < 6; round++) {
    for (const line of KOREAN_LINES) {
      // Why chunked: an agent emits partial lines, and the report tracks
      // streaming cadence rather than one atomic write.
      for (let i = 0; i < line.length; i += 7) {
        process.stdout.write(line.slice(i, i + 7))
        await sleep(4)
      }
      process.stdout.write('\r\n')
      await sleep(12)
    }
    process.stdout.write(`${LATIN_LINES[round % LATIN_LINES.length]}\r\n`)
    await sleep(12)
  }
  process.stdout.write(`=== RUN ${RUN_ID} END ===\n`)
}

main()
