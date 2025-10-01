# Przewodnik implementacyjny

## Dodanie nowej karty

### 1. Definiowanie danych karty
```typescript
// W pliku card-data.ts
export const NEW_CARD_DATA: CardData = {
    id: "new_card_id",
    name: "Nazwa karty",
    element: Element.FIRE,
    risk: 5,
    ability: new CustomAbility()
};
```

### 2. Dodanie zasobów
1. Dodaj grafikę karty do `assets/cards/`
2. Zarejestruj zasób w `ResourceManager`

### 3. Implementacja specjalnych efektów (opcjonalnie)
1. Stwórz nową klasę efektu w `src/classes/renderer/effect/effects/`
2. Zaimplementuj logikę efektu
3. Dodaj efekt do `EffectFactory`

## Dodanie nowego efektu

### 1. Stworzenie klasy efektu
```typescript
export class NewEffect extends Effect {
    constructor(params: EffectParams) {
        super();
        // Inicjalizacja
    }

    update(deltaTime: number): boolean {
        // Logika aktualizacji
        return isComplete;
    }

    render(ctx: CanvasRenderingContext2D): void {
        // Logika renderowania
    }
}
```

### 2. Rejestracja w EffectFactory
```typescript
// W EffectFactory.ts
case EffectType.NEW_EFFECT:
    return new NewEffect(params);
```

### 3. Użycie efektu
```typescript
effectsController.add(
    EffectFactory.create(EffectType.NEW_EFFECT, params)
);
```

## Dodanie nowej zdolności karty

### 1. Stworzenie klasy zdolności
```typescript
export class NewAbility extends Ability {
    constructor() {
        super(AbilityType.NEW_ABILITY);
    }

    activate(game: Game, player: PLAYER_ID): void {
        // Implementacja efektu zdolności
    }
}
```

### 2. Integracja z systemem efektów (opcjonalnie)
1. Stwórz odpowiedni efekt wizualny
2. Połącz aktywację zdolności z efektem

### 3. Użycie w karcie
```typescript
const cardWithNewAbility: CardData = {
    // ...inne właściwości
    ability: new NewAbility()
};
```