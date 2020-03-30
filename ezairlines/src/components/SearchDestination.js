import React, { useState, useEffect } from 'react';
import "../css/search-navbar.css";
import "../css/autocomplete.css";
import axios from 'axios';

export default function SearchDestination() {
    const [ from, setFrom ] = useState([]);
    const [ to, setTo ] = useState([]);
    const [ departDate, setDepartDate ] = useState([new Date()]);
    const [ returnDate, setReturnDate ] = useState([new Date()]);

    // const autoCompleteStyles = {
    //     position: 'relative',
    //     display: 'inline-block',
    //     width: '300px'
    // };

    // const input = { 
    //     border: '1px solid transparent',
    //     backgroundColor: '#f1f1f1',
    //     padding: '10px',
    //     fontSize: '16px',
    //     width: '100%',
    //     color: 'black'
    // }

    useEffect(() => {
        axios.get('http://localhost:3001/destinations/')
            .then(res=>{
                let ticketArray = res.data; 

                ticketArray.forEach(ticket => {
                    // from.push(ticket.from);
                    setFrom({from: ticket.from})
                    to.push(ticket.to);
                    departDate.push(new Date(ticket.departDate));
                    returnDate.push(new Date(ticket.returnDate));
                });
            })
            .catch((error)=>{
                console.log("axios error when setting state: "+error);
            })
    }, []);

    // const FromOptions = () => {
    //     from.forEach(from => {
    //         console.log(from)
    //         return <option value={from} />
    //     });
    // };

    const ToOptions = () => {
        // to.forEach(to => {
        //     return <option value={to} />
        // });
    };

    const DatesOptions = () => {
        return (
            <select className="form-control search-slt" id="exampleFormControlSelect1">
                <option>Select dates</option>
                <option>example 1</option>
                <option>example 2</option>
            </select>
        )
    };

    return (
        <>
            <header className="masthead text-white text-center" id="searchDestination" style={{marginTop: "50px"}}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <h1 className="mb-5">Enter your destination</h1>
                        </div>
                        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                            <form action="#" method="POST" autoComplete="off">
                                <div className="form-row">
                                    <section className="search-sec">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                        <div>
                                                            <input type="text" name="searchedFrom" className="form-control search-slt" placeholder="Leaving from" list="fromList" />
                                                            <datalist id="fromList">
                                                                {/* <FromOptions /> */}
                                                            </datalist>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                        <div>
                                                            <input type="text" name="searchedTo" className="form-control search-slt" placeholder="Going to" list="toList" />
                                                            <datalist id="toList">
                                                                {/* <ToOptions /> */}
                                                            </datalist>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                        <DatesOptions />
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                        <button type="submit" className="btn btn-danger wrn-btn">Get tickets</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

    // function autoComplete(input, array) {
    //     var currentFocus;
    //     // execute a function when someone writes in the text field
    //     input.addEventListener("input", function(e) {
    //         var a, b, val = this.value;
    //         // close any already open lists of autocompleted values
    //         closeAllLists();
    //         if (!val) { 
    //             return false;
    //         }
    //         currentFocus = -1;
    //         // create a div that will contain the items (values) 
    //         a = document.createElement("div");
    //         a.setAttribute("id", this.id+"autocomplete-list");
    //         a.setAttribute("class", "autocomplete-items");
    //         // append the div element as a child of the autocomplete container
    //         this.parentNode.appendChild(a);
    //         // for each item in the array 
    //         for (let i = 0; i < array.length; i++) {
    //             // check if the item starts with same letters as the text field 
    //             if (array[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
    //                 // create a div element for each matching element 
    //                 b = document.createElement("div");
    //                 // make the matching letters bold
    //                 b.innerHTML = "<strong>"+array[i].substr(0,val.length)+"</strong>";
    //                 b.innerHTML += array[i].substr(val.length);
    //                 // insert an input field that will hold the current array item's value
    //                 b.innerHTML += "<input type='hidden' value='"+array[i]+"'>";
    //                 // execute a function when someone clicks on the item value (div element)
    //                 b.addEventListener("click", function(e) {
    //                     // insert the value for the autocomplete text field
    //                     input.value = this.getElementsByTagName("input")[0].value;
    //                     // close the list of autocompleted values, or any other open lists
    //                     // of autocompleted values
    //                     closeAllLists();
    //                 });
    //                 a.appendChild(b);
    //             }
    //         }
    //     });
    //     // execute a function when a key is pressed
    //     input.addEventListener("keydown", function(e) {
    //         var x = document.getElementById(this.id+"autocomplete-list");
    //         if (x) x = x.getElementsByTagName("div");
    //         if (e.keyCode === 40) {
    //             // if the arrow down key is pressed, increase the currentFocus var
    //             currentFocus++;
    //             // and make the current item more visible
    //             addActive(x);
    //         } else if (e.keyCode === 38) {
    //             // if the up key is pressed, decrease the currentFocus var
    //             currentFocus--;
    //             // and make the current item more visible
    //             addActive(x);
    //         } else if (e.keyCode === 13) {
    //             // if the enter key is pressed, prevent the form from being submitted
    //             e.preventdefault();
    //             if (currentFocus>-1) {
    //                 // clicks the 'active' item
    //                 if (x) x[currentFocus].click();
    //             }
    //         }
    //     });
    //     function addActive(x) {
    //         // a function to classify an item as 'active'
    //         if (!x) return false;
    //         // start be removing the 'active' class on all items
    //         removeActive(x);
    //         if (currentFocus >= x.length) currentFocus = 0;
    //         if (currentFocus < 0) currentFocus = (x.length - 1);
    //         // add class 'autocomplete-active'
    //         x[currentFocus].classList.add("autocomplete-active");
    //     }
    //     function removeActive(x) {
    //         // a function to remove the 'active' class from all autocomplete items
    //         for (var i = 0; i < x.length; i++) {
    //             x[i].classList.remove("autocomplete-active");
    //         }
    //     }
    //     function closeAllLists(element) {
    //         // close all autocomplete lists in the document, except the one passed 
    //         // in as an argument
    //         var x = document.getElementsByClassName("autocomplete-items");
    //         for (var i = 0; i < x.length; i++) {
    //             if (element !== x[i] && element !== input) {
    //                 x[i].parentNode.removeChild(x[i]);
    //             }
    //         }
    //     }
    //     // execute a function when someone clicks in the document
    //     document.addEventListener("click", function(e) {
    //         closeAllLists(e.target);
    //     });
    // }
}
