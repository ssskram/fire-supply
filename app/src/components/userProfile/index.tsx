import * as React from 'react'
import logout from '../../functions/logout'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import * as style from './style'

type props = {
    user: types.user
    userProfile: types.userProfile
}

export class AccountContainer extends React.Component<props, {}> {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            user,
            userProfile
        } = this.props

        return (
            <div className='accountcontainer'>
                {user &&
                    <div>
                        <div className="account">{user.name}</div>
                        <div className="account">{user.email}</div>
                    </div>
                }
                {userProfile &&
                    <button style={style.profileButton} className='btn btn-secondary'>{userProfile.department}</button>
                }
                <div className='logout'>
                    <button onClick={logout} id="logout" className='btn btn-link navbar-logout-btn'>
                        <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.userProfile
    }),
    ({
        ...user.actionCreators,
        ...userProfile.actionCreators
    })
)(AccountContainer as any)