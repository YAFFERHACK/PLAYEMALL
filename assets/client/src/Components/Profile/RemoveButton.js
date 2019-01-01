import React, { Component } from 'react'

export default class RemoveButton extends Component {
    constructor() {
        super();
        this.state = {
            deployed: false
        }
    }

    render() {

        let dropDownClass = "dropdown";
        if (this.state.deployed) { dropDownClass = "dropdown is-active" }
        let removeText = "Remove Collection"
        if (this.state.deployed) { removeText = "Cancel Removal"}

        return (

            <div onClick={() => { this.setState({ ...this.state, deployed: !this.state.deployed }) }} className={dropDownClass}>
                <div className="dropdown is-up">
                    <div className="dropdown-trigger">
                        <button className="button removeColl" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>{removeText}</span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                        <div className="dropdown-content">
                            <button className="button is-warning" value={this.props.value} onClick={(e) => { this.props.deleteCollection(e) }}>Yes, Remove it!</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
