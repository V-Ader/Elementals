# Elementals

Elementals to gra karciana oparta na pojedynkach żywiołów, w której gracze rywalizują, zagrywając karty reprezentujące różne elementy i zdolności. Celem gry jest strategiczne pokonanie przeciwnika poprzez odpowiednie wykorzystanie kart i mechanik ryzyka.

## Sposób uruchomienia

### Development

1. Zainstaluj zależności:
   ```
   npm install
   ```
2. Uruchom tryb developerski z automatycznym odświeżaniem:
   ```
   npm run dev
   ```
3. Aplikacja będzie dostępna pod adresem `http://localhost:3000` (lub innym wskazanym w konsoli).

### Deployment (produkcja)

1. Zbuduj aplikację:
   ```
   npm run build
   ```
2. Uruchom serwer produkcyjny:
   ```
   npm start
   ```
3. Aplikacja będzie dostępna pod adresem skonfigurowanym w środowisku produkcyjnym.

## Struktura katalogów

- `src/` – główny katalog źródłowy aplikacji
  - `classes/` – logika gry, klasy reprezentujące graczy, karty, planszę itp.
    - `card/` – definicje kart i powiązanych mechanik
    - `game/` – logika rozgrywki, klasy Game, GamePlayer
    - `player/` – klasy graczy
  - `assets/` – zasoby statyczne (grafiki, dźwięki)
  - `components/` – komponenty UI (jeśli dotyczy)
  - `utils/` – funkcje pomocnicze
- `public/` – pliki statyczne serwowane bezpośrednio
- `README.md` – dokumentacja projektu
- `package.json` – zależności i skrypty

## Rozwój aplikacji

- Nowe funkcjonalności dodawaj w odpowiednich podkatalogach `src/classes/` zgodnie z zasadą pojedynczej odpowiedzialności.
- Staraj się pisać kod modularnie i testowalnie.
- Przed dodaniem nowej klasy lub funkcji, sprawdź czy nie istnieje już podobna implementacja.
- Dokumentuj publiczne metody i klasy.
- Do testowania używaj narzędzi zgodnych z ekosystemem (np. Jest, Vitest).
- Zgłaszaj błędy i propozycje zmian poprzez system issue/pull request.

---

Projekt jest w fazie rozwoju – wszelkie sugestie i kontrybucje są mile widziane!