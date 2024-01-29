/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./ProjectSection.css";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";
import MyApi from "../../api/myapi.js";
import TaskItem from "../TaskSection/TaskItem.jsx";
import { displayTask, createTask } from "../../feature/taskSlice";
import { useDispatch } from "react-redux";

function ProjectSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { taskData } = useSelector((state) => {
    return { taskData: state.task.taskData[id] || [] };
  });
  const { projectData, loading } = useSelector((state) => state.project);
  const [myProject, setMyProject] = useState(null);
  const [load, setLoad] = useState(true);
  const [showBox, setShowBox] = useState(false);
  const [createLoad, setCreateLoad] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  console.log(taskName, description);
  const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
  };
  let chosenProject = projectData.filter((ele) => ele.id == id);
  if (chosenProject[0]) {
    console.log("Navigated successfully!");
  } else {
    navigate("/page-not-found");
  }
  useEffect(() => {
    setMyProject(chosenProject[0]);
  }, [id, projectData]);

  useEffect(() => {
    setLoad(true);
    MyApi.get(`https://api.todoist.com/rest/v2/tasks?project_id=${id}`)
      .then((data) => {
        dispatch(displayTask({ id: id, data: data }));
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addTask = () => {
    if (taskName.trim().length == 0) {
      alert("Enter task name!");
    } else {
      setCreateLoad(true);
      MyApi.post(
        `https://api.todoist.com/rest/v2/tasks?project_id=${id}`,
        { content: taskName, description: description },
        headers
      ).then((data) => {
        dispatch(createTask({ id: id, data: data }));
        setCreateLoad(false);
        setTaskName("");
        setDescription("");
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ fontSize: "3rem", marginTop: "180px" }}>
          <LoadingOutlined />
        </div>
      ) : (
        <div className="outer-div">
          <div className="section-wrap">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: "900",
                display: "block",
              }}
            >
              {myProject && myProject.name}
            </span>
          </div>
          {load ? (
            <div style={{ marginTop: "200px" }}>
              <Spin />
            </div>
          ) : taskData && taskData.length > 0 ? (
            <div style={{ marginTop: "20px" }}>
              {taskData.map((ele) => (
                <TaskItem
                  key={ele.id}
                  taskItem={ele}
                  projectId={id}
                  projectName={myProject.name}
                />
              ))}
              <div
                style={{
                  width: "70%",
                  margin: "auto",
                  marginBottom: "30px",
                }}
              >
                <span style={{ border: "none" }}>
                  {showBox ? (
                    <div>
                      <div
                        style={{
                          border: "1px solid #d3cbcb",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <input
                          style={{ width: "100%" }}
                          placeholder="Task name"
                          type="text"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          autoFocus
                        />
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          autoFocus
                        />

                        <div className="add-task-btn">
                          <button
                            onClick={() => {
                              setShowBox(false);
                            }}
                            style={{ display: "block" }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              addTask();
                            }}
                          >
                            Add Task
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "left", marginTop: "10px" }}>
                      <button
                        className="btn-section"
                        onClick={() => {
                          setShowBox(true);
                        }}
                      >
                        <PlusOutlined />
                        <span
                          style={{
                            color: "grey",
                            fontSize: "0.9rem",
                            paddingLeft: "5px",
                          }}
                        >
                          Add task
                        </span>
                      </button>
                    </div>
                  )}
                </span>
              </div>
              {createLoad ? (
                <div>
                  <Spin />
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div
                style={{
                  marginTop: "0px",
                  width: "70%",
                  margin: "auto",
                  marginBottom: "30px",
                }}
              >
                <span style={{ border: "none" }}>
                  {showBox ? (
                    <div>
                      <div
                        style={{
                          border: "1px solid #d3cbcb",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <input
                          style={{ width: "100%" }}
                          placeholder="Task name"
                          type="text"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          autoFocus
                        />
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          autoFocus
                        />

                        <div className="add-task-btn">
                          <button
                            onClick={() => {
                              setShowBox(false);
                            }}
                            style={{ display: "block" }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              addTask();
                            }}
                          >
                            Add Task
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "left", marginTop: "10px" }}>
                      <button
                        className="btn-section"
                        onClick={() => {
                          setShowBox(true);
                        }}
                      >
                        <PlusOutlined />
                        <span
                          style={{
                            color: "grey",
                            fontSize: "0.9rem",
                            paddingLeft: "5px",
                          }}
                        >
                          Add task
                        </span>
                      </button>
                    </div>
                  )}
                </span>
                {createLoad ? (
                  <div>
                    <Spin />
                  </div>
                ) : null}
              </div>

              <div style={{ marginTop: "40px" }}>
                <img
                  src="https://todoist.b-cdn.net/assets/images/33fe5f2817362251f0375b57d481e7d5.png"
                  alt=""
                />
              </div>
              <div style={{ width: "50%", margin: "auto" }}>
                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Start small (or dream big)...
                </p>
                <p style={{ color: "grey", width: "47%", margin: "auto" }}>
                  Track tasks, follow progress, and discuss details in one
                  central, shared project
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectSection;
