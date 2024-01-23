/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import social from "../../assets/social.png";
import myApi from "../../api/myapi.js";
import { Link } from "react-router-dom";
import { Modal, Switch } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { displayProject, createProject } from "../../feature/projectSlice.js";
import "./SideMenu.css";
import {
  PlusOutlined,
  RightOutlined,
  ProfileFilled,
  DownOutlined,
} from "@ant-design/icons";

function SideMenu() {
  const dispatch = useDispatch();

  const { projectData } = useSelector((state) => state.project);

  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const requestData = {
    name: input,
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
  };

  useEffect(() => {
    myApi
      .get(`https://api.todoist.com/rest/v2/projects`)
      .then((data) => {
        dispatch(displayProject(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const createNewProject = () => {
    setLoading(true);
    myApi
      .post(`https://api.todoist.com/rest/v2/projects`, requestData, headers)
      .then((data) => {
        dispatch(createProject(data));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

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
      <Modal
        title={
          <div style={{ borderBottom: "1px solid #dbd6d6" }}>Add Project</div>
        }
        open={isModalOpen}
        onOk={() => {
          handleOk();
          createNewProject();
        }}
        onCancel={handleCancel}
      >
        <p style={{ lineHeight: "3" }}>
          Name
          <br />
          <input
            type="text"
            style={{
              border: "1px solid #dbd6d6",
              width: "100%",
              fontSize: "1rem",
              padding: "7px",
              borderRadius: "7px",
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Switch defaultChecked onChange={onChange} />
        </p>
      </Modal>
      <div className="project-wrapper">
        <Link style={{ color: "black" }} to={"/project"}>
          <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
            {" "}
            <ProfileFilled style={{ width: "30px" }} /> My Projects
          </div>
        </Link>
        <div>
          <PlusOutlined
            style={{
              visibility: show ? "visible" : "hidden",
              cursor: "pointer",
            }}
            onClick={showModal}
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
          {loading ? (
            <div style={{ fontSize: "0.6rem", color: "gray" }}>Loading...</div>
          ) : showProject ? (
            projectData.map((ele) => (
              <div className="list-block" key={ele.id}>
                <Link to={`/project/${ele.id}`} className="list-block">
                  <img
                    id="social"
                    className="list-block-item"
                    src={social}
                    alt=""
                  />{" "}
                  <li
                    className="list-block-item"
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
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
