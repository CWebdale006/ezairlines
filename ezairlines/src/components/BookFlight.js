import React, { Component } from 'react';
import { Router } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// class component to set state to ticket data 
class TicketData extends Component {
    constructor(props) {
        super(props);

        // not sure if this is actually needed, kept *for now*
        this.state = {
            departDate: new Date(),
            returnDate: new Date()
        }
    }

    componentDidMount() {
        console.log(this);
        // axios.get('http://localhost:3001/destinations/'+this.props.match.params.id)
        //     .then(res=>{
        //         this.setState({
        //             from: res.data.from, 
        //             to: res.data.to
        //         })
        //     })
        //     .catch((error)=>{
        //         console.log("componentDidMount axios error: "+error);
        //     })
    }

    render() {
        return(
            <div>
                hi
            </div>
        )
    }
}

// const TicketData = () => {
//     let { id } = useParams();
//     console.log(id);
// }

export default function BookFlight() {
    return (
        <>
            <TicketData />
            <div>
                <h4>???</h4>
            </div>
        </>
    )
}
