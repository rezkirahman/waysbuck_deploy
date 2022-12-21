import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom'
import Jumbotron from '../component/hero'
import { UserContext } from "../context/UserContext";
import Nav from '../component/navs'
import { API } from '../config/api'
import { Container } from "react-bootstrap";
import { formatIDR } from "../component/format-number";


//const dataLogin = JSON.parse(localStorage.getItem("VALUE_LOGIN"))


export default function Home() {
    document.title = "Waysbucks"
    // modal login
    const [show, setShow] = useState(false);
    const [state] = useContext(UserContext); // user data
    const handleClick = () => setShow(true);
    const navigate = useNavigate()

    const toDetail = (id) => {
        navigate("/detail/" + id)
    }

    let { data: products } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    });

    const fontcolor = "#BD0707"
    const cardcolor = "#F7DADA"

    return (
        <>
            <Nav setShow={setShow} show={show} />
            <Jumbotron />
            <Container className='px-5 mt-3'>
                <div className='justify-content-between mt-3' >
                    <div>
                        <p className='h3 font-weight-bold mt-5 fw-bold' style={{ color: fontcolor }}>Let's Order</p>
                    </div>
                    <div className='row row-cols-auto justify-content-center'>
                        {products?.map((item, index) => (
                            <div
                                onClick={state.isLogin === true ? () => toDetail(item?.id) : handleClick}
                                style={{ textDecoration: "none" }}
                                className='mt-4 col'
                            >
                                <div key={index}>
                                    <div className='card' style={{ width: "241px", height: "392px", backgroundColor: cardcolor, borderRadius: "10px", border: "none" }}>
                                        <img src={item.image} className="card-img-top" alt="Hero" />
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold" style={{ color: fontcolor }}>{item?.name}</h5>
                                            <p className="card-text" style={{ color: fontcolor }}>{formatIDR.format(item?.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </Container>
        </>
    )
}

