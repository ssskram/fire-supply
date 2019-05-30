import * as React from "react";
import * as types from "../../store/types";
import Modal from "react-responsive-modal";
import TextArea from "../formElements/textarea";
import Select from "../formElements/select";
import Input from "../formElements/input";

type props = {
  setState: (parentState: object) => void;
  locations: types.location[];
  userProfile: types.userProfile;
  location: select;
  make: string;
  model: string;
  serialNumber: string;
  reasonForRepair: string;
};

type select = { label: string; value: string };

export default class EquipmentRepairForm extends React.Component<props, {}> {
  render() {
    const { location, make, model, serialNumber, reasonForRepair } = this.props;
    let locations = [];
    this.props.locations.forEach(location => {
      if (location.department == this.props.userProfile.department) {
        const select = { value: location.location, label: location.location };
        locations.push(select);
      }
    });

    return (
      <Modal
        open={true}
        onClose={() => this.props.setState({ modal: false })}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={true}
        center
      >
        <div className="col-md-12">
          <h3 className="text-center oswald">Equipment Repair</h3>
          <Select
            value={location}
            header="Where are you located?"
            placeholder="Select location"
            onChange={location => this.props.setState({ location })}
            multi={false}
            options={locations}
            required
          />
          <Input
            value={make}
            header="Make"
            placeholder="Make of the item"
            callback={e => this.props.setState({ make: e.target.value })}
            required
          />
          <Input
            value={model}
            header="Model"
            placeholder="Model of the item"
            callback={e => this.props.setState({ model: e.target.value })}
            required
          />
          <Input
            value={serialNumber}
            header="Serial Number"
            placeholder="Serial number"
            callback={e =>
              this.props.setState({ serialNumber: e.target.value })
            }
            required
          />
          <TextArea
            value={reasonForRepair}
            header="Reason for repair"
            placeholder="Please be specific"
            callback={e =>
              this.props.setState({ reasonForRepair: e.target.value })
            }
            required
          />
        </div>
      </Modal>
    );
  }
}
