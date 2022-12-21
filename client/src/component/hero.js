import React from 'react'
import { Container } from 'react-bootstrap'
import Herobg from '../assets/image/hero.png'

export default function Hero() {
    return (
        <Container className='px-5 mt-3'>
            <div>
                <div className='position-relative'>
                    <img className='img-fluid' src={Herobg} alt='hero' />
                    <div className='p-5 text-white position-absolute top-0 start-0'>
                        <p className='h1 fw-bold mt-5'>WaysBucks</p>
                        <p style={{ fontSize: "24px" }}>Things are changing, but we’re still here for you</p>
                        <p style={{ fontSize: "16px", width: "500px" }}>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
                        <p style={{ fontSize: "16px" }}>Let’s Order...</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}