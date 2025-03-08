import React, { useRef } from "react";
import { Button, Form, ListGroup, Offcanvas, Stack } from "react-bootstrap";
import { Node } from "reactflow";
import axios from "axios";
import { config } from "../constants";

interface NodeSettingsProps {
  show: boolean;
  onHide: () => void;
  selectedNode: Node | null;
  updateImage: (nodeId: string, imageUrl: string) => void;
  updateTotal: (nodeId: string, total: number) => void;
  addDropdownOption: (nodeId: string, option: string) => void;
  deleteDropdownOption: (nodeId: string, option: string) => void;
}

const NodeSettings: React.FC<NodeSettingsProps> = ({
  show,
  onHide,
  selectedNode,
  updateImage,
  updateTotal,
  addDropdownOption,
  deleteDropdownOption,
}) => {
  const setTotalRef = useRef<HTMLInputElement>(null);
  const newOptionRef = useRef<HTMLInputElement>(null);

  const uploadNewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1 && selectedNode) {
      let formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      const response = await axios.post(`${config.backend}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageURL = response.data;
      updateImage(selectedNode.id, imageURL);
    }
  };

  if (!selectedNode) return null;

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      scroll={true}
      backdrop={false}
      placement="end"
      className="bg-primary text-dark h3"
      style={{ textShadow: "none", position: "fixed" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="h1 fw-bold" style={{ textShadow: "none" }}>
            Node Settings
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="col-12">
          Node ID: {selectedNode.id}
          data: {JSON.stringify(selectedNode.data)}
          {selectedNode.type === "imageNode" && (
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={uploadNewImage}
                />
              </Form.Group>
            </Form>
          )}
          {selectedNode.type === "numberNode" && (
            <>
              <Form.Control
                defaultValue={selectedNode.data.total}
                placeholder="Total to collect"
                aria-label="Total"
                aria-describedby="set-total"
                ref={setTotalRef}
              />
              <Button
                variant="success"
                id="set-total"
                onClick={() => {
                  const total = setTotalRef.current?.value;
                  if (total) {
                    updateTotal(selectedNode.id, parseInt(total));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="black"
                  className="bi bi-floppy col"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2H9v3h2z" />
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                </svg>
              </Button>
            </>
          )}
          {selectedNode.type === "dropdownNode" && (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Add new dropdown option..."
                  aria-label="Add new dropdown option..."
                  ref={newOptionRef}
                />
                <Button
                  variant="success"
                  onClick={() => {
                    const option = newOptionRef.current?.value;
                    if (option) {
                      addDropdownOption(selectedNode.id, option);
                      if (newOptionRef.current) {
                        newOptionRef.current.value = "";
                      }
                    }
                  }}
                >
                  +
                </Button>
              </Form.Group>

              <ListGroup style={{ maxHeight: "220px", overflowY: "scroll" }}>
                <ListGroup.Item>
                  {selectedNode.data.options.map((option: string) => (
                    <ListGroup.Item key={option}>
                      <Stack direction="horizontal">
                        <div className="col">{option}</div>
                        {option !== "N/A" && (
                          <div className="col-5 d-flex">
                            <Button
                              className="btn btn-danger"
                              type="button"
                              onClick={() =>
                                deleteDropdownOption(selectedNode.id, option)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </Stack>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NodeSettings;
