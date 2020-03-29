import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import "../css/Profile.css";

const UserInfo = () => {   
    const asideStyles = {
        borderRadius: '10px',
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,.125)',
        margin: '30px auto 0 auto',
        width: '75%'
    };

    const imgStyles = {
        borderRadius: '50%',
        width: '65px',
        margin: '5px auto'
    }

    const { loading, user } = useAuth0();

    if (loading || !user) {
        // spinner graphic would be cool 
        return <div>Loading...</div>;
    }

    return (
        // <Fragment>
        //     <img src={user.picture} alt="Profile pic" />

        //     <h2>{user.name}</h2>
        //     <p>{user.email}</p>
        //     <code>{JSON.stringify(user,null,2)}</code>
        // </Fragment>

        <aside style={asideStyles}>
            <div className="container">
                <div className="row">
                    <div className="col d-inline-flex p-2">
                        <img style={imgStyles} src={user.picture} alt="profile pic" />
                    </div>
                    {user.name != null && (
                        <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                            <div className="row">
                                <div className="col">
                                    <h5>{user.name}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <small className="text-muted">{user.email}</small>
                                </div>
                            </div>
                        </div>
                    )}
                    {user.name == null && (
                        <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                        <div className="row">
                            <div className="col">
                                {/* <h5>{user.name}</h5> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <small className="text-muted">{user.email}</small>
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="col-7">
                        well you can put tickets or something here so gj
                    </div>
                </div>
            </div>
        </aside>
    )
}

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        // spinner graphic would be cool 
        return <div>Loading...</div>;
    }

    return ( 
        <UserInfo />  
    );
};

export default Profile;