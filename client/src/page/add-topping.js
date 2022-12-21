import { React, useState } from "react"
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"
import Nav from '../component/navs'
import ProductDetail from "./detail-product"

const fontcolor = "#BD0707"
const cardcolor = "#F7DADA"

export default function AddProduct() {
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        qty: '1',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
        });

        //PREVIEW IMAGE
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    //store data to database
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            //config
            const config = {
                header: {
                    'content-type': 'multipart/form-data'
                },
            };

            //store data with form-data
            const formData = new FormData();
            formData.set('name', form.name);
            formData.set('price', form.price);
            formData.set('image', form.image[0], form.image[0].name);
            formData.set('qty', form.qty);

            const response = await API.post('/topping', formData, config);
            console.log(response);

            navigate('/transaction')

        } catch (error) {
            console.log(error)
        }
    });



    return (
        <>
            <Nav />
            <Container className="p-5 mx-auto" style={{ color: fontcolor }}>
                <div>
                    <div className="row">
                        <div className="col-sm-6 col-md-8 mb-3">
                            <p className="fw-bold fs-2">Product</p>
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Group className="mb-3" controlId="Name">
                                    <FloatingLabel label="Name">
                                        <Form.Control
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name Product"
                                            onChange={handleChange}
                                            value={form.name}
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <FloatingLabel label="price">
                                        <Form.Control
                                            type="text"
                                            id="price"
                                            name="price"
                                            placeholder="Price"
                                            style={{
                                                borderColor: fontcolor,
                                                background: cardcolor
                                            }}
                                            onChange={handleChange}
                                            value={form.price}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        id="photo"
                                        name="image"
                                        placeholder="Photo Product"
                                        style={{
                                            borderColor: fontcolor,
                                            background: cardcolor
                                        }}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        className="d-grid gap-2"
                                        style={{ background: fontcolor }}
                                        variant='danger'
                                        onClick={(e) => handleSubmit.mutate(e)}
                                    >
                                        Add Product
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="col-6 col-md-4">
                            {preview && (<img className="img-fluid" src={preview} alt={preview} />)}
                            {/* <img src={ProductPic} alt='productpic' className="img-fluid" /> */}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

