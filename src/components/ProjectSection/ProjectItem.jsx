/* eslint-disable react/prop-types */
import {
  EllipsisOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import social from "../../assets/social.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectItem.css";
import { Popover, Button, Modal, Switch, Popconfirm, Spin } from "antd";
function ProjectItem({
  ele,
  handleDelete,
  handleUpdate,
  deleteLoad,
  editLoad,
}) {
  const [ellipsis, setEllipsis] = useState(false);

  const [editData, setEditData] = useState(ele.name);
  const [favCheck, setFavCheck] = useState(false);

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

  const content = (
    <div className="popover" style={{ lineHeight: "3" }}>
      <p onClick={showModal}>
        <EditOutlined />
        Edit
      </p>

      {ele.is_favorite ? (
        <p style={{ cursor: "not-allowed", color: "grey" }}>
          <HeartFilled />
          Already in Favorite
        </p>
      ) : (
        <p
          onClick={() => {
            handleUpdate(ele.id, ele.name, true);
          }}
        >
          {" "}
          <HeartOutlined />
          Add to favourites {editLoad ? <Spin /> : null}
        </p>
      )}

      <p>
        <DeleteOutlined />

        <Popconfirm
          onConfirm={() => {
            handleDelete(ele.id);
          }}
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: { backgroundColor: "rgb(206, 16, 16)", color: "white" },
          }}
        >
          <button
            style={{
              backgroundColor: "white",
              cursor: "pointer",
              border: "none",
            }}
          >
            Delete
          </button>{" "}
          {deleteLoad ? <Spin /> : null}
        </Popconfirm>
      </p>
    </div>
  );

  return (
    <div
      id="app"
      className="list-block-one"
      key={ele.id}
      onMouseEnter={() => setEllipsis(true)}
      onMouseLeave={() => setEllipsis(false)}
    >
      <div className="list-block">
        <Link to={`/${ele.id}`} className="list-block">
          <img id="social" className="list-block-item" src={social} alt="" />{" "}
          <li className="list-block-item-2">{ele.name}</li>
        </Link>
        <Modal
          getContainer={document.getElementById("app")}
          title={
            <div style={{ borderBottom: "1px solid #dbd6d6" }}>
              Edit Project
            </div>
          }
          open={isModalOpen}
          onOk={() => {
            handleOk();
            handleUpdate(ele.id, editData, favCheck);
          }}
          okButtonProps={{ style: { backgroundColor: "rgb(206, 16, 16)" } }}
          onCancel={handleCancel}
        >
          <p style={{ lineHeight: "3", textAlign: "left" }}>
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
            />{" "}
            <br />
            Favorite:{" "}
            <Switch
              onChange={onChange}
              style={{
                backgroundColor: favCheck ? "rgb(206, 16, 16)" : "grey",
              }}
            />
          </p>
        </Modal>
      </div>
      <div style={{ visibility: ellipsis ? "visible" : "hidden" }}>
        <Popover
          placement="right"
          content={content}
          title="Options"
          trigger="hover"
        >
          <Button
            className="ellipsis"
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "inherit",
            }}
          >
            <EllipsisOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  );
}

export default ProjectItem;
