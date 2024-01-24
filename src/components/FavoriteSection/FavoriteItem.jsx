/* eslint-disable react/prop-types */
import {
  EllipsisOutlined,
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import social from "../../assets/social.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Button, Modal, Switch } from "antd";
import myApi from "../../api/myapi.js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { deleteProject, editProject } from "../../feature/projectSlice";
import "./FavoriteItem.css";

function FavoriteItem({ ele }) {
  const dispatch = useDispatch();

  const [ellipsis, setEllipsis] = useState(false);

  const [editData, setEditData] = useState(ele.name);
  const [favCheck, setFavCheck] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setFavCheck(checked);
  };

  const handleDelete = (id) => {
    myApi
      .delete(`https://api.todoist.com/rest/v2/projects/${id}`)
      .then((data) => {
        console.log("Deleted successfully!", data);
        dispatch(deleteProject(id));
      });
  };
  const handleUpdate = (projectId) => {
    myApi
      .post(
        `https://api.todoist.com/rest/v2/projects/${projectId}`,
        { name: editData, is_favorite: favCheck },
        headers
      )
      .then((data) => {
        console.log(data);
        let newId = data.id;
        dispatch(editProject({ newId, data }));
      })
      .catch((err) => console.log(err));
  };

  const content = (
    <div className="popover" style={{ lineHeight: "3" }}>
      <p onClick={showModal}>
        <EditOutlined />
        Edit
      </p>
      <p>
        <HeartOutlined />
        Add to favourites
      </p>
      <p
        onClick={() => {
          handleDelete(ele.id);
        }}
      >
        <DeleteOutlined />
        Remove
      </p>
    </div>
  );
  return (
    <div
      id="app2"
      className="fav-block-one"
      key={ele.id}
      onMouseEnter={() => setEllipsis(true)}
      onMouseLeave={() => setEllipsis(false)}
    >
      <div className="fav-block">
        <Link to={`/project/${ele.id}`} className="fav-block">
          <img id="social" src={social} alt="" />{" "}
          <li className="fav-block-item-2">{ele.name}</li>
        </Link>
        <Modal
          getContainer={document.getElementById("app2")}
          title={
            <div style={{ borderBottom: "1px solid #dbd6d6" }}>
              Edit Project
            </div>
          }
          open={isModalOpen}
          onOk={() => {
            handleOk();
            handleUpdate(ele.id);
          }}
          onCancel={handleCancel}
        >
          <p style={{ lineHeight: "3",textAlign:'left' }}>
            Name:{" "}
            <input
              type="text"
              placeholder="new title"
              value={editData}
              onChange={(e) => {
                setEditData(e.target.value);
              }}
              style={{ fontSize: "0.9rem" }}
              autoFocus
            />
            <br />
            Favorite: <Switch onChange={onChange} />
          </p>
        </Modal>
      </div>
      <div
        className="ellipsis"
        style={{ visibility: ellipsis ? "visible" : "hidden" }}
      >
        <Popover
          placement="right"
          content={content}
          title="Options"
          trigger="hover"
        >
          <Button style={{ outline: "none", border: "none" }}>
            <EllipsisOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  );
}

export default FavoriteItem;
