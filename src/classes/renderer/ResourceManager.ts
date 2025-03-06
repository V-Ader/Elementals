export enum ResourceType {
    MATERIAL,
    ICON,
    CARD
}

export class ResourceManager {
    private materials: Map<string, HTMLImageElement> = new Map();
    private icons: Map<string, HTMLImageElement> = new Map();
    private cards: Map<string, HTMLImageElement> = new Map();

    constructor() {
    }

    private loadImages(type: ResourceType, imageName: string) {
        const img = new Image();
        img.src = `./assets/${type}/${imageName}.png`;
        switch (type) {
            case ResourceType.CARD:
                img.src = `./assets/cards/${imageName}.png`;
                this.cards.set(imageName, img);
                break;
            case ResourceType.ICON:
                img.src = `./assets/icons/${imageName}.png`;
                this.icons.set(imageName, img);
                break;
            case ResourceType.MATERIAL:
                img.src = `./assets/materials/${imageName}.png`;
                this.materials.set(imageName, img);
                break;
        }
    }

    getCardImage(name: string): HTMLImageElement | undefined {
        if (!this.cards.has(name)) {
            this.loadImages(ResourceType.CARD, name);
        }
        return this.cards.get(name);
    }

    getIconImage(name: string): HTMLImageElement | undefined {
        if (!this.icons.has(name)) {
            this.loadImages(ResourceType.ICON, name);
        }
        return this.icons.get(name);
    }

    getMaterialImage(name: string): HTMLImageElement | undefined {
        if (!this.materials.has(name)) {
            this.loadImages(ResourceType.MATERIAL, name);
        }
        return this.materials.get(name);
    }
}