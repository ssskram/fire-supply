import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'

type props = {
    order: types.order
    closeView: () => void
}

export default class ModifyOrder extends React.Component<props, {}> {

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.closeView()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
            Modify order
            </Modal>
        )
    }
}