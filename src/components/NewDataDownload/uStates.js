import * as d3 from 'd3';
import "./stateStyles.css";
import {uStatePaths} from "./StateInfo";

export function Draw(id, setSelectedState, setHoveredState, toolTip){

    function mouseOver(event){
        d3.select("#tooltip").transition().duration(200).style("fill", "#747ED6");
        // d3.select("#tooltip").transition().duration(200).style("opacity", .9);
        d3.select("#tooltip").html(setHoveredState(event.target.getAttribute("stateName")));

        //FIXME Get this to work
        d3.select("#tooltip").html(toolTip(event.target.getAttribute("stateName")))
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    function mouseOut(){
        d3.select("#tooltip").transition().duration(500).style("fill", "#747ED6");
        // d3.select("#tooltip").transition().duration(500).style("opacity", 0);
    }

    const niceBlue = "#747ED6";
    const niceGrey = "#919190";

    d3.select(id).selectAll(".state")
        .data(uStatePaths).enter().append("path").attr("class","state").attr("d",function(state){ return state.statePath;})
        .attr("stateName",function(state){ return state.stateName;})
        .on("click", function(state){return setSelectedState(state.target.attributes.stateName.nodeValue)})
        .on("mouseover", mouseOver).on("mouseout", mouseOut);
    // d3.select(id).selectAll(".state")
    //     .data(uStatePaths).enter().append("path").attr("class","state").attr("d",function(state){ return state.statePath;})
    //     .attr("stateName",function(state){ return state.stateName;})
    //     .on("click", function(state){return setSelectedState(state.target.attributes.stateName.nodeValue)})
    //     .style("fill", "#747ED6")
    //     .on("mouseover", mouseOver).on("mouseout", mouseOut);
}
