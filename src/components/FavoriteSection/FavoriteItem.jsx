/* eslint-disable react/prop-types */
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import social from "../../assets/social.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Button, Modal, Switch, Spin } from "antd";
import "./FavoriteItem.css";

function FavoriteItem({
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
    handleUpdate(ele.id, editData, favCheck);
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
      <p
        onClick={() => {
          handleUpdate(ele.id, ele.name, false);
        }}
      >
        <HeartFilled />
        Remove from favourites {editLoad ? <Spin /> : null}
      </p>
      <p
        onClick={() => {
          handleDelete(ele.id);
        }}
      >
        <DeleteOutlined />
        Remove {deleteLoad ? <Spin /> : null}
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
        <Link to={`/${ele.id}`} className="fav-block">
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
          }}
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
            />
            <br />
            Favorite: <Switch onChange={onChange} />
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

export default FavoriteItem;
