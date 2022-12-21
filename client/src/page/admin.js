import React from "react"
import { Container, Table, Button } from 'react-bootstrap'
import { useQuery, useMutation } from "react-query";
import Nav from '../component/navs'
import { API } from "../config/api";
import { formatIDR } from "../component/format-number";

const fontcolor = "#BD0707"

export default function Admin() {
    let { data: trans , refetch} = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });

    const handleSubmitAccept = useMutation(async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        try {
            // pay
            const form = {
                status: "success",
            };

            const body = JSON.stringify(form);
            const response = await API.patch("/transaction/" + id, body, config);

            refetch()
        }
        catch (error) {
            console.log(error)
        }
        
    })

    const handleSubmitCancel = useMutation(async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        try {
            // pay
            const form = {
                status: "failed",
            };
            refetch()

            const body = JSON.stringify(form);
            const response = await API.patch("/transaction/" + id, body, config);
        }
        catch (error) {
            console.log(error)
        }
        
    })

    return (
        <>
            <Nav />
            <Container className="p-5 mx-auto" style={{ color: fontcolor }}>
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Income</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.user?.name}</td>
                                <td>{item?.address}</td>
                                <td>{item?.postcode}</td>
                                <td className="text-primary">{formatIDR.format(item?.total)}</td>
                                <td className=
                                    {
                                        item.status === "Success"
                                            ? "text-success fw-bold"
                                            : item.status === "failed"
                                                ? "text-danger fw-bold"
                                                : item.status === "pending"
                                                    ? "text-warning fw-bold"
                                                    : ""
                                    }
                                >
                                    {item?.status}</td>
                                <td>{
                                    
                                    <div className="d-flex">
                                        <div className="">
                                            <Button variant="danger" className="mr-1">Cancel</Button>
                                        </div>

                                        <div className="mx-1">
                                            <Button variant="success">Approve</Button>
                                        </div>
                                    </div>
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>

    )
}
