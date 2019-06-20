import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as items from "../../store/items";
import * as userProfile from "../../store/userProfile";
import * as user from "../../store/user";
import * as messages from "../../store/messages";
import * as locations from "../../store/deliveryLocations";
import * as orders from "../../store/orders";
import filterItemsByDept from "./functions/filterItemsByDept";
import collectItemTypes from "./functions/collectItemTypes";
import filterItems from "./functions/filterItems";
import Header from "./markup/header";
import Types from "./markup/types";
import Search from "./markup/search";
import NoItems from "./markup/noItems";
import ItemTable from "./markup/items";
import NullSearch from "./markup/nullSearch";
import Spinner from "../utilities/spinner";
import EquipmentRepair from "../equipmentRepair";
import MiscItem from "../miscItem";
import Messages from "../utilities/messages";

type props = {
  items: Array<types.item>;
  userProfile: types.userProfile;
  user: types.user;
  locations: types.location[];
  updateCart: (obj) => void;
  newOrder: (newOrder) => boolean;
  errorMessage: () => void;
  successMessage: () => void;
  clearMessage: () => void;
};

type state = {
  items: Array<types.item> | undefined;
  itemTypes: Array<string>;
  selectedType: string;
  searchTerm: string;
  nullSearch: boolean;
};

export class Items extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      itemTypes: [],
      selectedType: "",
      searchTerm: "",
      nullSearch: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      // get relevant items & item types by dept
      const items: types.item[] = filterItemsByDept(
        nextProps.items,
        nextProps.userProfile
      );
      const types: string[] = collectItemTypes(items);
      this.setState(
        {
          items: items,
          itemTypes: types
        },
        () => {
          if (this.state.selectedType != "" || this.state.searchTerm != "") {
            this.executefilter() as void;
          }
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  // receives inventory filters from both the free text "searchTerm"
  // and from the "selectedTypes" button
  receiveFilter(filterType: "selectedTypes" | "searchTerm", filter: string) {
    const itemsPerDept = filterItemsByDept(
      this.props.items,
      this.props.userProfile
    ) as types.item[];
    
    if (filterType == "selectedTypes") {
      this.setState(
        {
          selectedType: this.state.selectedType == filter ? "" : filter,
          items: itemsPerDept
        },
        () => this.executefilter() as void
      );
    } else {
      this.setState(
        {
          searchTerm: filter,
          items: itemsPerDept
        },
        () => this.executefilter() as void
      );
    }
  }

  executefilter() {
    const filteredItems: types.item[] = filterItems(this.state as state);
    if (filteredItems.length > 0) {
      this.setState({
        items: filteredItems,
        nullSearch: false
      });
    } else {
      this.setState({
        items: filterItemsByDept(
          this.props.items,
          this.props.userProfile
        ) as types.item[],
        nullSearch: true,
        selectedType: "",
        searchTerm: ""
      });
    }
  }

  render() {
    const {
      items,
      itemTypes,
      searchTerm,
      selectedType,
      nullSearch
    } = this.state;

    const { userProfile } = this.props;

    return (
      <div>
        <Header department={userProfile.department} />
        <Messages />
        {items == undefined && <Spinner notice="...loading inventory..." />}
        {items && items.length > 0 && (
          <div>
            <div className="row">
              {userProfile.department == "Bureau of Fire" && (
                <div>
                  <EquipmentRepair
                    locations={this.props.locations}
                    userProfile={this.props.userProfile}
                    user={this.props.user}
                    successMessage={this.props.successMessage.bind(this)}
                    errorMessage={this.props.errorMessage.bind(this)}
                  />
                  <MiscItem
                    user={this.props.user}
                    userProfile={this.props.userProfile}
                    locations={this.props.locations}
                    updateCart={this.props.updateCart.bind(this)}
                    newOrder={this.props.newOrder.bind(this)}
                    successMessage={this.props.successMessage.bind(this)}
                    errorMessage={this.props.errorMessage.bind(this)}
                  />
                </div>
              )}
              <Search
                searchTerm={searchTerm}
                receiveFilter={this.receiveFilter.bind(this)}
              />
              <Types
                itemTypes={itemTypes}
                selectedType={selectedType}
                receiveFilter={this.receiveFilter.bind(this)}
              />
            </div>
            {nullSearch == true && <NullSearch />}
            <div className="row">
              <ItemTable
                items={items}
                userProfile={userProfile}
                user={this.props.user}
                updateCart={this.props.updateCart.bind(this)}
              />
            </div>
          </div>
        )}
        {items &&
          items.length == 0 &&
          userProfile.department != "...loading" && (
            <NoItems userProfile={userProfile} />
          )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.userProfile,
    ...state.items,
    ...state.orders,
    ...state.locations,
    ...state.messages
  }),
  {
    ...userProfile.actionCreators,
    ...items.actionCreators,
    ...user.actionCreators,
    ...orders.actionCreators,
    ...locations.actionCreators,
    ...messages.actionCreators
  }
)(Items as any);
