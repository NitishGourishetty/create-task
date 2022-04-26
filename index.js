let totalCircles = 3;

let circles = document.querySelectorAll(".circle");

let circleColors = [];

let pickedColor; //odd color out

let resetButton = document.getElementById("reset");

var flag = false;

game();


function game() {
	reset();
	setUpCircles();
}


function handle() {
	let clickedColor = this.style.backgroundColor;
            console.log("clicked color " + clickedColor)
            //compare color to picked color
            
            if (clickedColor === pickedColor) {
               console.log("W");
               totalCircles++;
               game();
            } else {
                //this.style.background = "black";
                totalCircles = 3;
                //alert("Unfortunately you lost, here are your color blind stats")
                console.log("L");
                game();
            }

        }


function setUpCircles() {
	for (let i = 0; i<circles.length; i++) {
		console.log("picked color" + pickedColor)
		circles[i].addEventListener("click", handle
            //grab color of clicked squares (use this because it refers to what was clicked)
            );
	}
}


function reset() {
	circleColors = generateCircleRGBS(totalCircles);
	console.log(circleColors);

	for (let i = 0; i<circles.length; i++) { 
		 if (circleColors[i]) {
            circles[i].style.display = "block";
            circles[i].style.backgroundColor = circleColors[i];
	        } else {
	            circles[i].style.display = "none";
	        }
    }
}


function RGB() {
	let red = Math.floor(Math.random() * 256);
	let green = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);

	return [red, green, blue];
}

function generateOffset(RGBValue) {
	let topOffset = (256 - RGBValue) / (totalCircles * 0.25) //logic

	let bottomOffset = RGBValue / (totalCircles * 0.25);

	if(Math.floor(Math.random() * 2)) {
		return Math.floor(Math.random() * topOffset);
	} else {
		return -Math.floor(Math.random() * bottomOffset);
	}
}

function generateCircleRGBS(numCircles) {
	
	let RGBArray = RGB();
	pickedColor = "rgb(" + RGBArray[0] + ", " + RGBArray[1] + ", " + RGBArray[2] + ")"

	redOffset = RGBArray[0] +  generateOffset(RGBArray[0]);
	greenOffset = RGBArray[1] + generateOffset(RGBArray[1]);
	blueOffset = RGBArray[2] +  generateOffset(RGBArray[2]);

	let otherColor = "rgb(" + redOffset + ", " + greenOffset + ", " + blueOffset + ")"

	//let otherColorPlacement = Math.floor(Math.random() * numCircles) - 1;

	//let otherColorPlacement = Math.floor(Math.random() * numCircles);
	let otherColorPlacement = Math.floor(Math.random() * (numCircles - 1));
	console.log("other color placement" + otherColorPlacement)
	let arr = [];

	for (let i = 0; i<numCircles; i++) {
		if(i == otherColorPlacement) {
			arr.push(pickedColor);
		} else {
			arr.push(otherColor);
		}
		
	}

	return arr; 
}
