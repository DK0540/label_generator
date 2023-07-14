export default (editor, opts = {}) => {
  const { domComponents, commands } = editor;

  // Define your popup component or content here
  const popupContent = `
      <div>
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
      </div>
    `;

  // Add a command to open the popup
  commands.add("open-popup", {
    run() {
      // Create a new component for the popup
      const component = domComponents.add({
        content: popupContent,
      });

      // Add the component to the canvas or any desired container
      editor.getContainer().appendChild(component.getEl());
    },
  });

  // Add a button or any UI element to trigger the popup
  editor.Panels.addButton("options", {
    id: "open-popup-button",
    className: "btn-open-popup",
    command: "open-popup",
    label: "Open Popup",
  });
};
