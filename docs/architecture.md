# Architektura aplikacji

## Struktura warstw

Aplikacja jest zbudowana w oparciu o wzorzec warstwowy, gdzie każda warstwa ma swoją określoną odpowiedzialność:

### Warstwa logiki (Logic Layer)
- Znajduje się w katalogu `src/classes/`
- Odpowiada za całą logikę biznesową gry
- Nie zawiera żadnej logiki związanej z renderowaniem czy obsługą inputu
- Główne komponenty:
  - Game States - zarządzanie stanami gry
  - Card System - logika kart i ich efektów
  - Player System - różne typy graczy i ich zachowania

### Warstwa kontroli (Input Layer)
- Znajduje się w katalogu `src/classes/input/`
- Odpowiada za przechwytywanie i interpretację akcji użytkownika
- Przekazuje przetworzone akcje do warstwy logiki
- Kluczowe komponenty:
  - InputController - główny kontroler obsługujący wszystkie typy inputu
  - Event Handlers - specjalizowane handlery dla różnych typów zdarzeń

### Warstwa renderowania (Render Layer)
- Znajduje się w katalogu `src/classes/renderer/`
- Odpowiada za wizualną reprezentację stanu gry
- Nie zawiera logiki biznesowej
- Główne komponenty:
  - GameRenderer - główny renderer koordynujący renderowanie wszystkich elementów
  - Specialized Renderers - wyspecjalizowane renderery dla poszczególnych elementów gry
  - Effects System - system efektów wizualnych

## Przepływ danych

1. Input Layer przechwytuje akcje użytkownika
2. Akcje są przetwarzane i przekazywane do Logic Layer
3. Logic Layer aktualizuje stan gry
4. Render Layer otrzymuje zaktualizowany stan i renderuje go

## Zasady projektowe

- Single Responsibility Principle - każda klasa ma jedną, jasno określoną odpowiedzialność
- Dependency Injection - zależności są wstrzykiwane z zewnątrz
- Immutability - stan gry jest modyfikowany tylko przez określone akcje
- Event-Driven Architecture - komunikacja między warstwami oparta o zdarzenia