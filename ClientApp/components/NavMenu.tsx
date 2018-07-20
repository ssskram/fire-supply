import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

export class NavMenu extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount() {
        // load user
        this.props.requestUser()
    }

    componentWillReceiveProps(props) {
        let self = this;
        self.setState({ user: props.user })
    }

    public render() {
        const { user } = this.state

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'} data-toggle="collapse" data-target=".in">PBF <strong>Supply</strong></Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <div className='text-center'>
                            <button style={{ width: '93%' }} className='btn btn-success hidden-sm'>Place an order</button>
                            <button style={{ width: '93%' }} className='btn btn-success hidden-md hidden-lg hidden-xl'>Order</button>
                        </div>
                        <li className="sidenav-header">Track</li>
                        <li>
                            <NavLink to={'/MyOrders'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-list'></span> My orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/AllOrders'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-list'></span> All orders
                            </NavLink>
                        </li>
                        <li className="sidenav-header">Resources</li>
                        <li>
                            <NavLink to={'/'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-list'></span> Units of Issue
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-list'></span> What's an emergency order?
                            </NavLink>
                        </li>
                        <div className='cart-container'>
                                Shopping Cart
                        </div>
                        <div className='accountcontainer'>
                            <li className="account">{user}</li>
                            <li className='logout'>
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn navbar-link'>
                                    <span className='glyphicon glyphicon-user'></span>Logout
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) =>
        state.user,
    User.actionCreators
)(NavMenu as any) as typeof NavMenu;

