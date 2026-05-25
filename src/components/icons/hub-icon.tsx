export const HubIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const center = 50;
  const rLine = 24;
  const rNode = 40;

  const points = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return {
      xLine: center + rLine * Math.cos(angle),
      yLine: center + rLine * Math.sin(angle),
      xNode: center + rNode * Math.cos(angle),
      yNode: center + rNode * Math.sin(angle),
    };
  });

  return (
    <svg viewBox="-5 -5 110 110" fill="currentColor" {...props}>
      {/* center */}
      <circle cx="50" cy="50" r="12" />

      {/* lines */}
      {points.map((p, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={p.xLine}
          y2={p.yLine}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      ))}

      {/* outer nodes */}
      {points.map((p, i) => (
        <circle key={i} cx={p.xNode} cy={p.yNode} r="12" />
      ))}
    </svg>
  );
};
