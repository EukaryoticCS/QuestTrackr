import React from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  gameId: string;
  templateId: string;
  title: string;
  author: string;
  link: string;
}

const TemplateCard = (props: Props) => {
  return (
    <div>
      <Link to={props.link} className="col">
        <Card className="card bg-primary bg-gradient">
          <Card.Body className="card-header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Title>{props.title}</Card.Title>
            </div>
            <Card.Subtitle className="mt-auto text-muted">
              By: {props.author}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
      <Dropdown align="end">
        <Dropdown.Toggle variant="link" bsPrefix="p-0">
          <Button
            variant="link"
            className="text-decoration-none p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </Button>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="">Remove from Profile</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    // <Link to={props.link} className="col ">
    //   <div className="card bg-primary bg-gradient">
    //     <div className="card-header h4">
    //       <div className="card-title">{props.title}</div>
    //       <div className="card-body"></div>
    //       <div className="card-footer">
    //         <div className="">By: {props.author}</div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default TemplateCard;
