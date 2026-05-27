# Lumière — Webbshop

En fullstack webbshop byggd som examensarbete. Projektet innehåller en kunddel och en adminpanel.

## Tech Stack

**Frontend:** Vite + React + TypeScript + Tailwind CSS
**Backend:** Node.js + Express + TypeScript + MongoDB (Mongoose)
**Övrigt:** JWT-autentisering, Multer för bilduppladdning, i18next för språkstöd

## Funktioner

**Kund:**

- Bläddra, söka och filtrera produkter
- Användarkonto med profil och leveransadress
- Varukorg och checkout med betalsätt
- Orderhistorik och favoriter
- Svenska/engelska språkstöd

**Admin:**

- Lägg till, redigera och ta bort produkter
- Bilduppladdning
- Lagersaldohantering
- Orderöversikt med statusuppdatering

## Kom igång

### Krav

- Node 20+
- MongoDB Atlas-konto

### Installation

```bash
# Installera dependencies
cd client && npm install
cd ../server && npm install
```

### Miljövariabler

Skapa `server/.env`:

```
PORT=3001
MONGO_URI=din_mongodb_uri
JWT_SECRET=ditt_hemliga_värde
ALLOWED_ORIGINS=http://localhost:5173
```

Skapa `client/.env`:

```
VITE_API_URL=http://localhost:3001
```

### Starta lokalt

```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Databas:** MongoDB Atlas
