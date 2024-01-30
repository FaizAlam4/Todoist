/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import ProjectItem from "../ProjectSection/ProjectItem.jsx";
import FavoriteItem from "../FavoriteSection/FavoriteItem.jsx";
import myApi from "../../api/myapi.js";
import { Link } from "react-router-dom";
import { Modal, Switch, Spin } from "antd";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectData, loading } = useSelector((state) => state.project);

  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [check, setCheck] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [editLoad, setEditLoad] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
  };

  const projectName = projectData.map((ele) => {
    return ele.name;
  });

  useEffect(() => {
    myApi
      .get(`https://api.todoist.com/rest/v2/projects`)
      .then((data) => {
        dispatch(displayProject(data));
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
    input.trim().length > 0
      ? projectName.includes(input.trim())
        ? alert("Project with same name already exists!")
        : myApi
            .post(
              `https://api.todoist.com/rest/v2/projects`,
              { name: input.trim(), is_favorite: check },
              headers
            )
            .then((data) => {
              dispatch(createProject(data));
              setInput("");
            })
            .catch((err) => console.log(err))
      : alert("Enter name!");
  };

  const handleDelete = (id) => {
    setDeleteLoad(true);
    myApi
      .delete(`https://api.todoist.com/rest/v2/projects/${id}`)
      .then((data) => {
        console.log("Deleted successfully!", data);
        dispatch(deleteProject(id));
        setDeleteLoad(false);
        navigate("/");
      });
  };
  const handleUpdate = (projectId, newName, status) => {
    setEditLoad(true);
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
        setEditLoad(false);
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
        okButtonProps={{ style: { backgroundColor: "rgb(206, 16, 16)" } }}
        autoFocus={open}
        onCancel={handleCancel}
      >
        <p style={{ lineHeight: "3", textAlign: "left", fontWeight: "bold" }}>
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
            autoFocus={open}
            value={input}
            required
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Switch
            style={{ backgroundColor: check ? "rgb(206, 16, 16)" : "grey" }}
            onChange={onChange}
          />{" "}
          Add to favorites
        </p>
      </Modal>
      <div className="project-wrapper">
        <Link style={{ color: "black" }} to={"/"}>
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
            projectData.map((ele) => (
              <ProjectItem
                key={ele.id}
                ele={ele}
                deleteLoad={deleteLoad}
                editLoad={editLoad}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))
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
                marginRight: "30px",
              }}
            >
              {showFavorite ? <DownOutlined /> : <RightOutlined />}
            </div>
          </div>
          <div className="fav-container">
            {showFavorite
              ? projectData.map((ele) => {
                  return ele.is_favorite ? (
                    <FavoriteItem
                      key={ele.id}
                      ele={ele}
                      handleDelete={handleDelete}
                      deleteLoad={deleteLoad}
                      editLoad={editLoad}
                      handleUpdate={handleUpdate}
                    />
                  ) : null;
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default SideMenu;
