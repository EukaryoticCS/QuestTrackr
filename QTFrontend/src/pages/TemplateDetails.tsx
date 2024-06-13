import React, {
  useState,
  useEffect,
  useCallback,
  // useMemo
} from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import Search from "./Search.tsx";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import ShapeNode from "../components/Nodes/ShapeNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";
import PercentageNode from "../components/Nodes/PercentageNode.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Session, {
  doesSessionExist,
} from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import useStore from "../components/store.tsx";
import { config } from "../constants.js";

function nodeColor(node) {
  switch (node.type) {
    case "shapeNode":
      return "#133C55";
    case "textNode":
    case "imageNode":
      return "#386FA4";
    case "checkboxNode":
    case "numberNode":
    case "dropdownNode":
      return "#59A5D8";
    case "percentageNode":
      return "#42bcf5";
    default:
      return "#FFFFFF";
  }
}

const nodeTypes = {
  shapeNode: ShapeNode,
  textNode: TextNode,
  imageNode: ImageNode,
  checkboxNode: CheckboxNode,
  numberNode: NumberNode,
  dropdownNode: DropdownNode,
  percentageNode: PercentageNode,
};

const TemplateDetails = () => {
  const nodes = useStore((state) => state.nodes);
  const restoreNodes = useStore((state) => state.restoreNodes);
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    author: "",
    bgColor: "",
    layout: [],
    sections: "",
  });
  const [userInputTitle, setUserInputTitle] = useState("");
  const [userTemplateLink, setUserTemplateLink] = useState("");
  const [userEditTemplateLink, setUserEditTemplateLink] = useState("");
  const { gameId, templateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${config.backend}/api/v1/games/${gameId}/templates/${templateId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.template);
      });
  }, [gameId, templateId]);

  useEffect(() => {
    async function getUserTemplateLink() {
      fetch(
        `${config.backend}/api/v1/users/supertokens/${await Session.getUserId()}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          const userTemplate = data.templates.find(
            (template) => template.templateId === details._id
          );
          if (userTemplate) {
            setUserTemplateLink(`/track/${data.username}/${userTemplate._id}`);
          }
          if (data.username === details.author) {
            setUserEditTemplateLink(`/templatecreate/${gameId}/${templateId}`);
          }
        });
    }
    getUserTemplateLink();
  }, [details, gameId, templateId, userEditTemplateLink]);

  const onRestore = useCallback(async () => {
    restoreNodes(details.layout);
  }, [details, restoreNodes]);

  useEffect(() => {
    onRestore();
  }, [details.layout, onRestore]);

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  const handleAddToProfile = async () => {
    if (await doesSessionExist()) {
      if (userTemplateLink === "") {
        const userId = await Session.getUserId();
        const response = await axios.get(
          `${config.backend}/api/v1/users/supertokens/${userId}`
        );
        await axios.post(
          `${config.backend}/api/v1/users/${response.data.username}/templates`,
          {
            templateData: {
              ...details,
              templateId: templateId,
              layout: details.layout.map((node) => ({
                //@ts-ignore
                ...node,
                data: {
                  //@ts-ignore
                  ...node.data,
                  selectable: false,
                },
              })),
            },
          }
        );
        navigate(`/profile/${response.data.username}`);
      } else {
        navigate(userTemplateLink);
      }
    } else {
      navigate("/auth");
    }
  };

  const handleEditTemplate = () => {
    navigate(userEditTemplateLink);
  }

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid">
          <div className="row p-0" style={{ height: "38rem" }}>
            <div className="col d-flex p-0 m-0">
              {details._id === "" ? (
                <div></div>
              ) : (
                <ReactFlow
                  minZoom={0.2}
                  maxZoom={4}
                  fitView
                  nodes={nodes}
                  nodesDraggable={false}
                  nodeTypes={nodeTypes}
                  elementsSelectable={false}
                  zoomOnDoubleClick={false}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background
                    variant={BackgroundVariant.Dots}
                    style={{ background: details.bgColor }}
                  />
                  <MiniMap nodeColor={nodeColor} zoomable pannable />
                  <Controls showInteractive={false} />
                </ReactFlow>
              )}
            </div>
            <div className="col-sm-4 p-2 m-2 bg-dark">
              <strong className="display-4">{details.title}</strong>
              <h2>
                <strong>By:</strong> {details.author}
              </h2>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={handleAddToProfile}
                >
                  {userTemplateLink === "" ? "Add to Profile" : "Track"}
                </button>
                {userEditTemplateLink && (
                  <button
                    className="btn btn-primary"
                    onClick={handleEditTemplate}
                  >
                    Edit Template
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <QTFooter />
    </>
  );
};

export default TemplateDetails;
