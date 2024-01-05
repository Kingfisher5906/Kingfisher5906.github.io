

const debug = true; // Set to true to enable debug to console.
let errors = ""

    function query()
    {   
        let c = 'c'
        let g = 'g'
        var courses = ""
        var grades = ""
        console.log(window.location.search.substring(1))
        var count = getQueryVariable("num")
        count = new Number(count)
        if(debug)console.log("DEBUG:Scripts.js:query: Recieved class num count as: " + count)
        console.log("DATA2: " + (count + 1))
        for(var i = 1; i < (count + 1); i++) //put courses in string
        {
            courses = (courses + getQueryVariable(("c" + i)) + "~")
            
        }
        for(var i = 1; i < count + 1; i++) //put grades in string
        {
            grades = (grades + getQueryVariable("g" + i) + "~")
            
        }
        if(debug)console.log("DEBUG:Scripts.js:query: Added all course as: " + courses)
        if(debug)console.log("DEBUG:Scripts.js:query: Added all grades as: " + grades)
        courses = courses.replace(/\+/g, ' ');
        grades = grades.replace(/\+/g, ' ');
        courses = courses.substring(0,courses.length - 1) //remove extra ~ at end
        grades = grades.substring(0,grades.length - 1)
        if(debug)console.log("DEBUG:Scripts.js:Query: All courses added to String and decoded: " + courses)
        if(debug)console.log("DEBUG:Scripts.js:Query: All grades added to String and decoded: " + grades)
        if(debug)console.log("DEBUG:Scripts.js:query: Decoding URI complete.  Converting Strings to arrays...")
        //BEGIN REFINING COURSES
        var cout = courses.split("~")
        if(debug)console.log("DEBUG:Scripts.js:query: Finished splitting courses: " + cout)
        var output = Array(count)
        for(var i = 0; i < count; i++)
        {
            output[i] = cout[i]
        }
        if(debug)console.log("DEBUG:Scripts.js:query: Refined classes array to only contain classes omitted: " + output)
        //REFINED COURSES
        //BEGIN REFINING GRADES
        var gout = grades.split("~")
        if(debug)console.log("DEBUG:Scripts.js:query: Finished splitting grades: " + gout)
        var goutput = Array(count)
        for(var i = 0; i < count; i++)
        {
            goutput[i] = gout[i]
        }
        if(debug)console.log("DEBUG:Scripts.js:query: Refined grades array to only contain grades omitted: " + goutput)
        //REFINED GRADES
        //Calculate and display GPA element
        document.getElementById("output").innerHTML = "GPA: " + main(output, goutput)
        //Split errors into an array of errors
        errors = errors.split("ERROR")
        
        document.getElementById("output").hidden = false
        document.getElementById("errors").hidden = false
        document.getElementById("errorlist").hidden = false
        //Create a dynamic amount of list items for how many errors occured.
            // Generate a dynamic number of inputs based on user input
            var number = errors.length
            // Get input element andnsave to var
            var container = document.getElementById("errorlist");
            // Remove any existing child nodes
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (i=0;i<number;i++){ //Add class fields
                //Adds rext note that will describe each text field.  i+1 so it starts on 1 not 0
                //Create class inout field within divider
                var input = document.createElement("li");
                //Each class element is named c1,c2,c3,c4,c5...  This line sets their proper names.
                input.innerHTML = "Error" + (i + 1) + error[i];
                container.appendChild(input); 
                //A br element is appended to create a line break
                container.appendChild(document.createElement("br"));
            }
        //end of dynamic error item list code
        
        
        

    }

    function getQueryVariable(variable)
    {
           var query = window.location.search.substring(1);
           if(debug)console.log("DEBUG:Scripts.js:getQueryVariable: Searchbar recorded as" + query)
           query = decodeURI(query)
           if(debug)console.log("DEBUG:Scripts.js:getQueryVariable: Decoded URI recorded as: " + query)
        var vars = query.split("&");
        if(debug)console.log("DEBUG:Scripts.js:getQueryVariable: Split query into: " + vars)
         for (var i=0;i<vars.length;i++) {
                  var pair = vars[i].split("=");
                  if(debug)console.log("DEBUG:Scripts.js:getQueryVariable:SplittingFunction: Debug  data: " + i + " " + pair)
                  if(pair[0] == variable){return pair[1];}
        }
       if(debug)console.log("ERROR:Scripts.js: Unexpected input lead to an error in paramater splitting function: " + query)
      errors = errors + "ERROR:Scripts.js: Unexpected input lead to an error in paramater splitting function: " + query + ".  "
        return(false);
    }

//===============DIVIDER FROM QUERYING TO GPA CALCULATING===========



function main(classes, grades) {
    //const name = ["Calculus A - 2 (F)", "Computer Aided Design and 3D Printing H - 1 (C)", "English 4 A - 3 (A)", "Ethics A - 12 (D)", "Financial Algebra H - 1 (B)", "Introduction to Cybersecurity - 1 (G)"];
    // const grade = [94.44, 85.71, 92.86, 84.10, 96.49, 98.75];
    const name = classes
    const grade = grades
    const cls = classes.length
    const level = new Array(cls).fill(0); // Level table: 0-AP, 1-Honors, 2-Acc, 3-CP, -1 ERROR.
    const gpa = new Array(cls).fill(0);
    
    if (debug) console.log("DEBUG: Classes initialized. Begin Converting classes to course level and calculating GPAs");
    
    for (let i = 0; i < cls; i++) {
        level[i] = getLevel(name[i]);
        gpa[i] = calculate(grade[i], level[i]);
        if (debug) console.log(`DEBUG: Successfully completed level and GPA for ${name[i]}. GPA: ${gpa[i]}. Level: ${level[i]}.`);
    }
    
    if (debug) console.log("DEBUG: Finished generating GPAs. Initializing averaging GPA score calculation.");
    let add = 0;
    
    for (let j = 0; j < cls; j++) {
        add += gpa[j];
    }
    
    if (debug) console.log("DEBUG: Finished averaging GPA scores.");
    add = add / cls;
    add = Math.round(add * 100) / 100; // Round output to the hundredth
    console.log(`Final GPA: ${add}`); // Output the average of all class GPAs, i.e., the final GPA.
    return add
    }
    
    function getLevel(name) {
    if (debug) console.log(`DEBUG: Determining grade level for: ${name}`);
    if (name.includes("AP")) return 0;
    if (name.includes(" H ")) return 1;
    if (name.includes(" A ")) return 2;
    if (name.includes(" CP ")) return 3;
    
    
    console.log(`ERROR: Unable to identify the class level for: ${name}`);
    
    console.log("Defaulting to assuming level is Honors");
    errors = errors + ("ERROR: Unable to identify the class level for: " + name + ".  Defaulting to assuming level is honors.  ")
    return 1;
    }
    
    function calculate(grade, level) {
    if (debug) console.log(`DEBUG: Calculating GLA score from - Grade: ${grade}. Level: ${level}`);
    const scale = [
        [5.00, 4.75, 4.5, 4.25],
        [4.75, 4.50, 4.25, 4.00],
        [4.50, 4.25, 4.00, 3.75],
        [4.25, 4.00, 3.75, 3.5],
        [4.00, 3.75, 3.5, 3.25],
        [3.75, 3.50, 3.25, 3.00],
        [3.50, 3.25, 3.00, 2.75],
        [3.25, 3.00, 2.75, 2.50],
        [3.00, 2.75, 2.50, 2.25],
        [2.00, 1.75, 1.5, 1.25],
        [0, 0, 0, 0]
    ];
    
    const weight = scale[Math.floor(range(grade))][level];
    return weight;
    }
    
    function range(grade) {
    if (debug) console.log(`DEBUG: Determining grade range from grade: ${grade}`);
    if (grade >= 97) return 0;
    if (grade >= 93) return 1;
    if (grade >= 90) return 2;
    if (grade >= 87) return 3;
    if (grade >= 83) return 4;
    if (grade >= 80) return 5;
    if (grade >= 77) return 6;
    if (grade >= 73) return 7;
    if (grade >= 71) return 8;
    if (grade === 70) return 9;
    if (grade >= 0) return 10;
    
    console.log(`ERROR: Unable to determine grade percentile. Was the input invalid? Input was: ${grade}`);
    errors = errors + ("ERROR: Unable to determine grade percentile. Was the input invalid? Input was:" + grade + ".  Returning -1 to force an error")
    return -1;
    }
    