import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { GearFill, Sliders2 } from "react-bootstrap-icons";
import Post from "../../components/Post";
import APIService from "../../features/APIService";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddPost from "../../components/AddPost";
import { useHomepageQuery } from "../../features/userApiSlice";
function ProfilePost ({appUser,user}){
    const {data:posts, isLoading,isFetching,refetch:refetchHomePage} = useHomepageQuery({id: user.id});
    const [showInputModal, setShowInputModal] = useState(false);
    const handleOpenInputModal = () => setShowInputModal(true);
    const handleCloseInputModal = () => setShowInputModal(false);
    return <Container fluid >
                <Row className="profile-tab">
                    <Col xl={3} lg={3} className="text-start my-photo d-sm-none d-lg-block">
                        <h5>My Photos</h5>
                        <hr/>
                        <Row className="g-1">
                            {user.galleries!=null && user.galleries.length>0? user.galleries.map((gallery, index)=>{
                                let imageUrl = gallery.media;
                                return (<Col key={index}>
                                    <Image src={imageUrl} style={{maxWidth: "120px",margin: "2px"}} className="rounded-2"/>
                                    </Col>);
                            }):<></>}
                            
                        </Row>
                    </Col>
                    <Col xl={7} lg={8} md={12} sm={12} className="me-lg-auto mb-4">
                        {appUser.id == user.id?<div>
                            <div className="border-1 rounded-2 border mt-2" style={{paddingTop:"10px", paddingLeft: "1px"}}>
                                <div  className="row pe-2" onClick={handleOpenInputModal}>
                                    <label className="col-1 mx-auto mb-3 col-form-label">
                                        {user.image!=null?
                                            <Image src={user.image} style={{width:"50px",height: "50px"}}roundedCircle />
                                            : (user.gender=='female'?
                                            <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                            :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                            )
                                        }
                                    </label>
                                    <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                    <div className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}}>What do you think?</div>
                                    </div>
                                    <div className='col-1'></div>
                                </div>
                            </div>
                            <hr/>
                            <Modal className="postmodal" show={showInputModal} onHide={handleCloseInputModal} animation={false}>
                            <div >
                                <div >
                                <Modal.Header className="classmodalheader"  closeButton>
                                    <Modal.Title className="modalpost-title">
                                            Write New Post
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                    <AddPost handleCloseModal={handleCloseInputModal} refetchHomePage={refetchHomePage}/>
                                    </Modal.Body>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        :<></>
                        }
                        {user.posts.length==0?
                            <h2 className="text-black-50">There are no post in this profile</h2>
                        :
                        user.posts.map((post, index)=> <Post key={index} post={post} page="profile"/>)
                        }
                    </Col>
                </Row>
            </Container>
        ;
}
export default ProfilePost;