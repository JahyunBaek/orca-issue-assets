# orca-issue-assets

Screenshots attached to issues in [stablyai/orca](https://github.com/stablyai/orca).

| file | issue |
|---|---|
| `hangul-continuation-row-contamination.png` | [#15550](https://github.com/stablyai/orca/issues/15550) — a wrapped continuation row keeping the tail of an earlier line, on a ko-KR / CP949 Windows host |

## `hangul-repro.mjs`

Prints Korean sentences long enough to wrap, with Latin control lines, streamed
in 7-character chunks. Run it in a terminal sized to 84 columns:

```powershell
1..15 | ForEach-Object { node hangul-repro.mjs $_ }
```

## `agy-arm.ps1`

The real-agent arm: the same `agy` prompt run N times, printing the column count
per run so both terminals can be shown to match.

```powershell
powershell -NoProfile -File agy-arm.ps1 15
```

Needs `agy` on PATH and `GEMINI_API_KEY` set (or a signed-in session).
