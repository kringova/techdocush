// Generated offline by tools/build-corio-grooming-levels.mjs. No runtime authoring.
// Strength is the number of strokes required at each phase; effort is not human difficulty.
const freeze=value=>{if(value&&typeof value==='object'){for(const item of Object.values(value))freeze(item);Object.freeze(value);}return value;};
export const GROOMING_LEVELS=freeze([
  {
    "name": "Пыльная шерсть",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      }
    ],
    "spec": {
      "band": 1,
      "family": "cloth"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 1,
      "cleaningStrokes": 2,
      "rests": 0,
      "referenceMoves": 2,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "Пара пыльных лап",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 1,
      "family": "cloth"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 2,
      "rests": 0,
      "referenceMoves": 2,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "Салфетка и щётка",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 1,
      "family": "dry-care"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 2,
      "rests": 0,
      "referenceMoves": 2,
      "mudAreas": 0,
      "toolCount": 2
    }
  },
  {
    "name": "Расчесать два участка",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 1,
      "family": "brush"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 2,
      "rests": 0,
      "referenceMoves": 2,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "После игры на ковре",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 1,
      "family": "dry-care"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 3,
      "rests": 0,
      "referenceMoves": 3,
      "mudAreas": 0,
      "toolCount": 2
    }
  },
  {
    "name": "Пыль на боку",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      }
    ],
    "spec": {
      "band": 2,
      "family": "cloth"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 3,
      "rests": 0,
      "referenceMoves": 3,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "Неспешная щётка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 2,
      "family": "brush"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 2,
      "cleaningStrokes": 3,
      "rests": 0,
      "referenceMoves": 3,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "Лапы и бочок",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 2,
      "family": "dry-care"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 3,
      "rests": 0,
      "referenceMoves": 3,
      "mudAreas": 0,
      "toolCount": 2
    }
  },
  {
    "name": "Ещё немного пыли",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 2
      }
    ],
    "spec": {
      "band": 2,
      "family": "cloth"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 4,
      "rests": 1,
      "referenceMoves": 5,
      "mudAreas": 0,
      "toolCount": 1
    }
  },
  {
    "name": "Три участка шерсти",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 2,
      "family": "dry-care"
    },
    "idea": "Салфетка убирает пыль, щётка — свободные спутанные шерстинки. Плотные участки очищаются несколькими движениями; вода здесь не нужна.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 5,
      "rests": 1,
      "referenceMoves": 6,
      "mudAreas": 0,
      "toolCount": 2
    }
  },
  {
    "name": "Первое мытьё",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 3,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 6,
      "rests": 1,
      "referenceMoves": 7,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Грязь и пыль",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 3,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 7,
      "rests": 2,
      "referenceMoves": 9,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Сначала расчесать",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 3,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 7,
      "rests": 2,
      "referenceMoves": 9,
      "mudAreas": 1,
      "toolCount": 5
    }
  },
  {
    "name": "Смыть и вытереть",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 3,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 8,
      "rests": 2,
      "referenceMoves": 10,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Пыльный бочок",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 3,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 8,
      "rests": 2,
      "referenceMoves": 10,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "До чистой шерсти",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 4,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 9,
      "rests": 2,
      "referenceMoves": 11,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Пушистая грудка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "tangle",
        "strength": 3
      }
    ],
    "spec": {
      "band": 4,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 3,
      "cleaningStrokes": 9,
      "rests": 2,
      "referenceMoves": 11,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Четыре участка",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 4,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 9,
      "rests": 2,
      "referenceMoves": 11,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "По одному за раз",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 4,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 10,
      "rests": 3,
      "referenceMoves": 13,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "После исследования дома",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 4,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 10,
      "rests": 3,
      "referenceMoves": 13,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Салфетка между этапами",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 5,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 11,
      "rests": 3,
      "referenceMoves": 14,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Два грязных участка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 5,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 11,
      "rests": 3,
      "referenceMoves": 14,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Мокрые лапы",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 5,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 12,
      "rests": 3,
      "referenceMoves": 15,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Грязь держится крепче",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 5,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 12,
      "rests": 3,
      "referenceMoves": 15,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Вода и щётка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 5,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 4,
      "cleaningStrokes": 13,
      "rests": 4,
      "referenceMoves": 17,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Пять участков",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 6,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 14,
      "rests": 4,
      "referenceMoves": 18,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Мягкая передышка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 6,
      "family": "first-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 14,
      "rests": 4,
      "referenceMoves": 18,
      "mudAreas": 1,
      "toolCount": 6
    }
  },
  {
    "name": "Три вида ухода",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "flank",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 6,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 15,
      "rests": 4,
      "referenceMoves": 19,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "От лап к боку",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "chest",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 6,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 16,
      "rests": 5,
      "referenceMoves": 21,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Щётка после воды",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 6,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 16,
      "rests": 5,
      "referenceMoves": 21,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Очистить без спешки",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 7,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 17,
      "rests": 5,
      "referenceMoves": 22,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Пыль в густой шерсти",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 7,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 18,
      "rests": 5,
      "referenceMoves": 23,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Вычёсываем понемногу",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "flank",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 7,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 18,
      "rests": 5,
      "referenceMoves": 23,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Две упрямые отметины",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "chest",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 7,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 19,
      "rests": 6,
      "referenceMoves": 25,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Вернуть белую шерсть",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      }
    ],
    "spec": {
      "band": 7,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 5,
      "cleaningStrokes": 20,
      "rests": 6,
      "referenceMoves": 26,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Весь пушистый кот",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 8,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 21,
      "rests": 6,
      "referenceMoves": 27,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Сначала лёгкие участки",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 5,
        "zone": "belly",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 8,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 22,
      "rests": 7,
      "referenceMoves": 29,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Лапы, грудка и бока",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 8,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 23,
      "rests": 7,
      "referenceMoves": 30,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Смываем всё до конца",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "chest",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 8,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 24,
      "rests": 7,
      "referenceMoves": 31,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Сухое полотенце",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 3
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 8,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 25,
      "rests": 8,
      "referenceMoves": 33,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Три движения за раз",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 9,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 26,
      "rests": 8,
      "referenceMoves": 34,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "После пыльных уголков",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 5,
        "zone": "belly",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 9,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 27,
      "rests": 8,
      "referenceMoves": 35,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Чистота по участкам",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 9,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 28,
      "rests": 9,
      "referenceMoves": 37,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Спокойное большое мытьё",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 3
      },
      {
        "id": 4,
        "zone": "chest",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 1
      }
    ],
    "spec": {
      "band": 9,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 29,
      "rests": 9,
      "referenceMoves": 38,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Ещё одна передышка",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 3
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 9,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 30,
      "rests": 9,
      "referenceMoves": 39,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Два сложных участка",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 10,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 30,
      "rests": 9,
      "referenceMoves": 39,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Довести до чистоты",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "hindpaw",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "flank",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "chest",
        "kind": "tangle",
        "strength": 1
      },
      {
        "id": 4,
        "zone": "shoulder",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 10,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 31,
      "rests": 10,
      "referenceMoves": 41,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Вода, пена, полотенце",
    "spots": [
      {
        "id": 0,
        "zone": "shoulder",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "chest",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "frontpaws",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "flank",
        "kind": "dust",
        "strength": 1
      },
      {
        "id": 5,
        "zone": "hindpaw",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 10,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 31,
      "rests": 10,
      "referenceMoves": 41,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Последние следы",
    "spots": [
      {
        "id": 0,
        "zone": "flank",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "belly",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 2,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 3,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 4,
        "zone": "chest",
        "kind": "dust",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "frontpaws",
        "kind": "tangle",
        "strength": 2
      }
    ],
    "spec": {
      "band": 10,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 32,
      "rests": 10,
      "referenceMoves": 42,
      "mudAreas": 2,
      "toolCount": 6
    }
  },
  {
    "name": "Чисто перед сном",
    "spots": [
      {
        "id": 0,
        "zone": "frontpaws",
        "kind": "mud",
        "strength": 3
      },
      {
        "id": 1,
        "zone": "flank",
        "kind": "mud",
        "strength": 2
      },
      {
        "id": 2,
        "zone": "chest",
        "kind": "mud",
        "strength": 1
      },
      {
        "id": 3,
        "zone": "hindpaw",
        "kind": "dust",
        "strength": 3
      },
      {
        "id": 4,
        "zone": "belly",
        "kind": "tangle",
        "strength": 2
      },
      {
        "id": 5,
        "zone": "shoulder",
        "kind": "tangle",
        "strength": 3
      }
    ],
    "spec": {
      "band": 10,
      "family": "mixed-washing"
    },
    "idea": "Сначала можно убрать сухую пыль и свободную шерсть. Грязные участки требуют воды, кошачьего шампуня, смывания и полотенца; между тремя движениями нужна передышка.",
    "metrics": {
      "zoneCount": 6,
      "cleaningStrokes": 32,
      "rests": 10,
      "referenceMoves": 42,
      "mudAreas": 3,
      "toolCount": 6
    }
  }
]);
