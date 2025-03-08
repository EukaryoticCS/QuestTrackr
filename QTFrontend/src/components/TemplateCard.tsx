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
    <div className="template-card h-100">
      <Card className="h-100 bg-primary bg-gradient shadow-sm">
        <Link to={props.link} className="text-decoration-none text-white h-100">
          <Card.Body className="d-flex flex-column">
            <Card.Title className="mb-2 text-truncate">
              {props.title}
            </Card.Title>
            <Card.Subtitle className="mt-auto text-light opacity-75 small">
              By: {props.author}
            </Card.Subtitle>
          </Card.Body>
        </Link>
        <div className="position-absolute top-0 end-0 p-2">
          <Dropdown align="end">
            <Dropdown.Toggle
              as={Button}
              variant="link"
              size="sm"
              className="bg-transparent border-0 p-0 shadow-none"
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
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="">Remove from Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card>
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
