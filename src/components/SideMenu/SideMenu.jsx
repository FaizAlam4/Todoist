import { useEffect, useState } from "react";
import social from "../../assets/social.png";
import myApi from "../../api/myapi.js";
import { Link } from "react-router-dom";
import "./SideMenu.css";
import {
  PlusOutlined,
  RightOutlined,
  ProfileFilled,
  DownOutlined,
} from "@ant-design/icons";

function SideMenu() {
  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    myApi.get(`https://api.todoist.com/rest/v2/projects`).then((data) => {
      console.log("Faiz:", data);
      setProjectData(data);
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    });
  }, []);



  return (
    <div
      className="side-bar"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <div className="project-wrapper">
        <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          {" "}
          <ProfileFilled style={{ width: "30px" }} /> My Projects
        </div>
        <div>
          <PlusOutlined
            style={{
              visibility: show ? "visible" : "hidden",
              cursor: "pointer",
            }}
          />{" "}
          &nbsp; &nbsp;
          {showProject ? (
            <DownOutlined
              onClick={() => {
                setShowProject((prev) => !prev);
              }}
            />
          ) : (
            <RightOutlined
              style={{
                visibility: show ? "visible" : "hidden",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowProject((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <ul className="list-item-container">
          {loading? <div style={{fontSize:'0.6rem', color:'gray'}}>Loading...</div>:
          showProject
            ? projectData.map((ele) => (
                <div className="list-block" key={ele.id}>
                  <Link to={`/project/${ele.id}`} className="list-block">
                    <img id="social" className="list-block-item" src={social} alt="" />{" "}
                    <li className="list-block-item"
                      style={{
                        lineHeight: "1",
                        textAlign: "left",
                        marginLeft: "15px",
                        listStyle: "none",
                      }}
                    >
                      {ele.name}
                    </li>{" "}
                  </Link>
                </div>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
