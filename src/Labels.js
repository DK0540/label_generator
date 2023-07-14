import React from "react";
import { useLocation } from "react-router-dom";

const Labels = () => {
  const location = useLocation();
  const { components } = location.state || [];

  return (
    <div>
      <h2>Labels</h2>
      {/* Display the components */}
      {components &&
        components.map((component, index) => (
          <div key={index}>
            <h3>{component.tagName}</h3>
            <pre>{JSON.stringify(component.styles, null, 2)}</pre>
            {/* Render other necessary information */}
          </div>
        ))}
    </div>
  );
};

export default Labels;
