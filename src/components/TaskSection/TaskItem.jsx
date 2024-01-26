/* eslint-disable react/prop-types */
import "./TaskItem.css";

function TaskItem({ taskItem }) {
  return (
    <div className="task-block">
      <div className="task-wrap">
        <button className="task-btn">
          <img src={null} alt="" />
        </button>{" "}
        <span style={{ display: "block", padding: "10px" }}>
          {" "}
          {taskItem.content}{" "}
        </span>
        
       
      </div>
      <span style={{ display: "block", padding: "10px",fontSize:'0.8rem',color:'grey',textAlign:'left',marginTop:'-15px' }}>
          {taskItem.description}
        </span>
      
    </div>
  );
}

export default TaskItem;
