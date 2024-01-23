/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../../api/myapi";
import { LoadingOutlined } from "@ant-design/icons";

function ProjectSection() {
  const { id } = useParams();

  const [myProject, setMyProject] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    myApi.get(`https://api.todoist.com/rest/v2/projects`).then((items) => {
      let chosenProject = items.filter((item) => item.id == id);
      console.log(chosenProject)
      setMyProject(chosenProject);
      setLoad(false);
    });
  }, [id]);

  return (
    <div>{load ? <div style={{fontSize:'3rem'}}><LoadingOutlined /></div> : <div>{myProject[0].name}</div>}</div>
  );
}

export default ProjectSection;
