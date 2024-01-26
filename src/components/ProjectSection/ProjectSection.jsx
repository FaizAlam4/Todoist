/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./ProjectSection.css";
import {v4 as uuidv4} from 'uuid'
import { Spin } from "antd";
import MyApi from "../../api/myapi.js";
import TaskItem from "../TaskSection/TaskItem.jsx";
import { displayTask,createTask } from "../../feature/taskSlice";
import { useDispatch } from "react-redux";

function ProjectSection() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { projectData, loading } = useSelector((state) => state.project);
  const [myProject, setMyProject] = useState(null);
  const [load, setLoad] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [taskName,setTaskName]=useState('');
  const [description,setDescription]=useState('')
  const headers={
    "Content-Type":'application/json',
    "X-Request-Id":uuidv4()
  }

  useEffect(() => {
    let chosenProject = projectData.filter((ele) => ele.id == id);
    setMyProject(chosenProject[0]);
  }, [id, projectData]);

  useEffect(() => {
    setLoad(true);
    MyApi.get(`https://api.todoist.com/rest/v2/tasks?project_id=${id}`)
      .then((data) => {
        console.log(data);
        dispatch(displayTask(id, data));
        setLoad(false);
        setTaskData(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addTask = () => {
    MyApi.post(`https://api.todoist.com/rest/v2/tasks?project_id=${id}`,{content:taskData,description:description},headers).then((data)=>{
dispatch(createTask(id,data))
setTaskName('')
setDescription
    })
  };

  return (
    <div>
      {loading ? (
        <div style={{ fontSize: "3rem" }}>
          <LoadingOutlined />
        </div>
      ) : (
        <>
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
            <p style={{ marginTop: "20px" }}>
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
                        onChange={(e)=>setTaskName(e.target.value)}
                      />
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
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
                        <button style={{ display: "block" }} onClick={()=>{addTask()}}>Add Task</button>
                      </div>
                    </div>
                  </div>
                ) : (
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
                )}
              </span>
            </p>
          </div>
          {load ? (
            <div>
              <Spin />
            </div>
          ) : taskData && taskData.length > 0 ? (
            taskData.map((ele) => <TaskItem key={ele.id} taskItem={ele} />)
          ) : (
            <div>
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
        </>
      )}
    </div>
  );
}

export default ProjectSection;
