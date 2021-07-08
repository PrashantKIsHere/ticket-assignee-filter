import React, { Component } from 'react'
import Chart from "./Chart/Chart";
import Filter from "./Filter/Filter";
import data from './sample-data'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      assigneeList: this.getAssigneeList(data),
      selectedStatus: [],
      selectedType: [],
      selectedPriority: [],
      selectedDays: []
    }
  }

  getFilterOption = (field) => {
    const options = []
    this.state.data.records.forEach((issue) => {
      if (options.indexOf(issue[field]) === -1) {
        options.push(issue[field])
      }
    })
    return options.map(item => ({ label: item, value: item }))
  }

  getDaysOption = () => {
    return [
      { label: "Last 7 Days", value: new Date().setDate(new Date().getDate() - 7) },
      { label: "Last 30 Days", value: new Date().setDate(new Date().getDate() - 30) },
      { label: "Last 60 Days", value: new Date().setDate(new Date().getDate() - 60) }
    ]
  }

  getAssigneeList = (data) => {
    const assigneeCount = {};
    data.records.forEach(({ assignee }) => {
      if (assigneeCount[assignee]) {
        assigneeCount[assignee] += 1;
      } else {
        assigneeCount[assignee] = 1;
      }
    })
    return Object.entries(assigneeCount).map(([key, value]) => ({ name: key, count: value }))
  }

  updateAssigneeList = () => {
    this.setState({ assigneeList: this.getAssigneeList(this.filterData()) })
  }

  onStatusChange = (option) => {
    this.setState({ selectedStatus: [...option] }, this.updateAssigneeList)
  }

  onTypeChange = (option) => {
    this.setState({ selectedType: [...option] }, this.updateAssigneeList)
  }

  onPriorityChange = (option) => {
    this.setState({ selectedPriority: [...option] }, this.updateAssigneeList)
  }

  onDaysChange = (option) => {
    this.setState({ selectedDays : [...option] }, this.updateAssigneeList)
  }

  filterData = () => {
    let filteredList = [...this.state.data.records];
    const { selectedStatus, selectedType, selectedPriority, selectedDays } = this.state
    if (selectedStatus.length) {
      const selectedStatusList = selectedStatus.map(item => item.value)
      filteredList = filteredList.filter(item => selectedStatusList.indexOf(item.status) !== -1);
    }
    if (selectedType.length) {
      const selectedTypeList = selectedType.map(item => item.value)
      filteredList = filteredList.filter(item => selectedTypeList.indexOf(item.issue_type) !== -1);
    }
    if (selectedPriority.length) {
      const selectedPriorityList = selectedPriority.map(item => item.value)
      filteredList = filteredList.filter(item => selectedPriorityList.indexOf(item.priority) !== -1);
    }
    if(selectedDays.length){
      const selectedDaysList =  selectedDays.map(item => item.value)
      filteredList = filteredList.filter(item => { 
        const issueCreatedAt = new Date(0).setUTCSeconds(item.issue_created_at);
        return selectedDaysList.some(days => issueCreatedAt >= days);
      })
    }
    return { records: filteredList };
  }

  render() {
    const { assigneeList, selectedStatus, selectedType, selectedPriority, selectedDays } = this.state;
    return (
      <div className="App" >
        <Chart assigneeList={assigneeList} />
        <Filter
          statusOptions={this.getFilterOption("status")}
          selectedStatus={selectedStatus}
          typeOptions={this.getFilterOption("issue_type")}
          selectedType={selectedType}
          priorityOptions={this.getFilterOption("priority")}
          selectedPriority={selectedPriority}
          daysOptions={this.getDaysOption()}
          selectedDays={selectedDays}
          onStatusChange={this.onStatusChange}
          onTypeChange={this.onTypeChange}
          onPriorityChange={this.onPriorityChange}
          onDaysChange={this.onDaysChange}
        />
      </div>
    );
  }
}

export default App;
