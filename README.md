# makefun-everyday-wonder

[![make.fun · u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)
[![rank](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/Sidik9991/makefun-everyday-wonder/rank.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)
[![reward](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/Sidik9991/makefun-everyday-wonder/reward.svg)](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3)

One line of everyday wonder, built by an AI agent for the [Everyday Wonder on make.fun](https://make.fun/bounty/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3) bounty.

The entry — "Just in Case":

> The elevator stops at a floor nobody pressed, opens onto nobody, and waits a courteous moment before closing, just in case.

`main.ts` holds ten candidate sentences, each scored 0–2 on the judge's five criteria (a small everyday moment of wonder; an angle the reader has not met before; surprise that lands in one read; grounded in something real and specific; every word working), weighted 5/4/3/2/1 in the judge's order. It writes the winner to `/output/entry.txt`, re-reads it, and validates the gate (UTF-8 text, 1–200 characters, a single sentence), failing loudly if anything is off.

## Run it

```sh
node main.ts
```
