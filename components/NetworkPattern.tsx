export default function NetworkPattern({ className = "" }: { className?: string }) {
  const nodes = [
    [40, 40], [140, 20], [230, 70], [320, 30], [90, 110],
    [200, 140], [300, 120], [60, 190], [170, 210], [270, 200],
    [380, 90], [370, 190],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [2, 6],
    [4, 7], [7, 8], [8, 9], [5, 9], [6, 10], [9, 11], [10, 11],
  ];

  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#2F86D6"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 5 === 0 ? 4 : 2.5}
          fill={i % 5 === 0 ? "#C9973E" : "#1E5FA8"}
          fillOpacity={i % 5 === 0 ? 0.85 : 0.5}
        />
      ))}
    </svg>
  );
}
