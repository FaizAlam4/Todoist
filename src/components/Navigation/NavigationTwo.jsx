import { UserAddOutlined , UnorderedListOutlined,CommentOutlined} from "@ant-design/icons"

function NavigationTwo() {
  return (
    <div style={{display:'flex',flexFlow:'row wrap', justifyContent:'space-between', margin:'-7px', fontSize:'0.86rem', fontWeight:'bold', color:'gray'}}>
        <div>My Projects /</div>
        <div style={{display:'flex',flexFlow:'row nowrap', justifyContent:'space-evenly', gap:'10px'}}>

            <div style={{cursor:'pointer'}}><UserAddOutlined />Share</div>
            <div style={{cursor:'pointer'}}><UnorderedListOutlined /> View</div>
            <div style={{cursor:'pointer'}}><CommentOutlined />Comment</div>
        </div>


    </div>
  )
}

export default NavigationTwo