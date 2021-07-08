import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './Filter.css';

const animatedComponents = makeAnimated();

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter__status">
          <label> Status </label>
          <Select
            className="filter__select"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={this.props.statusOptions}
            value={this.props.selectedStatus}
            onChange={this.props.onStatusChange}
          />
        </div>
        <div className="filter__type">
          <label> Type </label>
          <Select
            className="filter__select"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={this.props.typeOptions}
            value={this.props.selectedType}
            onChange={this.props.onTypeChange}
          />
        </div>
        <div className="filter__priority">
          <label> Priority </label>
          <Select
            className="filter__select"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={this.props.priorityOptions}
            value={this.props.selectedPriority}
            onChange={this.props.onPriorityChange}
          />
        </div>
        <div className="filter__days">
          <label> Days </label>
          <Select
            className="filter__select"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={this.props.daysOptions}
            value={this.props.selectedDays}
            onChange={this.props.onDaysChange}
          />
        </div>
      </div>
    )
  }
}

export default Filter;
