import React, { Component } from 'react'

export default class Bars extends Component {
  
  render() {
    const { scales, margins, assigneeList, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      assigneeList.map(assignee =>
        <rect
          key={assignee.name}
          x={xScale(assignee.name)}
          y={yScale(assignee.count)}
          height={height - margins.bottom - scales.yScale(assignee.count)}
          width={xScale.bandwidth()}
          fill={"#00CED1"}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}
