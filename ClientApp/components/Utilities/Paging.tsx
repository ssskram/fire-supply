import * as React from 'react';
import Items from '../Submit/Items';

// props for pagination:
// https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs

const paddingLeft = {
    paddingLeft: '25px'
}

const paddingRight = {
    paddingRight: '25px'
}

const btnStyle = {
    fontSize: '16px',
    padding: '15px 30px',
    width: 'auto'
}

export default class Paging extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        const {
            currentPage,
            totalPages,
            prev,
            next,
            count
        } = this.props

        return (
            <div>
                {count.length > 45 &&
                    <div>
                        {(currentPage - 1 == 0) && (totalPages.includes(currentPage + 1)) &&
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={prev.bind(this)} disabled><span style={paddingRight} className='glyphicon glyphicon-arrow-left'></span>Previous</button>
                                    </div>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={next.bind(this)}>Next<span style={paddingLeft} className='glyphicon glyphicon-arrow-right'></span></button>
                                    </div>
                                </div>
                            </div>
                        }
                        {(currentPage - 1 > 0) && (totalPages.includes(currentPage + 1)) &&
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={prev.bind(this)}><span style={paddingRight} className='glyphicon glyphicon-arrow-left'></span>Previous</button>
                                    </div>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={next.bind(this)}>Next<span style={paddingLeft} className='glyphicon glyphicon-arrow-right'></span></button>
                                    </div>
                                </div>
                            </div>
                        }
                        {!totalPages.includes(currentPage + 1) &&
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={prev.bind(this)}><span style={paddingRight} className='glyphicon glyphicon-arrow-left'></span>Previous</button>
                                    </div>
                                    <div className='col-sm-6 text-center'>
                                        <button style={btnStyle} className='btn btn-secondary' onClick={next.bind(this)} disabled>Next<span style={paddingLeft} className='glyphicon glyphicon-arrow-right'></span></button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                }
                <br />
                <br />
            </div>
        );
    }
}

