import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Paging from './Paging'

export class ItemCard extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsPerPage: 15
        }
    }

    handleNextClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current + 1
        });
    }

    handlePreviousClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current - 1
        });
    }

    public render() {
        const {
            currentPage,
            itemsPerPage
        } = this.state

        const {
            items
        } = this.props

        // Logic for paging
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item) => {
            return (
                <div className="container-fluid" key={item.obj}>
                    <div className="row">
                        <div className="panel">
                            <div className="panel-body text-center">
                                {item.obj}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return <div>
            <div className="col-md-12">
                {renderItems}
                <Paging
                    count={items}
                    currentPage={currentPage}
                    totalPages={pageNumbers}
                    next={this.handleNextClick.bind(this)}
                    prev={this.handlePreviousClick.bind(this)} />
                <br />
                <br />
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(ItemCard as any) as typeof ItemCard;