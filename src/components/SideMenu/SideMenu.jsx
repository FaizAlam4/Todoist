/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import ProjectItem from "../ProjectSection/ProjectItem.jsx";
import FavoriteItem from "../FavoriteSection/FavoriteItem.jsx";
import myApi from "../../api/myapi.js";
import { Link } from "react-router-dom";
import { Modal, Switch, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { displayProject, createProject } from "../../feature/projectSlice.js";
import "./SideMenu.css";
import {
  PlusOutlined,
  RightOutlined,
  ProfileFilled,
  DownOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { deleteProject, editProject } from "../../feature/projectSlice.js";

function SideMenu() {
  const dispatch = useDispatch();

  const { projectData } = useSelector((state) => state.project);

  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [check, setCheck] = useState(false);

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
    setCheck(checked);
  };

  const createNewProject = () => {
    setLoading(true);
    myApi
      .post(
        `https://api.todoist.com/rest/v2/projects`,
        { name: input, is_favorite: check },
        headers
      )
      .then((data) => {
        dispatch(createProject(data));
        setLoading(false);
        setInput("");
      })
      .catch((err) => console.log(err));
  };


  const handleDelete = (id) => {
    myApi
      .delete(`https://api.todoist.com/rest/v2/projects/${id}`)
      .then((data) => {
        console.log("Deleted successfully!", data);
        dispatch(deleteProject(id));
      });
  };
  const handleUpdate = (projectId,newName,status) => {
    myApi
      .post(
        `https://api.todoist.com/rest/v2/projects/${projectId}`,
        { name: newName, is_favorite: status },
        headers
      )
      .then((data) => {
        console.log(data);
        let newId = data.id;
        dispatch(editProject({ newId, data }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      id="main"
      className="side-bar"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <Modal
        getContainer={document.getElementById("main")}
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
        <p style={{ lineHeight: "3",textAlign:'left' }}>
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
            autoFocus
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Switch onChange={onChange} />
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
            <Spin />
          ) : showProject ? (
            projectData.map((ele) => <ProjectItem key={ele.id} ele={ele} handleDelete={handleDelete} handleUpdate={handleUpdate} />)
          ) : null}
        </ul>
      </div>
      {loading ? null : (
        <>
          <div className="project-wrapper-2">
            <div style={{ marginLeft: "17px" }}>
              <HeartFilled />
            </div>
            <div style={{ paddingRight: "80px" }}>Favorites</div>
            <div
              onClick={() => {
                setShowFavorite((prev) => !prev);
              }}
              style={{
                visibility: show ? "visible" : "hidden",
                marginRight: "20px",
              }}
            >
              {showFavorite ? <DownOutlined /> : <RightOutlined />}
            </div>
          </div>
          <div className="fav-container">
            {showFavorite
              ? projectData.map((ele) => {
                  return ele.is_favorite ? <FavoriteItem ele={ele} handleDelete={handleDelete} handleUpdate={handleUpdate} /> : null;
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default SideMenu;
