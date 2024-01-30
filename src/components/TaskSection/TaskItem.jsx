/* eslint-disable react/prop-types */
import "./TaskItem.css";
import {
  CheckOutlined,
  DeleteOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Popover, Spin, Popconfirm } from "antd";
import { useState } from "react";
import MyApi from "../../api/myapi.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
import {
  RadiusBottomleftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import { createTask, deleteTask, editTask } from "../../feature/taskSlice.js";

const Context = React.createContext({
  name: "Default",
});

function TaskItem({ taskItem, projectId, projectName }) {


  const [api, contextHolder] = notification.useNotification();
  const [moveLoad, setMoveLoad] = useState(false);

  const openNotification = (placement) => {
    api.info({
      message: `Task ${taskItem.content} is done for the day!`,
      description: (
        <Context.Consumer>
          {({ name }) => `Congratulations, ${name}!`}
        </Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "dear",
    }),
    []
  );

  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => {
    return state.project;
  });
  console.log(projectData);
  const [load, setLoad] = useState(false);

  const [showTick, setShowTick] = useState(false);

  const [showOpt, setShowOpt] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [taskName, setTaskName] = useState(taskItem.content);
  const [description, setDescription] = useState(taskItem.description);
  const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
  };

  const removeTask = () => {
    setLoad(true);
    MyApi.delete(`https://api.todoist.com/rest/v2/tasks/${taskItem.id}`)
      .then(() => {
        dispatch(deleteTask({ projectId: projectId, taskItemId: taskItem.id }));
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMyTask = () => {
    MyApi.post(
      `https://api.todoist.com/rest/v2/tasks/${taskItem.id}`,
      { content: taskName, description: description },
      headers
    )
      .then((data) => {
        dispatch(
          editTask({ projectId: projectId, taskId: data.id, taskData: data })
        );
        setShowEditBox(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTaskDone = () => {
    MyApi.post(
      `https://api.todoist.com/rest/v2/tasks/${taskItem.id}/close`,
      {},
      {}
    ).then(() => {
      console.log("Successfully closed!");
      setShowTick(true);
      dispatch(deleteTask({ projectId: projectId, taskItemId: taskItem.id }));
    });
  };

  const moveTask = (e) => {
    setMoveLoad(true)
    let selectedProject = e.target.value;
    let projectValue = projectData.filter((ele) => ele.name == selectedProject);
    let selectedProjectId = projectValue[0].id;
    console.log(selectedProjectId);
    MyApi.post(
      `https://api.todoist.com/rest/v2/tasks?project_id=${selectedProjectId}`,
      { content: taskItem.content, description: taskItem.description },
      headers
    )
      .then((data) => {
        console.log(data);
        dispatch(createTask({ id: selectedProjectId, data: data }));
        MyApi.delete(`https://api.todoist.com/rest/v2/tasks/${taskItem.id}`)
          .then(() => {
            dispatch(
              deleteTask({ projectId: projectId, taskItemId: taskItem.id })
            );
            setMoveLoad(false)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then((err) => {
        console.log(err);
      });
  };

  const content2 = (
    <div>
      <select
        onChange={(e) => {
          moveTask(e);
        }}
        style={{ backgroundColor: "white" }}
      >
        <option value="all" defaultChecked>
          Select Project  
        </option>
        {projectData.map((item) => {
          return item.name != projectName ? (
            <option style={{ fontWeight: "bold" }} value={item.name}>
              #{item.name}
            </option>
          ) : null;
        })}
      </select>
    </div>
  );

  const content = (
    <div className="option-menu">
      <p
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={removeTask}
          okButtonProps={{ style: { backgroundColor: "rgb(206, 16, 16)" } }}
        >
          <button style={{ display: "block" }}>
            {" "}
            <DeleteOutlined /> Delete
          </button>{" "}
        </Popconfirm>

        {load ? (
          <span style={{ display: "block" }}>
            <Spin />
          </span>
        ) : null}
      </p>
      <p>
        <Popover
          content={content2}
          title="Move to"
          trigger="click"
          placement="right"
        >
          <button>
            <MenuUnfoldOutlined /> Move..
            {moveLoad? <span style={{paddingLeft:'80px'}}><Spin/></span>:null}
          </button>
        </Popover>
      </p>
    </div>
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <div
        className="task-block"
        onMouseEnter={() => {
          setShowOpt(true);
        }}
        onMouseLeave={() => {
          setShowOpt(false);
        }}
      >
        {showEditBox ? (
          <div style={{ width: "100%" }}>
            <div
              style={{
                border: "1px solid #d3cbcb",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <input
                style={{ width: "100%" }}
                placeholder="New title..."
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="any description.."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                autoFocus
              />

              <div className="add-task-btn">
                <button
                  onClick={() => {
                    setShowEditBox(false);
                  }}
                  style={{ display: "block" }}
                >
                  Cancel
                </button>
                <button
                  style={{ display: "block" }}
                  onClick={() => {
                    editMyTask();
                  }}
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <div className="task-wrap">
                <button
                  className="task-btn"
                  onMouseEnter={() => {
                    setShowTick(true);
                  }}
                  onMouseLeave={() => {
                    setShowTick(false);
                  }}
                  onClick={() => {
                    handleTaskDone();
                    openNotification("bottomLeft");
                  }}
                  icon={<RadiusBottomleftOutlined />}
                >
                  <span
                    style={{
                      visibility: showTick ? "visible" : "hidden",
                      fontSize: "0.6rem",
                      margin: "2px",
                      display: "inline-block",
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
                    <CheckOutlined />{" "}
                  </span>
                </button>{" "}
                <span style={{ display: "block", padding: "10px" }}>
                  {" "}
                  {taskItem.content}{" "}
                </span>
              </div>
              <span
                style={{
                  display: "block",
                  padding: "8px",
                  fontSize: "0.8rem",
                  paddingLeft: "28px",
                  color: "grey",
                  textAlign: "left",
                  marginTop: "-15px",
                }}
              >
                {taskItem.description}
              </span>
            </div>

            <div
              className="task-options"
              style={{ visibility: showOpt ? "visible" : "hidden" }}
            >
              <div>
                <button
                  onClick={() => {
                    setShowEditBox(true);
                  }}
                >
                  <svg width="24" height="24">
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="currentColor"
                        d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"
                      ></path>
                      <path
                        stroke="currentColor"
                        d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Zm12 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    data-svgs-path="sm1/comments.svg"
                  >
                    <path
                      fill="currentColor"
                      fillRule="nonzero"
                      d="M11.707 20.793A1 1 0 0 1 10 20.086V18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.5l-2.793 2.793zM11 20.086L14.086 17H19a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v3.086z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <Popover
                  content={content}
                  title="Choose"
                  trigger="click"
                  placement="top"
                >
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        transform="translate(3 10)"
                      >
                        <circle cx="2" cy="2" r="2"></circle>
                        <circle cx="9" cy="2" r="2"></circle>
                        <circle cx="16" cy="2" r="2"></circle>
                      </g>
                    </svg>
                  </Button>
                </Popover>
              </div>
            </div>
          </div>
        )}
      </div>
    </Context.Provider>
  );
}

export default TaskItem;
