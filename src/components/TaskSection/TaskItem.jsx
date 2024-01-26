/* eslint-disable react/prop-types */
import "./TaskItem.css";

function TaskItem({ taskItem }) {
  return (
    <div>
      <div className="task-wrap">
        <button className="task-btn">
          <img src={null} alt="" />
        </button>{" "}
        <span style={{ display: "block", padding: "10px" }}>
          {" "}
          {taskItem.content}{" "}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;
