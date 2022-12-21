import { React, useState, useEffect, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import Nav from '../component/navs'
import { useMutation, useQuery } from 'react-query';
import { UserContext } from '../context/UserContext'
import { API } from '../config/api';
import { formatIDR } from '../component/format-number'
import styles from './style.module.css'

export default function ProductDetail() {

    const { id } = useParams()
    const fontcolor = "#BD0707"

    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    const [topping, setTopping] = useState([]);
    const [toppingID, settoppingID] = useState([]);

    const handleChange = (e) => {
        let updateTopping = [...topping];
        if (e.target.checked) {
            updateTopping = [...topping, e.target.value];
        } else {
            updateTopping.splice(topping.indexOf(e.target.value));
        }
        setTopping(updateTopping);


        // const name = id;

        let toppingId = [...toppingID];
        if (e.target.checked) {
            toppingId = [...toppingID, parseInt(e.target.name)];
        } else {
            toppingId.splice(toppingID.indexOf(e.target.name));
        }
        settoppingID(toppingId);
    };
    console.log(toppingID)

    //get product data
    let { data: product } = useQuery('productCache', async () => {
        const respProduct = await API.get(`/product/${id}`)
        // console.log(res);
        return respProduct.data.data
    })

    //get topping data
    let { data: toppings } = useQuery('toppingsCache', async () => {
        const respTopping = await API.get('/toppings');
        // console.log(response)
        return respTopping.data.data;
    });

    //total toping price
    let ToppingTotal = topping.reduce((a, b) => {
        return a + parseInt(b);
    }, 0);

    //SUBTOTAL
    let subTotal = product?.price + ToppingTotal;

    const handleSubmit = useMutation(async (e) => {
        //const trans = await API.get("/transaction")

        const bodyTrans = JSON.stringify({
            user_id: state.user.id,
        })

        //request transaction to server 
        const createTrans = await API.post("/transaction", bodyTrans)
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            //save data to database
            const body = JSON.stringify({
                qty: 1,
                topping_id: toppingID,
                subtotal: subTotal,
            });
            console.log("sub total " + subTotal);
            console.log("a", body)



            //convert int id product
            const idproduct = parseInt(id)

            //request order to server
            const response = await API.post(`/order/${idproduct}`, body, config);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        navigate('/')
    });

    useEffect(() => {
        document.title = "Waysbucks | " + product?.name;
        if (state.user.role === "admin") {
            navigate('/')
        }
    }, [state])

    return (
        <>
            <Nav />
            <Container className='px-5 justify-content-between mt-5' >
                <div className='row'>
                    <div className='col'>
                        <img className='img-fluid' src={product?.image} alt={product?.image} width={436} height={555} />
                    </div>
                    <div className='col' style={{ color: fontcolor }}>
                        <div>
                            <p className='h1 fw-bold'>{product?.name}</p>
                            <p>{formatIDR.format(product?.price)}</p>
                        </div>
                        <div>
                            <p className='fw-bold mt-5 fs-4'>Toping</p>
                            <div className='row row-cols-4'>
                                {/* TOPPING */}
                                {toppings?.map((data, index) => (
                                    <div>
                                        <div className='col  mx-auto mt-2' height={117} align='center'>
                                            <input
                                                type="checkbox"
                                                id={`checkmark${index}`}
                                                value={data.price}
                                                name={data.id}
                                                onChange={handleChange}
                                                className="checkedTopping"
                                                style={styles}
                                            />
                                            <label htmlFor={`checkmark${index}`}>
                                                <img src={data.image} alt='Topping' className='img-fluid' width={75} height={85} />
                                            </label>
                                            <div className=''>
                                                <p className='card-text' style={{ fontSize: "14px" }}>{data.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-between'>
                            <p className='fw-bold fs-4'>Total</p>
                            <p className='fw-bold fs-4'>{formatIDR.format(subTotal)}</p>
                        </div>
                        <div className='d-grid gap-2'>
                            <Button
                                variant='danger'
                                style={{ background: fontcolor }}
                                onClick={(e) => handleSubmit.mutate(e)}
                            >
                                Add Cart
                            </Button>

                        </div>
                    </div>
                </div>
            </Container>
        </>

    )
}