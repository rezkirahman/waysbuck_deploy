import React, { useContext } from "react"
import { Container } from 'react-bootstrap'
import Photo from '../assets/image/profilephoto.png'
import Logo from '../assets/image/logo.png'
import Qrcode from '../assets/image/qr-code.png'
import { UserContext } from "../context/UserContext"
import Nav from '../component/navs'
import { useQuery } from "react-query"
import { API } from "../config/api"
import { formatIDR } from "../component/format-number"

const fontcolor = "#BD0707"
const fontcolor2 = "#613D2B"
const cardcolor = "#F7DADA"

export default function Profile() {
    return (
        <>
            <Nav />
            <Container className='px-5 justify-content-between mt-5' >
                <div className="row">
                    <div className="col">
                        <MyProfile />
                    </div>
                    <div className="col">
                        <div style={{ color: fontcolor2 }}>
                            <p className="fw-bold fs-5">My Transaction</p>
                        </div>
                        <Transaction />
                    </div>
                </div>
            </Container>
        </>
    )
}

function MyProfile() {
    const [state] = useContext(UserContext)
    return (
        <>
            <div style={{ color: fontcolor }}>
                <p className="fs-5 fw-bold">My Profile</p>
            </div>
            <div className="d-flex mb-5">
                <div className="me-4">
                    <img src={Photo} alt="" width={180} />
                </div>
                <div className="">
                    <label className="fw-bold">Full Name</label>
                    <p>{state.user.name}</p>
                    <label className="fw-bold">Email</label>
                    <p>{state.user.email}</p>
                </div>
            </div>

        </>
    )
}

function Transaction() {
    let { data: userTransaction } = useQuery("transactionsCache", async () => {
        const response = await API.get("/user-transaction");
        return response.data.data;
    })

    return (
        <> {userTransaction?.map((item, index) => (
            <div className="p-4 rounded-3 mb-3" style={{ backgroundColor: cardcolor }}>

                <div key={index} className="d-flex justify-content-between my-2">
                    {/* -------------------------ORDER---------------------------- */}
                    <div>
                        {item?.orders?.map((order, idx) => (
                            <div className="my-2 d-flex" key={idx}>
                                <div className="me-3 ">
                                    <img src={order?.product?.image} alt={"s"} width={80} />
                                </div>
                                <div style={{ color: fontcolor }}>
                                    <div className="mb-2">
                                        <label className="fw-bold" style={{ fontSize: "14px" }}>{order?.product?.name}</label><br />
                                        <label style={{ fontSize: "10px" }}><span className="fw-bold">Saturday</span> 5, March 2020</label><br />
                                    </div>
                                    <div>
                                        <label
                                            className="fw-bold"
                                            style={{ color: fontcolor2, fontSize: "10px" }}
                                        >
                                            Toping :
                                            {order?.topping?.map((topping, idx) => (
                                                <span style={{ fontSize: "10px", color: fontcolor }} key={idx}> {topping?.name},</span>
                                            ))}
                                        </label><br />
                                        <label style={{ color: fontcolor2, fontSize: "10px" }}>Price : {formatIDR.format(order?.subtotal)}</label><br />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div align="center">
                        <div>
                            <img src={Logo} width={50} alt="" />
                        </div>
                        <div className="mt-3" align="center">
                            <img src={Qrcode} width={50} alt="" />
                        </div>
                        <div className="mt-3 px-4 py-1 rounded-3" style={{ backgroundColor: "#CCF6FF" }}>
                            <label style={{ color: "#00D1FF" }}>{item?.status}</label>
                        </div>
                        <div className="mt-3" style={{ color: fontcolor2 }}>
                            <p className="fw-bold">Sub total : {formatIDR.format(item?.total)}</p>
                        </div>
                    </div>
                </div>

            </div>
        ))}
        </>
    )
}

