# System efektów

## Architektura systemu efektów

### Podstawowe koncepcje
- **Effect** - bazowa klasa dla wszystkich efektów
- **EffectsController** - zarządza cyklem życia efektów
- **EffectFactory** - fabryka tworząca konkretne efekty

### Typy efektów
1. **Efekty wizualne**
   - WindowResizeEffect - animacja zmiany rozmiaru okna
   - ZoomInEffect - efekt przybliżenia
   - ChangeRiskAbilityEffect - efekt zmiany ryzyka

2. **Efekty gameplay'owe**
   - Modyfikatory statystyk
   - Efekty specjalne kart
   - Efekty statusów

## Implementacja efektu

### Cykl życia efektu
1. Utworzenie przez EffectFactory
2. Inicjalizacja parametrów
3. Aktualizacja w każdej klatce
4. Zakończenie i cleanup

### Przykład implementacji
```typescript
export class CustomEffect extends Effect {
    constructor(params: EffectParams) {
        super();
        this.initializeParams(params);
    }

    update(deltaTime: number): boolean {
        // Logika aktualizacji efektu
        return this.isComplete;
    }

    render(ctx: CanvasRenderingContext2D): void {
        // Logika renderowania efektu
    }
}
```

## Integracja z systemem renderowania

### EffectsController
- Zarządza kolejką efektów
- Aktualizuje aktywne efekty
- Usuwa zakończone efekty

### Renderowanie efektów
1. GameRenderer deleguje renderowanie do EffectsController
2. EffectsController aktualizuje i renderuje aktywne efekty
3. Efekty są renderowane w odpowiedniej kolejności