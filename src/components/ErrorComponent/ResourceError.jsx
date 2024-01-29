import { ExclamationCircleFilled } from "@ant-design/icons";
function ResourceError() {
  return (
    <div style={{paddingTop:'40px',padding:'20px'}}>
      <h1>Uh Oh....</h1>
      <p>
        <ExclamationCircleFilled /> Might be accessing with wrong project ID! Go
        home and click to available projects from the sidemenu
        <div style={{ fontSize: "11rem", color: "#ff0505ab", marginTop: "200px" }}>
          404
        </div>
      </p>
    </div>
  );
}

export default ResourceError;
