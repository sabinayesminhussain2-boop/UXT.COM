export const principles = [
  {
    title: "CONSIDERED DESIGN",
    description: "Every line, material, and proportion serves a purpose.",
  },
  {
    title: "HONEST MATERIALS",
    description:
      "Natural textures and carefully selected finishes define each piece.",
  },
  {
    title: "MADE TO LAST",
    description:
      "Furniture designed for everyday living and long-term appreciation.",
  },
];

export default function Principles() {
  return (
    <div className="principles">
      {principles.map((principle, index) => (
        <div className="principle" key={principle.title}>
          <span>0{index + 1}</span>
          <div>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
