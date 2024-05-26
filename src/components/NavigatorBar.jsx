import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { Bag, Bell,ChatRightHeartFill,EnvelopeOpen, PersonAdd, Search} from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import OffcanvasMessages from "./OffcanvasMessages";

function NavigatorBar(){
    const location = useLocation();
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
         <Navbar expand="lg" style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",width:"-webkit-fill-available", zIndex:"3"}} className="bg-body-tertiary pb-0 position-fixed">
            <Container fluid >
                
                <Row style={{ width: "100%", marginTop: "3px"}}>
                    <Col lg={6} md={4} xs={4}>
                        <Row>
                            <Col lg={6} md={4} xs={6} className="mx-auto">
                                <Form inline="true" >
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2" style={{borderRight: 0,backgroundColor: "#ffffff"}}>
                                            <Search />
                                        </InputGroup.Text>
                                        <Form.Control style={{borderLeft: 0}} 
                                            placeholder="Search"
                                            aria-describedby="basic-addon2"
                                        />
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
                            <Nav.Link href="/member/profile" className="text-nowrap">
                            <Image src="\assets\images\user\meme-6.jpg" style={{width:"25px",height: "25px",marginRight: "5px"}} roundedCircle />
                            @CatTuong
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
        </>
    );
}
export default NavigatorBar;