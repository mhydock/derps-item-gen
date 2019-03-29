namespace Magic {
    export enum Element {
        Fire,
        Water,
        Ice,
        Wind,
        Earth,
        Holy,
        Dark,
    }

    export class MagicEffect {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly elements: Element[]) {}
    }
}