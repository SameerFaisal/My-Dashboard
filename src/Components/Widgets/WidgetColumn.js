import React from 'react';
//importing fusionchart libraries
//USING FUSION CHART for data visualization
import ReactFC from "react-fusioncharts"; //react-fusioncharts component
import FusionCharts from "fusioncharts"; //fusioncharts library
import Charts from "fusioncharts/fusioncharts.charts";// chart type
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"; //theme
//Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
//end importing

function WidgetColumn(props) {

     //Configure your chart#
        const chartConfigs = {
            type: "column2d", // The chart type
            width: "100%", // Width of the chart
            height: "125", // Height of the chart
            dataFormat: "json", // Data type
            dataSource: {
                // Chart Configuration
                chart: {
                bgColor: "#2a2a2a",           //Set the x-axis name
                theme: "fusion"                 //Set the theme for your chart
                },
                // Chart Data - from step 2
                data: props.data
            }
        };

    return (
        <div>
            <div className="widgetWrap">
                <div className="widgetTitle">
                    {props.title}
                </div>
                <div className="widgetValue">
                    <ReactFC {...chartConfigs} /> 
                </div>
             </div>
        </div>
    )
}

export default WidgetColumn;