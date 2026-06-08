# CourtFlow - NBA Tracker

**Author:** Zander Santos
**Start Date:** May 27th, 2026

---

## Table of contents

- Overview
- Demo
- Tech stack used
- Features
- Database Design
- Getting started
- Project structure
- Roadmap

---

## Overview
CourtFlow is a real-time NBA dashboard that currently tracks the 2025-26 NBA Finals and Playoffs. The app displays live game scores, quarter-by-quarter breakdowns, and full playoff results for the current postseason.

### Current Phase: Finals & Playoffs Tracker
CourtFlow currently displays the ongoing NBA Finals with a live score that refreshes on demand, alongside a full playoff bracket results page showing all postseason games.

### Next Phase: Full Season Tracker
After the Finals, CourtFlow will transition into a full regular season and playoff tracker. The homepage will display all games scheduled for the current day or the next day, and the playoffs page will expand to show all games for the full season. This will be built out for the 2025-26 season first, then maintained and updated for the 2026-27 season with up-to-date live data.

---

## Demo

- Live Site: TBD
- Screenshot: TBD

---

## Tech Stack Used

Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Custom Global CSS

Backend: Next.js Server Components, Prisma ORM, PostgreSQL (Neon)

APIs & External Services: BallDontLie API

Tooling: npm, Git & GitHub, Vercel
---

## Features

### Finals Tracker
- Live score display for the current NBA Finals game
- Quarter-by-quarter score breakdown
- Overtime tracking
- On-demand score refresh

### Playoffs Tracker
- Full list of 2025-26 playoff games and results
- Game status, scores, and team information
---

## Database Design
The application uses a relational PostgreSQL database to manage teams, players, and games.

Prisma ORM is used to manage relationships and database interactions.

- `Team` — All 30 NBA teams with conference and division info
- `Player` — Player roster information linked to teams
- `Game` — Playoff and Finals game data including scores, quarter breakdowns, and game status

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

```bash
git clone https://github.com/zandersantos/court-flow.git
cd court-flow
npm install
npm run dev
# visit http://localhost:3000
```

---

## Project structure
/app/ - Next.js App Router pages
/components/ - Reusable UI components
/lib/ - Utility functions and database clients
/services/ - External API and business logic

---

## Roadmap

- [x] NBA Finals live score tracker
- [x] Full playoffs results page
- [ ] Full regular season game tracker (today's games / tomorrow's games)
- [ ] Season-wide game history and results
- [ ] 2026-27 season support with live data