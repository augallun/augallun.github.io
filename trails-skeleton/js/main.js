
// Global objects go here (outside of any functions)
let data, scatterplot, barchart; 
let difficultyFilter = [];
const dispatcher = d3.dispatch('filterCategories');

/**
 * Load data from CSV file asynchronously and render charts
 */

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... TODO: you add code here for numeric
     // Be sure to examine your data to fully understand the code
     for (let i = 0; i < data.length; i++) {
        data[i].distance = +data[i].distance;
        data[i].time = +data[i].time;
    }
     // Initialize scale
     // TODO: add an ordinal scale for the difficulty
     const colorScale = d3.scaleOrdinal().domain(['Easy', 'Intermediate', 'Difficult']).range(['#a1d99b', '#31a354', '#006d2c']);
     console.log(data);
     // See Lab 4 for help
     const scatterplotConfig = {
        parentElement: '#scatterplot',
        colorScale: colorScale
      };
 
      const barchartConfig = {
        parentElement: '#barchart',
        colorScale: colorScale
      };
     scatterplot = new Scatterplot(scatterplotConfig, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart(barchartConfig, dispatcher, data);
    // barchart = new Barchart({
    //    parentElement: '#barchart'
    //}, dispatcher, data);    
     barchart.updateVis();
   })
  .catch(error => console.error(error));



/**
 * Use bar chart as filter and update scatter plot accordingly
 */
/*function filterData() {
    if (difficultyFilter.length == 0) {
          scatterplot.data = data;
     } else {
        scatterplot.data = data.filter(d =>
        difficultyFilter.includes(d.difficulty));
     }
     scatterplot.updateVis();
}*/
dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});





