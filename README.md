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

## agy Korean output corruption (stablyai/orca#15550)

| file | what |
|---|---|
| `agy-orca-run15-corrupted.png` | Orca terminal, 84 columns — runs 13/14 clean, run 15 corrupted |
| `agy-vscode-run4-corrupted.txt` | the same corruption from VS Code, copied out of the terminal and saved |

The `.txt` is UTF-8 Korean that `agy` emitted as CP949. Re-encoding it to CP949 and
reading those bytes as UTF-8 restores the original sentence.
