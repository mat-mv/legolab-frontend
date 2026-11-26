# lego::lab Karlsruhe – Frontend

Website des [lego::lab](https://www.legolab-karlsruhe.de) der Hochschule Karlsruhe: Workshops, Bots mit Bauanleitungen, LEGO MINDSTORMS und das Team. Dieses Repo enthält das Next.js-Frontend; die Inhalte kommen aus einem Strapi-CMS.

| Umgebung | URL | Branch |
| --- | --- | --- |
| Produktion | https://www.legolab-karlsruhe.de | `main` |
| Entwicklung | https://dev.legolab-karlsruhe.de (Passwortschutz) | `dev` |

## Tech-Stack

- [Next.js 16](https://nextjs.org/docs) (App Router) mit React 19 und TypeScript
- [Strapi 5](https://docs.strapi.io) als Headless CMS (eigenes Repo, nicht öffentlich)
- CSS Modules für Styling
- `qs` für Strapi-Abfragen, `react-markdown` für Rich-Text, `zod` für Formularvalidierung
- `brick-viewer` (three.js) für 3D-Bauanleitungen aus LDraw-Dateien (.mpd)

## Schnellstart

Voraussetzung: Node.js 22 LTS (mindestens 20.9) und npm.

```bash
git clone https://github.com/mat-mv/legolab-frontend.git
cd legolab-frontend
git checkout dev
npm ci
```

Lege eine Datei `.env.local` im Projektordner an:

```bash
NEXT_PUBLIC_API_URL=https://www.legolab-karlsruhe.de/api
```

Dann den Entwicklungsserver starten und http://localhost:3000 öffnen:

```bash
npm run dev
```

Lokal greift ihr lesend auf das Produktiv-Strapi zu. Ihr seht also echte Inhalte, könnt aber nichts kaputt machen.

### Umgebungsvariablen

| Variable | Wofür | Lokal nötig? |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Basis-URL der Strapi-API | ja (sonst Standardwert www) |
| `STRAPI_API_TOKEN` | Schreibzugriff fürs Kontaktformular | nein, nur auf dem Server |
| `REVALIDATE_SECRET` | Schutz des Cache-Endpunkts `/api/revalidate` | nein, nur auf dem Server |

`.env*`-Dateien stehen in `.gitignore` und werden **nie** committet.

## Projektstruktur

```
src/app/
├── page.tsx                 Startseite
├── layout.tsx               Grundlayout (Header, Footer, Metadaten)
├── buch/ labor/ mindstorms/ Bereichsseiten, Detailseiten unter [slug]/
├── gestalten/ programmieren/ team/ links/ kontakt/
├── api/revalidate/          Webhook-Endpunkt für Strapi (Cache leeren)
├── components/              Wiederverwendbare Komponenten + *.module.css
│   ├── forms/  slider/  tabs/
└── utils/
    ├── api.ts               fetchData() / postData() für Strapi
    ├── getImageUrl.ts       Bild-URL inkl. Platzhalter
    ├── actions/             Server Actions (z. B. Kontaktformular)
    └── interfaces/          TypeScript-Typen der Strapi-Inhalte
```

## Daten aus Strapi holen

Alle Abfragen laufen über `fetchData()` aus `src/app/utils/api.ts`. Die Query baut ihr mit `qs`:

```tsx
import qs from "qs";
import { fetchData } from "@/app/utils/api";

const query = qs.stringify({
  filters: { slug: { $eq: "veronika" } },
  populate: {
    image: { fields: ["url"] },
    buildInstructionMPD: { fields: ["url", "name"] },
  },
});

const data = await fetchData("bots?" + query);
```

Gut zu wissen:

- **Normale Felder** liefert Strapi immer. **Bilder, Dateien, Relationen und Komponenten** nur mit `populate`.
- **Zum Ausprobieren** im Browser: https://www.legolab-karlsruhe.de/api/bots?populate=* zeigt alle Felder eine Ebene tief.
- **Media-URLs** kommen relativ (`/uploads/…`). Bilder baut ihr mit `getImageUrl()` zusammen. Dateien, die der Browser selbst lädt (z. B. .mpd für den 3D-Viewer), bleiben relativ.
- **Nichts hartkodieren:** Texte, Bilder und Datei-URLs kommen aus Strapi. Strapi hängt bei jedem Upload einen Hash an den Dateinamen.
- Für jeden Content-Type gibt es ein Interface in `utils/interfaces/`. Neue Felder dort ergänzen.

## Branches und Workflow

```
feature/<thema>  ──PR──▶  dev  ──PR──▶  main
                          │              │
                  dev.legolab-…   www.legolab-…
```

1. Neuen Branch von `dev` abzweigen: `feature/<kurzer-name>` (z. B. `feature/3d-viewer`).
2. Arbeiten, committen, pushen.
3. Pull Request nach `dev` stellen und das zugehörige Issue verlinken.
4. Nach dem Merge wird `dev` automatisch auf dev.legolab-karlsruhe.de deployt. Dort testen.
5. Den Merge von `dev` nach `main` und das Ausrollen auf Produktion übernimmt Matthias.

Kein direkter Push auf `dev` oder `main`. Aufgaben stehen als [Issues](https://github.com/mat-mv/legolab-frontend/issues) im Repo.

## Konventionen

- **Komponenten:** Dateien in `snake_case.tsx`, Komponenten in `PascalCase`, Styles als `PascalCase.module.css` daneben.
- **Server zuerst:** Komponenten sind standardmäßig Server Components. `"use client"` nur, wenn ihr State, Effekte oder Browser-APIs braucht.
- **Browser-Bibliotheken** (z. B. `brick-viewer`) nur dynamisch im `useEffect` importieren, sonst bricht das Server-Rendering ab.
- **Sprache:** Oberflächentexte auf Deutsch, Code-Bezeichner gern Englisch.
- **Vor dem PR:** `npm run build` muss lokal fehlerfrei durchlaufen.

## Deployment und Caching

- Ein Push auf `dev` startet über GitHub Actions automatisch das Deployment auf dev.legolab-karlsruhe.de. Produktion (`main`) wird manuell über den Workflow „Deploy main“ ausgerollt.
- Seiten werden gecacht (ISR). Wenn in Strapi Inhalte veröffentlicht werden, ruft ein Webhook `/api/revalidate` auf und leert den Cache. Neue Inhalte sind dann ohne Neu-Deployment sichtbar.
- Ein wöchentlicher Workflow prüft die Laufzeit der TLS-Zertifikate.

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver auf http://localhost:3000 |
| `npm run build` | Produktions-Build (vor jedem PR ausführen) |
| `npm run start` | Gebauten Stand lokal starten |

## Ansprechpartner

Projektleitung und Server: Matthias (lego::lab, Fakultät IWI, Hochschule Karlsruhe). Fragen und Fehler bitte als Issue anlegen.
