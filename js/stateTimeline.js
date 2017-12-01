class StateTimeline {
    constructor() {
        this.margin = { top: 30, right: 30, bottom: 30, left: 30 };
        this.margin = { top: 30, right: 10, bottom: 10, left: 10 },
            this.width = 960 - this.margin.left - this.margin.right,
            this.height = 500 - this.margin.top - this.margin.bottom;

    }

    update(stateSelected){
        d3.select("#state-timeline").remove();
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        var x = d3.scale.ordinal().rangeRoundBands([0, width])
        //var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var valueline = d3.svg.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.sum); });



        var svg = d3.select("body").append("svg").attr("id","state-timeline")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv(stateSelected, function(error, data) {
            if (error) throw error;
            // format the data
            data.forEach(function(d) {
                d.year = +parseInt(d.year);
                d.sum = +d.sum;
            });
            // Scale the range of the data
            //x.domain(d3.extent(data, function(d) { return d.year; }));
            x.domain(data.map(function (d) { return d.year; }));
            y.domain([0, d3.max(data, function(d) { return d.sum; })]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline).style({"stroke":"steelblue", "stroke-width":"1.5px", "fill":"none"});;
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.svg.axis().scale(x).orient("bottom"));

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(d3.svg.axis().scale(y).orient("left"));
        });


    }

}