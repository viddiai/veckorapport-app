# Veckorapport App

En modern, responsiv webbapplikation för att skapa och hantera veckorapporter under onboarding-perioder.

## Funktioner

✅ **Projekthantering**
- Skapa och hantera flera projekt
- Ladda upp kundens logotyp för varje projekt
- Organisera rapporter per projekt

✅ **Veckorapporter**
- Intuitivt formulär för att skapa rapporter
- Automatisk vecko-datum-väljare
- Följande sektioner:
  - Sammanfattning
  - Aktiviteter under veckan
  - Avslutade aktiviteter
  - Påbörjade aktiviteter
  - Uppnådda milstolpar
  - Blockeringar och utmaningar
  - Beslut som behöver fattas
  - Planerade aktiviteter nästa vecka

✅ **Export & Visning**
- Live preview av rapporter
- Exportera till PDF (A4-format)
- Professionell layout med kundens logotyp

✅ **Datahantering**
- Automatisk sparning i LocalStorage
- Historik över alla rapporter
- Ingen backend behövs

✅ **Design**
- Apple-inspirerad minimalistisk design
- Responsiv (fungerar på mobil, tablet och desktop)
- Smooth animationer och övergångar

## Installation

1. Installera dependencies:
\`\`\`bash
npm install
\`\`\`

2. Starta utvecklingsservern:
\`\`\`bash
npm run dev
\`\`\`

3. Öppna [http://localhost:5173](http://localhost:5173) i din webbläsare

## Bygga för Produktion

\`\`\`bash
npm run build
\`\`\`

Byggda filer hamnar i \`dist/\`-mappen.

## Teknologi

- **React** - UI-bibliotek
- **TypeScript** - Typning
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **jsPDF + html2canvas** - PDF-export
- **LocalStorage** - Datalagring

## Användning

1. **Skapa ett projekt**
   - Klicka på "Nytt Projekt"
   - Fyll i projektnamn och kundnamn
   - Ladda upp kundens logotyp (valfritt)

2. **Skapa en veckorapport**
   - Välj ett projekt
   - Klicka på "Ny Rapport"
   - Fyll i formuläret
   - Spara rapporten

3. **Exportera till PDF**
   - Öppna en rapport
   - Klicka på "Exportera PDF"
   - PDF:en laddas ner automatiskt

## Struktur

\`\`\`
src/
├── components/       # React komponenter
├── types/           # TypeScript typer
├── utils/           # Hjälpfunktioner (storage, PDF, datum)
├── App.tsx          # Huvudkomponent med routing
└── index.css        # Tailwind CSS
\`\`\`

## Browser Support

Fungerar i alla moderna webbläsare som stödjer ES6+ och LocalStorage.

## Licens

MIT
