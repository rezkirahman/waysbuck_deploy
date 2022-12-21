import { React, useState, useEffect, useContext } from "react"
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap'
import Nav from '../component/navs'
import { UserContext } from '../context/UserContext'
import Bin from '../assets/image/bin.png'
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { API } from "../config/api"
import { formatIDR } from "../component/format-number"

const fontcolor = "#BD0707"
const cardcolor = "#F7DADA"
const fontcolor2 = "#613D2B"


export default function Cart() {
    const title = "Carts"
    document.title = "Waysbucks | " + title
    const [state] = useContext(UserContext)
    let navigate = useNavigate()

    const [formTrans, setFormTrans] = useState({
        postcode: "",
        phone: "",
        address: "",
    });

    //
    const handleChange = (e) => {
        setFormTrans({
            ...formTrans,
            [e.target.name]: e.target.value,
        });
    };

    //get data from db orders
    let { data: order, refetch } = useQuery("orderCache", async () => {
        const response = await API.get("/orders");
        return response.data.data
    });

    // subtotal
    let resultTotal = order?.reduce((a, b) => {
        return a + b.subtotal;
    }, 0);

    // remove
    let handleDelete = async (id) => {
        await API.delete(`/order/` + id);
        refetch();
    };



    const handleSubmit = useMutation(async (e) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        try {
            // pay
            const form = {
                status: "pending",
                total: resultTotal,
                postcode: formTrans.postcode,
                phone: formTrans.phone,
                address: formTrans.address,
            };

            // Insert transaction data
            const body = JSON.stringify(form);
            const response = await API.patch("/transaction", body, config);
            const token = response.data.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment");
                },
            });
            //await API.patch("/order", body, config);
        } catch (error) {
            console.log(error)
        }
        refetch();
    });

    //test midtrans

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-c2bc8ynN7yxUd99M"

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <>
            <Nav />
            <Container className="p-5 mx-auto" style={{ color: fontcolor }}>
                <div>
                    <p className="fw-bold fs-3">My Cart</p>
                    <p>review Your Order</p>
                    <div className="row">
                        <div className="col-sm-6 col-md-8" style={{ fontSize: "14px" }}>
                            <hr />
                            {/* ------------------------------ORDER------------------------------ */}
                            {order?.map((item, index) => (
                                <div className="d-flex justify-content-between my-3">
                                    <div className="d-flex justify-content-between me-1">
                                        <div className="me-3">
                                            <img src={item?.product?.image} alt={item.product.image} width={50} height={50} />
                                        </div>
                                        <div>
                                            <div className="mb-1">
                                                <text className="fw-bold">{item.product.name}</text>
                                            </div>
                                            {/* -------------------------TOPPING-----------------------*/}
                                            <div>
                                                <text className="fw-bold" style={{ color: fontcolor2 }}>Toping :
                                                    {item.topping?.map((topping, indxs) => (
                                                        <span key={indxs}> {topping.name},</span>
                                                    ))}
                                                </text>
                                            </div>
                                            {/* -------------------------------------------------------- */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1" align="right">
                                            <text>{formatIDR.format(item.subtotal)}</text>
                                        </div>
                                        <div onClick={() => handleDelete(item.id)}>
                                            <img src={Bin} alt="bin" width={20} align="right" />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* ---------------------------------------------------------------------- */}
                            <hr />

                            <div className="">
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p>Subtotal</p>
                                        <p>Qty</p>
                                    </div>
                                    <div align="right">
                                        <p>{formatIDR.format(resultTotal)}</p>
                                        <p>{order?.length}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-bold">Subtotal</p>
                                    </div>
                                    <div align="right">
                                        <p className="fw-bold fs-2">{formatIDR.format(resultTotal)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Group className="mb-3" controlId="Name">
                                    <FloatingLabel label="Name">
                                        <Form.Control type="text"
                                            value={state.user.name}
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Email">
                                    <FloatingLabel label="Email">
                                        <Form.Control type="text"
                                            value={state.user.email}
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Phone">
                                    <FloatingLabel label="Phone">
                                        <Form.Control type="text"
                                            name="phone"
                                            onChange={handleChange}
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Postcode">
                                    <FloatingLabel label="Pos Code">
                                        <Form.Control type="text"
                                            name="postcode"
                                            onChange={handleChange}
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="address">
                                    <FloatingLabel label="Address">
                                        <Form.Control as="textarea"
                                            name="address"
                                            onChange={handleChange}
                                            style={{
                                                height: '100px',
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }} />
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>
                            <div className="d-grid gap-2">
                                <Button className="py-3 fw-bold" variant="danger" style={{ background: fontcolor }} onClick={(e) => handleSubmit.mutate(e)}>Pay</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}