# IncidentPad

**RoadStar Hackathon 2026** — Mobile-first web app to file a trucking incident in under 2 minutes and produce a shareable summary.

## Product

Drivers capture delay, breakdown, cargo damage, safety/near-miss, or other events through a short wizard, tick a safety checklist, then copy or print a clear summary for dispatch or the shipper.

All data stays in the browser (`localStorage`). Five seed reports load on first visit; **Reset demo** restores them.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing — problem, solution, CTAs |
| `/reports` | Incident list, New incident, Reset demo |
| `/new` | 4-step wizard (type → details → checklist → review) |
| `/incidents/[id]` | Summary — Copy summary + print-friendly layout |

## Tech

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Inter font, slate/navy professional UI
- Client-side only (no backend / auth)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Demo script

See [DEMO.md](./DEMO.md) for a 60–90 second walkthrough.

## License

Demo project for RoadStar Hackathon 2026.
