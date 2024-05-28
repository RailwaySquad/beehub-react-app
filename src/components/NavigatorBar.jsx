import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { Bag, Bell,ChatRightHeartFill,EnvelopeOpen, PersonAdd, Search} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import OffcanvasMessages from "./OffcanvasMessages";
import APIService from "../auth/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function NavigatorBar(){
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: searchQuery });
        navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    };
    return (
         <Navbar expand="lg" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",width:"-webkit-fill-available", zIndex:"3"}} className="bg-body-tertiary pb-0 position-fixed">
            <Container fluid >
                
                <Row style={{ width: "100%", marginTop: "3px"}}>
                    {!location.pathname.includes("/member/profile/") && location.pathname!="/"?
                        <Col xl={2} className="ms-auto"><Link to={"/"} >
                            <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-vertical.svg" width="30" height="30" fluid />
                        </Link></Col>
                        :<></>
                    }
                    <Col lg={6} md={4} xs={4}>
                        <Row>
                            <Col lg={6} md={4} xs={6} className="mx-auto">
                                <Form onSubmit={handleSubmit} >
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2" style={{borderRight: 0,backgroundColor: "#ffffff"}}>
                                            <Search />
                                        </InputGroup.Text>
                                        <Form.Control style={{borderLeft: 0}} 
                                            placeholder="Search"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            onChange={(event) => setSearchQuery(event.target.value)}/>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col ></Col>
                    <Col lg={3} md={1} xs={2}>
                    <Nav className="justify-content-end d-flex flex-row" variant="none" defaultActiveKey="/home">
                    <Nav.Item className="me-2">
                            <Nav.Link >
                                <PersonAdd size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="me-2">
                            <Nav.Link >
                                <Bell size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item  className="me-2">
                            <Nav.Link  href="/friend">
                                <EnvelopeOpen size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item  className="me-2">
                            <Nav.Link  href="/friend">
                                <Bag size={20}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link href={`/member/profile/`+user.username} className="text-nowrap">
                            {
                                user.image!=null? 
                                    <Image src={user.image} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle />
                                :(
                                    user.gender=="female"?
                                    <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle />
                                    :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle />
                                )
                            }
                            {user.fullname}
                            </Nav.Link>
                        </Nav.Item>
                        {location.pathname!="/"?<Nav.Item>
                            <Button onClick={() => setShow(!show)} className="me-2" variant="link" >
                                <ChatRightHeartFill fill="#8224e3" size={24}/>
                            </Button>
                            <OffcanvasMessages show={show} handleClose={handleClose}/>
                        </Nav.Item>:""}
                    </Nav>
                    </Col>
                </Row>
            </Container>

         </Navbar>
    );
}
export default NavigatorBar;