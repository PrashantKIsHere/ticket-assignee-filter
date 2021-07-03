import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from '../Axes/Axes'
import Bars from '../Bars/Bars'
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 500
      
    }
    const maxValue = Math.max(...this.props.assigneeList.map(d => d.count))

    const xScale = this.xScale
      .padding(0.5)
      .domain(this.props.assigneeList.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          assigneeList={this.props.assigneeList}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(Chart)
