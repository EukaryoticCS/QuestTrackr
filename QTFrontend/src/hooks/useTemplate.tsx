import { useState, useCallback } from "react";
import axios from "axios";
import { Node } from "reactflow";
import { config } from "../constants";

interface Details {
  _id: string;
  title: string;
  bgColor: string;
  snapToGrid: boolean;
  author: string;
  layout: Node[];
  sections: string[];
}

export const useTemplate = (gameId: string, templateId: string) => {
  const [details, setDetails] = useState<Details>({
    _id: "",
    title: "",
    bgColor: "",
    snapToGrid: false,
    author: "",
    layout: [],
    sections: [],
  });

  const loadTemplate = useCallback(async () => {
    const response = await axios.get(
      `${config.backend}/api/v1/games/${gameId}/templates/${templateId}`
    );
    setDetails(response.data.template);
    return response.data.template;
  }, [gameId, templateId]);

  const saveTemplate = useCallback(
    async (nodes: Node[], sections: string[]) => {
      const nodeList = nodes.map((node) => ({
        ...node,
        selected: false,
      }));

      await axios.put(`${config.backend}/api/v1/games/${gameId}/templates`, {
        templateData: {
          _id: templateId,
          title: details.title,
          bgColor: details.bgColor,
          sections: sections,
          layout: nodeList,
        },
      });
    },
    [gameId, templateId, details.title, details.bgColor]
  );

  const updateDetails = (newDetails: Partial<Details>) => {
    setDetails((prev) => ({
      ...prev,
      ...newDetails,
    }));
  };

  return {
    details,
    loadTemplate,
    saveTemplate,
    updateDetails,
  };
};
