import * as React from 'react'
import * as types from '../../../store/types'
import * as style from '../style'
import logout from '../../../functions/logout'

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
                {user && userProfile &&
                    <div className='accountcontainer'>
                        <div>
                            <div className="account">{user.name}</div>
                            <div className="account">{user.email}</div>
                            <button style={style.profileButton} onClick={() => setState({ updateProfile: true })} className='btn btn-secondary'>{userProfile.department}</button>
                            <div className='logout'>
                                <button onClick={logout} id="logout" className='btn btn-link navbar-logout-btn'>
                                    <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                        </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}