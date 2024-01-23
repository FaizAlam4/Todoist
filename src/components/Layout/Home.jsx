import { ProfileFilled, SearchOutlined } from "@ant-design/icons";
import "./Home.css";
function Home() {
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
            width: "100%",
            height: "42px",
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
            <option value=""></option>
            <option value="Active" selected>
              Active projects
            </option>
            <option value=""></option>
          </select>
        </div>

        <div>
          {}
        </div>
      </div>
    </div>
  );
}

export default Home;
