// Fifty fixed open-thread puzzles; authored and verified offline.
export const YARN_ANCHOR=0;
export const YARN_POINT_SPACING=9;
export const YARN_LEVELS=[
  {
    "name": "Первая петля",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 28,
        "y": 30
      },
      {
        "x": 75,
        "y": 72
      },
      {
        "x": 29,
        "y": 72
      },
      {
        "x": 72,
        "y": 30
      },
      {
        "x": 86,
        "y": 65
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 12,
        "y": 55
      },
      {
        "type": "move",
        "node": 2,
        "x": 18,
        "y": 30
      }
    ],
    "metrics": {
      "initialCrossings": 1,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 13.038404810405298,
      "initialCrossingCoverLowerBound": 1
    },
    "id": "yarn-50-v1-1",
    "spec": {
      "family": "tutorial",
      "band": 1,
      "targetLayout": "original-tutorial"
    },
    "idea": "Одна петля. Начало нити закреплено, два изгиба показывают, как убрать перехлёст."
  },
  {
    "id": "yarn-50-v1-2",
    "name": "Свободный кончик",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 31.053,
        "y": 50.489
      },
      {
        "x": 37.88,
        "y": 78.554
      },
      {
        "x": 14.407,
        "y": 19.878
      },
      {
        "x": 72.415,
        "y": 38.456
      },
      {
        "x": 82.343,
        "y": 12.623
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 43.822,
        "y": 33.926
      }
    ],
    "metrics": {
      "initialCrossings": 1,
      "bends": 4,
      "referenceMoves": 1,
      "optimal": false,
      "initialPointSpacing": 23.924,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.085,
        "crossingToCrossing": null
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 1,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "separate-loops",
      "band": 1,
      "targetLayout": "rays"
    },
    "idea": "Две разнесённые петли. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-3",
    "name": "Через середину",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 19.251,
        "y": 56.37
      },
      {
        "x": 48.621,
        "y": 55.405
      },
      {
        "x": 53.842,
        "y": 86.078
      },
      {
        "x": 89.972,
        "y": 47.513
      },
      {
        "x": 25.566,
        "y": 87.144
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 63.251,
        "y": 80.081
      }
    ],
    "metrics": {
      "initialCrossings": 1,
      "bends": 4,
      "referenceMoves": 1,
      "optimal": false,
      "initialPointSpacing": 13.594,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 13.594,
        "crossingToCrossing": null
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 1,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "diagonal-return",
      "band": 1,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Возврат по диагонали. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-4",
    "name": "Петля у края",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 80.864,
        "y": 33.868
      },
      {
        "x": 46.123,
        "y": 54.543
      },
      {
        "x": 45.776,
        "y": 83.158
      },
      {
        "x": 29.186,
        "y": 83.497
      },
      {
        "x": 84.322,
        "y": 65.974
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 13.253,
        "y": 39.902
      },
      {
        "type": "move",
        "node": 4,
        "x": 65.943,
        "y": 81.033
      }
    ],
    "metrics": {
      "initialCrossings": 2,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 15.583,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.711,
        "crossingToCrossing": 20.342
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 2,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "outer-turn",
      "band": 1,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Поворот у края. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-5",
    "name": "Две стороны",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 34.194,
        "y": 79.442
      },
      {
        "x": 88.557,
        "y": 50.094
      },
      {
        "x": 57.897,
        "y": 24.062
      },
      {
        "x": 67.956,
        "y": 82.717
      },
      {
        "x": 36.426,
        "y": 35.584
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 2,
        "x": 40.231,
        "y": 69.885
      },
      {
        "type": "move",
        "node": 3,
        "x": 48.572,
        "y": 85.404
      }
    ],
    "metrics": {
      "initialCrossings": 2,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 20.202,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 18.92,
        "crossingToCrossing": 8.174
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 2,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "centre-weave",
      "band": 1,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Перехлёсты в середине. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-6",
    "name": "Нить поперёк",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 86.306,
        "y": 46.407
      },
      {
        "x": 49.672,
        "y": 39.984
      },
      {
        "x": 50.244,
        "y": 24.969
      },
      {
        "x": 63.377,
        "y": 47.382
      },
      {
        "x": 65.415,
        "y": 67.427
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 48.644,
        "y": 61.464
      },
      {
        "type": "move",
        "node": 1,
        "x": 22.757,
        "y": 28.143
      }
    ],
    "metrics": {
      "initialCrossings": 2,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 15.026,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.92,
        "crossingToCrossing": 15.393
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 2,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "offset-bands",
      "band": 1,
      "targetLayout": "columns"
    },
    "idea": "Сдвинутые ряды. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-7",
    "name": "Первый зигзаг",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 82.164,
        "y": 37.319
      },
      {
        "x": 38.049,
        "y": 47.988
      },
      {
        "x": 36.432,
        "y": 83.751
      },
      {
        "x": 56.761,
        "y": 62.016
      },
      {
        "x": 18.112,
        "y": 49.145
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 36.491,
        "y": 10.864
      },
      {
        "type": "move",
        "node": 5,
        "x": 89.956,
        "y": 79.343
      }
    ],
    "metrics": {
      "initialCrossings": 3,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 19.971,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 7.397,
        "crossingToCrossing": 9.777
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 2,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "crossed-zigzag",
      "band": 1,
      "targetLayout": "rays"
    },
    "idea": "Зигзаг с перехлёстами. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-8",
    "name": "Небольшая дуга",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 49.494,
        "y": 38.811
      },
      {
        "x": 15.424,
        "y": 42.399
      },
      {
        "x": 12.539,
        "y": 26.235
      },
      {
        "x": 57.123,
        "y": 84.235
      },
      {
        "x": 26.389,
        "y": 57.824
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 77.243,
        "y": 74.449
      },
      {
        "type": "move",
        "node": 3,
        "x": 50.012,
        "y": 58.628
      },
      {
        "type": "move",
        "node": 1,
        "x": 27.956,
        "y": 72.115
      }
    ],
    "metrics": {
      "initialCrossings": 3,
      "bends": 4,
      "referenceMoves": 3,
      "optimal": false,
      "initialPointSpacing": 16.419,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.091,
        "crossingToCrossing": 7.385
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 3,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "open-arc",
      "band": 1,
      "targetLayout": "columns"
    },
    "idea": "Открытая дуга. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-9",
    "name": "Вернуть кончик",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 89.563,
        "y": 34.236
      },
      {
        "x": 64.983,
        "y": 24.966
      },
      {
        "x": 78.818,
        "y": 82.633
      },
      {
        "x": 56.825,
        "y": 36.668
      },
      {
        "x": 76.499,
        "y": 35.032
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 2,
        "x": 29.53,
        "y": 81.465
      },
      {
        "type": "move",
        "node": 1,
        "x": 16.849,
        "y": 35.189
      }
    ],
    "metrics": {
      "initialCrossings": 3,
      "bends": 4,
      "referenceMoves": 2,
      "optimal": false,
      "initialPointSpacing": 13.088,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.355,
        "crossingToCrossing": 7.909
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 2,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "end-return",
      "band": 1,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Кончик через петлю. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-10",
    "name": "Широкая петля",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 50.092,
        "y": 16.096
      },
      {
        "x": 42.669,
        "y": 67.668
      },
      {
        "x": 57.296,
        "y": 38.061
      },
      {
        "x": 20.75,
        "y": 58.846
      },
      {
        "x": 71.418,
        "y": 10.153
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 35.428,
        "y": 87.042
      }
    ],
    "metrics": {
      "initialCrossings": 4,
      "bends": 4,
      "referenceMoves": 1,
      "optimal": false,
      "initialPointSpacing": 22.139,
      "initialCrossingCoverLowerBound": 1,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.526,
        "crossingToCrossing": 7.545
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 1,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "wide-loop",
      "band": 1,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Широкий разворот. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-11",
    "name": "Складка слева",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 22.104,
        "y": 31.072
      },
      {
        "x": 56.234,
        "y": 56.531
      },
      {
        "x": 66.977,
        "y": 20.175
      },
      {
        "x": 33.221,
        "y": 47.246
      },
      {
        "x": 46.529,
        "y": 11.335
      },
      {
        "x": 88.577,
        "y": 76.064
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 72.18,
        "y": 72.856
      },
      {
        "type": "move",
        "node": 6,
        "x": 84.977,
        "y": 18.42
      },
      {
        "type": "move",
        "node": 5,
        "x": 81.281,
        "y": 32.725
      }
    ],
    "metrics": {
      "initialCrossings": 4,
      "bends": 5,
      "referenceMoves": 3,
      "optimal": false,
      "initialPointSpacing": 19.626,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.317,
        "crossingToCrossing": 3.498
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 3,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "single-fold",
      "band": 2,
      "targetLayout": "columns"
    },
    "idea": "Одна складка. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-12",
    "name": "Две петли рядом",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 80.906,
        "y": 20.204
      },
      {
        "x": 38.592,
        "y": 83.093
      },
      {
        "x": 17.043,
        "y": 66.605
      },
      {
        "x": 52.155,
        "y": 29.56
      },
      {
        "x": 77.031,
        "y": 73.172
      },
      {
        "x": 15.395,
        "y": 49.144
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 2,
        "x": 56.689,
        "y": 12.9
      },
      {
        "type": "move",
        "node": 1,
        "x": 20.196,
        "y": 11.584
      },
      {
        "type": "move",
        "node": 3,
        "x": 70.207,
        "y": 17.383
      },
      {
        "type": "move",
        "node": 6,
        "x": 78.911,
        "y": 84.358
      }
    ],
    "metrics": {
      "initialCrossings": 6,
      "bends": 5,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 13.736,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 7.96,
        "crossingToCrossing": 8.335
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "separate-loops",
      "band": 2,
      "targetLayout": "rays"
    },
    "idea": "Две разнесённые петли. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-13",
    "name": "Длинная диагональ",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 70.627,
        "y": 24.063
      },
      {
        "x": 44.867,
        "y": 27.531
      },
      {
        "x": 21.843,
        "y": 60.659
      },
      {
        "x": 66.832,
        "y": 50.76
      },
      {
        "x": 32.559,
        "y": 71.093
      },
      {
        "x": 23.864,
        "y": 18.951
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 15.457,
        "y": 36.784
      },
      {
        "type": "move",
        "node": 3,
        "x": 87.7,
        "y": 55.962
      },
      {
        "type": "move",
        "node": 6,
        "x": 89.912,
        "y": 87.32
      }
    ],
    "metrics": {
      "initialCrossings": 4,
      "bends": 5,
      "referenceMoves": 3,
      "optimal": false,
      "initialPointSpacing": 14.957,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.706,
        "crossingToCrossing": 4.305
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 3,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "diagonal-return",
      "band": 2,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Возврат по диагонали. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-14",
    "name": "По краю коврика",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 58.223,
        "y": 48.08
      },
      {
        "x": 86.617,
        "y": 18.019
      },
      {
        "x": 72.365,
        "y": 40.679
      },
      {
        "x": 71.958,
        "y": 16.495
      },
      {
        "x": 81.392,
        "y": 52.888
      },
      {
        "x": 25.176,
        "y": 55.014
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 75.098,
        "y": 68.942
      },
      {
        "type": "move",
        "node": 3,
        "x": 46.659,
        "y": 47.58
      },
      {
        "type": "move",
        "node": 4,
        "x": 49.583,
        "y": 76.467
      },
      {
        "type": "move",
        "node": 1,
        "x": 20.757,
        "y": 23.764
      }
    ],
    "metrics": {
      "initialCrossings": 4,
      "bends": 5,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 14.738,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.199,
        "crossingToCrossing": 4.35
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "outer-turn",
      "band": 2,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Поворот у края. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-15",
    "name": "Перехлёсты в центре",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 30.113,
        "y": 16.563
      },
      {
        "x": 80.006,
        "y": 69.878
      },
      {
        "x": 34.168,
        "y": 45.817
      },
      {
        "x": 79.402,
        "y": 53.586
      },
      {
        "x": 40.981,
        "y": 72.948
      },
      {
        "x": 69.163,
        "y": 12.807
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 18.598,
        "y": 44.793
      },
      {
        "type": "move",
        "node": 4,
        "x": 58.199,
        "y": 62.302
      },
      {
        "type": "move",
        "node": 5,
        "x": 70.791,
        "y": 85.756
      },
      {
        "type": "move",
        "node": 2,
        "x": 26.024,
        "y": 71.042
      }
    ],
    "metrics": {
      "initialCrossings": 6,
      "bends": 5,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 16.303,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 10.691,
        "crossingToCrossing": 5.657
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "centre-weave",
      "band": 2,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Перехлёсты в середине. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-16",
    "name": "Ряд за рядом",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 66.238,
        "y": 28.684
      },
      {
        "x": 30.015,
        "y": 25.889
      },
      {
        "x": 78.755,
        "y": 62.747
      },
      {
        "x": 39.745,
        "y": 65.874
      },
      {
        "x": 47.189,
        "y": 16.916
      },
      {
        "x": 76.08,
        "y": 40.016
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 58.301,
        "y": 38.99
      },
      {
        "type": "move",
        "node": 5,
        "x": 58.568,
        "y": 74.218
      },
      {
        "type": "move",
        "node": 1,
        "x": 29.69,
        "y": 68.004
      },
      {
        "type": "move",
        "node": 3,
        "x": 45.341,
        "y": 43.642
      }
    ],
    "metrics": {
      "initialCrossings": 6,
      "bends": 5,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 15.009,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.705,
        "crossingToCrossing": 3.649
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "offset-bands",
      "band": 2,
      "targetLayout": "columns"
    },
    "idea": "Сдвинутые ряды. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-17",
    "name": "Зигзаг под нитью",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 47.691,
        "y": 29.777
      },
      {
        "x": 62.54,
        "y": 68.909
      },
      {
        "x": 21.42,
        "y": 38.117
      },
      {
        "x": 57.14,
        "y": 39.044
      },
      {
        "x": 35.414,
        "y": 54.628
      },
      {
        "x": 66.935,
        "y": 50.283
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 53.883,
        "y": 59.72
      },
      {
        "type": "move",
        "node": 2,
        "x": 23.302,
        "y": 55.405
      },
      {
        "type": "move",
        "node": 3,
        "x": 51.836,
        "y": 10.495
      }
    ],
    "metrics": {
      "initialCrossings": 7,
      "bends": 5,
      "referenceMoves": 3,
      "optimal": false,
      "initialPointSpacing": 13.235,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.649,
        "crossingToCrossing": 3.359
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 3,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "crossed-zigzag",
      "band": 2,
      "targetLayout": "rays"
    },
    "idea": "Зигзаг с перехлёстами. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-18",
    "name": "Дуга с поворотом",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 81.7,
        "y": 72.347
      },
      {
        "x": 12.101,
        "y": 11.422
      },
      {
        "x": 37.536,
        "y": 55.362
      },
      {
        "x": 45.537,
        "y": 22.768
      },
      {
        "x": 31.611,
        "y": 32.556
      },
      {
        "x": 87.953,
        "y": 42.013
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 28.447,
        "y": 75.517
      },
      {
        "type": "move",
        "node": 5,
        "x": 88.843,
        "y": 56.422
      },
      {
        "type": "move",
        "node": 3,
        "x": 55.976,
        "y": 47.69
      },
      {
        "type": "move",
        "node": 1,
        "x": 16.104,
        "y": 50.46
      }
    ],
    "metrics": {
      "initialCrossings": 4,
      "bends": 5,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 17.022,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.052,
        "crossingToCrossing": 3.199
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "open-arc",
      "band": 2,
      "targetLayout": "rows"
    },
    "idea": "Открытая дуга. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-19",
    "name": "Кончик в середине",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 56.381,
        "y": 47.35
      },
      {
        "x": 39.885,
        "y": 33.383
      },
      {
        "x": 44.608,
        "y": 82.509
      },
      {
        "x": 53.097,
        "y": 31.083
      },
      {
        "x": 81.766,
        "y": 71.87
      },
      {
        "x": 19.34,
        "y": 64.767
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 65.558,
        "y": 32.98
      },
      {
        "type": "move",
        "node": 5,
        "x": 79.357,
        "y": 15.573
      },
      {
        "type": "move",
        "node": 3,
        "x": 50.805,
        "y": 12.098
      },
      {
        "type": "move",
        "node": 1,
        "x": 20.573,
        "y": 23.231
      },
      {
        "type": "move",
        "node": 6,
        "x": 88.939,
        "y": 87.694
      }
    ],
    "metrics": {
      "initialCrossings": 6,
      "bends": 5,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 13.411,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.89,
        "crossingToCrossing": 3.879
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "end-return",
      "band": 2,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Кончик через петлю. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-20",
    "name": "Большой разворот",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 51.578,
        "y": 70.478
      },
      {
        "x": 29.056,
        "y": 24.402
      },
      {
        "x": 57.124,
        "y": 43.244
      },
      {
        "x": 42.295,
        "y": 83.884
      },
      {
        "x": 14.029,
        "y": 30.181
      },
      {
        "x": 86.144,
        "y": 27.78
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 27.847,
        "y": 71.994
      },
      {
        "type": "move",
        "node": 2,
        "x": 31.345,
        "y": 42.616
      },
      {
        "type": "move",
        "node": 5,
        "x": 79.497,
        "y": 76.95
      }
    ],
    "metrics": {
      "initialCrossings": 5,
      "bends": 5,
      "referenceMoves": 3,
      "optimal": false,
      "initialPointSpacing": 16.1,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.125,
        "crossingToCrossing": 4.956
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 3,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "wide-loop",
      "band": 2,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Широкий разворот. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-21",
    "name": "Складка под складкой",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 26.377,
        "y": 66.441
      },
      {
        "x": 87.49,
        "y": 61.571
      },
      {
        "x": 31.638,
        "y": 45.74
      },
      {
        "x": 40.834,
        "y": 69.297
      },
      {
        "x": 57.301,
        "y": 16.258
      },
      {
        "x": 71.619,
        "y": 49.113
      },
      {
        "x": 28.311,
        "y": 26.265
      },
      {
        "x": 88.417,
        "y": 80.068
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 8,
        "x": 82.544,
        "y": 13.945
      },
      {
        "type": "move",
        "node": 6,
        "x": 67.878,
        "y": 10.968
      },
      {
        "type": "move",
        "node": 2,
        "x": 40.971,
        "y": 28.398
      },
      {
        "type": "move",
        "node": 3,
        "x": 41.004,
        "y": 57.152
      },
      {
        "type": "move",
        "node": 7,
        "x": 76.786,
        "y": 79.063
      }
    ],
    "metrics": {
      "initialCrossings": 7,
      "bends": 7,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 14.736,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.995,
        "crossingToCrossing": 2.802
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "single-fold",
      "band": 3,
      "targetLayout": "columns"
    },
    "idea": "Одна складка. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-22",
    "name": "Петли на расстоянии",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 89.477,
        "y": 37.481
      },
      {
        "x": 45.515,
        "y": 24.376
      },
      {
        "x": 22.661,
        "y": 24.892
      },
      {
        "x": 52.329,
        "y": 74.267
      },
      {
        "x": 64.882,
        "y": 46.995
      },
      {
        "x": 60.252,
        "y": 18.043
      },
      {
        "x": 82.659,
        "y": 52.652
      },
      {
        "x": 12.438,
        "y": 16.592
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 7,
        "x": 34.683,
        "y": 79.774
      },
      {
        "type": "move",
        "node": 6,
        "x": 74.634,
        "y": 57.772
      },
      {
        "type": "move",
        "node": 8,
        "x": 84.04,
        "y": 84.995
      },
      {
        "type": "move",
        "node": 1,
        "x": 23.851,
        "y": 57.663
      },
      {
        "type": "move",
        "node": 3,
        "x": 41.239,
        "y": 42.496
      },
      {
        "type": "move",
        "node": 4,
        "x": 75.991,
        "y": 15.337
      }
    ],
    "metrics": {
      "initialCrossings": 8,
      "bends": 7,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 13.168,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.713,
        "crossingToCrossing": 5.907
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "separate-loops",
      "band": 3,
      "targetLayout": "rays"
    },
    "idea": "Две разнесённые петли. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-23",
    "name": "Поперечный возврат",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 61.935,
        "y": 15.367
      },
      {
        "x": 33.211,
        "y": 46.414
      },
      {
        "x": 40.555,
        "y": 58.461
      },
      {
        "x": 80.517,
        "y": 72.593
      },
      {
        "x": 63.328,
        "y": 40.993
      },
      {
        "x": 68.496,
        "y": 80.842
      },
      {
        "x": 79.749,
        "y": 49.51
      },
      {
        "x": 27.707,
        "y": 87.165
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 16.223,
        "y": 55.694
      },
      {
        "type": "move",
        "node": 8,
        "x": 89.974,
        "y": 60.995
      },
      {
        "type": "move",
        "node": 7,
        "x": 85.107,
        "y": 86.302
      },
      {
        "type": "move",
        "node": 4,
        "x": 47.16,
        "y": 49.733
      }
    ],
    "metrics": {
      "initialCrossings": 7,
      "bends": 7,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 14.109,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.577,
        "crossingToCrossing": 6.027
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "diagonal-return",
      "band": 3,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Возврат по диагонали. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-24",
    "name": "Три поворота",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 23.43,
        "y": 38.089
      },
      {
        "x": 85.049,
        "y": 84.945
      },
      {
        "x": 56.177,
        "y": 32.526
      },
      {
        "x": 34.139,
        "y": 73.439
      },
      {
        "x": 83.229,
        "y": 60.158
      },
      {
        "x": 18.121,
        "y": 23.139
      },
      {
        "x": 60.247,
        "y": 80.647
      },
      {
        "x": 82.929,
        "y": 21.526
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 8,
        "x": 71.247,
        "y": 68.308
      },
      {
        "type": "move",
        "node": 7,
        "x": 58.668,
        "y": 51.379
      },
      {
        "type": "move",
        "node": 2,
        "x": 15.933,
        "y": 63.011
      },
      {
        "type": "move",
        "node": 1,
        "x": 14.877,
        "y": 41.935
      },
      {
        "type": "move",
        "node": 5,
        "x": 44.306,
        "y": 82.457
      },
      {
        "type": "move",
        "node": 4,
        "x": 36.436,
        "y": 61.762
      },
      {
        "type": "move",
        "node": 6,
        "x": 63.396,
        "y": 14.391
      }
    ],
    "metrics": {
      "initialCrossings": 12,
      "bends": 7,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 15.865,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.552,
        "crossingToCrossing": 3.312
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 7,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "outer-turn",
      "band": 3,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Поворот у края. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-25",
    "name": "Нити в середине",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 12.267,
        "y": 59.432
      },
      {
        "x": 13.252,
        "y": 41.413
      },
      {
        "x": 76.819,
        "y": 72.549
      },
      {
        "x": 67.766,
        "y": 11.647
      },
      {
        "x": 25.751,
        "y": 57.918
      },
      {
        "x": 66.069,
        "y": 51.302
      },
      {
        "x": 39.312,
        "y": 21.978
      },
      {
        "x": 59.232,
        "y": 87.267
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 30.874,
        "y": 48.518
      },
      {
        "type": "move",
        "node": 8,
        "x": 88.953,
        "y": 44.513
      },
      {
        "type": "move",
        "node": 4,
        "x": 26.813,
        "y": 10.387
      },
      {
        "type": "move",
        "node": 5,
        "x": 43.265,
        "y": 65.575
      }
    ],
    "metrics": {
      "initialCrossings": 6,
      "bends": 7,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 13.569,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 7.509,
        "crossingToCrossing": 6.012
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "centre-weave",
      "band": 3,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Перехлёсты в середине. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-26",
    "name": "Между рядами",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 53.946,
        "y": 23.588
      },
      {
        "x": 50.063,
        "y": 66.445
      },
      {
        "x": 41.203,
        "y": 18.414
      },
      {
        "x": 15.229,
        "y": 52.37
      },
      {
        "x": 72.44,
        "y": 30.947
      },
      {
        "x": 17.309,
        "y": 24.917
      },
      {
        "x": 85.878,
        "y": 14.17
      },
      {
        "x": 70.473,
        "y": 65.827
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 81.683,
        "y": 79.836
      },
      {
        "type": "move",
        "node": 3,
        "x": 34.934,
        "y": 47.345
      },
      {
        "type": "move",
        "node": 8,
        "x": 89.457,
        "y": 67.918
      },
      {
        "type": "move",
        "node": 1,
        "x": 23.758,
        "y": 71.033
      }
    ],
    "metrics": {
      "initialCrossings": 10,
      "bends": 7,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 13.753,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.725,
        "crossingToCrossing": 2.927
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "offset-bands",
      "band": 3,
      "targetLayout": "columns"
    },
    "idea": "Сдвинутые ряды. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-27",
    "name": "Ломаная дорожка",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 84.479,
        "y": 16.557
      },
      {
        "x": 50.056,
        "y": 82.927
      },
      {
        "x": 12.207,
        "y": 17.737
      },
      {
        "x": 69.136,
        "y": 65.411
      },
      {
        "x": 61.289,
        "y": 22.789
      },
      {
        "x": 80.309,
        "y": 41.523
      },
      {
        "x": 56.407,
        "y": 37.879
      },
      {
        "x": 25.516,
        "y": 53.456
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 64.623,
        "y": 47.517
      },
      {
        "type": "move",
        "node": 7,
        "x": 86.947,
        "y": 79.185
      },
      {
        "type": "move",
        "node": 5,
        "x": 79.884,
        "y": 53.448
      },
      {
        "type": "move",
        "node": 2,
        "x": 28.24,
        "y": 21.304
      },
      {
        "type": "move",
        "node": 1,
        "x": 17.002,
        "y": 44.175
      },
      {
        "type": "move",
        "node": 3,
        "x": 45.867,
        "y": 50.877
      }
    ],
    "metrics": {
      "initialCrossings": 12,
      "bends": 7,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 15.86,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.934,
        "crossingToCrossing": 3.793
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "crossed-zigzag",
      "band": 3,
      "targetLayout": "rays"
    },
    "idea": "Зигзаг с перехлёстами. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-28",
    "name": "Дуга вокруг",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 52.463,
        "y": 86.399
      },
      {
        "x": 51.963,
        "y": 10.145
      },
      {
        "x": 83.901,
        "y": 53.664
      },
      {
        "x": 54.74,
        "y": 49.509
      },
      {
        "x": 15.92,
        "y": 49.938
      },
      {
        "x": 59.494,
        "y": 72.119
      },
      {
        "x": 67.403,
        "y": 18.736
      },
      {
        "x": 33.308,
        "y": 73.542
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 25.612,
        "y": 59.432
      },
      {
        "type": "move",
        "node": 5,
        "x": 82.059,
        "y": 69.432
      },
      {
        "type": "move",
        "node": 1,
        "x": 18.641,
        "y": 10.189
      },
      {
        "type": "move",
        "node": 7,
        "x": 48.572,
        "y": 70.221
      }
    ],
    "metrics": {
      "initialCrossings": 8,
      "bends": 7,
      "referenceMoves": 4,
      "optimal": false,
      "initialPointSpacing": 15.917,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.519,
        "crossingToCrossing": 4.007
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 4,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "open-arc",
      "band": 3,
      "targetLayout": "rows"
    },
    "idea": "Открытая дуга. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-29",
    "name": "Вернуть нить назад",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 42.343,
        "y": 29.236
      },
      {
        "x": 36.321,
        "y": 68.432
      },
      {
        "x": 67.861,
        "y": 17.405
      },
      {
        "x": 42.721,
        "y": 10.807
      },
      {
        "x": 62.34,
        "y": 57.838
      },
      {
        "x": 29.592,
        "y": 46.871
      },
      {
        "x": 85.306,
        "y": 10.122
      },
      {
        "x": 48.683,
        "y": 63.189
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 58.614,
        "y": 36.912
      },
      {
        "type": "move",
        "node": 1,
        "x": 15.831,
        "y": 56.399
      },
      {
        "type": "move",
        "node": 3,
        "x": 41.028,
        "y": 51.783
      },
      {
        "type": "move",
        "node": 7,
        "x": 80.02,
        "y": 34.074
      },
      {
        "type": "move",
        "node": 6,
        "x": 71.911,
        "y": 69.83
      },
      {
        "type": "move",
        "node": 8,
        "x": 84.402,
        "y": 57.838
      }
    ],
    "metrics": {
      "initialCrossings": 10,
      "bends": 7,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 13.428,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.536,
        "crossingToCrossing": 4.412
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "end-return",
      "band": 3,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Кончик через петлю. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-30",
    "name": "Петля с изгибом",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 38.189,
        "y": 41.652
      },
      {
        "x": 14.286,
        "y": 22.127
      },
      {
        "x": 68.949,
        "y": 79.276
      },
      {
        "x": 65.303,
        "y": 28.383
      },
      {
        "x": 34.657,
        "y": 65.753
      },
      {
        "x": 74.332,
        "y": 47.872
      },
      {
        "x": 27.407,
        "y": 17.074
      },
      {
        "x": 32.224,
        "y": 80.313
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 7,
        "x": 69.128,
        "y": 10.149
      },
      {
        "type": "move",
        "node": 1,
        "x": 21.786,
        "y": 54.651
      },
      {
        "type": "move",
        "node": 8,
        "x": 82.037,
        "y": 22.178
      },
      {
        "type": "move",
        "node": 5,
        "x": 57.981,
        "y": 53.972
      },
      {
        "type": "move",
        "node": 3,
        "x": 47.835,
        "y": 79.137
      }
    ],
    "metrics": {
      "initialCrossings": 9,
      "bends": 7,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 14.06,
      "initialCrossingCoverLowerBound": 2,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.532,
        "crossingToCrossing": 3.588
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "wide-loop",
      "band": 3,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Широкий разворот. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-31",
    "name": "Двойная складка",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 19.23,
        "y": 58.674
      },
      {
        "x": 85.344,
        "y": 62.545
      },
      {
        "x": 29.04,
        "y": 74.465
      },
      {
        "x": 33.734,
        "y": 17.825
      },
      {
        "x": 87.617,
        "y": 40.655
      },
      {
        "x": 55.506,
        "y": 12.106
      },
      {
        "x": 70.565,
        "y": 79.231
      },
      {
        "x": 73.849,
        "y": 18.936
      },
      {
        "x": 20.409,
        "y": 34.036
      },
      {
        "x": 52.62,
        "y": 83.982
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 39.05,
        "y": 78.644
      },
      {
        "type": "move",
        "node": 9,
        "x": 81.927,
        "y": 79.171
      },
      {
        "type": "move",
        "node": 8,
        "x": 71.597,
        "y": 54.555
      },
      {
        "type": "move",
        "node": 5,
        "x": 39.388,
        "y": 28.281
      },
      {
        "type": "move",
        "node": 7,
        "x": 61.232,
        "y": 64.217
      },
      {
        "type": "move",
        "node": 2,
        "x": 22.845,
        "y": 21.623
      }
    ],
    "metrics": {
      "initialCrossings": 15,
      "bends": 9,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 16.026,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 7.083,
        "crossingToCrossing": 3.731
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "single-fold",
      "band": 4,
      "targetLayout": "columns"
    },
    "idea": "Одна складка. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-32",
    "name": "Петля слева и справа",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 42.493,
        "y": 14.222
      },
      {
        "x": 87.011,
        "y": 47.558
      },
      {
        "x": 24.848,
        "y": 28.068
      },
      {
        "x": 18.987,
        "y": 48.172
      },
      {
        "x": 62.566,
        "y": 13.919
      },
      {
        "x": 43.667,
        "y": 82.152
      },
      {
        "x": 65.273,
        "y": 81.122
      },
      {
        "x": 79.941,
        "y": 26.321
      },
      {
        "x": 25.884,
        "y": 69.439
      },
      {
        "x": 79.913,
        "y": 69.717
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 12.797,
        "y": 33.571
      },
      {
        "type": "move",
        "node": 10,
        "x": 29.623,
        "y": 79.924
      },
      {
        "type": "move",
        "node": 8,
        "x": 46.074,
        "y": 63.547
      },
      {
        "type": "move",
        "node": 6,
        "x": 67.939,
        "y": 30.134
      },
      {
        "type": "move",
        "node": 2,
        "x": 15.033,
        "y": 17.933
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 15.899,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.707,
        "crossingToCrossing": 4.024
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "separate-loops",
      "band": 4,
      "targetLayout": "rays"
    },
    "idea": "Две разнесённые петли. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-33",
    "name": "По двум диагоналям",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 26.514,
        "y": 25.096
      },
      {
        "x": 62.181,
        "y": 82.127
      },
      {
        "x": 82.549,
        "y": 29.382
      },
      {
        "x": 65.277,
        "y": 14.898
      },
      {
        "x": 23.145,
        "y": 66.105
      },
      {
        "x": 18.336,
        "y": 45.547
      },
      {
        "x": 42.149,
        "y": 14.385
      },
      {
        "x": 81.236,
        "y": 68.623
      },
      {
        "x": 39.93,
        "y": 80.786
      },
      {
        "x": 87.561,
        "y": 51.663
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 15.083,
        "y": 10.409
      },
      {
        "type": "move",
        "node": 10,
        "x": 50.039,
        "y": 84.286
      },
      {
        "type": "move",
        "node": 2,
        "x": 37.247,
        "y": 24.895
      },
      {
        "type": "move",
        "node": 4,
        "x": 72.946,
        "y": 39.445
      },
      {
        "type": "move",
        "node": 7,
        "x": 45.226,
        "y": 60.384
      },
      {
        "type": "move",
        "node": 6,
        "x": 54.721,
        "y": 69.369
      }
    ],
    "metrics": {
      "initialCrossings": 11,
      "bends": 9,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 16.634,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.429,
        "crossingToCrossing": 4.211
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "diagonal-return",
      "band": 4,
      "targetLayout": "rows"
    },
    "idea": "Возврат по диагонали. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-34",
    "name": "Вдоль двух краёв",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 18.521,
        "y": 44.39
      },
      {
        "x": 27.3,
        "y": 23.995
      },
      {
        "x": 87.43,
        "y": 52.081
      },
      {
        "x": 67.363,
        "y": 15.435
      },
      {
        "x": 60.007,
        "y": 83.044
      },
      {
        "x": 47.657,
        "y": 12.644
      },
      {
        "x": 78.117,
        "y": 72.655
      },
      {
        "x": 82.974,
        "y": 30.038
      },
      {
        "x": 36.795,
        "y": 79.631
      },
      {
        "x": 22.723,
        "y": 65.411
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 9,
        "x": 86.683,
        "y": 82.141
      },
      {
        "type": "move",
        "node": 5,
        "x": 41.802,
        "y": 33.413
      },
      {
        "type": "move",
        "node": 6,
        "x": 56.839,
        "y": 67.899
      },
      {
        "type": "move",
        "node": 3,
        "x": 35.225,
        "y": 56.536
      },
      {
        "type": "move",
        "node": 4,
        "x": 36.214,
        "y": 13.263
      }
    ],
    "metrics": {
      "initialCrossings": 11,
      "bends": 9,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 16.998,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.679,
        "crossingToCrossing": 3.316
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "outer-turn",
      "band": 4,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Поворот у края. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-35",
    "name": "Плотная середина",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 17.345,
        "y": 44.002
      },
      {
        "x": 22.327,
        "y": 66.633
      },
      {
        "x": 88.199,
        "y": 54.954
      },
      {
        "x": 61.074,
        "y": 82.997
      },
      {
        "x": 28.241,
        "y": 22.005
      },
      {
        "x": 78.782,
        "y": 72.978
      },
      {
        "x": 67.178,
        "y": 15.005
      },
      {
        "x": 38.17,
        "y": 80.707
      },
      {
        "x": 45.548,
        "y": 12.865
      },
      {
        "x": 84.281,
        "y": 30.41
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 4,
        "x": 40.171,
        "y": 29.004
      },
      {
        "type": "move",
        "node": 6,
        "x": 59.914,
        "y": 55.306
      },
      {
        "type": "move",
        "node": 7,
        "x": 57.211,
        "y": 36.128
      },
      {
        "type": "move",
        "node": 9,
        "x": 75.069,
        "y": 53.764
      },
      {
        "type": "move",
        "node": 8,
        "x": 54.663,
        "y": 20.756
      },
      {
        "type": "move",
        "node": 3,
        "x": 41.884,
        "y": 70.513
      },
      {
        "type": "move",
        "node": 5,
        "x": 45.039,
        "y": 46.532
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 15.749,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.762,
        "crossingToCrossing": 3.453
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 7,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "centre-weave",
      "band": 4,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Перехлёсты в середине. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-36",
    "name": "Три сдвинутых ряда",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 37.092,
        "y": 15.444
      },
      {
        "x": 88.96,
        "y": 42.135
      },
      {
        "x": 59.508,
        "y": 12.396
      },
      {
        "x": 16.76,
        "y": 51.81
      },
      {
        "x": 79.847,
        "y": 23.53
      },
      {
        "x": 45.981,
        "y": 83.508
      },
      {
        "x": 67.499,
        "y": 81.198
      },
      {
        "x": 26.037,
        "y": 72.344
      },
      {
        "x": 84.817,
        "y": 65.643
      },
      {
        "x": 20.947,
        "y": 30.784
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 53.568,
        "y": 60.068
      },
      {
        "type": "move",
        "node": 10,
        "x": 86.418,
        "y": 14.185
      },
      {
        "type": "move",
        "node": 3,
        "x": 38.39,
        "y": 62.252
      },
      {
        "type": "move",
        "node": 5,
        "x": 53.303,
        "y": 26.157
      },
      {
        "type": "move",
        "node": 2,
        "x": 29.093,
        "y": 48.89
      },
      {
        "type": "move",
        "node": 8,
        "x": 63.033,
        "y": 37.765
      },
      {
        "type": "move",
        "node": 1,
        "x": 12.949,
        "y": 66.038
      },
      {
        "type": "move",
        "node": 4,
        "x": 47.043,
        "y": 11.476
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 8,
      "optimal": false,
      "initialPointSpacing": 14.265,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.617,
        "crossingToCrossing": 3.165
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 8,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "offset-bands",
      "band": 4,
      "targetLayout": "columns"
    },
    "idea": "Сдвинутые ряды. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-37",
    "name": "Длинный зигзаг",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 58.877,
        "y": 12.702
      },
      {
        "x": 46.86,
        "y": 83.252
      },
      {
        "x": 38.231,
        "y": 15.455
      },
      {
        "x": 67.346,
        "y": 80.737
      },
      {
        "x": 17.658,
        "y": 51.268
      },
      {
        "x": 28.322,
        "y": 73.722
      },
      {
        "x": 22.731,
        "y": 29.313
      },
      {
        "x": 78.437,
        "y": 23.04
      },
      {
        "x": 88.098,
        "y": 42.697
      },
      {
        "x": 84.056,
        "y": 65.323
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 7,
        "x": 62.802,
        "y": 33.148
      },
      {
        "type": "move",
        "node": 6,
        "x": 79.956,
        "y": 12.058
      },
      {
        "type": "move",
        "node": 5,
        "x": 28.341,
        "y": 61.742
      },
      {
        "type": "move",
        "node": 1,
        "x": 21.083,
        "y": 18.74
      },
      {
        "type": "move",
        "node": 4,
        "x": 46.976,
        "y": 35.051
      },
      {
        "type": "move",
        "node": 3,
        "x": 53.258,
        "y": 21.892
      },
      {
        "type": "move",
        "node": 2,
        "x": 34.47,
        "y": 49.408
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 15.638,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 7.776,
        "crossingToCrossing": 3.068
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 7,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "crossed-zigzag",
      "band": 4,
      "targetLayout": "rays"
    },
    "idea": "Зигзаг с перехлёстами. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-38",
    "name": "Две открытые дуги",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 86.123,
        "y": 57.698
      },
      {
        "x": 33.773,
        "y": 18.598
      },
      {
        "x": 73.032,
        "y": 19.172
      },
      {
        "x": 73.997,
        "y": 76.09
      },
      {
        "x": 20.392,
        "y": 36.601
      },
      {
        "x": 85.788,
        "y": 37.164
      },
      {
        "x": 50.684,
        "y": 12.64
      },
      {
        "x": 54.121,
        "y": 83.421
      },
      {
        "x": 33.155,
        "y": 76.964
      },
      {
        "x": 20.652,
        "y": 60.157
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 22.766,
        "y": 47.507
      },
      {
        "type": "move",
        "node": 5,
        "x": 44.495,
        "y": 22.575
      },
      {
        "type": "move",
        "node": 7,
        "x": 56.85,
        "y": 31.749
      },
      {
        "type": "move",
        "node": 4,
        "x": 32.71,
        "y": 30.828
      },
      {
        "type": "move",
        "node": 1,
        "x": 12.298,
        "y": 25.327
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 17.93,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.758,
        "crossingToCrossing": 4.949
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "open-arc",
      "band": 4,
      "targetLayout": "rays"
    },
    "idea": "Открытая дуга. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-39",
    "name": "Кончик за петлёй",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 18.931,
        "y": 40.486
      },
      {
        "x": 84.769,
        "y": 33.198
      },
      {
        "x": 86.443,
        "y": 58.09
      },
      {
        "x": 49.662,
        "y": 12.066
      },
      {
        "x": 32.732,
        "y": 77.359
      },
      {
        "x": 71.888,
        "y": 17.668
      },
      {
        "x": 73.458,
        "y": 77.218
      },
      {
        "x": 20.074,
        "y": 59.776
      },
      {
        "x": 30.913,
        "y": 20.086
      },
      {
        "x": 53.047,
        "y": 84.1
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 2,
        "x": 46.32,
        "y": 34.374
      },
      {
        "type": "move",
        "node": 9,
        "x": 80.798,
        "y": 86.689
      },
      {
        "type": "move",
        "node": 5,
        "x": 62.439,
        "y": 53.296
      },
      {
        "type": "move",
        "node": 6,
        "x": 61.348,
        "y": 71.646
      },
      {
        "type": "move",
        "node": 3,
        "x": 46.911,
        "y": 56.966
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 5,
      "optimal": false,
      "initialPointSpacing": 18.917,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.523,
        "crossingToCrossing": 4.26
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 5,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "end-return",
      "band": 4,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Кончик через петлю. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-40",
    "name": "Широкая путаница",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 18.798,
        "y": 43.96
      },
      {
        "x": 27.596,
        "y": 23.819
      },
      {
        "x": 61.849,
        "y": 82.632
      },
      {
        "x": 68.289,
        "y": 15.893
      },
      {
        "x": 82.63,
        "y": 29.761
      },
      {
        "x": 22.723,
        "y": 65.048
      },
      {
        "x": 80.001,
        "y": 70.227
      },
      {
        "x": 45.083,
        "y": 13.124
      },
      {
        "x": 38.243,
        "y": 80.376
      },
      {
        "x": 87.186,
        "y": 52.185
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 42.075,
        "y": 32.353
      },
      {
        "type": "move",
        "node": 8,
        "x": 59.393,
        "y": 37.995
      },
      {
        "type": "move",
        "node": 9,
        "x": 55.501,
        "y": 15.28
      },
      {
        "type": "move",
        "node": 6,
        "x": 51.334,
        "y": 55.709
      },
      {
        "type": "move",
        "node": 4,
        "x": 38.814,
        "y": 68.733
      },
      {
        "type": "move",
        "node": 3,
        "x": 32.852,
        "y": 53.771
      }
    ],
    "metrics": {
      "initialCrossings": 13,
      "bends": 9,
      "referenceMoves": 6,
      "optimal": false,
      "initialPointSpacing": 17.31,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.674,
        "crossingToCrossing": 2.874
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 6,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "wide-loop",
      "band": 4,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Широкий разворот. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-41",
    "name": "Складки одна над другой",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 87.765,
        "y": 57.395
      },
      {
        "x": 19.255,
        "y": 35.605
      },
      {
        "x": 26.575,
        "y": 71.784
      },
      {
        "x": 41.43,
        "y": 81.072
      },
      {
        "x": 27.464,
        "y": 23.323
      },
      {
        "x": 44.191,
        "y": 14.141
      },
      {
        "x": 88.559,
        "y": 42.003
      },
      {
        "x": 62.718,
        "y": 14.374
      },
      {
        "x": 75.652,
        "y": 75.184
      },
      {
        "x": 79.608,
        "y": 24.407
      },
      {
        "x": 17.798,
        "y": 55.723
      },
      {
        "x": 58.962,
        "y": 82.435
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 7,
        "x": 53.257,
        "y": 49.87
      },
      {
        "type": "move",
        "node": 4,
        "x": 40.883,
        "y": 61.07
      },
      {
        "type": "move",
        "node": 3,
        "x": 32.344,
        "y": 46.327
      },
      {
        "type": "move",
        "node": 9,
        "x": 71.182,
        "y": 37.603
      },
      {
        "type": "move",
        "node": 1,
        "x": 18.738,
        "y": 16.987
      },
      {
        "type": "move",
        "node": 8,
        "x": 64.756,
        "y": 64.77
      },
      {
        "type": "move",
        "node": 11,
        "x": 83.016,
        "y": 86.474
      }
    ],
    "metrics": {
      "initialCrossings": 19,
      "bends": 11,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 14.773,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.171,
        "crossingToCrossing": 2.819
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 7,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "single-fold",
      "band": 5,
      "targetLayout": "columns"
    },
    "idea": "Одна складка. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-42",
    "name": "Разнести петли",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 18.155,
        "y": 49.397
      },
      {
        "x": 22.983,
        "y": 30.208
      },
      {
        "x": 87.872,
        "y": 48.084
      },
      {
        "x": 22.766,
        "y": 65.42
      },
      {
        "x": 51.908,
        "y": 82.939
      },
      {
        "x": 35.764,
        "y": 17.612
      },
      {
        "x": 70.411,
        "y": 17.712
      },
      {
        "x": 55.493,
        "y": 13.133
      },
      {
        "x": 68.422,
        "y": 79.352
      },
      {
        "x": 83.257,
        "y": 30.621
      },
      {
        "x": 34.982,
        "y": 77.929
      },
      {
        "x": 82.209,
        "y": 67.097
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 12,
        "x": 26.843,
        "y": 84.95
      },
      {
        "type": "move",
        "node": 9,
        "x": 71.307,
        "y": 49.159
      },
      {
        "type": "move",
        "node": 10,
        "x": 60.056,
        "y": 62.356
      },
      {
        "type": "move",
        "node": 3,
        "x": 41.099,
        "y": 34.552
      },
      {
        "type": "move",
        "node": 7,
        "x": 51.256,
        "y": 51.4
      },
      {
        "type": "move",
        "node": 5,
        "x": 58.095,
        "y": 39.468
      },
      {
        "type": "move",
        "node": 8,
        "x": 41.691,
        "y": 63.627
      },
      {
        "type": "move",
        "node": 6,
        "x": 81.235,
        "y": 20.584
      }
    ],
    "metrics": {
      "initialCrossings": 16,
      "bends": 11,
      "referenceMoves": 8,
      "optimal": false,
      "initialPointSpacing": 15.605,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.427,
        "crossingToCrossing": 3.445
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 8,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "separate-loops",
      "band": 5,
      "targetLayout": "rays"
    },
    "idea": "Две разнесённые петли. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-43",
    "name": "Диагональ за диагональю",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 85.317,
        "y": 34.089
      },
      {
        "x": 40.84,
        "y": 14.309
      },
      {
        "x": 18.235,
        "y": 43.406
      },
      {
        "x": 57.426,
        "y": 12.366
      },
      {
        "x": 21.774,
        "y": 64.321
      },
      {
        "x": 72.803,
        "y": 18.361
      },
      {
        "x": 80.038,
        "y": 70.861
      },
      {
        "x": 25.912,
        "y": 25.202
      },
      {
        "x": 47.62,
        "y": 83.495
      },
      {
        "x": 66.391,
        "y": 81.196
      },
      {
        "x": 31.545,
        "y": 76.406
      },
      {
        "x": 87.973,
        "y": 50.42
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 69.339,
        "y": 37.516
      },
      {
        "type": "move",
        "node": 9,
        "x": 52.759,
        "y": 62.4
      },
      {
        "type": "move",
        "node": 2,
        "x": 60.244,
        "y": 26.275
      },
      {
        "type": "move",
        "node": 4,
        "x": 49.684,
        "y": 37.178
      },
      {
        "type": "move",
        "node": 11,
        "x": 77.922,
        "y": 83.27
      },
      {
        "type": "move",
        "node": 5,
        "x": 29.066,
        "y": 36.962
      },
      {
        "type": "move",
        "node": 1,
        "x": 16.09,
        "y": 16.329
      },
      {
        "type": "move",
        "node": 6,
        "x": 34.309,
        "y": 50.782
      },
      {
        "type": "move",
        "node": 8,
        "x": 75.883,
        "y": 57.573
      },
      {
        "type": "move",
        "node": 7,
        "x": 63.076,
        "y": 53.849
      }
    ],
    "metrics": {
      "initialCrossings": 19,
      "bends": 11,
      "referenceMoves": 10,
      "optimal": false,
      "initialPointSpacing": 15.541,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.834,
        "crossingToCrossing": 2.884
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 10,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "diagonal-return",
      "band": 5,
      "targetLayout": "rays"
    },
    "idea": "Возврат по диагонали. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-44",
    "name": "Обойти середину",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 87.341,
        "y": 37.002
      },
      {
        "x": 26.398,
        "y": 24.354
      },
      {
        "x": 42.143,
        "y": 14.728
      },
      {
        "x": 17.872,
        "y": 56.378
      },
      {
        "x": 79.179,
        "y": 23.92
      },
      {
        "x": 63.478,
        "y": 81.384
      },
      {
        "x": 88.174,
        "y": 56.198
      },
      {
        "x": 79.025,
        "y": 72.234
      },
      {
        "x": 18.101,
        "y": 38.777
      },
      {
        "x": 44.377,
        "y": 81.874
      },
      {
        "x": 29.095,
        "y": 74.185
      },
      {
        "x": 61.36,
        "y": 14.065
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 41.055,
        "y": 28.463
      },
      {
        "type": "move",
        "node": 5,
        "x": 54.517,
        "y": 31.379
      },
      {
        "type": "move",
        "node": 8,
        "x": 68.243,
        "y": 66.277
      },
      {
        "type": "move",
        "node": 11,
        "x": 86.668,
        "y": 12.395
      },
      {
        "type": "move",
        "node": 10,
        "x": 73.616,
        "y": 52.571
      },
      {
        "type": "move",
        "node": 1,
        "x": 15.691,
        "y": 13.447
      },
      {
        "type": "move",
        "node": 9,
        "x": 74.699,
        "y": 38.612
      }
    ],
    "metrics": {
      "initialCrossings": 17,
      "bends": 11,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 15.419,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 2.618,
        "crossingToCrossing": 2.846
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 11,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "outer-turn",
      "band": 5,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Поворот у края. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-45",
    "name": "Большое переплетение",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 88.737,
        "y": 56.747
      },
      {
        "x": 88.941,
        "y": 40.047
      },
      {
        "x": 17.502,
        "y": 38.405
      },
      {
        "x": 16.898,
        "y": 55.258
      },
      {
        "x": 25.05,
        "y": 70.973
      },
      {
        "x": 77.269,
        "y": 74.507
      },
      {
        "x": 27.352,
        "y": 22.703
      },
      {
        "x": 80.617,
        "y": 24.665
      },
      {
        "x": 43.578,
        "y": 82.024
      },
      {
        "x": 63.251,
        "y": 14.194
      },
      {
        "x": 45.087,
        "y": 13.628
      },
      {
        "x": 63.172,
        "y": 81.827
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 1,
        "x": 14.234,
        "y": 27.913
      },
      {
        "type": "move",
        "node": 2,
        "x": 26.3,
        "y": 86.634
      },
      {
        "type": "move",
        "node": 11,
        "x": 88.627,
        "y": 74.419
      },
      {
        "type": "move",
        "node": 7,
        "x": 54.627,
        "y": 58.544
      },
      {
        "type": "move",
        "node": 10,
        "x": 75.343,
        "y": 61.755
      },
      {
        "type": "move",
        "node": 4,
        "x": 40.86,
        "y": 68.958
      },
      {
        "type": "move",
        "node": 6,
        "x": 45.639,
        "y": 33.199
      },
      {
        "type": "move",
        "node": 5,
        "x": 38.649,
        "y": 54.724
      }
    ],
    "metrics": {
      "initialCrossings": 19,
      "bends": 11,
      "referenceMoves": 8,
      "optimal": false,
      "initialPointSpacing": 14.268,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.337,
        "crossingToCrossing": 2.844
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 8,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "centre-weave",
      "band": 5,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Перехлёсты в середине. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-46",
    "name": "Ряд поверх ряда",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 32.59,
        "y": 18
      },
      {
        "x": 70.368,
        "y": 16.07
      },
      {
        "x": 17.336,
        "y": 51.257
      },
      {
        "x": 88.636,
        "y": 44.437
      },
      {
        "x": 49.679,
        "y": 11.645
      },
      {
        "x": 35.977,
        "y": 80.122
      },
      {
        "x": 23.751,
        "y": 69.062
      },
      {
        "x": 84.502,
        "y": 65.357
      },
      {
        "x": 22.131,
        "y": 29.498
      },
      {
        "x": 52.405,
        "y": 84.508
      },
      {
        "x": 82.006,
        "y": 26.592
      },
      {
        "x": 73.466,
        "y": 77.96
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 6,
        "x": 48.912,
        "y": 60.061
      },
      {
        "type": "move",
        "node": 12,
        "x": 87.974,
        "y": 83.029
      },
      {
        "type": "move",
        "node": 8,
        "x": 59.723,
        "y": 44.714
      },
      {
        "type": "move",
        "node": 1,
        "x": 12.645,
        "y": 38.161
      },
      {
        "type": "move",
        "node": 11,
        "x": 71.125,
        "y": 87.309
      },
      {
        "type": "move",
        "node": 4,
        "x": 39.964,
        "y": 47.627
      },
      {
        "type": "move",
        "node": 5,
        "x": 48.27,
        "y": 73.1
      },
      {
        "type": "move",
        "node": 10,
        "x": 68.02,
        "y": 54.955
      },
      {
        "type": "move",
        "node": 2,
        "x": 23.184,
        "y": 15.784
      },
      {
        "type": "move",
        "node": 9,
        "x": 62.945,
        "y": 70.322
      },
      {
        "type": "move",
        "node": 7,
        "x": 54.037,
        "y": 27.998
      }
    ],
    "metrics": {
      "initialCrossings": 25,
      "bends": 11,
      "referenceMoves": 11,
      "optimal": false,
      "initialPointSpacing": 14.653,
      "initialCrossingCoverLowerBound": 4,
      "initialVisualClearance": {
        "pointToOtherSegment": 5.06,
        "crossingToCrossing": 3.391
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 11,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "offset-bands",
      "band": 5,
      "targetLayout": "columns"
    },
    "idea": "Сдвинутые ряды. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-47",
    "name": "Последний зигзаг",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 56.19,
        "y": 12.663
      },
      {
        "x": 16.295,
        "y": 43.991
      },
      {
        "x": 36.478,
        "y": 16.276
      },
      {
        "x": 70.438,
        "y": 79.269
      },
      {
        "x": 19.227,
        "y": 62.372
      },
      {
        "x": 30.195,
        "y": 75.905
      },
      {
        "x": 22.237,
        "y": 28.363
      },
      {
        "x": 83.531,
        "y": 67.969
      },
      {
        "x": 86.894,
        "y": 33.892
      },
      {
        "x": 73.636,
        "y": 18.581
      },
      {
        "x": 51.417,
        "y": 83.437
      },
      {
        "x": 89.639,
        "y": 52.532
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 3,
        "x": 36.954,
        "y": 31.612
      },
      {
        "type": "move",
        "node": 2,
        "x": 27.297,
        "y": 47.546
      },
      {
        "type": "move",
        "node": 11,
        "x": 59.305,
        "y": 73.322
      },
      {
        "type": "move",
        "node": 4,
        "x": 50.832,
        "y": 35.816
      },
      {
        "type": "move",
        "node": 12,
        "x": 81.083,
        "y": 83.619
      },
      {
        "type": "move",
        "node": 8,
        "x": 73.068,
        "y": 35.931
      },
      {
        "type": "move",
        "node": 10,
        "x": 69.48,
        "y": 62.035
      },
      {
        "type": "move",
        "node": 5,
        "x": 30.002,
        "y": 61.319
      },
      {
        "type": "move",
        "node": 7,
        "x": 85.164,
        "y": 18.676
      },
      {
        "type": "move",
        "node": 1,
        "x": 12.883,
        "y": 21.078
      }
    ],
    "metrics": {
      "initialCrossings": 19,
      "bends": 11,
      "referenceMoves": 10,
      "optimal": false,
      "initialPointSpacing": 16.601,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.397,
        "crossingToCrossing": 2.9
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 10,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "crossed-zigzag",
      "band": 5,
      "targetLayout": "rays"
    },
    "idea": "Зигзаг с перехлёстами. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-48",
    "name": "Дуга за дугой",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 18.162,
        "y": 48.513
      },
      {
        "x": 78.32,
        "y": 23.128
      },
      {
        "x": 79.886,
        "y": 71.029
      },
      {
        "x": 48.726,
        "y": 12.066
      },
      {
        "x": 33.727,
        "y": 17.836
      },
      {
        "x": 34.743,
        "y": 78.839
      },
      {
        "x": 86.642,
        "y": 38.583
      },
      {
        "x": 22.224,
        "y": 31.026
      },
      {
        "x": 65.672,
        "y": 14.272
      },
      {
        "x": 65.481,
        "y": 81.805
      },
      {
        "x": 49.879,
        "y": 84.062
      },
      {
        "x": 86.687,
        "y": 57.242
      },
      {
        "x": 22.205,
        "y": 64.935
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 8,
        "x": 51.079,
        "y": 56.433
      },
      {
        "type": "move",
        "node": 13,
        "x": 24.507,
        "y": 87.984
      },
      {
        "type": "move",
        "node": 2,
        "x": 36.887,
        "y": 39.518
      },
      {
        "type": "move",
        "node": 9,
        "x": 42.79,
        "y": 70.372
      },
      {
        "type": "move",
        "node": 6,
        "x": 86.736,
        "y": 11.171
      },
      {
        "type": "move",
        "node": 5,
        "x": 66.099,
        "y": 25.241
      },
      {
        "type": "move",
        "node": 3,
        "x": 51.834,
        "y": 27.285
      },
      {
        "type": "move",
        "node": 11,
        "x": 55.211,
        "y": 74.657
      },
      {
        "type": "move",
        "node": 12,
        "x": 88.136,
        "y": 87.985
      }
    ],
    "metrics": {
      "initialCrossings": 22,
      "bends": 12,
      "referenceMoves": 9,
      "optimal": false,
      "initialPointSpacing": 15.373,
      "initialCrossingCoverLowerBound": 4,
      "initialVisualClearance": {
        "pointToOtherSegment": 6.16,
        "crossingToCrossing": 3.82
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 9,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "open-arc",
      "band": 5,
      "targetLayout": "columns"
    },
    "idea": "Открытая дуга. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-49",
    "name": "Найти свободный конец",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 36.917,
        "y": 79.463
      },
      {
        "x": 20.954,
        "y": 35.324
      },
      {
        "x": 69.02,
        "y": 79.498
      },
      {
        "x": 31.705,
        "y": 20.078
      },
      {
        "x": 18.813,
        "y": 50.76
      },
      {
        "x": 46.144,
        "y": 13.095
      },
      {
        "x": 61.361,
        "y": 13.451
      },
      {
        "x": 82.308,
        "y": 66.493
      },
      {
        "x": 74.45,
        "y": 20.206
      },
      {
        "x": 52.799,
        "y": 83.624
      },
      {
        "x": 84.71,
        "y": 34.444
      },
      {
        "x": 87.214,
        "y": 50.37
      },
      {
        "x": 25.053,
        "y": 68.641
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 10,
        "x": 64.252,
        "y": 59.687
      },
      {
        "type": "move",
        "node": 12,
        "x": 89.41,
        "y": 18.954
      },
      {
        "type": "move",
        "node": 3,
        "x": 30.319,
        "y": 47.425
      },
      {
        "type": "move",
        "node": 7,
        "x": 48.607,
        "y": 65.505
      },
      {
        "type": "move",
        "node": 8,
        "x": 56.518,
        "y": 29.81
      },
      {
        "type": "move",
        "node": 13,
        "x": 88.863,
        "y": 79.485
      },
      {
        "type": "move",
        "node": 5,
        "x": 41.586,
        "y": 33.87
      }
    ],
    "metrics": {
      "initialCrossings": 19,
      "bends": 12,
      "referenceMoves": 7,
      "optimal": false,
      "initialPointSpacing": 14.729,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 4.006,
        "crossingToCrossing": 2.903
      },
      "referenceTargetPolish": {
        "replanned": false,
        "previousReferenceMoves": 7,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "end-return",
      "band": 5,
      "targetLayout": "rising-diagonal"
    },
    "idea": "Кончик через петлю. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  },
  {
    "id": "yarn-50-v1-50",
    "name": "Вся нить",
    "anchor": 0,
    "points": [
      {
        "x": 14,
        "y": 80
      },
      {
        "x": 79.138,
        "y": 72.253
      },
      {
        "x": 21.934,
        "y": 30.182
      },
      {
        "x": 34.948,
        "y": 17.482
      },
      {
        "x": 19.63,
        "y": 61.226
      },
      {
        "x": 67.451,
        "y": 15.693
      },
      {
        "x": 81.795,
        "y": 26.832
      },
      {
        "x": 50.045,
        "y": 12.844
      },
      {
        "x": 45.836,
        "y": 82.569
      },
      {
        "x": 29.487,
        "y": 74.709
      },
      {
        "x": 88.725,
        "y": 43.675
      },
      {
        "x": 62.407,
        "y": 82.049
      },
      {
        "x": 17.062,
        "y": 45.989
      },
      {
        "x": 86.592,
        "y": 60.676
      }
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ]
    ],
    "solution": [
      {
        "type": "move",
        "node": 5,
        "x": 45,
        "y": 56.65
      },
      {
        "type": "move",
        "node": 6,
        "x": 43.284,
        "y": 31.278
      },
      {
        "type": "move",
        "node": 4,
        "x": 35.217,
        "y": 43.106
      },
      {
        "type": "move",
        "node": 13,
        "x": 84.765,
        "y": 12.698
      },
      {
        "type": "move",
        "node": 8,
        "x": 60.253,
        "y": 30.711
      },
      {
        "type": "move",
        "node": 10,
        "x": 73,
        "y": 87.342
      },
      {
        "type": "move",
        "node": 9,
        "x": 67.616,
        "y": 60.374
      },
      {
        "type": "move",
        "node": 12,
        "x": 79.34,
        "y": 52.078
      },
      {
        "type": "move",
        "node": 11,
        "x": 74.258,
        "y": 38.146
      },
      {
        "type": "move",
        "node": 3,
        "x": 40.44,
        "y": 73.377
      },
      {
        "type": "move",
        "node": 1,
        "x": 14.63,
        "y": 12.512
      }
    ],
    "metrics": {
      "initialCrossings": 22,
      "bends": 12,
      "referenceMoves": 11,
      "optimal": false,
      "initialPointSpacing": 13.769,
      "initialCrossingCoverLowerBound": 3,
      "initialVisualClearance": {
        "pointToOtherSegment": 3.425,
        "crossingToCrossing": 3.216
      },
      "referenceTargetPolish": {
        "replanned": true,
        "previousReferenceMoves": 11,
        "minimumPointSpacing": 10.5
      }
    },
    "spec": {
      "family": "wide-loop",
      "band": 5,
      "targetLayout": "falling-diagonal"
    },
    "idea": "Широкий разворот. Перемещай изгибы одной нити, пока перехлёсты не исчезнут."
  }
];
