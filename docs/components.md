# Komponenty aplikacji

## System stanów gry (Game States)

### Dostępne stany
- **MainMenuState** - ekran głównego menu
- **PlayState** - główny stan rozgrywki
- **ApplyAbilityState** - stan aplikowania zdolności karty
- **TurnSummaryState** - podsumowanie tury

### Zarządzanie stanami
- Implementacja wzorca State Pattern
- Każdy stan implementuje interfejs `State`
- StateMachine zarządza przejściami między stanami

## Typy graczy (Player Types)

### HumanPlayer
- Reprezentuje gracza sterowanego przez człowieka
- Obsługuje input użytkownika przez InputController

### BotPlayer
- Implementuje sztuczną inteligencję przeciwnika
- Wykorzystuje strategie decyzyjne do wyboru ruchów

## System inputu

### InputController
- Centralny punkt obsługi inputu użytkownika
- Obsługuje:
  - Kliknięcia myszy
  - Ruch myszy (hover)
  - Input z klawiatury
- Mapuje pozycje kliknięć na akcje w grze

## System renderowania

### GameRenderer
- Główny koordynator renderowania
- Zarządza kolejnością renderowania elementów
- Deleguje renderowanie do wyspecjalizowanych rendererów

### Wyspecjalizowane renderery
- **CardRenderer** - renderowanie kart
- **HealthRenderer** - renderowanie paska zdrowia
- **EffectRenderer** - renderowanie efektów wizualnych

## Komunikacja między komponentami
- Wykorzystanie wzorca Observer
- Event-based communication
- Dependency injection