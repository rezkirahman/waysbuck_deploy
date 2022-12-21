import React, { useState, useRef, useContext, useEffect } from 'react'
import { API } from '../config/api';
import { UserContext } from '../context/UserContext';
import { Container, Nav, Navbar, Popover, Overlay, Badge } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../assets/image/logo.png'
import Photouser from '../assets/image/profilephoto.png'
import Iconcart from '../assets/image/icon-cart.png'
import Iconaddproduct from '../assets/image/icon-addproduct.png'
import Iconaddtopping from '../assets/image/icon-addtopping.png'
import Iconlogout from '../assets/image/icon-logout.png'
import Auth from './auth'
import { useQuery } from 'react-query';

//const DataUser = JSON.parse(localStorage.getItem("VALUE_LOGIN"))


export default function Navs({ show, setShow }) {
  let redirect = null
  const [state, dispatch] = useContext(UserContext);


  if (localStorage) {
    if (state.user.role === "admin") {
      redirect = "/transaction"
    } else {
      redirect = "/"
    }
  } else {
    redirect = "/"
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to={redirect}>
              <img src={Logo} alt='Logo' width={80} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            {state.isLogin ?
              state.user.role === "admin" ?
                <Adminpanel /> : <Userpanel />
              :
              <Nav>
                <Nav.Link>
                  <Auth show={show} setShow={setShow} />
                </Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}


function Userpanel() {
  const [dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  let navigate = useNavigate()

  const { data: order } = useQuery("ordersCache", async () => {
    const response = await API.get('/orders');
    return response.data.data;
  });

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  }

  const logout = () => {
    localStorage.removeItem("token")
    dispatch({
      type: 'LOGOUT',
    });
    
    navigate("/");
  }

  return (
    <Nav>
      <Nav.Link className=''>
        <Link to='/cart' className='position-relative'>
          <img src={Iconcart} alt='iconcart' width={30} />
          <Badge className='bg-danger rounded-circle position-absolute top-0 start-50'>
            {order?.length}
          </Badge >
        </Link>
      </Nav.Link>
      <Nav.Link ref={ref}>
        <img src={Photouser}
          alt="Photouser"
          width={40}
          height={40}
          className='rounded-circle border border-2 border-danger my-auto text-center'
          onClick={handleClick}
        >
        </img>
      </Nav.Link>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" style={{ boxShadow: "2px 4px 30px 0px gray", border:"none"}} offset="">
          <Popover.Body>
            <div className=''>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <img src={Iconaddproduct} width={30} alt="addproduct" />
                <text className='fw-bold mx-3 text-dark'>Profile</text>
              </Link>
            </div>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <div>
              <Link onClick={logout} style={{ textDecoration: "none" }}>
                <img src={Iconlogout} width={30} alt="logout" />
                <text className='fw-bold mx-3 text-dark'>Log Out</text>
              </Link>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>

    </Nav>
  )
}

function Adminpanel() {
  const [dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  //let navigate = useNavigate()

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  }

  const logout = () => {
    localStorage.removeItem("token")
    dispatch({ 
      type: "LOGOUT" ,
    });
    
    //navigate("/");
  }

  return (
    <Nav>
      <Nav.Link ref={ref}>
        <img src={Photouser}
          alt="Photouser"
          width={40}
          height={40}
          className='rounded-circle border border-2 border-danger my-auto text-center'
          onClick={handleClick}
        >
        </img>
      </Nav.Link>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-basic" style={{ boxShadow: "2px 4px 30px 0px gray" }} className="-3">
          <Popover.Body>
            <div className='mb-4'>
              <Link to="/add-product" style={{ textDecoration: "none" }}>
                <img src={Iconaddproduct} width={30} alt="addproduct" />
                <text className='fw-bold mx-3 text-dark'>Add Product</text>
              </Link>
            </div>
            <div>
              <Link to="/add-topping" style={{ textDecoration: "none" }}>
                <img src={Iconaddtopping} width={30} alt="addtopping" />
                <text className='fw-bold mx-3 text-dark'>Add Topping</text>
              </Link>
            </div>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <div>
              <Link onClick={logout} style={{ textDecoration: "none" }}>
                <img src={Iconlogout} width={30} alt="logout" />
                <text className='fw-bold mx-3 text-dark'>Log Out</text>
              </Link>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </Nav>
  )
}
