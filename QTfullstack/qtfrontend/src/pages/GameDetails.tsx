import React from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateCard from "../components/TemplateCard.tsx";

interface Template {
  title: string,
  author: string,
  templateData: object
}

interface Props {
  title: string;
  summary: string;
  developers: string[];
  publishers: string[];
  releaseYear: number;
  platforms: string[];
  templates: Template[];
}

const GameDetails = (props: Props) => {
  const arrayDeveloperItems = props.developers.map((developer) => <li>{developer}</li>);
  const arrayPublisherItems = props.publishers.map((publisher) => <li>{publisher}</li>);
  const arrayPlatformItems = props.platforms.map((platform) => <li>{platform}</li>);
  const arrayTemplateItems = props.templates.map((template) => <TemplateCard title={template.title} author={template.author} imgUrl="templateExample.jpg"/>)

  return (
    <>
      <QTNavBar />
      <div className="row">
        <div className="col-md-3 px-0 m-4">
          <img
            className="img-fluid card"
            alt=""
            src="https://i1.theportalwiki.net/img/thumb/b/b8/PortalBoxart.jpg/1024px-PortalBoxart.jpg"
            height="300"
          />
        </div>
        <div className="col md-3 m-4">
          <h2 className="display-1">{props.title}</h2>
          <div className="row border-primary">
            <div className="h3">
              {props.summary}<br/><br/>
              
              Developer(s):
              <ul>
                {arrayDeveloperItems}
              </ul>
              Publisher(s):
              <ul>
                {arrayPublisherItems}
              </ul><br/>
              Release Year: {props.releaseYear}<br/>
              Platforms: 
              <ul>
                {arrayPlatformItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="row ">
        <div className="display-1 text-center">Trackr Templates:</div>
        <div className="card-deck">
          {arrayTemplateItems}
        </div>
      </div>

      <QTFooter />
    </>
  );
};

export default GameDetails;
