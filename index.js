let totalCircles = 3;
let currDomColor = 0;
let dominantColor = [0, 0, 0];
let circles = document.querySelectorAll(".circle");
let circleColors = [];
let pickedColor;
let resetButton = document.getElementById("reset");
let messageDisplay = document.querySelector("#message");


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
                totalCircles = 3;
                dominantColor[currDomColor]++;
                messageDisplay.textContent = "Dominant Color Wrong: Red-" + dominantColor[0] + " Green-" + dominantColor[1] +  " Blue-" + dominantColor[2];
                console.log("L");
                game();
            }

        }


function setUpCircles() {
	for (let i = 0; i<circles.length; i++) {
		console.log("picked color" + pickedColor)
		circles[i].addEventListener("click", handle);
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
	let topOffset = (256 - RGBValue) / (totalCircles * 0.25) 
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

	currDomColor = Math.max(...RGBArray);

	if(currDomColor == RGBArray[0]) {
		currDomColor = 0;
	} else if(currDomColor == RGBArray[1]) {
		currDomColor = 1;
	} else {
		currDomColor = 2;
	}

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

alert("You can click the circle that is a different color than the other circles. If you get it wrong, the program is keeping track of how many of each main color you get wrong!, So just click the odd circle out to see how well you can see colors! If you click the right color a new circle will appear, but if you get it wrong it will reset back to 3 circles")

game();
