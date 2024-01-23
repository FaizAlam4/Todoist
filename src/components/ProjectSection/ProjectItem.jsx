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
import "./ProjectItem.css";
import { Popover, Button } from "antd";
import myApi from "../../api/myapi.js";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../feature/projectSlice";

function ProjectItem({ ele }) {
  const dispatch = useDispatch();

  const [ellipsis, setEllipsis] = useState(false);

  const handleDelete = (id) => {
    myApi
      .delete(`https://api.todoist.com/rest/v2/projects/${id}`)
      .then((data) => {
        console.log("Deleted successfully!", data);
        dispatch(deleteProject(id));
      });
  };

  const content = (
    <div className="popover" style={{ lineHeight: "3" }}>
      <p>
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
      className="list-block-one"
      key={ele.id}
      onMouseEnter={() => setEllipsis(true)}
      onMouseLeave={() => setEllipsis(false)}
    >
      <div className="list-block">
        <Link to={`/project/${ele.id}`} className="list-block">
          <img id="social" className="list-block-item" src={social} alt="" />{" "}
          <li className="list-block-item-2">{ele.name}</li>
        </Link>
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

export default ProjectItem;
