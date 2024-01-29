import { useNavigate } from "react-router-dom";
import pnf from "../../assets/pagenotfound.jpg";
import { HomeFilled } from "@ant-design/icons";
function ErrorPage() {
    const navigate=useNavigate()
  return (
    <div>
      <img
        style={{ width: "60%", margin: "auto", marginRight: "300px" , height:'60%'}}
        src={pnf}
        alt=""
      />
      <div style={{width:'75%'}}><button style={{backgroundColor:'#e42121', fontSize:'1.5rem', color:'white', padding:'5px',fontWeight:'bold', cursor:'pointer'}} onClick={()=>{
navigate('/')
      }}><HomeFilled /><span style={{padding:'4px'}}>Home</span></button></div>
    </div>
  );
}

export default ErrorPage;
