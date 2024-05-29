import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Image, Spinner, Button  } from 'react-bootstrap';
import axios from 'axios';
import APIService from '../features/APIService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import SessionRight from '../components/SessionRight';
import Post from '../components/Post';
import { useHomepageQuery } from '../user/userApiSlice';
function Homepage() {
    const user = useSelector(selectCurrentUser);
    const {data: posts, isLoading} = useHomepageQuery({id: user!=null? user.id:1});
    console.log(posts);

    //     const [posts,setPosts] = useState([]);
    //     const [friends, setFriends]= useState([]);
    //     const [isLoading, setIsLoading] = useState(true);
    //     const [loadMore, setLoadMore] = useState(false); 
        const handleScrollToTop=()=>{
            // setIsLoading(true);
            // setLoadMore(!loadMore);
            window.scrollTo({top:0,behavior: "smooth"});
        }
    // useEffect(()=> {
    //     axios.get(`${APIService.URL_REST_API}/user/homepage/${user.id}`).then((res)=>{
        //             setPosts(res.data);
        //             setIsLoading(true);
        //     }).finally(()=>{ 
            //         setTimeout(() => {
                //             setIsLoading(false);
                //         }, 1200);
                //     });
                //     axios.get(`${APIService.URL_REST_API}/user/friends/${user.id}`).then((res)=>{
                    //         setFriends(res.data);
                    //     });
                    // },[loadMore]);
    return (
        <Container fluid className='ps-4' style={{marginTop: "60px"}}>
            <Row>
                <Col lg={8} >
                    <div className="border-2 rounded-2 border-dark mt-2 " style={{paddingTop:"20px", paddingLeft: "15px", boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px"}}>
                        <Form method="post" className="row pe-4">
                            <label className="col-1 mx-auto mb-3 col-form-label">
                                {
                                    user.image?
                                        <Image src={user.image} style={{width:"50px",height: "50px"}}roundedCircle />
                                    :(
                                        user.gender=='female'?
                                        <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                        :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px"}}roundedCircle />
                                    )
                                }
                            </label>
                            <div className='col-9 d-flex flex-row justify-content-center align-items-center'>
                                <input type="text" className="col-11 mb-3 mx-auto form-control " style={{borderRadius: "30px", padding: "5px 20px "}} placeholder="What do you think?"/>
                            </div>
                            <div className='col-1'></div>
                        
                        </Form>
                    </div>
                    {isLoading && posts==null? <div className='mt-5'>
                        <Spinner animation="border"  role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner></div>
                        :
                        posts.map((post, index)=>{
                            return <Post key={index} post={post} page="activity" />;
                        })    
                    }
                    {
                    !isLoading?
                    <div className='mt-4 mb-3'>
                        <Button variant='secondary' onClick={handleScrollToTop}>Reload</Button>
                    </div>:
                    <div></div>
                    }
                </Col>
                <Col lg={4}>
                    <SessionRight />
                </Col>
            </Row>
        </Container>
    );
}
export default Homepage;
