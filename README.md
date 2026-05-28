# CourtFlow - NBA Off-Season Tracker

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
- Future Improvements

---

## Overview
CourtFlow is a modern NBA off-season dashboard focused on player movement, trades, contracts, free agency, and draft assets. The application provides a centralized platform for tracking roster changes and league activity during the NBA off-season.

The project is designed as a full-stack learning project using Next.js, TypeScript, PostgreSQL, and Prisma while exploring scalable application architecture, relational database design, API integration, and modern UI development.

---

## Demo

- Live Site: TBD
- Screenshot: TBD

--

## Tech Stack Used

Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Custom Global CSS

Backend: Next.js Server Components, Prisma ORM, PostgreSQL (Neon)

APIs & External Services: BallDontLie API

Tooling: npm, Git & GitHub, Vercel
---

## Features
Team Dashboard
- View all NBA teams
- Browse active rosters
- View conference and division information

Player Tracking
- Track player movement between teams
- View player profile information
- Track active contracts and contract history

Trade Tracking
- Display completed and pending trades
- Track trade assets between teams
- Support multi-asset trades involving players, draft picks, and cash considerations

Contract Management
- View active player contracts
- Track free agency status
- Store historical contract information

Draft Pick Tracking
- Track original and current ownership of draft picks
- Support protected draft pick information

News Feed
- Aggregate NBA off-season news
- Display recent transactions and updates
- Store and manage external news articles

---

## Database Design
The application uses a relational PostgreSQL database to manage team rosters, player movement, contracts, trades, and draft assets during the NBA off-season.

Prisma ORM is used to manage relationships and database interactions.


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
