// ASCII control for the Hangul fixture: same line lengths in cells, same chunk
// cadence, no wide characters. If the reflow contamination appears here too, it
// is not wide-character specific.
//
//   node ascii-repro.mjs [runId]

const RUN_ID = process.argv[2] ?? '1'

// Each line is ~120 cells, matching the Korean sentences (60 wide chars).
const LINES = [
  'This clip walks through what a first-time user of the coding agent needs to know, from install all the way to the real workflow order.',
  'The short version is that visual fatigue was the biggest problem, and the terminal rendering slowed down over and over in the same spot.',
  'When the cursor drifts while a syllable is still being composed, the previous glyph gets painted a second time as the row wraps onward.',
  'Placing red, blue and green badges side by side pushes the contrast so high that reviewers said it becomes hard to look at for long.'
]

const CONTROLS = [
  'roadmap/complete-overhaul-backlog-history.md (1.75) R-08) verified against the pinned baseline',
  'src/main/providers/windows-conpty-wide-char-duplication.node-pty.test.ts passed in 8.51s'
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  process.stdout.write(`\n=== ASCII RUN ${RUN_ID} START cols=${process.stdout.columns} ===\n`)
  for (let round = 0; round < 6; round++) {
    for (const line of LINES) {
      for (let i = 0; i < line.length; i += 14) {
        process.stdout.write(line.slice(i, i + 14))
        await sleep(4)
      }
      process.stdout.write('\r\n')
      await sleep(12)
    }
    process.stdout.write(`${CONTROLS[round % CONTROLS.length]}\r\n`)
    await sleep(12)
  }
  process.stdout.write(`=== ASCII RUN ${RUN_ID} END ===\n`)
}

main()
