import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import * as user from '../../../store/user'
import * as userProfile from '../../../store/userProfile'
import Select from '../../formElements/select'

type props = {
    user: types.user
    setUserProfile: (object) => void
}

const departments = [
    { value: "Department of Public Works", label: "Department of Public Works" },
    { value: "Bureau of Fire", label: "Bureau of Fire" }
]
export class SelectDepartment extends React.Component<props, any> {
    render() {
        return (
            <div>
                <Select
                    value={null}
                    header=""
                    placeholder='Select department or bureau'
                    onChange={department => this.props.setUserProfile({ user: this.props.user.email, department: department.value })}
                    multi={false}
                    options={departments}
                />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.user
    }),
    ({
        ...userProfile.actionCreators,
        ...user.actionCreators
    })
)(SelectDepartment as any)