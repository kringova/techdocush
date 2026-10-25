// Fixed shelf content; solutions verified offline. No runtime search or generator.
export const SHELF_LEVELS = [
  {
    "name": "Первый порядок",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "brush"
      ],
      []
    ],
    "solution": [
      [
        0,
        3
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 2,
      "runs": 5,
      "buriedItems": 4,
      "lowerBound": 2,
      "solutionMoves": 3,
      "band": 1,
      "optimalMoves": 3
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 3,
      "upperBound": 3,
      "expandedStates": 1,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "method": "preserved-first-layout"
      }
    }
  },
  {
    "name": "Раскладка 2",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "brush"
      ],
      [
        "bowl",
        "yarn",
        "yarn"
      ]
    ],
    "solution": [
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 2,
      "runs": 5,
      "buriedItems": 3,
      "lowerBound": 4,
      "solutionMoves": 4,
      "band": 1,
      "optimalMoves": 4
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 8,
        "reverseSteps": 4
      }
    }
  },
  {
    "name": "Раскладка 3",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "brush",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "yarn"
      ],
      []
    ],
    "solution": [
      [
        0,
        3
      ],
      [
        1,
        3
      ],
      [
        2,
        0
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 7,
      "buriedItems": 5,
      "lowerBound": 4,
      "solutionMoves": 5,
      "band": 1,
      "optimalMoves": 5
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 5,
      "upperBound": 5,
      "expandedStates": 5,
      "discoveredStates": 9,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 15,
        "reverseSteps": 6
      }
    }
  },
  {
    "name": "Раскладка 4",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "brush",
        "brush"
      ],
      [],
      [
        "brush",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        2
      ],
      [
        1,
        2
      ],
      [
        0,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 7,
      "buriedItems": 5,
      "lowerBound": 5,
      "solutionMoves": 6,
      "band": 1,
      "optimalMoves": 6
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 6,
      "upperBound": 6,
      "expandedStates": 1,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 22,
        "reverseSteps": 6
      }
    }
  },
  {
    "name": "Раскладка 5",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "brush"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 7,
      "buriedItems": 4,
      "lowerBound": 6,
      "solutionMoves": 6,
      "band": 1,
      "optimalMoves": 6
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 6,
      "upperBound": 6,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 51,
        "reverseSteps": 6
      }
    }
  },
  {
    "name": "Раскладка 6",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "brush",
        "yarn"
      ],
      [],
      [
        "brush",
        "brush",
        "bowl"
      ],
      [
        "bowl",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        3,
        1
      ],
      [
        2,
        1
      ],
      [
        0,
        3
      ],
      [
        0,
        2
      ],
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        3,
        1
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 4,
      "lowerBound": 5,
      "solutionMoves": 7,
      "band": 1,
      "optimalMoves": 7
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 5,
      "discoveredStates": 5,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 631,
        "reverseSteps": 7
      }
    }
  },
  {
    "name": "Раскладка 7",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "yarn",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 5,
      "lowerBound": 6,
      "solutionMoves": 7,
      "band": 1,
      "optimalMoves": 7
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 8,
      "discoveredStates": 11,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 200,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 8",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "brush",
        "brush"
      ],
      [
        "bowl",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "bowl"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        1,
        2
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 7,
      "buriedItems": 4,
      "lowerBound": 7,
      "solutionMoves": 7,
      "band": 1,
      "optimalMoves": 7
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 4159,
        "reverseSteps": 7
      }
    }
  },
  {
    "name": "Раскладка 9",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "brush",
        "yarn",
        "brush"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ],
      []
    ],
    "solution": [
      [
        0,
        3
      ],
      [
        0,
        3
      ],
      [
        2,
        0
      ],
      [
        2,
        3
      ],
      [
        1,
        2
      ],
      [
        1,
        0
      ],
      [
        1,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 4,
      "lowerBound": 7,
      "solutionMoves": 7,
      "band": 1,
      "optimalMoves": 7
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 273,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 10",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "brush",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        3,
        0
      ],
      [
        2,
        0
      ],
      [
        2,
        3
      ],
      [
        1,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 3,
      "items": 9,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 6,
      "lowerBound": 7,
      "solutionMoves": 8,
      "band": 1,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 6,
      "discoveredStates": 6,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737010,
        "attempt": 254,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 11",
    "capacity": 4,
    "shelves": [
      [],
      [
        "bowl",
        "bowl",
        "bowl",
        "brush"
      ],
      [
        "brush",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "bowl",
        "brush",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 7,
      "buriedItems": 7,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 2,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 1,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 12",
    "capacity": 4,
    "shelves": [
      [],
      [
        "bowl",
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "brush",
        "bowl"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        1,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 6,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 2,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 458,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 13",
    "capacity": 4,
    "shelves": [
      [],
      [
        "bowl",
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        1,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        0
      ],
      [
        2,
        1
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 8,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 2,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 113,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 14",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        3,
        0
      ],
      [
        2,
        1
      ],
      [
        2,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 8,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 2,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 37,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 15",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "brush",
        "yarn",
        "bowl",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        2,
        0
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 7,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 2,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 8,
      "discoveredStates": 11,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 4510,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 16",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "yarn",
        "bowl"
      ],
      [],
      [
        "brush",
        "bowl",
        "bowl",
        "brush"
      ],
      [
        "brush",
        "yarn",
        "brush",
        "bowl"
      ]
    ],
    "solution": [
      [
        3,
        1
      ],
      [
        2,
        3
      ],
      [
        2,
        1
      ],
      [
        2,
        1
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        0,
        1
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 8,
      "lowerBound": 8,
      "solutionMoves": 9,
      "band": 2,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 4,
      "discoveredStates": 4,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 1139,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 17",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "bowl",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "brush",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 8,
      "buriedItems": 6,
      "lowerBound": 9,
      "solutionMoves": 9,
      "band": 2,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 745,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 18",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "brush",
        "brush",
        "brush"
      ],
      [
        "bowl",
        "bowl",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        1,
        2
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 6,
      "lowerBound": 9,
      "solutionMoves": 9,
      "band": 2,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 9,
      "discoveredStates": 13,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 693,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 19",
    "capacity": 4,
    "shelves": [
      [
        "brush",
        "yarn",
        "brush",
        "brush"
      ],
      [
        "bowl",
        "bowl",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        1,
        2
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        1,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 9,
      "buriedItems": 6,
      "lowerBound": 8,
      "solutionMoves": 11,
      "band": 2,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 15,
      "discoveredStates": 15,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 3109,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 20",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "bowl",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "bowl",
        "brush",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        2,
        3
      ],
      [
        2,
        1
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ]
    ],
    "metrics": {
      "shelves": 4,
      "capacity": 4,
      "items": 12,
      "groups": {
        "yarn": 1,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 3,
      "emptyShelves": 1,
      "mixedShelves": 3,
      "runs": 10,
      "buriedItems": 6,
      "lowerBound": 10,
      "solutionMoves": 11,
      "band": 2,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 7,
      "discoveredStates": 7,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737020,
        "attempt": 3560,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 21",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "brush",
        "brush"
      ]
    ],
    "solution": [
      [
        3,
        2
      ],
      [
        0,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ],
      [
        4,
        3
      ],
      [
        1,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 8,
      "buriedItems": 6,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 3,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 6288,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 22",
    "capacity": 3,
    "shelves": [
      [],
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 10,
      "buriedItems": 6,
      "lowerBound": 8,
      "solutionMoves": 8,
      "band": 3,
      "optimalMoves": 8
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 925,
        "reverseSteps": 8
      }
    }
  },
  {
    "name": "Раскладка 23",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [],
      [
        "brush",
        "yarn",
        "brush"
      ],
      [
        "yarn",
        "brush",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        2
      ],
      [
        0,
        1
      ],
      [
        4,
        2
      ],
      [
        0,
        2
      ],
      [
        3,
        4
      ],
      [
        3,
        0
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        0
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 6,
      "lowerBound": 8,
      "solutionMoves": 9,
      "band": 3,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 8,
      "discoveredStates": 8,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 1703,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 24",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "brush",
        "bowl"
      ],
      [],
      [
        "yarn",
        "bowl",
        "brush"
      ],
      [
        "yarn",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        4,
        2
      ],
      [
        3,
        2
      ],
      [
        1,
        3
      ],
      [
        1,
        2
      ],
      [
        1,
        4
      ],
      [
        0,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 10,
      "buriedItems": 8,
      "lowerBound": 8,
      "solutionMoves": 9,
      "band": 3,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 13,
      "discoveredStates": 22,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 422,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 25",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "yarn",
        "brush"
      ],
      [
        "bowl",
        "yarn",
        "brush"
      ],
      [],
      [
        "bowl",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        1,
        3
      ],
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        3
      ],
      [
        2,
        4
      ],
      [
        0,
        2
      ],
      [
        4,
        0
      ],
      [
        4,
        0
      ],
      [
        4,
        2
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 7,
      "lowerBound": 8,
      "solutionMoves": 9,
      "band": 3,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 15,
      "discoveredStates": 23,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 758,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 26",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [],
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        2,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        0,
        2
      ],
      [
        3,
        0
      ],
      [
        3,
        2
      ],
      [
        4,
        3
      ],
      [
        4,
        0
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 5,
      "lowerBound": 9,
      "solutionMoves": 9,
      "band": 3,
      "optimalMoves": 9
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 1318,
        "reverseSteps": 9
      }
    }
  },
  {
    "name": "Раскладка 27",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        1,
        2
      ],
      [
        1,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 3,
      "items": 12,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 10,
      "buriedItems": 4,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 3,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 10,
      "discoveredStates": 24,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737030,
        "attempt": 5197,
        "reverseSteps": 13
      }
    }
  },
  {
    "name": "Раскладка 28",
    "capacity": 4,
    "shelves": [
      [],
      [
        "yarn",
        "brush",
        "brush",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        1,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ],
      [
        2,
        1
      ],
      [
        4,
        1
      ],
      [
        4,
        2
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 8,
      "lowerBound": 11,
      "solutionMoves": 11,
      "band": 3,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 1233,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 29",
    "capacity": 4,
    "shelves": [
      [],
      [
        "yarn",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        4,
        2
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 8,
      "lowerBound": 11,
      "solutionMoves": 11,
      "band": 3,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 2910,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 30",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "brush",
        "yarn"
      ],
      [],
      [
        "brush",
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "brush",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        1,
        0
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 12,
      "buriedItems": 7,
      "lowerBound": 11,
      "solutionMoves": 11,
      "band": 3,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 11,
      "discoveredStates": 16,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 27,
        "reverseSteps": 12
      }
    }
  },
  {
    "name": "Раскладка 31",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "brush",
        "bowl"
      ],
      [],
      [
        "yarn",
        "brush",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "brush",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        3,
        2
      ],
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        0,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        1,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        1
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 10,
      "lowerBound": 11,
      "solutionMoves": 12,
      "band": 3,
      "optimalMoves": 12
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 18,
      "discoveredStates": 18,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 2020,
        "reverseSteps": 12
      }
    }
  },
  {
    "name": "Раскладка 32",
    "capacity": 4,
    "shelves": [
      [],
      [
        "yarn",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        2,
        1
      ],
      [
        2,
        0
      ],
      [
        1,
        2
      ],
      [
        1,
        2
      ],
      [
        3,
        1
      ],
      [
        4,
        1
      ],
      [
        4,
        3
      ],
      [
        4,
        2
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 13,
      "buriedItems": 8,
      "lowerBound": 11,
      "solutionMoves": 12,
      "band": 3,
      "optimalMoves": 12
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 50,
      "discoveredStates": 56,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 6588,
        "reverseSteps": 13
      }
    }
  },
  {
    "name": "Раскладка 33",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn",
        "yarn"
      ],
      [],
      [
        "bowl",
        "bowl",
        "brush",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        4,
        1
      ],
      [
        0,
        4
      ],
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        2,
        3
      ],
      [
        4,
        2
      ],
      [
        4,
        2
      ],
      [
        4,
        0
      ],
      [
        4,
        3
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 12,
      "buriedItems": 8,
      "lowerBound": 11,
      "solutionMoves": 12,
      "band": 3,
      "optimalMoves": 12
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 45,
      "discoveredStates": 60,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 5020,
        "reverseSteps": 14
      }
    }
  },
  {
    "name": "Раскладка 34",
    "capacity": 4,
    "shelves": [
      [],
      [
        "brush",
        "yarn",
        "brush",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        4,
        3
      ],
      [
        1,
        4
      ],
      [
        1,
        3
      ],
      [
        4,
        1
      ],
      [
        4,
        1
      ],
      [
        2,
        1
      ],
      [
        4,
        1
      ],
      [
        4,
        2
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 11,
      "buriedItems": 9,
      "lowerBound": 12,
      "solutionMoves": 13,
      "band": 3,
      "optimalMoves": 13
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 21,
      "discoveredStates": 21,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 1018,
        "reverseSteps": 13
      }
    }
  },
  {
    "name": "Раскладка 35",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "brush",
        "brush",
        "yarn"
      ],
      [],
      [
        "bowl",
        "bowl",
        "yarn",
        "brush"
      ],
      [
        "yarn",
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "yarn",
        "bowl",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        2,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        0
      ],
      [
        2,
        0
      ],
      [
        4,
        2
      ],
      [
        4,
        0
      ],
      [
        4,
        2
      ],
      [
        3,
        4
      ],
      [
        3,
        4
      ],
      [
        3,
        1
      ],
      [
        3,
        4
      ]
    ],
    "metrics": {
      "shelves": 5,
      "capacity": 4,
      "items": 16,
      "groups": {
        "yarn": 2,
        "bowl": 1,
        "brush": 1
      },
      "filledGroups": 4,
      "emptyShelves": 1,
      "mixedShelves": 4,
      "runs": 13,
      "buriedItems": 8,
      "lowerBound": 12,
      "solutionMoves": 13,
      "band": 3,
      "optimalMoves": 13
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 15,
      "discoveredStates": 32,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737031,
        "attempt": 7428,
        "reverseSteps": 17
      }
    }
  },
  {
    "name": "Раскладка 36",
    "capacity": 3,
    "shelves": [
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        0,
        2
      ],
      [
        3,
        0
      ],
      [
        4,
        0
      ],
      [
        4,
        3
      ],
      [
        5,
        4
      ],
      [
        5,
        0
      ],
      [
        5,
        4
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 12,
      "buriedItems": 8,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 4,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 607,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 37",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "brush"
      ],
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "brush"
      ],
      [
        "bowl",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        4
      ],
      [
        2,
        4
      ],
      [
        3,
        4
      ],
      [
        0,
        2
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        1,
        3
      ],
      [
        5,
        1
      ],
      [
        5,
        3
      ],
      [
        5,
        1
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 8,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 4,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 7810,
        "reverseSteps": 10
      }
    }
  },
  {
    "name": "Раскладка 38",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "brush"
      ],
      [
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "bowl",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        3
      ],
      [
        2,
        3
      ],
      [
        2,
        3
      ],
      [
        2,
        0
      ],
      [
        4,
        2
      ],
      [
        4,
        2
      ],
      [
        1,
        4
      ],
      [
        5,
        4
      ],
      [
        5,
        2
      ],
      [
        5,
        1
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 11,
      "buriedItems": 8,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 4,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 10,
      "discoveredStates": 16,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 842,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 39",
    "capacity": 3,
    "shelves": [
      [],
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn"
      ],
      [
        "bowl",
        "brush",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        1,
        2
      ],
      [
        3,
        1
      ],
      [
        3,
        1
      ],
      [
        4,
        1
      ],
      [
        5,
        3
      ],
      [
        5,
        4
      ],
      [
        5,
        3
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 11,
      "buriedItems": 7,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 4,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 10,
      "discoveredStates": 29,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 2190,
        "reverseSteps": 12
      }
    }
  },
  {
    "name": "Раскладка 40",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "yarn",
        "brush"
      ],
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "bowl",
        "bowl"
      ],
      [
        "bowl",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        2,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ],
      [
        0,
        4
      ],
      [
        5,
        0
      ],
      [
        5,
        4
      ],
      [
        2,
        5
      ],
      [
        1,
        2
      ],
      [
        1,
        5
      ],
      [
        1,
        2
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 12,
      "buriedItems": 7,
      "lowerBound": 10,
      "solutionMoves": 10,
      "band": 4,
      "optimalMoves": 10
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 22,
      "discoveredStates": 55,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 6844,
        "reverseSteps": 13
      }
    }
  },
  {
    "name": "Раскладка 41",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [],
      [
        "bowl",
        "brush",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        5,
        1
      ],
      [
        2,
        1
      ],
      [
        2,
        5
      ],
      [
        0,
        1
      ],
      [
        4,
        2
      ],
      [
        0,
        2
      ],
      [
        4,
        0
      ],
      [
        5,
        4
      ],
      [
        5,
        4
      ],
      [
        3,
        0
      ],
      [
        5,
        3
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 9,
      "lowerBound": 10,
      "solutionMoves": 11,
      "band": 4,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 24,
      "discoveredStates": 24,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 809,
        "reverseSteps": 11
      }
    }
  },
  {
    "name": "Раскладка 42",
    "capacity": 3,
    "shelves": [
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "bowl",
        "yarn"
      ],
      [],
      [
        "brush",
        "brush",
        "bowl"
      ],
      [
        "yarn",
        "bowl",
        "brush"
      ]
    ],
    "solution": [
      [
        1,
        3
      ],
      [
        1,
        3
      ],
      [
        0,
        1
      ],
      [
        0,
        3
      ],
      [
        0,
        1
      ],
      [
        4,
        0
      ],
      [
        5,
        4
      ],
      [
        5,
        0
      ],
      [
        2,
        5
      ],
      [
        2,
        0
      ],
      [
        2,
        5
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 3,
      "items": 15,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 13,
      "buriedItems": 7,
      "lowerBound": 11,
      "solutionMoves": 11,
      "band": 4,
      "optimalMoves": 11
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 11,
      "discoveredStates": 33,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737040,
        "attempt": 3970,
        "reverseSteps": 14
      }
    }
  },
  {
    "name": "Раскладка 43",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "bowl",
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        1,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        1
      ],
      [
        4,
        3
      ],
      [
        0,
        1
      ],
      [
        0,
        3
      ],
      [
        5,
        3
      ],
      [
        5,
        0
      ],
      [
        4,
        0
      ],
      [
        5,
        4
      ],
      [
        5,
        4
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 10,
      "lowerBound": 13,
      "solutionMoves": 13,
      "band": 4,
      "optimalMoves": 13
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 1611,
        "reverseSteps": 13
      }
    }
  },
  {
    "name": "Раскладка 44",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "yarn",
        "brush"
      ],
      [],
      [
        "yarn",
        "bowl",
        "bowl",
        "bowl"
      ],
      [
        "brush",
        "bowl",
        "bowl",
        "bowl"
      ],
      [
        "brush",
        "bowl",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ],
      [
        4,
        3
      ],
      [
        1,
        4
      ],
      [
        5,
        4
      ],
      [
        5,
        1
      ],
      [
        5,
        3
      ],
      [
        5,
        4
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 12,
      "buriedItems": 10,
      "lowerBound": 13,
      "solutionMoves": 13,
      "band": 4,
      "optimalMoves": 13
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 13,
      "discoveredStates": 20,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 2807,
        "reverseSteps": 14
      }
    }
  },
  {
    "name": "Раскладка 45",
    "capacity": 4,
    "shelves": [
      [
        "bowl",
        "yarn",
        "bowl",
        "yarn"
      ],
      [],
      [
        "bowl",
        "bowl",
        "yarn",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "bowl",
        "brush",
        "yarn"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        2,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        3,
        0
      ],
      [
        4,
        0
      ],
      [
        4,
        0
      ],
      [
        5,
        0
      ],
      [
        5,
        4
      ],
      [
        5,
        3
      ],
      [
        5,
        4
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 12,
      "lowerBound": 13,
      "solutionMoves": 13,
      "band": 4,
      "optimalMoves": 13
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 13,
      "discoveredStates": 40,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 6368,
        "reverseSteps": 15
      }
    }
  },
  {
    "name": "Раскладка 46",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "yarn",
        "brush"
      ],
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "bowl",
        "bowl",
        "bowl"
      ],
      [],
      [
        "brush",
        "brush",
        "bowl",
        "yarn"
      ],
      [
        "yarn",
        "bowl",
        "brush",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        3
      ],
      [
        2,
        3
      ],
      [
        2,
        3
      ],
      [
        1,
        3
      ],
      [
        4,
        1
      ],
      [
        2,
        4
      ],
      [
        2,
        1
      ],
      [
        4,
        2
      ],
      [
        4,
        2
      ],
      [
        5,
        2
      ],
      [
        5,
        4
      ],
      [
        5,
        2
      ],
      [
        0,
        4
      ],
      [
        5,
        0
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 13,
      "buriedItems": 11,
      "lowerBound": 13,
      "solutionMoves": 14,
      "band": 4,
      "optimalMoves": 14
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 33,
      "discoveredStates": 33,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 1049,
        "reverseSteps": 14
      }
    }
  },
  {
    "name": "Раскладка 47",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "yarn",
        "bowl",
        "yarn"
      ],
      [],
      [
        "bowl",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "brush",
        "bowl"
      ],
      [
        "brush",
        "bowl",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        0,
        1
      ],
      [
        2,
        1
      ],
      [
        3,
        1
      ],
      [
        2,
        0
      ],
      [
        2,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        3,
        2
      ],
      [
        3,
        0
      ],
      [
        4,
        3
      ],
      [
        5,
        3
      ],
      [
        5,
        0
      ],
      [
        5,
        3
      ],
      [
        5,
        4
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 17,
      "buriedItems": 10,
      "lowerBound": 13,
      "solutionMoves": 14,
      "band": 4,
      "optimalMoves": 14
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 22,
      "discoveredStates": 49,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 3191,
        "reverseSteps": 15
      }
    }
  },
  {
    "name": "Раскладка 48",
    "capacity": 4,
    "shelves": [
      [
        "yarn",
        "brush",
        "bowl",
        "bowl"
      ],
      [
        "yarn",
        "yarn",
        "bowl",
        "bowl"
      ],
      [],
      [
        "bowl",
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "brush",
        "yarn",
        "brush",
        "yarn"
      ],
      [
        "yarn",
        "bowl",
        "yarn",
        "brush"
      ]
    ],
    "solution": [
      [
        0,
        2
      ],
      [
        0,
        2
      ],
      [
        1,
        2
      ],
      [
        1,
        2
      ],
      [
        4,
        1
      ],
      [
        4,
        0
      ],
      [
        4,
        1
      ],
      [
        0,
        4
      ],
      [
        0,
        4
      ],
      [
        3,
        0
      ],
      [
        5,
        4
      ],
      [
        5,
        0
      ],
      [
        5,
        3
      ],
      [
        5,
        0
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 15,
      "buriedItems": 12,
      "lowerBound": 13,
      "solutionMoves": 14,
      "band": 4,
      "optimalMoves": 14
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 45,
      "discoveredStates": 60,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 2382,
        "reverseSteps": 15
      }
    }
  },
  {
    "name": "Раскладка 49",
    "capacity": 4,
    "shelves": [
      [],
      [
        "yarn",
        "bowl",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "bowl"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "brush",
        "bowl"
      ],
      [
        "bowl",
        "brush",
        "bowl",
        "yarn"
      ]
    ],
    "solution": [
      [
        3,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        0
      ],
      [
        3,
        0
      ],
      [
        1,
        3
      ],
      [
        2,
        3
      ],
      [
        1,
        3
      ],
      [
        2,
        1
      ],
      [
        2,
        1
      ],
      [
        5,
        1
      ],
      [
        4,
        2
      ],
      [
        5,
        2
      ],
      [
        5,
        4
      ],
      [
        5,
        2
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 11,
      "lowerBound": 14,
      "solutionMoves": 14,
      "band": 4,
      "optimalMoves": 14
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 0,
      "discoveredStates": 1,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 105,
        "reverseSteps": 14
      }
    }
  },
  {
    "name": "Раскладка 50",
    "capacity": 4,
    "shelves": [
      [],
      [
        "bowl",
        "yarn",
        "bowl",
        "yarn"
      ],
      [
        "bowl",
        "bowl",
        "brush",
        "bowl"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "yarn"
      ],
      [
        "brush",
        "brush",
        "brush",
        "yarn"
      ],
      [
        "bowl",
        "yarn",
        "yarn",
        "bowl"
      ]
    ],
    "solution": [
      [
        1,
        0
      ],
      [
        4,
        0
      ],
      [
        2,
        1
      ],
      [
        2,
        4
      ],
      [
        5,
        2
      ],
      [
        5,
        0
      ],
      [
        5,
        0
      ],
      [
        5,
        2
      ],
      [
        3,
        5
      ],
      [
        3,
        5
      ],
      [
        3,
        5
      ],
      [
        1,
        3
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        1,
        3
      ]
    ],
    "metrics": {
      "shelves": 6,
      "capacity": 4,
      "items": 20,
      "groups": {
        "yarn": 2,
        "bowl": 2,
        "brush": 1
      },
      "filledGroups": 5,
      "emptyShelves": 1,
      "mixedShelves": 5,
      "runs": 14,
      "buriedItems": 9,
      "lowerBound": 14,
      "solutionMoves": 15,
      "band": 4,
      "optimalMoves": 15
    },
    "proof": {
      "method": "A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound",
      "complete": true,
      "optimal": true,
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 116,
      "discoveredStates": 121,
      "maxExpanded": 35000,
      "reason": "optimal-frontier-bound",
      "constructive": true,
      "construction": {
        "seed": 737041,
        "attempt": 6698,
        "reverseSteps": 16
      }
    }
  }
];
