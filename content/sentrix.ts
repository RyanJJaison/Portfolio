// Source: SentriX README (github.com/RyanJJaison/SentriX), 3-seed ablation, held-out illicit class.
export const sentrixMetrics = [
  { metric: "Illicit-class F1", raw: 0.534, rawSd: 0.0186, ppr: 0.6943, pprSd: 0.0204 },
  { metric: "AUC", raw: 0.8966, rawSd: null, ppr: 0.957, pprSd: null },
] as const;

export const sentrixPipeline = [
  { step: "Elliptic graph", detail: "Bitcoin transactions as nodes, payment flows as edges, 49 time steps" },
  { step: "Personalized PageRank", detail: "Seeded per time step on confirmed-illicit nodes, leave-one-out, forward and reverse" },
  { step: "Feature join", detail: "165 raw node features + 4 PPR columns" },
  { step: "GraphSAGE", detail: "Temporal split, two-stage training" },
  { step: "Risk score", detail: "Per-transaction risk records" },
];
