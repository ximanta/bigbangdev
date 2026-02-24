function FactTable({ facts, title = 'Key Facts' }) {
  if (!facts || facts.length === 0) {
    return null;
  }

  return (
    <div className="fact-table">
      <h3>{title}</h3>
      {
        facts.map((fact, index) => (
          <div key={index} className="fact-item">
            <span className="fact-label">{fact.label}:</span>
            <span className="fact-value">{fact.value}</span>
          </div>
        ))
      }
    </div>
  );
}

export default FactTable;
