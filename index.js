var damageDie = {
    d2: 2,
  d3: 3,
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100
};

var range = {
    T: 'touch',
  M: 'melee',
  R: 'reach',
  TH: 'thrown',
  S: 'sight',
};

var weightClass = {
    E: 'etherial',
  L: 'light',
  M: 'medium',
  H: 'heavy',
  T: 'titanic',
};

var weaponTypes = {
    S: 'slashing',
  P: 'piercing',
  B: 'blunt',
  M: 'magical',
};

var itemTypes = {
    weapon: [0.25, 0.1],
  armor: [0.25, 0.1],
  accessory: [0.6, 0.2],
  potion: [1, 0.1],
  scroll: [1, 0.2],
  misc: [0.2, 0.05]
};

var weapons = {
    knife: {
      type: ['S', 'P'],
    range: ['T', 'M', 'TH'],
    damage: ['d2'],
    bonus: 0
  },
  dirk: {
      type: ['S', 'P'],
    range: ['T', 'M', 'TH'],
    damage: ['d3'],
    bonus: 0
  },
    shortSword: {
      type: ['S', 'P'],
    range: ['M'],
    damage: ['d4'],
    bonus: 0
  },
  longSword: {
      type: ['S', 'P'],
    range: ['M'],
    damage: ['d6'],
    bonus: 0
  },
  hammer: {
      type: ['B'],
    range: ['M'],
    damage: ['d4'],
    bonus: 0
  },
  warHammer: {
      type: ['B'],
    range: ['M', 'R'],
    damage: ['d6'],
    bonus: 0
  },
  spear: {
      type: ['P'],
    range: ['M', 'R', 'TH'],
    damage: ['d4'],
    bonus: 0
  },
  pike: {
      type: ['P'],
    range: ['R'],
    damage: ['d6'],
    bonus: 0
  },
  halberd: {
      type: ['S', 'P'],
    range: ['R'],
    damage: ['d6'],
    bonus: 0
  },  
};

var armors = {
    hide: {
      weight: 'L',
    armor: 10,
  },
  leather: {
      weight: 'L',
    armor: 12,
  },
  chain: {
      weight: 'M',
    armor: 14,
  },
  scale: {
      weight: 'M',
    armor: 16
  },
  plate: {
      weight: 'H',
    armor: 18
  },
};

var accessories = {
    ring: {},
  earring: {},
  bracelet: {},
  necklace: {},
  ribbon: {},
};

var elements = [
    'fire',
  'water',
  'ice',
  'wind',
  'earth',
  'holy',
  'dark',
];

var effects = {
    fire: ['burn', 'warm'],
  water: ['drown', 'hydrate'],
  ice: ['freeze', 'chill'],
  wind: ['suffocate', 'levitate', 'fly'],
  earth: ['crush', 'grow', 'feed', 'decompose', 'poison'],
  holy: ['bless', 'protect', 'heal', 'dispel', 'condemn'],
  dark: ['blind', 'void', 'banish', 'curse', 'death']
};

var combine = {
    fire: {
      water: ['steam', 'mist', 'boil'],
    ice: ['blast'],
    wind: ['heat wave', 'flare'],
    earth: ['cinder', 'lava'],
    holy: ['purifying fire', 'wrath of god'],
    dark: ['flame of corruption', 'hellfire']
  },
  water: {
      get fire() { return combine.fire.water },
    ice: ['icicle', 'frost', 'avalanche'],
    wind: ['typhoon', 'storm', 'thunder'],
    earth: ['mudslide'],
    holy: ['antidote', 'remove curse'],
    dark: ['']
  },
  ice: {
      get fire () { return combine.fire.ice },
    get water () { return combine.water.ice },
    wind: ['snow', 'blizzard'],
    earth: ['permafrost'],
    holy: ["Skadi's wrath"],
    dark: ["Hel's fury"]
  },
  wind: {
      get fire () { return combine.fire.wind },
    get water () { return combine.water.wind },
    get ice () { return combine.ice.wind },
    earth: ['sandstorm', 'pheremone', 'perfume', 'foul odor'],
    holy: [''],
    dark: ['']
  },
  earth: {
      get fire () { return combine.fire.earth },
    get water () { return combine.water.earth },
    get ice () { return combine.ice.earth },
    get wind () { return combine.wind.earth },
    holy: ['create homonculi', 'raise dead', 'banish undead'],
    dark: ['create undead', 'enslave undead', 'decay', 'rot']
  },
  holy: {
      get fire () { return combine.fire.holy },
    get water () { return combine.water.holy },
    get ice () { return combine.ice.holy },
    get wind () { return combine.wind.holy },
    get earth () { return combine.earth.holy },
    dark: ['chaos', 'blasphemy']
  },
  dark: {
      get fire () { return combine.fire.dark },
    get water () { return combine.water.dark },
    get ice () { return combine.ice.dark },
    get wind () { return combine.wind.dark },
    get earth () { return combine.earth.dark },
    get holy () { return combine.holy.dark }
  }
};

function pick(arr) {
    var names = Object.keys(arr);
    return arr[names[Math.floor(Math.random() * (names.length-1))]];
}

function genRando() {
    var names = Object.keys(itemTypes);
    var it_name = names[Math.floor(Math.random() * (names.length-1))];
    var chances = itemTypes[it_name];

    var it = it_name;
    if (it == 'weapon') {
        it = pick(weapons);
    } else if (it == 'armor') {
        it = pick(armors);
    } else if (it == 'accessory') {
        it = pick(accessories);
    }
    
    var el = [];
    chances.forEach(c => {
        if (Math.random() < c) {
            var elem = elements[Math.floor(Math.random() * (elements.length-1))];
            if (!el.includes(elem)) el.push(elem);
        }
    });

    var ef = el.length == 2 ? 
             el[0] == el[1] ? effect[el[0]] : combine[el[0]][el[1]] :
             el.length == 1 ? effects[el[0]] : [];
    ef = Array.isArray(ef) ? ef[Math.floor(Math.random() * (ef.length-1))] : '';

    var itemType_td = document.getElementById('itemType');
    var element_td = document.getElementById('element');
    var effect_td = document.getElementById('effect');
  
    var verb = ['weapon'].includes(it_name) ? 'inflicts' :
               ['armor', 'accessory'].includes(it_name) ? 'protects against' :
               ['potion', 'scroll', 'misc'].includes(it_name) ? 
                       Math.random() < 0.5 ? 'inflicts' : 'protects against' :
                '';

    itemType_td.innerHTML = it_name;
    element_td.innerHTML = el.length > 0 ? el.join(', ') : 'None';
    effect_td.innerHTML = el.length > 0 ? [verb, ef].join(' ') : 'None';
}