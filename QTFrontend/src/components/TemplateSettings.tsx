import React, { useRef } from "react";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import EditableListItem from "./EditableListItem.tsx";
import { Node } from "reactflow";

interface TemplateSettingsProps {
  show: boolean;
  onHide: () => void;
  title: string;
  bgColor: string;
  snapToGrid: boolean;
  sections: string[];
  onSave: (title: string, bgColor: string, snapToGrid: boolean) => void;
  onAddSection: (section: string) => void;
  onEditSection: (oldSection: string, newSection: string) => void;
  onDeleteSection: (section: string) => void;
  nodes: Node[];
  updateSection: (nodeId: string, section: string) => void;
}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  show,
  onHide,
  title: initialTitle,
  bgColor: initialBgColor,
  snapToGrid: initialSnapToGrid,
  sections,
  onSave,
  onAddSection,
  onEditSection,
  onDeleteSection,
  nodes,
  updateSection,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bgColorRef = useRef<HTMLInputElement>(null);
  const snapToGridRef = useRef<HTMLInputElement>(null);
  const newSectionRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const newTitle = titleRef.current?.value || initialTitle;
    const newBgColor = bgColorRef.current?.value || initialBgColor;
    const newSnapToGrid = snapToGridRef.current?.checked || initialSnapToGrid;

    onSave(newTitle, newBgColor, newSnapToGrid);
  };

  const handleAddSection = () => {
    const section = newSectionRef.current?.value;
    if (section && !sections.includes(section)) {
      onAddSection(section);
      if (newSectionRef.current) {
        newSectionRef.current.value = "";
      }
    }
  };

  const handleSaveEditSection = (section: string, newName: string) => {
    onEditSection(section, newName);
    nodes.forEach((node) => {
      if (node.data.section === section) {
        updateSection(node.id, newName);
      }
    });
  };

  const handleDeleteSection = (section: string) => {
    onDeleteSection(section);
    nodes.forEach((node) => {
      if (node.data.section === section) {
        updateSection(node.id, "Total");
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Template Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="title">Template Title:</label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter title here"
              defaultValue={initialTitle}
              name="title"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="bgcolor" className="form-label">
              Background color:
            </label>
            <input
              type="color"
              name="bgColor"
              defaultValue={initialBgColor}
              ref={bgColorRef}
              className="form-control form-control-color"
            />
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="snapToGrid" className="form-check-label">
              Snap to Grid?
            </label>
            <input
              type="checkbox"
              id="snapToGrid"
              defaultChecked={initialSnapToGrid}
              ref={snapToGridRef}
              className="form-check-input mb-3"
              style={{ height: 20, width: 20 }}
            />
          </div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Add new section..."
              aria-label="Add new section..."
              aria-describedby="basic-addon2"
              ref={newSectionRef}
            />
            <Button
              variant="success"
              id="button-addon"
              onClick={handleAddSection}
            >
              +
            </Button>
          </InputGroup>

          <ListGroup style={{ maxHeight: "220px", overflowY: "scroll" }}>
            {sections.map((section: string) => (
              <ListGroup.Item key={section}>
                <EditableListItem
                  text={section}
                  onEdit={(section, newName) =>
                    handleSaveEditSection(section, newName)
                  }
                  onDelete={(section) => handleDeleteSection(section)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="info" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TemplateSettings;
