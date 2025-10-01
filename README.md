# Elementals

Elementals to gra karciana oparta na pojedynkach żywiołów, w której gracze rywalizują, zagrywając karty reprezentujące różne elementy i zdolności. Celem gry jest strategiczne pokonanie przeciwnika poprzez odpowiednie wykorzystanie kart i mechanik ryzyka.

## Dokumentacja

- [Architektura aplikacji](docs/architecture.md) - szczegółowy opis warstw i struktury aplikacji
- [Komponenty](docs/components.md) - opis głównych komponentów systemu
- [System efektów](docs/effects.md) - dokumentacja systemu efektów
- [Przewodnik implementacyjny](docs/implementation-guide.md) - przykłady implementacji nowych funkcjonalności

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

## Szybki przegląd architektury

### Warstwa logiki
- Znajduje się w `src/classes/`
- Zawiera logikę biznesową gry
- Implementuje stany gry, system kart i graczy

### Warstwa kontroli
- Znajduje się w `src/classes/input/`
- Odpowiada za obsługę inputu użytkownika
- Mapuje akcje użytkownika na polecenia w grze

### Warstwa renderowania
- Znajduje się w `src/classes/renderer/`
- Odpowiada za wizualną reprezentację gry
- Implementuje system efektów i animacji

## Rozwój aplikacji

Przed rozpoczęciem pracy nad nową funkcjonalnością:
1. Zapoznaj się z odpowiednim rozdziałem dokumentacji
2. Sprawdź istniejące implementacje podobnych funkcjonalności
3. Postępuj zgodnie z wzorcami projektowymi projektu

Więcej informacji w sekcji [Przewodnik implementacyjny](docs/implementation-guide.md).

---

Projekt jest w fazie rozwoju – wszelkie sugestie i kontrybucje są mile widziane!