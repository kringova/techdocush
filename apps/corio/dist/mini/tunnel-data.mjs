// Fixed content; shortest clockwise solutions verified offline. No runtime solver import.
export const TUNNEL_LEVELS=[
  {
    "name": "Между полками",
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
    "id": "tunnels-50-v1-1",
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
    "metrics": {
      "width": 3,
      "height": 3,
      "pieces": 3,
      "movablePieces": 1,
      "fixedPlatforms": 2,
      "routePieces": 3,
      "distractors": 0,
      "bends": 0,
      "verticalSteps": 0,
      "leftSteps": 0,
      "heightSpan": 0,
      "rotationCost": 1,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 1,
      "upperBound": 1,
      "expandedStates": 3
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
    "id": "tunnels-50-v1-2",
    "name": "Трасса 2",
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
      3
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 4,
      "movablePieces": 1,
      "fixedPlatforms": 3,
      "routePieces": 4,
      "distractors": 0,
      "bends": 0,
      "verticalSteps": 0,
      "leftSteps": 0,
      "heightSpan": 0,
      "rotationCost": 1,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 1,
      "upperBound": 1,
      "expandedStates": 4
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
    "id": "tunnels-50-v1-3",
    "name": "Трасса 3",
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
    "metrics": {
      "width": 3,
      "height": 3,
      "pieces": 4,
      "movablePieces": 2,
      "fixedPlatforms": 2,
      "routePieces": 4,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 1,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 2,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 2,
      "upperBound": 2,
      "expandedStates": 4
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
    "id": "tunnels-50-v1-4",
    "name": "Трасса 4",
    "solution": [
      {
        "type": "turn",
        "piece": 2
      },
      {
        "type": "turn",
        "piece": 3
      }
    ],
    "minMoves": 2,
    "route": [
      0,
      1,
      2,
      3,
      4
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 5,
      "movablePieces": 2,
      "fixedPlatforms": 3,
      "routePieces": 5,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 1,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 2,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 2,
      "upperBound": 2,
      "expandedStates": 5
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
    "id": "tunnels-50-v1-5",
    "name": "Трасса 5",
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
        "piece": 4
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
      5
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 6,
      "movablePieces": 4,
      "fixedPlatforms": 2,
      "routePieces": 6,
      "distractors": 0,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 4,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 6
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
      "y": 0
    },
    "id": "tunnels-50-v1-6",
    "name": "Трасса 6",
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
        "piece": 3
      },
      {
        "type": "turn",
        "piece": 3
      }
    ],
    "minMoves": 4,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 6,
      "movablePieces": 3,
      "fixedPlatforms": 3,
      "routePieces": 6,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 4,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 6
    }
  },
  {
    "w": 5,
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
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 5,
      "y": 0
    },
    "id": "tunnels-50-v1-7",
    "name": "Трасса 7",
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
        "piece": 4
      }
    ],
    "minMoves": 4,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "metrics": {
      "width": 5,
      "height": 3,
      "pieces": 6,
      "movablePieces": 3,
      "fixedPlatforms": 3,
      "routePieces": 6,
      "distractors": 0,
      "bends": 2,
      "verticalSteps": 1,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 4,
      "feasibleRoutes": 1,
      "falseSpurs": 0,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 6
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
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 3,
        "y": 1,
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
        "y": 2,
        "edges": [
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 4,
      "y": 0
    },
    "id": "tunnels-50-v1-8",
    "name": "Трасса 8",
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
        "piece": 4
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
      5
    ],
    "metrics": {
      "width": 4,
      "height": 3,
      "pieces": 7,
      "movablePieces": 5,
      "fixedPlatforms": 2,
      "routePieces": 6,
      "distractors": 1,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 4,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 7
    }
  },
  {
    "w": 5,
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
        "x": 3,
        "y": 1,
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
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 5,
      "y": 0
    },
    "id": "tunnels-50-v1-9",
    "name": "Трасса 9",
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
        "piece": 4
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
      6
    ],
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 8,
      "movablePieces": 5,
      "fixedPlatforms": 3,
      "routePieces": 7,
      "distractors": 1,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 4,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 4,
      "upperBound": 4,
      "expandedStates": 8
    }
  },
  {
    "w": 5,
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
        "kind": "hammock",
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
        "turn": 1,
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
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 5,
      "y": 2
    },
    "id": "tunnels-50-v1-10",
    "name": "Трасса 10",
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
      }
    ],
    "minMoves": 7,
    "route": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 8,
      "movablePieces": 6,
      "fixedPlatforms": 2,
      "routePieces": 7,
      "distractors": 1,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 7,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 1
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 8
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
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
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
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
    "id": "tunnels-50-v1-11",
    "name": "Трасса 11",
    "solution": [
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
      7
    ],
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 9,
      "movablePieces": 7,
      "fixedPlatforms": 2,
      "routePieces": 8,
      "distractors": 1,
      "bends": 4,
      "verticalSteps": 3,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 5,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 5,
      "upperBound": 5,
      "expandedStates": 9
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
        "turn": 1,
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
        "turn": 0,
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
      },
      {
        "x": 1,
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
        "x": 4,
        "y": 0,
        "edges": [
          0,
          2
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
    "id": "tunnels-50-v1-12",
    "name": "Трасса 12",
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
        "piece": 5
      }
    ],
    "minMoves": 7,
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
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 13,
      "movablePieces": 10,
      "fixedPlatforms": 3,
      "routePieces": 11,
      "distractors": 2,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 7,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 7,
      "upperBound": 7,
      "expandedStates": 13
    }
  },
  {
    "w": 5,
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
        "kind": "hammock",
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
        "turn": 1,
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
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
        "y": 0,
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
        "y": 3,
        "edges": [
          3,
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
      "x": 5,
      "y": 0
    },
    "id": "tunnels-50-v1-13",
    "name": "Трасса 13",
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
        "piece": 9
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
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 12,
      "movablePieces": 10,
      "fixedPlatforms": 2,
      "routePieces": 10,
      "distractors": 2,
      "bends": 4,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 8,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 12
    }
  },
  {
    "w": 5,
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
          0
        ],
        "turn": 0,
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 0,
        "y": 2,
        "edges": [
          3,
          1
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
      "x": 5,
      "y": 0
    },
    "id": "tunnels-50-v1-14",
    "name": "Трасса 14",
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
      8
    ],
    "metrics": {
      "width": 5,
      "height": 5,
      "pieces": 10,
      "movablePieces": 7,
      "fixedPlatforms": 3,
      "routePieces": 9,
      "distractors": 1,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 4,
      "rotationCost": 9,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 10
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 3,
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
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
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
        "y": 0,
        "edges": [
          0,
          2
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
      "x": 6,
      "y": 0
    },
    "id": "tunnels-50-v1-15",
    "name": "Трасса 15",
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
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 9
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
      10
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 13,
      "movablePieces": 11,
      "fixedPlatforms": 2,
      "routePieces": 11,
      "distractors": 2,
      "bends": 6,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 9,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 13
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 5,
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
        "x": 0,
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
        "y": 4,
        "edges": [
          2,
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
      "x": 6,
      "y": 1
    },
    "id": "tunnels-50-v1-16",
    "name": "Трасса 16",
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
        "piece": 7
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
      10
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 13,
      "movablePieces": 10,
      "fixedPlatforms": 3,
      "routePieces": 11,
      "distractors": 2,
      "bends": 6,
      "verticalSteps": 5,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 9,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 13
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
          2
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
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
        "x": 1,
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
        "x": 2,
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
        "turn": 2,
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          0,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 1
    },
    "end": {
      "x": 6,
      "y": 2
    },
    "id": "tunnels-50-v1-17",
    "name": "Трасса 17",
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
        "piece": 3
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
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 10
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
      12
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 14,
      "movablePieces": 12,
      "fixedPlatforms": 2,
      "routePieces": 13,
      "distractors": 1,
      "bends": 6,
      "verticalSteps": 7,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 9,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 14
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 3,
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
        "x": 3,
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
        "x": 3,
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
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
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
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
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
        "y": 0,
        "edges": [
          0,
          2
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
      "x": 6,
      "y": 0
    },
    "id": "tunnels-50-v1-18",
    "name": "Трасса 18",
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
        "piece": 7
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
        "piece": 13
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
      9,
      10,
      11,
      12,
      13
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 16,
      "movablePieces": 14,
      "fixedPlatforms": 2,
      "routePieces": 14,
      "distractors": 2,
      "bends": 6,
      "verticalSteps": 8,
      "leftSteps": 0,
      "heightSpan": 4,
      "rotationCost": 10,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 16
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
          3,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
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
        "x": 2,
        "y": 1,
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
        "x": 3,
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
        "x": 3,
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
        "x": 4,
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
        "x": 5,
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
        "x": 5,
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
        "x": 5,
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
        "x": 1,
        "y": 3,
        "edges": [
          2,
          0
        ],
        "turn": 1,
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
      "y": 1
    },
    "id": "tunnels-50-v1-19",
    "name": "Трасса 19",
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
        "piece": 11
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
      10,
      11,
      12
    ],
    "metrics": {
      "width": 6,
      "height": 4,
      "pieces": 14,
      "movablePieces": 12,
      "fixedPlatforms": 2,
      "routePieces": 13,
      "distractors": 1,
      "bends": 8,
      "verticalSteps": 7,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 11,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 14
    }
  },
  {
    "w": 5,
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
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
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
        "x": 1,
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
        "x": 2,
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
        "x": 2,
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
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 0,
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 0
    },
    "end": {
      "x": 5,
      "y": 4
    },
    "id": "tunnels-50-v1-20",
    "name": "Трасса 20",
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
        "piece": 8
      },
      {
        "type": "turn",
        "piece": 8
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
      8
    ],
    "metrics": {
      "width": 5,
      "height": 5,
      "pieces": 10,
      "movablePieces": 8,
      "fixedPlatforms": 2,
      "routePieces": 9,
      "distractors": 1,
      "bends": 6,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 4,
      "rotationCost": 12,
      "feasibleRoutes": 1,
      "falseSpurs": 1,
      "band": 2
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 10
    }
  },
  {
    "w": 5,
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
          2
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
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 1,
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
        "x": 2,
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
        "y": 0,
        "edges": [
          0,
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 2
    },
    "end": {
      "x": 5,
      "y": 2
    },
    "id": "tunnels-50-v1-21",
    "name": "Трасса 21",
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
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      7,
      8,
      9,
      5,
      6
    ],
    "metrics": {
      "width": 5,
      "height": 4,
      "pieces": 11,
      "movablePieces": 8,
      "fixedPlatforms": 3,
      "routePieces": 7,
      "distractors": 4,
      "bends": 4,
      "verticalSteps": 2,
      "leftSteps": 0,
      "heightSpan": 1,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 13
    }
  },
  {
    "w": 6,
    "h": 5,
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
        "kind": "hammock",
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
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
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
      "x": 6,
      "y": 2
    },
    "id": "tunnels-50-v1-22",
    "name": "Трасса 22",
    "solution": [
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
      10,
      11,
      12,
      13,
      14,
      7,
      8,
      9
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 16,
      "movablePieces": 12,
      "fixedPlatforms": 4,
      "routePieces": 10,
      "distractors": 6,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 19
    }
  },
  {
    "w": 7,
    "h": 5,
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
        "turn": 3,
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
        "turn": 1,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
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
        "x": 2,
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
        "x": 3,
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
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
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
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
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
    "id": "tunnels-50-v1-23",
    "name": "Трасса 23",
    "solution": [
      {
        "type": "turn",
        "piece": 1
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
        "piece": 13
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
        "piece": 17
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      9,
      10
    ],
    "metrics": {
      "width": 7,
      "height": 5,
      "pieces": 20,
      "movablePieces": 16,
      "fixedPlatforms": 4,
      "routePieces": 11,
      "distractors": 9,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 23
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
        "turn": 2,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
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
        "x": 5,
        "y": 0,
        "edges": [
          0,
          2
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
    "id": "tunnels-50-v1-24",
    "name": "Трасса 24",
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
      },
      {
        "type": "turn",
        "piece": 9
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      2,
      11,
      12,
      13,
      14,
      15,
      16,
      9,
      10
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 19,
      "movablePieces": 16,
      "fixedPlatforms": 3,
      "routePieces": 11,
      "distractors": 8,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 21
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
        "turn": 0,
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
        "turn": 1,
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
          2
        ],
        "turn": 3,
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
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
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
        "x": 5,
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
        "x": 1,
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
        "y": 2,
        "edges": [
          3,
          1
        ],
        "turn": 1,
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
    "id": "tunnels-50-v1-25",
    "name": "Трасса 25",
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
        "piece": 9
      },
      {
        "type": "turn",
        "piece": 9
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
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 21,
      "movablePieces": 18,
      "fixedPlatforms": 3,
      "routePieces": 11,
      "distractors": 10,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 24
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
        "turn": 2,
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
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
      },
      {
        "x": 5,
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
        "x": 0,
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
        "y": 3,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-26",
    "name": "Трасса 26",
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
        "piece": 13
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
        "piece": 11
      },
      {
        "type": "turn",
        "piece": 11
      }
    ],
    "minMoves": 8,
    "route": [
      0,
      1,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      11,
      12
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "routePieces": 11,
      "distractors": 11,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 8,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 8,
      "upperBound": 8,
      "expandedStates": 25
    }
  },
  {
    "w": 6,
    "h": 5,
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
        "turn": 1,
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
          3,
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
          1,
          3
        ],
        "turn": 0,
        "kind": "hammock",
        "fixed": true
      },
      {
        "x": 2,
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
        "x": 2,
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
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
        "y": 0,
        "edges": [
          0,
          2
        ],
        "turn": 1,
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
      "y": 2
    },
    "id": "tunnels-50-v1-27",
    "name": "Трасса 27",
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
      }
    ],
    "minMoves": 9,
    "route": [
      0,
      1,
      2,
      8,
      9,
      10,
      11,
      12,
      6,
      7
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 14,
      "movablePieces": 10,
      "fixedPlatforms": 4,
      "routePieces": 10,
      "distractors": 4,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 9,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 16
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
        "turn": 1,
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
        "turn": 1,
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
        "turn": 2,
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
      },
      {
        "x": 1,
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
        "x": 2,
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
        "x": 3,
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
        "x": 4,
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
        "x": 0,
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
        "y": 0,
        "edges": [
          0,
          2
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
      "x": 6,
      "y": 3
    },
    "id": "tunnels-50-v1-28",
    "name": "Трасса 28",
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
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 16,
      "movablePieces": 12,
      "fixedPlatforms": 4,
      "routePieces": 10,
      "distractors": 6,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 9,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 9,
      "upperBound": 9,
      "expandedStates": 18
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
        "turn": 1,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-29",
    "name": "Трасса 29",
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
      9,
      10,
      11,
      12
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 19,
      "movablePieces": 16,
      "fixedPlatforms": 3,
      "routePieces": 13,
      "distractors": 6,
      "bends": 4,
      "verticalSteps": 6,
      "leftSteps": 0,
      "heightSpan": 3,
      "rotationCost": 10,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 10,
      "upperBound": 10,
      "expandedStates": 22
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
        "turn": 2,
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
        "turn": 1,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 5,
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
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 0,
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
        "y": 2,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-30",
    "name": "Трасса 30",
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
        "piece": 9
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
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 21,
      "movablePieces": 18,
      "fixedPlatforms": 3,
      "routePieces": 11,
      "distractors": 10,
      "bends": 4,
      "verticalSteps": 4,
      "leftSteps": 0,
      "heightSpan": 2,
      "rotationCost": 11,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 3
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 11,
      "upperBound": 11,
      "expandedStates": 25
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 2,
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
        "x": 2,
        "y": 4,
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
        "x": 4,
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
        "x": 4,
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
        "turn": 1,
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
        "turn": 3,
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
        "x": 4,
        "y": 5,
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 2
    },
    "id": "tunnels-50-v1-31",
    "name": "Трасса 31",
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
        "piece": 5
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
      12,
      13,
      14,
      15,
      16,
      17
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 20,
      "movablePieces": 16,
      "fixedPlatforms": 4,
      "routePieces": 18,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 7,
      "leftSteps": 2,
      "heightSpan": 5,
      "rotationCost": 12,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 12,
      "upperBound": 12,
      "expandedStates": 21
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
          3,
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
        "turn": 0,
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
        "kind": "hammock",
        "fixed": true
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
        "turn": 3,
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
        "turn": 1,
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
      },
      {
        "x": 1,
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
        "x": 3,
        "y": 3,
        "edges": [
          2,
          0
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
      "y": 2
    },
    "id": "tunnels-50-v1-32",
    "name": "Трасса 32",
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
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 17,
      "movablePieces": 13,
      "fixedPlatforms": 4,
      "routePieces": 15,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 5,
      "leftSteps": 2,
      "heightSpan": 3,
      "rotationCost": 13,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 18
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
          3,
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
        "turn": 0,
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
        "turn": 2,
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
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
      "x": 6,
      "y": 3
    },
    "id": "tunnels-50-v1-33",
    "name": "Трасса 33",
    "solution": [
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
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 17,
      "movablePieces": 14,
      "fixedPlatforms": 3,
      "routePieces": 15,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 7,
      "leftSteps": 1,
      "heightSpan": 4,
      "rotationCost": 13,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 18
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
        "turn": 0,
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
          2
        ],
        "turn": 0,
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
        "turn": 3,
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
        "turn": 1,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
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
      "y": 2
    },
    "id": "tunnels-50-v1-34",
    "name": "Трасса 34",
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
        "piece": 9
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
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "metrics": {
      "width": 6,
      "height": 5,
      "pieces": 18,
      "movablePieces": 14,
      "fixedPlatforms": 4,
      "routePieces": 16,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 13,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 19
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "turn": 2,
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
          3
        ],
        "turn": 0,
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
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 2,
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
          3,
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
          2,
          0
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-35",
    "name": "Трасса 35",
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
      14,
      15,
      16
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 19,
      "movablePieces": 15,
      "fixedPlatforms": 4,
      "routePieces": 17,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 13,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 13,
      "upperBound": 13,
      "expandedStates": 20
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 1,
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
        "turn": 2,
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
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 5,
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
        "x": 0,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "id": "tunnels-50-v1-36",
    "name": "Трасса 36",
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
      15,
      16,
      17,
      18,
      19
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 22,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "routePieces": 20,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 9,
      "leftSteps": 2,
      "heightSpan": 5,
      "rotationCost": 16,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 16,
      "upperBound": 16,
      "expandedStates": 23
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 1,
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
        "turn": 0,
        "kind": "hammock",
        "fixed": true
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
        "x": 0,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 4
    },
    "id": "tunnels-50-v1-37",
    "name": "Трасса 37",
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
        "piece": 14
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
        "piece": 20
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
      15,
      16,
      17,
      18,
      19,
      20,
      21
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "routePieces": 22,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 9,
      "leftSteps": 3,
      "heightSpan": 5,
      "rotationCost": 16,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 16,
      "upperBound": 16,
      "expandedStates": 25
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
        "turn": 1,
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
        "turn": 1,
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
        "turn": 1,
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
        "turn": 3,
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
        "x": 4,
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
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
      "y": 2
    },
    "id": "tunnels-50-v1-38",
    "name": "Трасса 38",
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
        "piece": 13
      },
      {
        "type": "turn",
        "piece": 13
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
      16
    ],
    "metrics": {
      "width": 7,
      "height": 5,
      "pieces": 19,
      "movablePieces": 15,
      "fixedPlatforms": 4,
      "routePieces": 17,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 6,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 17,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 20
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
        "turn": 3,
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
        "turn": 0,
        "kind": "shelf",
        "fixed": true
      },
      {
        "x": 3,
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
        "x": 0,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-39",
    "name": "Трасса 39",
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
        "piece": 7
      },
      {
        "type": "turn",
        "piece": 7
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
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
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
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ],
    "metrics": {
      "width": 7,
      "height": 5,
      "pieces": 22,
      "movablePieces": 18,
      "fixedPlatforms": 4,
      "routePieces": 20,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 7,
      "leftSteps": 3,
      "heightSpan": 4,
      "rotationCost": 17,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 23
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 1,
        "y": 4,
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
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "turn": 0,
        "kind": "hammock",
        "fixed": true
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
        "x": 4,
        "y": 5,
        "edges": [
          2,
          0
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-40",
    "name": "Трасса 40",
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
        "piece": 17
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
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 23,
      "movablePieces": 19,
      "fixedPlatforms": 4,
      "routePieces": 21,
      "distractors": 2,
      "bends": 8,
      "verticalSteps": 8,
      "leftSteps": 3,
      "heightSpan": 5,
      "rotationCost": 17,
      "feasibleRoutes": 1,
      "falseSpurs": 2,
      "band": 4
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 17,
      "upperBound": 17,
      "expandedStates": 24
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
          2
        ],
        "turn": 0,
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
          2
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 3,
        "y": 4,
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
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
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
      "y": 3
    },
    "id": "tunnels-50-v1-41",
    "name": "Трасса 41",
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
      },
      {
        "type": "turn",
        "piece": 7
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
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
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
      18,
      19
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 28,
      "movablePieces": 24,
      "fixedPlatforms": 4,
      "routePieces": 20,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 9,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 18,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 18,
      "upperBound": 18,
      "expandedStates": 47
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 2,
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
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
        "x": 4,
        "y": 5,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-42",
    "name": "Трасса 42",
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
      16,
      17,
      18
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 27,
      "movablePieces": 23,
      "fixedPlatforms": 4,
      "routePieces": 19,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 19,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 19,
      "upperBound": 19,
      "expandedStates": 44
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 1,
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
        "x": 1,
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
        "kind": "hammock",
        "fixed": true
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
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 3,
        "y": 4,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
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
      },
      {
        "x": 0,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-43",
    "name": "Трасса 43",
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
        "piece": 10
      },
      {
        "type": "turn",
        "piece": 13
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
      16,
      17,
      18,
      19,
      20
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 29,
      "movablePieces": 25,
      "fixedPlatforms": 4,
      "routePieces": 21,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 10,
      "leftSteps": 2,
      "heightSpan": 5,
      "rotationCost": 19,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 19,
      "upperBound": 19,
      "expandedStates": 34
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
        "turn": 2,
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
        "turn": 1,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
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
        "x": 4,
        "y": 5,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 0,
        "edges": [
          3,
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
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-44",
    "name": "Трасса 44",
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
        "piece": 14
      },
      {
        "type": "turn",
        "piece": 14
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
      16
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 24,
      "movablePieces": 20,
      "fixedPlatforms": 4,
      "routePieces": 17,
      "distractors": 7,
      "bends": 10,
      "verticalSteps": 8,
      "leftSteps": 1,
      "heightSpan": 4,
      "rotationCost": 20,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 20,
      "upperBound": 20,
      "expandedStates": 29
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
        "kind": "hammock",
        "fixed": true
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
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
      },
      {
        "x": 1,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-45",
    "name": "Трасса 45",
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
      18
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 27,
      "movablePieces": 23,
      "fixedPlatforms": 4,
      "routePieces": 19,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 8,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 20,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 20,
      "upperBound": 20,
      "expandedStates": 32
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "turn": 1,
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
        "turn": 3,
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
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 3,
        "y": 4,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
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
        "x": 4,
        "y": 5,
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-46",
    "name": "Трасса 46",
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
        "piece": 17
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
      18
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 27,
      "movablePieces": 23,
      "fixedPlatforms": 4,
      "routePieces": 19,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 10,
      "leftSteps": 1,
      "heightSpan": 5,
      "rotationCost": 20,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 20,
      "upperBound": 20,
      "expandedStates": 32
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
        "turn": 1,
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
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
        "x": 4,
        "y": 5,
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
        "turn": 0,
        "kind": "pipe",
        "fixed": false
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
    "id": "tunnels-50-v1-47",
    "name": "Трасса 47",
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
        "piece": 14
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
        "piece": 16
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
      17
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 25,
      "movablePieces": 21,
      "fixedPlatforms": 4,
      "routePieces": 18,
      "distractors": 7,
      "bends": 10,
      "verticalSteps": 9,
      "leftSteps": 1,
      "heightSpan": 4,
      "rotationCost": 21,
      "feasibleRoutes": 2,
      "falseSpurs": 1,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 21,
      "upperBound": 21,
      "expandedStates": 42
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
        "turn": 2,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
        "edges": [
          1,
          2
        ],
        "turn": 0,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 3,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
        "y": 5,
        "edges": [
          2,
          0
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 0,
        "y": 2,
        "edges": [
          3,
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
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-48",
    "name": "Трасса 48",
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
        "piece": 17
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
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
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
      19
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 28,
      "movablePieces": 24,
      "fixedPlatforms": 4,
      "routePieces": 20,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 9,
      "leftSteps": 2,
      "heightSpan": 4,
      "rotationCost": 21,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 21,
      "upperBound": 21,
      "expandedStates": 33
    }
  },
  {
    "w": 7,
    "h": 6,
    "pieces": [
      {
        "x": 0,
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
        "x": 1,
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
        "x": 1,
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
          2
        ],
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 3,
        "y": 4,
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
      },
      {
        "x": 0,
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
        "x": 0,
        "y": 0,
        "edges": [
          3,
          1
        ],
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      }
    ],
    "start": {
      "x": -1,
      "y": 5
    },
    "end": {
      "x": 7,
      "y": 3
    },
    "id": "tunnels-50-v1-49",
    "name": "Трасса 49",
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
        "piece": 3
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
      },
      {
        "type": "turn",
        "piece": 18
      },
      {
        "type": "turn",
        "piece": 18
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
      18,
      19,
      20
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 29,
      "movablePieces": 25,
      "fixedPlatforms": 4,
      "routePieces": 21,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 10,
      "leftSteps": 2,
      "heightSpan": 5,
      "rotationCost": 22,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 22,
      "upperBound": 22,
      "expandedStates": 48
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
        "turn": 2,
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
        "turn": 1,
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
        "turn": 3,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 4,
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
        "x": 4,
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
        "x": 3,
        "y": 4,
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
        "x": 4,
        "y": 5,
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
        "turn": 1,
        "kind": "pipe",
        "fixed": false
      },
      {
        "x": 1,
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
        "x": 1,
        "y": 0,
        "edges": [
          3,
          1
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
    "id": "tunnels-50-v1-50",
    "name": "Трасса 50",
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
      }
    ],
    "minMoves": 24,
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
      17
    ],
    "metrics": {
      "width": 7,
      "height": 6,
      "pieces": 26,
      "movablePieces": 22,
      "fixedPlatforms": 4,
      "routePieces": 18,
      "distractors": 8,
      "bends": 10,
      "verticalSteps": 9,
      "leftSteps": 1,
      "heightSpan": 4,
      "rotationCost": 24,
      "feasibleRoutes": 2,
      "falseSpurs": 2,
      "band": 5
    },
    "proof": {
      "complete": true,
      "method": "exhaustive-simple-routes",
      "lowerBound": 24,
      "upperBound": 24,
      "expandedStates": 31
    }
  }
];
