import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function ExpandableSection({ title, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-section">
      <div className="expandable-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        {
          isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />
        }
      </div>
      <div className={`expandable-content ${isExpanded ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}

export default ExpandableSection;
