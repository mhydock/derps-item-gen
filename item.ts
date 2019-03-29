namespace Item {
    export enum DamageDie {
        d2 = 2,
        d3 = 3,
        d4 = 4,
        d6 = 6,
        d8 = 8,
        d10 = 10,
        d12 = 12,
        d20 = 20,
        d100 = 100
    }

    export enum Size {
        T = 'Tiny',
        S = 'Small',
        M = 'Medium',
        L = 'Large',
        H = 'Huge',
        G = 'Gargantuan'
    }

    export enum WeightClass {
        E = 'Etherial',
        L = 'Light',
        M = 'Medium',
        H = 'Heavy',
        T = 'Titanic',
    }

    export enum RangeType {
        T = 'Touch',
        M = 'Melee',
        R = 'Reach',
        TH = 'Thrown',
        S = 'Sight',
    }

    export enum WeaponType {
        S = 'Slashing',
        P = 'Piercing',
        B = 'Blunt',
        M = 'Magical',
    }

    export enum Rarity {
        UB = 'Ubiquitous',
        CO = 'Common',
        UN = 'Uncommon',
        RA = 'Rare',
        UQ = 'Unique'
    }

    export interface Item {
        name: string;
        description: string;
        effectProb: number[];
        weight: number;
        size: Size;
        rarity: Rarity;
        value: number;
    }

    export class Weapon implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [0.25, 0.1],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.CO,
            public readonly value: number,
            public readonly types: WeaponType[],
            public readonly range: RangeType[],
            public readonly damage: DamageDie[],
            public readonly bonus: number
        ) {}
    }

    export class Armor implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [0.25, 0.1],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.CO,
            public readonly value: number,
            public readonly weightClass: WeightClass,
            public readonly armor: number,
        ) {}
    }

    export class Accessory implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [0.6, 0.2],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.CO,
            public readonly value: number,
        ) {}
    }

    export class Potion implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [1, 0.1],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.UN,
            public readonly value: number,
        ) {}
    }

    export class Scroll implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [1, 0.2],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.UN,
            public readonly value: number,
            public readonly uses: number = 1,
        ) {}
    }

    export class Miscellaneous implements Item {
        constructor(
            public readonly name: string,
            public readonly description: string,
            public readonly effectProb: number[] = [0.2, 0.05],
            public readonly weight: number,
            public readonly size: Size = Size.M,
            public readonly rarity: Rarity = Rarity.CO,
            public readonly value: number,
        ) {}
    }
}