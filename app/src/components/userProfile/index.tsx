/*

handles user account and user profile
GETS both on load
then checks admin status, and writes to user profile
if no user profile, throws prompt to generate new profile
all network activity occurs through store/user, or store/userProfile

*/

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import * as style from './style'
import Spinner from '../utilities/spinner'
import SetProfile from './markup/setProfile'
import UpdateProfile from './markup/updateProfile'
import Modal from 'react-responsive-modal'
import AccountContainer from './markup/account'

type props = {
    user: types.user
    userProfile: types.userProfile
    loadUser: () => types.user
    loadUserProfile: (object: types.user) => types.userProfile
    isUserAdmin: (object: types.user) => void
    setUserProfile: (object: types.userProfile) => void
}

type state = {
    loadingProfile: boolean
    setProfile: boolean
    updateProfile: boolean
}

export class Account extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            loadingProfile: true,
            setProfile: false,
            updateProfile: false
        }
    }

    // order is important here so user gets loaded in correctly
    async componentDidMount() {
        // first get user
        const user = await this.props.loadUser()
        // then, load user admin status into userProfile store
        await this.props.isUserAdmin(user)
        // with admin status loaded, load profile
        const profile = await this.props.loadUserProfile(user)
        this.setState({ loadingProfile: false })
        // no profile?  create a new one
        if (!profile) this.setState({ setProfile: true })
    }

    componentWillReceiveProps(nextProps) {
        // when user profile changes or is set, close all modals
        if (this.props.userProfile != nextProps.userProfile) {
            this.setState({
                setProfile: false,
                updateProfile: false
            })
        }
    }

    render() {
        const {
            loadingProfile,
            setProfile,
            updateProfile
        } = this.state

        return (
            <div>
                <AccountContainer
                    user={this.props.user}
                    userProfile={this.props.userProfile}
                    setState={this.setState.bind(this)}
                />
                {loadingProfile &&
                    <Spinner notice='...loading your profile...' />
                }
                {setProfile &&
                    <Modal
                        open={true}
                        onClose={() => { }}
                        classNames={style.modalClasses}
                        showCloseIcon={false}
                        center>
                        <SetProfile />
                    </Modal>
                }
                {updateProfile &&
                    <Modal
                        open={true}
                        onClose={() => this.setState({ updateProfile: false })}
                        classNames={style.modalClasses}
                        showCloseIcon={true}
                        center>
                        <UpdateProfile />
                    </Modal>
                }
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
)(Account as any)