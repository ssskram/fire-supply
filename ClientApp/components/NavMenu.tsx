import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

const btnWidth = {
    width: '93%'
}

const hrMargin = {
    marginLeft: '15px',
    marginRight: '15px'
}

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
                    <div className='navbar-brand-container'>
                        <Link className='navbar-brand' to={'/'} data-toggle="collapse" data-target=".in">
                            <span><img src='./images/helmet.png' className="navbar-brand-image" />
                                PBF <strong>Supply</strong>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <div className='nav navbar-nav'>
                        <div className='text-center'>
                            <NavLink to={'/Items'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                                <b>Place an order</b>
                            </NavLink>
                            <NavLink to={'/Items'} style={btnWidth} className='btn btn-primary hidden-md hidden-lg hidden-xl main-nav-btn'>
                                <b>Order</b>
                            </NavLink>
                            <NavLink to={'/MyOrders'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                                Track my orders
                            </NavLink>
                            <NavLink to={'/MyOrders'} style={btnWidth} className='btn btn-primary hidden-md hidden-lg hidden-xl main-nav-btn'>
                                My orders
                            </NavLink>
                        </div>
                        <div className="sidenav-header">Resources</div>
                        <div className='text-center'>
                            <hr style={hrMargin} />
                            <NavLink to={'/UnitsOfIssue'} style={btnWidth} className='btn btn-primary'>
                                Units of Issue
                            </NavLink>
                            <NavLink to={'/WhatsAnEmergency'} style={btnWidth} className='btn btn-primary'>
                                What's an emergency order?
                            </NavLink>
                        </div>
                        <div className="sidenav-header">Shopping Cart</div>
                        <hr style={hrMargin} />
                        <div className='cart-container'>
                            <div><span className='glyphicon glyphicon-shopping-cart'> Your cart is empty</span></div>
                        </div>
                        <div className='accountcontainer'>
                            <div className="account">{user}</div>
                            <div className='logout'>
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                    <span className='glyphicon glyphicon-user'></span>Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
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

