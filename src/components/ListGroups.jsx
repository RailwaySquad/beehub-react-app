import React from "react";
import { Badge, Image, ListGroup } from "react-bootstrap";
import APIService from "../auth/APIService";
import { Link } from "react-router-dom";
function ListGroups({groups}){
    console.log(groups);
    return (
        <ListGroup className=" w-100" >
            {groups.map((group,index)=>{
                return (
                    <ListGroup.Item key={index} className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                        <Link style={{
                            textDecoration: "none",
                            fontFamily: "Open Sans",
                            color: "#31363F",
                            fontSize: "17px",
                            fontWeight: "500"
                        }} to="" className="">
                        {group.group_image!=null?
                            <Image src={group_image} style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                            :
                            <Image src={APIService.URL_REST_API+"/files/group_image.png"} style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                        }
                        {group.group_name}                                                                                      
                        {/* <Badge bg="primary" style={{float: "right",marginTop: "8px"}}>2 Newest Post</Badge> */}
                        </Link>
                </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}
export default ListGroups;