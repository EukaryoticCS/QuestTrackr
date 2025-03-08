import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";
import useStore from "./store.tsx";

interface Props {
  onShapesClick: React.MouseEventHandler;
  onTextClick: React.MouseEventHandler;
  onImageClick: React.MouseEventHandler;
  onCheckboxClick: React.MouseEventHandler;
  onNumbersClick: React.MouseEventHandler;
  onDropdownClick: React.MouseEventHandler;
  onPercentageClick: React.MouseEventHandler;
  handleShowTemplateSettings: React.MouseEventHandler;
  handleShowSavedAlert: React.MouseEventHandler;
}

const TemplateTools = ({
  onShapesClick,
  onTextClick,
  onImageClick,
  onCheckboxClick,
  onNumbersClick,
  onDropdownClick,
  onPercentageClick,
  handleShowTemplateSettings,
  handleShowSavedAlert,
}: Props) => {
  const { undo, redo } = useStore.temporal.getState();

  return (
    <div className="d-flex flex-column bg-dark text-center justify-content-center">
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <Link className="navbar-brand mt-3 mb-4" to="/">
            <QTLogo height="25" width="50" className="mx-2" />
          </Link>
        </li>
        <li className="nav-item">
          <OverlayTrigger
            key="shapes"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-shapes`} style={{ position: "fixed" }}>
                <h4 className="m-auto ">Shapes</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onShapesClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="text"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-text`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Text</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onTextClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-fonts"
                viewBox="2 2 12 12"
              >
                <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="images"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-images`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Images</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onImageClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-card-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="checkboxes"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-checkboxes`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Checkboxes</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onCheckboxClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-check2-square"
                viewBox="0 0 16 16"
              >
                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="numbers"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-numbers`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Numbers</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onNumbersClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-hash"
                viewBox="0 0 16 16"
              >
                <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="dropdowns"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-dropdowns`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Dropdowns</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onDropdownClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-menu-button-wide"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z" />
                <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            key="percentages"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-percentages`} style={{ position: "fixed" }}>
                <h4 className="m-auto">Percentages</h4>
              </Tooltip>
            }
          >
            <button
              className="nav-link py-3 border-bottom m-auto"
              onClick={onPercentageClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-percent"
                viewBox="0 0 16 16"
              >
                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
            </button>
          </OverlayTrigger>
        </li>
      </ul>
      <OverlayTrigger
        key="undo"
        placement="right"
        overlay={
          <Tooltip id={`tooltip-undo`} style={{ position: "fixed" }}>
            <h4 className="m-auto">Undo (Ctrl+Z)</h4>
          </Tooltip>
        }
      >
        <button
          className="nav-link py-3 border-bottom mt-auto"
          onClick={() => undo()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
          </svg>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        key="redo"
        placement="right"
        overlay={
          <Tooltip id={`tooltip-redo`} style={{ position: "fixed" }}>
            <h4 className="m-auto">Redo (Ctrl+Y)</h4>
          </Tooltip>
        }
      >
        <button
          className="nav-link py-3 border-bottom "
          onClick={() => redo()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        key="save"
        placement="right"
        overlay={
          <Tooltip id={`tooltip-save`} style={{ position: "fixed" }}>
            <h4 className="m-auto">Save</h4>
          </Tooltip>
        }
      >
        <button
          className="nav-link py-3 border-bottom"
          onClick={handleShowSavedAlert}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-floppy"
            viewBox="0 0 16 16"
          >
            <path d="M11 2H9v3h2z" />
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        key="settings"
        placement="right"
        overlay={
          <Tooltip id={`tooltip-settings`} style={{ position: "fixed" }}>
            <h4 className="m-auto ">Settings</h4>
          </Tooltip>
        }
      >
        <button
          className="nav-link py-3 border-bottom mb-3"
          onClick={handleShowTemplateSettings}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default TemplateTools;
