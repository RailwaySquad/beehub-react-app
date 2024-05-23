import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIService from "../auth/APIService";
function ListFriend ({friends}){
    return (
        <ListGroup className=" w-100" >
            {friends.map((e)=>{
                let imageSrc = e.image !=null? e.image:(e.gender=='female'? APIService.URL_REST_API+"/files/user_female.png":APIService.URL_REST_API+"/files/user_male.png");
                return <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                    <Link style={{
                        textDecoration: "none",
                        fontFamily: "Open Sans",
                        color: "#31363F",
                        fontSize: "17px",
                        fontWeight: "500"
                    }} >
                        <Image src={imageSrc} style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                        {e.fullname}
                    </Link>
                </ListGroup.Item>
            })}
            
        </ListGroup>
    );
}
export default ListFriend;