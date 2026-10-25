// Authored v2 content; checkpoint/channel optimums verified offline. No runtime solver.
export const TUNNEL_LEVELS=[
  {
    "w": 3,
    "h": 3,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 3,
      "y": 1
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-1",
    "name": "Между полками",
    "idea": "Один поворот прямой между закреплёнными полками.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      }
    ],
    "minMoves": 1,
    "route": [
      0,
      1,
      2
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 3,
      "height": 3,
      "pieces": 3,
      "movablePieces": 1,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 3,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 0,
      "verticalSteps": 0,
      "leftSteps": 0,
      "heightSpan": 0,
      "rotationCost": 1,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 1,
      "upperBound": 1,
      "expandedStates": 3,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2
      ],
      "maxRoutePieces": 3,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 3,
    "h": 3,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 3,
      "y": 0
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-2",
    "name": "На верхнюю полку",
    "idea": "Подняться на одну полку выше.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      }
    ],
    "minMoves": 3,
    "route": [
      0,
      1,
      2,
      3
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 3,
      "height": 3,
      "pieces": 4,
      "movablePieces": 2,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 4,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 1,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 3,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 3,
      "upperBound": 3,
      "expandedStates": 4,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3
      ],
      "maxRoutePieces": 4,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 4,
    "h": 3,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 4,
      "y": 1
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-3",
    "name": "Две прямые",
    "idea": "Две прямые детали должны смотреть друг на друга.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      }
    ],
    "minMoves": 2,
    "route": [
      0,
      1,
      2,
      3
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 4,
      "movablePieces": 2,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 4,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 0,
      "verticalSteps": 0,
      "leftSteps": 0,
      "heightSpan": 0,
      "rotationCost": 2,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 2,
      "upperBound": 2,
      "expandedStates": 4,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3
      ],
      "maxRoutePieces": 4,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 4,
    "h": 3,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 4,
      "y": 1
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-4",
    "name": "Перед спуском",
    "idea": "Сменить высоту перед выходом.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      }
    ],
    "minMoves": 1,
    "route": [
      0,
      1,
      2,
      3,
      4
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 5,
      "movablePieces": 3,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 5,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 1,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 1,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 1,
      "upperBound": 1,
      "expandedStates": 5,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4
      ],
      "maxRoutePieces": 5,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 4,
    "h": 3,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 4,
      "y": 1
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-5",
    "name": "Вверх и обратно",
    "idea": "Обогнуть верхний угол и спуститься к цели.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      }
    ],
    "minMoves": 6,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 6,
      "movablePieces": 5,
      "fixedPlatforms": 1,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 6,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 6,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 6,
      "upperBound": 6,
      "expandedStates": 6,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "maxRoutePieces": 6,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 5,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 5,
      "y": 2
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-6",
    "name": "Обратно к полке",
    "idea": "Вернуться влево перед верхней полкой.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 10
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 12,
      "movablePieces": 10,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 12,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 8,
      "verticalSteps": 5,
      "leftSteps": 1,
      "heightSpan": 3,
      "rotationCost": 8,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 15,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "maxRoutePieces": 12,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 6,
      "y": 2
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-7",
    "name": "Нижний обход",
    "idea": "Сначала обойти нижний угол, затем вернуться.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      }
    ],
    "minMoves": 13,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 15,
      "movablePieces": 13,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 15,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 8,
      "verticalSteps": 5,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 13,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 18,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14
      ],
      "maxRoutePieces": 15,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 6,
      "y": 2
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-8",
    "name": "Над длинным пролётом",
    "idea": "Подняться над длинным нижним участком.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 14
      }
    ],
    "minMoves": 16,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 16,
      "movablePieces": 14,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 16,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 16,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 16,
      "upperBound": 16,
      "expandedStates": 18,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15
      ],
      "maxRoutePieces": 16,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 6,
      "y": 3
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-9",
    "name": "Поворот назад",
    "idea": "Найти поворот назад после первого подъёма.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 15,
      "movablePieces": 13,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 15,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 8,
      "verticalSteps": 7,
      "leftSteps": 1,
      "heightSpan": 4,
      "rotationCost": 15,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 17,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14
      ],
      "maxRoutePieces": 15,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 2
    },
    "checkpoints": [],
    "id": "tunnels-50-v2-10",
    "name": "Два подъёма",
    "idea": "Два подъёма разделены обратным ходом.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      }
    ],
    "minMoves": 17,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 5,
      "pieces": 19,
      "movablePieces": 17,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 0,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 17,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 21,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18
      ],
      "maxRoutePieces": 19,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 6,
      "y": 1
    },
    "checkpoints": [
      2
    ],
    "id": "tunnels-50-v2-11",
    "name": "Колокольчик перед спуском",
    "idea": "Пройти колокольчик до спуска на правую полку.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      }
    ],
    "minMoves": 4,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 8,
      "movablePieces": 5,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 1,
      "routePieces": 8,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 4,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 8,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "maxRoutePieces": 8,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 6,
      "y": 3
    },
    "checkpoints": [
      2
    ],
    "id": "tunnels-50-v2-12",
    "name": "Длинный первый пролёт",
    "idea": "Колокольчик расположен в длинном начальном пролёте.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      }
    ],
    "minMoves": 6,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 8,
      "movablePieces": 5,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 1,
      "routePieces": 8,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 6,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 6,
      "upperBound": 6,
      "expandedStates": 8,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "maxRoutePieces": 8,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 6,
      "y": 1
    },
    "checkpoints": [
      2
    ],
    "id": "tunnels-50-v2-13",
    "name": "Высокий правый спуск",
    "idea": "Сохранить путь к отмеченной полке перед высоким спуском.",
    "solution": [
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      }
    ],
    "minMoves": 5,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 9,
      "movablePieces": 6,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 1,
      "routePieces": 9,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 3,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 5,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 5,
      "upperBound": 5,
      "expandedStates": 9,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "maxRoutePieces": 9,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 6,
      "y": 0
    },
    "checkpoints": [
      2
    ],
    "id": "tunnels-50-v2-14",
    "name": "До нижней полки",
    "idea": "Длинный пролёт с колокольчиком заканчивается спуском.",
    "solution": [
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 6,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 9,
      "movablePieces": 6,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 1,
      "routePieces": 9,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 3,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 6,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 6,
      "upperBound": 6,
      "expandedStates": 9,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "maxRoutePieces": 9,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 0
    },
    "end": {
      "x": 6,
      "y": 4
    },
    "checkpoints": [
      2
    ],
    "id": "tunnels-50-v2-15",
    "name": "Полка перед подъёмом",
    "idea": "Посетить отмеченную полку перед двумя подъёмами.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 10,
      "movablePieces": 8,
      "fixedPlatforms": 2,
      "crossings": 0,
      "checkpoints": 1,
      "routePieces": 10,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 4,
      "rotationCost": 8,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 10,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "maxRoutePieces": 10,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 6,
      "y": 0
    },
    "checkpoints": [
      1,
      5
    ],
    "id": "tunnels-50-v2-16",
    "name": "Два спуска",
    "idea": "Два колокольчика разделены двумя спусками.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 9,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 10,
      "movablePieces": 6,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 10,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 4,
      "rotationCost": 9,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 10,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "maxRoutePieces": 10,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 6,
      "y": 0
    },
    "checkpoints": [
      1,
      5
    ],
    "id": "tunnels-50-v2-17",
    "name": "Вниз, затем вверх",
    "idea": "Путь к двум полкам сначала опускается, затем поднимается.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      }
    ],
    "minMoves": 5,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 11,
      "movablePieces": 7,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 11,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 5,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 5,
      "upperBound": 5,
      "expandedStates": 11,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "maxRoutePieces": 11,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 6,
      "y": 3
    },
    "checkpoints": [
      1,
      7
    ],
    "id": "tunnels-50-v2-18",
    "name": "Средний ярус",
    "idea": "Соединить два отмеченных пролёта перед последней сменой высоты.",
    "solution": [
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      }
    ],
    "minMoves": 12,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 11,
      "movablePieces": 8,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 11,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 12,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 11,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "maxRoutePieces": 11,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 4,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 6,
      "y": 3
    },
    "checkpoints": [
      1,
      6
    ],
    "id": "tunnels-50-v2-19",
    "name": "Длинная середина",
    "idea": "Длинный средний пролёт связывает две нужные полки.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      }
    ],
    "minMoves": 11,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 11,
      "movablePieces": 8,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 11,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 11,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 11,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "maxRoutePieces": 11,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 6,
    "h": 5,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 6,
      "y": 4
    },
    "checkpoints": [
      1,
      6
    ],
    "id": "tunnels-50-v2-20",
    "name": "Последний подъём",
    "idea": "Посетить оба пролёта до последнего подъёма.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 11,
      "movablePieces": 8,
      "fixedPlatforms": 3,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 11,
      "repeatedCrossings": 0,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 8,
      "exitRoutes": 1,
      "feasibleRoutes": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 11,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 1,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "maxRoutePieces": 11,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      4,
      10,
      12
    ],
    "id": "tunnels-50-v2-21",
    "name": "Три нужные полки",
    "idea": "Нижний выход короче, но пропускает три нужные полки.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 19,
      "fixedPlatforms": 5,
      "crossings": 0,
      "checkpoints": 3,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 15,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 27,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      5,
      13
    ],
    "id": "tunnels-50-v2-22",
    "name": "Возврат наверху",
    "idea": "Обратный ход выводит к верхней обязательной полке.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 19
      }
    ],
    "minMoves": 21,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 22,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 21,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 21,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 21,
      "upperBound": 21,
      "expandedStates": 30,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      "maxRoutePieces": 26,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      7,
      11
    ],
    "id": "tunnels-50-v2-23",
    "name": "К полке слева",
    "idea": "Сначала подняться, затем вернуться к полке слева.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 14,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 14,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      1,
      8,
      12
    ],
    "id": "tunnels-50-v2-24",
    "name": "Внутренний обход",
    "idea": "Нужные полки находятся внутри длинного обхода.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 18,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 18,
      "fixedPlatforms": 5,
      "crossings": 0,
      "checkpoints": 3,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 4,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 18,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 18,
      "upperBound": 18,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      6,
      11
    ],
    "id": "tunnels-50-v2-25",
    "name": "Длинный путь к полкам",
    "idea": "Короткий выход пропускает обе отмеченные полки.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 22,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 22,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 22,
      "upperBound": 22,
      "expandedStates": 27,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      4,
      13
    ],
    "id": "tunnels-50-v2-26",
    "name": "Перед правым спуском",
    "idea": "Перед правым спуском нужен возврат влево.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 19
      }
    ],
    "minMoves": 20,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 22,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 21,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 20,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 20,
      "upperBound": 20,
      "expandedStates": 30,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      "maxRoutePieces": 26,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      1,
      7,
      12
    ],
    "id": "tunnels-50-v2-27",
    "name": "Два обязательных яруса",
    "idea": "Две высоты обязательны; нижний путь их обходит.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      }
    ],
    "minMoves": 14,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 18,
      "fixedPlatforms": 5,
      "crossings": 0,
      "checkpoints": 3,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 4,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 14,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 27,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      6,
      10
    ],
    "id": "tunnels-50-v2-28",
    "name": "Над коротким выходом",
    "idea": "Три отмеченные полки лежат над коротким обходом.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 15
      }
    ],
    "minMoves": 9,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 17,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 9,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 25,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 22,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      4,
      12
    ],
    "id": "tunnels-50-v2-29",
    "name": "Полки верхнего яруса",
    "idea": "Найти полки верхнего яруса до правого выхода.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "crossings": 0,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 5,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 3,
      "heightSpan": 3,
      "rotationCost": 15,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 28,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      1,
      7,
      11
    ],
    "id": "tunnels-50-v2-30",
    "name": "Обход над выходом",
    "idea": "Обход без верхних полок не завершает трассу.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      }
    ],
    "minMoves": 19,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 21,
      "movablePieces": 16,
      "fixedPlatforms": 5,
      "crossings": 0,
      "checkpoints": 3,
      "routePieces": 17,
      "repeatedCrossings": 0,
      "distractors": 4,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 19,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 19,
      "upperBound": 19,
      "expandedStates": 25,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      "maxRoutePieces": 21,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      5
    ],
    "id": "tunnels-50-v2-31",
    "name": "Поперёк пересечения",
    "idea": "Горизонтальный канал ведёт к колокольчику справа.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 19,
      "fixedPlatforms": 3,
      "crossings": 1,
      "checkpoints": 1,
      "routePieces": 10,
      "repeatedCrossings": 0,
      "distractors": 13,
      "bends": 4,
      "verticalSteps": 3,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 30,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      18,
      20
    ],
    "id": "tunnels-50-v2-32",
    "name": "Снизу наверх",
    "idea": "Войти в вертикальный канал снизу ради верхних полок.",
    "solution": [
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 22
      },
      {
        "type": "turn",
        "piece": 22
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 17,
    "route": [
      0,
      1,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      3,
      17,
      18,
      19,
      20,
      21,
      22,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 17,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 22,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 20,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 11,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 17,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 30,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      3,
      5
    ],
    "id": "tunnels-50-v2-33",
    "name": "Пересечение перед спуском",
    "idea": "Пересечь узел слева направо перед нижним спуском.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 10,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 10,
      "repeatedCrossings": 0,
      "distractors": 13,
      "bends": 4,
      "verticalSteps": 3,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 10,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 28,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      17,
      19
    ],
    "id": "tunnels-50-v2-34",
    "name": "Вверх через середину",
    "idea": "Обойти пересечение снизу и подняться к верхним полкам.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 20
      },
      {
        "type": "turn",
        "piece": 20
      },
      {
        "type": "turn",
        "piece": 20
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 22
      },
      {
        "type": "turn",
        "piece": 22
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      }
    ],
    "minMoves": 18,
    "route": [
      0,
      1,
      10,
      11,
      12,
      13,
      14,
      3,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      6,
      7,
      8,
      9
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 15,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 22,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 20,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 11,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 18,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 18,
      "upperBound": 18,
      "expandedStates": 28,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          0,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      10,
      17
    ],
    "id": "tunnels-50-v2-35",
    "name": "Верхние колокольчики",
    "idea": "Верхние колокольчики доступны через вертикальный канал.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 20
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 14,
    "route": [
      0,
      1,
      9,
      10,
      11,
      12,
      4,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 13,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 14,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 14,
      "upperBound": 14,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          0,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "checkpoints": [
      15,
      17
    ],
    "id": "tunnels-50-v2-36",
    "name": "Левое пересечение",
    "idea": "С нижнего яруса подняться через левое пересечение.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 12,
    "route": [
      0,
      1,
      9,
      10,
      11,
      3,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 12,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 12,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 7,
      "y": 2
    },
    "checkpoints": [
      12,
      19
    ],
    "id": "tunnels-50-v2-37",
    "name": "Спуск по правому краю",
    "idea": "После верхних полок спуститься по внешнему правому краю.",
    "solution": [
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 21
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 12,
    "route": [
      0,
      1,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      4,
      17,
      18,
      19,
      20,
      21,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 17,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 12,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 28,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 1,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 7,
      "y": 2
    },
    "checkpoints": [
      4,
      5
    ],
    "id": "tunnels-50-v2-38",
    "name": "Ближний выход",
    "idea": "Короткий правый путь использует горизонтальный канал.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 11,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 9,
      "repeatedCrossings": 0,
      "distractors": 13,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 11,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 28,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      11,
      18
    ],
    "id": "tunnels-50-v2-39",
    "name": "Другой вход",
    "idea": "Верхние полки требуют другого входа в пересечение.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 19
      },
      {
        "type": "turn",
        "piece": 21
      }
    ],
    "minMoves": 10,
    "route": [
      0,
      1,
      9,
      10,
      11,
      12,
      13,
      14,
      4,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 0,
        "channel": "NS"
      },
      {
        "piece": 15,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 21,
        "incoming": 0,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 0,
      "distractors": 3,
      "bends": 8,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 10,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 0,
        "edges": [
          3,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 2,
        "edges": [
          0,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      4,
      5
    ],
    "id": "tunnels-50-v2-40",
    "name": "Без поворота внутри",
    "idea": "Пройти поперёк пересечения, не сворачивая в верхнюю ветку.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 17,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 9,
      "repeatedCrossings": 0,
      "distractors": 13,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 8,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 26,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      "maxRoutePieces": 23,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      8,
      13
    ],
    "id": "tunnels-50-v2-41",
    "name": "Оба канала",
    "idea": "Нижняя полка доступна после петли над пересечением.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 16
      }
    ],
    "minMoves": 20,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      3,
      11,
      12,
      13,
      14,
      15,
      16,
      17
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 21,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 20,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 20,
      "upperBound": 20,
      "expandedStates": 33,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      "maxRoutePieces": 27,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      10,
      15,
      5
    ],
    "id": "tunnels-50-v2-42",
    "name": "Три полки за обходом",
    "idea": "Три колокольчика нельзя собрать коротким нижним обходом.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 4
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 18
      }
    ],
    "minMoves": 17,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      3,
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 28,
      "movablePieces": 22,
      "fixedPlatforms": 5,
      "crossings": 1,
      "checkpoints": 3,
      "routePieces": 21,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 17,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 37,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27
      ],
      "maxRoutePieces": 29,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      9,
      14
    ],
    "id": "tunnels-50-v2-43",
    "name": "Два прохода",
    "idea": "Вернуться влево над пересечением и пройти его сверху вниз.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      4,
      12,
      13,
      14,
      15,
      16,
      17
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 21,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 15,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 34,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      "maxRoutePieces": 27,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      9,
      14
    ],
    "id": "tunnels-50-v2-44",
    "name": "Со второй полки",
    "idea": "Подъём со второй полки связывает оба канала пересечения.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 16
      }
    ],
    "minMoves": 12,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      4,
      12,
      13,
      14,
      15,
      16,
      17
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 25,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 1,
      "distractors": 7,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 12,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 34,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ],
      "maxRoutePieces": 26,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      7,
      11,
      4
    ],
    "id": "tunnels-50-v2-45",
    "name": "Низкая верхняя петля",
    "idea": "Низкая верхняя петля возвращает к вертикальному каналу.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 14
      }
    ],
    "minMoves": 13,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      3,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 9,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 18,
      "fixedPlatforms": 5,
      "crossings": 1,
      "checkpoints": 3,
      "routePieces": 17,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 13,
      "exitRoutes": 2,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 31,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 2,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 25,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          1,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      9,
      13
    ],
    "id": "tunnels-50-v2-46",
    "name": "Между верхом и низом",
    "idea": "Собрать верхние и нижние полки через оба канала.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 15
      }
    ],
    "minMoves": 19,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      3,
      11,
      12,
      13,
      14,
      15,
      16,
      17
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 21,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 19,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 3,
      "heightSpan": 3,
      "rotationCost": 19,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 19,
      "upperBound": 19,
      "expandedStates": 35,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      "maxRoutePieces": 27,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      8,
      12
    ],
    "id": "tunnels-50-v2-47",
    "name": "Назад через пересечение",
    "idea": "Вернуться через прежнее пересечение, сохранив прямой спуск.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 14
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      4,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 19,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 17,
      "repeatedCrossings": 1,
      "distractors": 8,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 15,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 32,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "maxRoutePieces": 25,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 1,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          1,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 3
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      8,
      12,
      1
    ],
    "id": "tunnels-50-v2-48",
    "name": "Выход без колокольчиков",
    "idea": "Нижний выход обходит колокольчики: нужна верхняя петля.",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 14
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      4,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 10,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 17,
      "fixedPlatforms": 5,
      "crossings": 1,
      "checkpoints": 3,
      "routePieces": 17,
      "repeatedCrossings": 1,
      "distractors": 7,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 15,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 32,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ],
      "maxRoutePieces": 24,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 2,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      11,
      16
    ],
    "id": "tunnels-50-v2-49",
    "name": "Подъём с нижнего старта",
    "idea": "Подняться с нижнего старта и вернуться через второй канал.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 5
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 12
      },
      {
        "type": "turn",
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 15
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 19
      }
    ],
    "minMoves": 15,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      4,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 19,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 20,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 28,
      "movablePieces": 23,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 22,
      "repeatedCrossings": 1,
      "distractors": 7,
      "bends": 8,
      "verticalSteps": 9,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 15,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 15,
      "upperBound": 15,
      "expandedStates": 37,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27
      ],
      "maxRoutePieces": 29,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 1,
        "y": 4,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 2,
        "edges": [
          2,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 2,
        "edges": [
          0,
          1,
          2,
          3
        ],
        "turn": 0,
        "kind": "crossing",
        "fixed": true
      },
      {
        "x": 4,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 2,
        "edges": [
          3,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 1,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 0,
        "edges": [
          2,
          3
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 0,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
        "y": 0,
        "edges": [
          1,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 1,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 3,
        "edges": [
          0,
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 4,
        "edges": [
          0,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 4,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 5,
        "y": 4,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 3,
        "edges": [
          2,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 3,
        "edges": [
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
        "y": 5,
        "edges": [
          0,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
        "y": 5,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 5,
        "edges": [
          3,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 6,
        "y": 4,
        "edges": [
          2,
          3
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 4
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "checkpoints": [
      10,
      15
    ],
    "id": "tunnels-50-v2-50",
    "name": "Через верхнюю петлю",
    "idea": "Верхняя петля и нижняя полка должны войти в один маршрут.",
    "solution": [
      {
        "type": "turn",
        "piece": 1
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 6
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 16
      },
      {
        "type": "turn",
        "piece": 17
      },
      {
        "type": "turn",
        "piece": 17
      }
    ],
    "minMoves": 17,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      5,
      13,
      14,
      15,
      16,
      17,
      18
    ],
    "steps": [
      {
        "piece": 0,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 1,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 2,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 3,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 4,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 3,
        "outgoing": 1,
        "channel": "EW"
      },
      {
        "piece": 6,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 7,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 8,
        "incoming": 2,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 9,
        "incoming": 2,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 10,
        "incoming": 1,
        "outgoing": 3,
        "channel": "single"
      },
      {
        "piece": 11,
        "incoming": 1,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 12,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 5,
        "incoming": 0,
        "outgoing": 2,
        "channel": "NS"
      },
      {
        "piece": 13,
        "incoming": 0,
        "outgoing": 2,
        "channel": "single"
      },
      {
        "piece": 14,
        "incoming": 0,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 15,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 16,
        "incoming": 3,
        "outgoing": 0,
        "channel": "single"
      },
      {
        "piece": 17,
        "incoming": 2,
        "outgoing": 1,
        "channel": "single"
      },
      {
        "piece": 18,
        "incoming": 3,
        "outgoing": 1,
        "channel": "single"
      }
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 25,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "crossings": 1,
      "checkpoints": 2,
      "routePieces": 20,
      "repeatedCrossings": 1,
      "distractors": 6,
      "bends": 8,
      "verticalSteps": 9,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 17,
      "exitRoutes": 3,
      "feasibleRoutes": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "Exhaustive channel-simple routes with all checkpoints and independent minimum clockwise costs",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 34,
      "maxExpanded": 500000,
      "feasibleRoutes": 1,
      "exitRoutes": 3,
      "exitRouteCoverage": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ],
      "maxRoutePieces": 26,
      "reason": "all-simple-routes-exhausted",
      "optimal": true
    }
  }
];
