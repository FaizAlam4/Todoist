/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./ProjectSection.css";

function ProjectSection() {
  const { id } = useParams();
  const { projectData } = useSelector((state) => state.project);

  const [myProject, setMyProject] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let chosenProject = projectData.filter((ele) => ele.id == id);
    console.log(chosenProject);
    setMyProject(chosenProject[0]);
    setLoad(false);
  }, [id]);

  return (
    <div>
      {load ? (
        <div style={{ fontSize: "3rem" }}>
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="section-wrap">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: "900",
                display: "block",
              }}
            >
              {myProject.name}
            </span>
            <p style={{ marginTop: "20px" }}>
              <span style={{ border: "none" }}>
                <button className="btn-section">
                 <PlusOutlined />
                  <span
                    style={{
                      color: "grey",
                      fontSize: "0.9rem",
                      paddingLeft: "5px",
                    }}
                  >
                    Add task
                  </span>
                </button>
              </span>
            </p>
          </div>
          <div style={{ marginTop: "40px" }}>
            <img
              src="https://todoist.b-cdn.net/assets/images/33fe5f2817362251f0375b57d481e7d5.png"
              alt=""
            />
          </div>
          <div style={{ width: "50%", margin: "auto" }}>
            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Start small (or dream big)...
            </p>
            <p style={{ color: "grey", width: "47%", margin: "auto" }}>
              Track tasks, follow progress, and discuss details in one central,
              shared project
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectSection;
