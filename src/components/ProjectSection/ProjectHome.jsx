import { ProfileFilled, SearchOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import "./ProjectHome.css";
import { useSelector } from "react-redux";
import social from "../../assets/social.png";

function ProjectHome() {
  const { projectData, loading } = useSelector((state) => state.project);
  return (
    <div>
      <div className="home-wrapper">
        <div style={{ fontWeight: "bold", fontSize: "1.7rem" }}>
          {" "}
          <ProfileFilled style={{ fontSize: "1.7rem" }} /> My Projects
        </div>
        <small
          style={{ marginTop: "-10px", fontSize: "0.8rem", color: "grey" }}
        >
          Free plan
        </small>
        <div
          style={{
            border: "1px solid #d8d4d4",
            borderRadius: "7px",
            width: "90%",
            minHeight: "42px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <div>
            <label
              style={{ padding: "10px", fontSize: "1.1rem" }}
              htmlFor="input"
            >
              <SearchOutlined />
            </label>
          </div>
          <div>
            <input
              style={{ width: "100%", fontSize: "0.9rem" }}
              id="input"
              type="text"
              placeholder="Search projects"
            />
          </div>
        </div>
        <div>
          <select
            style={{
              padding: "4px",
              borderRadius: "5px",
              backgroundColor: "white",
              border: "1px solid #d8d4d4",
              color: "grey",
              fontSize: "0.9rem",
            }}
          >
            <option value="active">Active projects</option>
            <option value="archive" defaultChecked>
              Archived projects
            </option>
          </select>
        </div>
        {projectData.length > 3 ? (
          <div>
            <span style={{ fontWeight: "bold" }}>
              {projectData.length - 1} projects
            </span>
            <div className="detail">
              <div
                style={{
                  color: "orange",
                  fontSize: "1.1rem",
                  marginTop: "10px",
                }}
              >
                <StarFilled />
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: 2,
                }}
              >
                <div style={{ width: "100%", fontWeight: "bold" }}>
                  Need more projects?
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "grey",
                    marginRight: "287px",
                  }}
                >
                  There is no stopping you! Power up your productivity with the
                  Pro plan.
                </div>
              </div>
              <div>
                <button className="upgrade">Upgrade</button>
              </div>
            </div>
          </div>
        ) : null}

        <div>
          {loading ? (
          <div style={{paddingTop:'140px',width:'10%',margin:'auto'}}><Spin /> </div>  
          ) : (
            projectData.map((ele) =>
              ele.name != "Inbox" ? (
                <Link key={ele.id} to={`/${ele.id}`}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "3.5",
                      color: "black",
                    }}
                    className="itm"
                  >
                    {" "}
                    <div>
                      <img style={{ width: "15px" }} src={social} alt="" />
                    </div>{" "}
                    <div style={{ paddingLeft: "10px", paddingBottom: "5px" }}>
                      {" "}
                      {ele.name}
                    </div>
                  </div>
                </Link>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectHome;
