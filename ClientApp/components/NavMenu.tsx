import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Modal from 'react-responsive-modal';
import MiniCart from './Cart/MiniCart'

const btnWidth = {
    width: '93%'
}

const hrMargin = {
    marginLeft: '15px',
    marginRight: '15px'
}

const modalLogout = {
    color: '#383838',
    width: '100%',
    whiteSpace: 'normal'
}

export class NavMenu extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            modalIsOpen: false
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

    componentWillUnmount() {
        this.setState({
            modalIsOpen: false
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    navModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    public render() {
        const {
            user,
            modalIsOpen
        } = this.state

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button onClick={this.navModal.bind(this)} type='button' className='navbar-toggle'>
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
                        <MiniCart />
                        <br />
                        <div className='accountcontainer'>
                            <div className="account">{user}</div>
                            <div className='logout'>
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                    <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='col-md-12'>
                    <br />
                    <br />
                    <Link onClick={this.closeModal.bind(this)} to={'/Items'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                        <b>Place an order</b>
                    </Link>
                    <Link onClick={this.closeModal.bind(this)} to={'/'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                        All orders
                    </Link>
                    <Link onClick={this.closeModal.bind(this)} to={'/MyOrders'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                        My orders
                    </Link>
                    <h3>Resources</h3>
                    <Link onClick={this.closeModal.bind(this)} to={'/UnitsOfIssue'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                        Units of Issue
                    </Link>
                    <Link onClick={this.closeModal.bind(this)} to={'/WhatsAnEmergency'} style={btnWidth} className='btn btn-primary hidden-sm main-nav-btn'>
                        What's an emergency order?
                    </Link>
                    <h3 style={{ paddingLeft: '35px' }}>Cart</h3>
                    <MiniCart closeModal={this.closeModal.bind(this)} />
                    <div className='accountcontainer'>
                        <div className="account">{user}</div>
                        <div className='logout'>
                            <NavLink style={modalLogout} to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                            </NavLink>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) =>
        state.user,
    User.actionCreators
)(NavMenu as any) as typeof NavMenu;

