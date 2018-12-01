// from data.js
var tableData = data;

// YOUR CODE HERE!
// refer to the html tbody element in line 64
var tbody = d3.select("tbody");

// make a function that allows us to pull data out od data.js file
function extractRawData(data){
    tbody.html(""); // make sure the tbody element we're working with is empty and doesn't contain anything
    data.forEach((rawDataRow) =>{
        var extractedData = tbody.append("tr"); // appends a row onto the end of the table body within HTML (just creates the first row on the first iteration)
        
        Object.values(rawDataRow).forEach((rawDataInformation) => {
            var htmlCellData = extractedData.append("td");
            htmlCellData.text(rawDataInformation);
        });
    });
}

// make a function that determines what happens when the user clicks
function handleClick() { // empty parentheses indicate there is no parameters for this function and thus we don't need to worry about providing arguments for the function
    d3.event.preventDefault(); // stops the page from refreshing unless user does something; from MDN web docs:
    // "The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be."
    
    var date = d3.select("#datetime").property("value"); // selects the datetime attribute from each object within the data variable in the data.js file
    var dataToBeInserted = tableData; // refers to the "data" variable we pulled out of data.js and saved to the tableData variable in this file ****make sure the "#" is in front of "datetime", got this when running without the "#":
    // d3.js:1476 Uncaught TypeError: Cannot read property 'value' of null
    // at Selection.selection_property [as property] (d3.js:1476)
    // at HTMLButtonElement.handleClick (app.js:26)
    // at HTMLButtonElement.<anonymous> (d3.js:935)
    
    
    if (date){
        dataToBeInserted = dataToBeInserted.filter(row => row.datetime === date); // the .filter function is a method that only keeps the values passed through the function that pass the condition/"test" within the method; in this case, row.date
    }
    extractRawData(dataToBeInserted); // builds our table within the html by using the data we filtered from the data.js file and feeding that filtered data to the extractRawData function we created earlier
    console.log("You clicked the \"filter data\" button!"); // added a console log to provide visual confirmation every time user clicks button; without this, it looks like nothing happens on the page
}

d3.selectAll("#filter-btn").on("click", handleClick); // refers to the "filter-btn" id in the html file and runs the handleClick function we just created anytime the user clicks on this button

// this function call ensures the table is created every time the page loads
extractRawData(tableData); 