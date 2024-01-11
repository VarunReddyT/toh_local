import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    return (
        <div className="container ">
            <div className="mb-4">
                <button type="button" id="TollLog" className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    LOG OUT
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">WARNING!!!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure about that?
                        </div>
                        <div className="modal-footer">
                            <Link to="/">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, Log Out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 style={{ fontFamily: "sans-serif" }}>Toll Plaza: {props.selectedToll}</h2>
                <div className="mt-4">
                    <Link to="/toll/upload">
                        <button type="button" id="button1" className="btn btn-dark mx-2">
                            UPLOAD DATA
                        </button>
                    </Link>
                    <Link to="/toll/checkrecords">
                        <button type="button" id="button2" className="btn btn-dark mx-2">
                            CHECK RECORDS
                        </button>
                    </Link>
                </div>
                <div className="mt-4">
                    <button type="button" id="button3" className="btn btn-dark mx-2">
                        HOW TO
                    </button>
                    <button type="button" id="button4" className="btn btn-dark mx-2">
                        HELP
                    </button>
                </div>
            </div>
        </div>
    );
}
