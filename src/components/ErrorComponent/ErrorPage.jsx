import pnf from "../../assets/pagenotfound.jpg";
function ErrorPage() {
  return (
    <div>
      <img
        style={{ width: "70%", margin: "auto", marginRight: "300px" }}
        src={pnf}
        alt=""
      />
    </div>
  );
}

export default ErrorPage;
