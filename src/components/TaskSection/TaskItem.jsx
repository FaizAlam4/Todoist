/* eslint-disable react/prop-types */
import "./TaskItem.css";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Popover,Spin } from "antd";
import { useState } from "react";
import MyApi from "../../api/myapi.js";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../feature/taskSlice.js";

function TaskItem({ taskItem, projectId }) {
  const dispatch = useDispatch();
  const [load,setLoad]=useState(false)

  const removeTask = () => {
    setLoad(true)
    MyApi.delete(`https://api.todoist.com/rest/v2/tasks/${taskItem.id}`)
      .then(() => {
        dispatch(deleteTask({ projectId: projectId, taskItemId: taskItem.id }));
        setLoad(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (
    <div className="option-menu">
      <p style={{display:'flex',flexFlow:'row nowrap', justifyContent:"space-between"}}>
        <button style={{display:'block'}} onClick={removeTask}> Delete</button> {load? <span style={{display:'block'}}><Spin/></span>: null}
      </p>
      <p>
        <button> Move</button>
      </p>
    </div>
  );

  const [showTick, setShowTick] = useState(false);

  const [showOpt, setShowOpt] = useState(false);

  return (
    <div
      className="task-block"
      onMouseEnter={() => {
        setShowOpt(true);
      }}
      onMouseLeave={() => {
        setShowOpt(false);
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
          <button>
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
            <Button >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
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
  );
}

export default TaskItem;
