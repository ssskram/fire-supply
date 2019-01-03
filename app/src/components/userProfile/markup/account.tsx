
// displays users account & profile information within nav bar
// button calls updateProfile modal from parent

import * as React from 'react'
import * as types from '../../../store/types'
import * as style from '../style'

type props = {
    user: types.user,
    userProfile: types.userProfile
    setState: (object) => void
}

export default class AccountContainer extends React.Component<props, {}> {

    render() {
        const {
            user,
            userProfile,
            setState
        } = this.props

        return (
            <div>
                <div className='accountcontainer'>
                    <div>
                        <div className="account">{user.name}</div>
                        <div className="account">{user.email}</div>
                        <button style={style.profileButton} onClick={() => setState({ updateProfile: true })} className='btn btn-secondary'>{userProfile.department}</button>
                        <div className='logout'>
                            <button onClick={() => window.location.href = "/logout"} id="logout" className='btn btn-link navbar-logout-btn'>
                                <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                        </button>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}