$(document).ready(function(){ /** We wait until all the elements on the DOM are ready */

	/** Function for the menu */
	$('#icon').click(function(){												//Check if the user click the icon
		$(this).toggleClass("is-open");											//We take or give the class of 'is-open' from our icon
		$('.mobile-nav').toggleClass("is-open");								//We take or give the class of 'is-open' from our navbar
	});

	/** Function to smooth scrolling */
	$('.site-nav a').click(function(event){										//Wait for the user to click a link of our navbar
		if(this.hash !== ""){													//Check if the link that the user pulse has a href 
			event.preventDefault();												//Prevent that the page reload
			let hash = this.hash;												//We get the value of the href of the link
			$('html, body').animate({											//We animate the html and the body
				scrollTop: $(hash).offset().top									//We set the next value of the scrollTop of our page
			}, 400, function(){													//We set the time that is gonna last the function and we use an anonymous function
				window.location.hash = hash;									//We set to the window where is gonna head
			});
		}
	});

	/** Varibles to indicators on the left of the page */
	let currentSection = 0;														//Section by default when the page starts
	let totalSections = $('section').length;									//Total sections on the page
	let nextSection = currentSection + 1;										//Next section on the page
	let prevSection = null;														//Previous section, by default it's null because there is no previous section
	let base = 0;																//Reference value to detect change on the scroll
	let flagClick = false;														//Flag disable o enable our function of Scroll
	let arrowState = true;														//Flag to hide or show the arrow

	/** Function to set the arrow next to the section that the user is watching */
	updateArrow = function(flag){	
		if($(window).width() >= 775){												
			$('.site-nav a.is-active').removeClass("is-active");					//Remove the class to the elements that has it
			$(".site-nav li:eq(" + currentSection + ") a").addClass('is-active');	//We set the class to the click or scroll
			let posY = $('.site-nav a.is-active').position();						//We get the high of the element that has the class 'is-active'
			$('.arrow').animate({top: posY.top + 7 + "px", opacity: 1}, 400);		//We set the new posicion to the arrow and we use a little bit of animation 
			if(flag){																//Check the flag
				setTimeout(() => {
					flagClick = false;												//if it's true we're gonna wait 500ms to set the flagClick in false
				}, 400);
			}else{
				flagClick = false; 													//Otherwise it's gonna be instantly
			}
		}
	}

	/** Function to check the values of our core variables */
	printValues = () =>	{
		console.log(prevSection);												//Show the value of prevSection
		console.log(currentSection);											//Show the value of currentSection
		console.log(nextSection);												//Show the value of nextSection
	}

	/** Function to check if the user scroll after the sections */
	stateArrow = function(flag){
		let arrow = $('.arrow');												//Get the arrow from the DOM
		if(flag){			
			arrow.animate({opacity:0}, 400);									//Check the flag recieve by parameter, if it's true we hide the arrow
			$('.site-nav a.is-active').removeClass('is-active');				//And remove the class 'is-active' from the element that has it
			flagClick = false;
		}else{
			updateArrow(true);
		}
	}

	/** Function to check the scroll on the page */
	indicatorSection = function(){	
		let topScroll = $(window).scrollTop();									//Get the current scroll on the page
		if(flagClick == false){													//With this conditional we check if the user click a link to avoid a problem with the scroll
			if(topScroll > base && nextSection < totalSections && topScroll >= $('section:eq(' + nextSection + ')').offset().top - $(window).height()/2){
				base = topScroll;												//Set to base the value of the scroll of the page
				prevSection = currentSection;									//Set to prevSection the currentSection
				currentSection = nextSection;									//Set to currentSection the nextSection
				nextSection = currentSection + 1;								//Set to nextSection the currentSection plus 1
				updateArrow(false);												//Set the flag in false
			}else if (topScroll < base && prevSection != null && topScroll < $("section:eq(" + prevSection + ")").offset().top + 5) {
				base = topScroll;												//Set to base the value of the scroll of the page
				currentSection = prevSection;									//Set to currentSection the prevSection
				nextSection = currentSection + 1;								//Set to nextSection the currentSection less 1
				prevSection = currentSection == 0 ? null : currentSection - 1;	//Check if the value of currenSection is 0 in which case set prevSection to null, otherwise set to prevSection the currectSection less 1
				updateArrow(false);												//Set the flag in false
			}
		}
	}

	/** Function to detect if the user scroll after the last section */
	indicatorState = function(){
		let topScroll = $(window).scrollTop();									//Get the scroll from the window
		if(flagClick == false){													//Check the flagClick it's false
			if (topScroll > $("section:eq(" + (totalSections - 1) + ")").outerHeight() + $("section:eq(" + (totalSections - 1) + ")").offset().top && arrowState){
				arrowState = false;												//Check if the user scroll after the las section and we set arrowState to false
				stateArrow(true);												//We send true to the function to hide the arrow
            }else if (topScroll < $("section:eq(" + (totalSections - 1) + ")").outerHeight() + $("section:eq(" + (totalSections - 1) + ")").offset().top && arrowState == false) {
				arrowState = true; 												//Check if the user is at least in the last section and we set arrowState to true
				stateArrow(false); 												//We send false to the function to show the arrow
			}
		}
	}

	/** Function to set values to controllers of indicators */
	selectIndicator = function(){
		flagClick = true;														//Set the flagClick to true
		let select = $(this).index();											//Get the index of the link click by the user
		currentSection = select;												//Set to currentSection the value of select
		prevSection = currentSection == 0 ? null : currentSection - 1;			//Check if the value of currenSection is 0 in which case set prevSection to null, otherwise set to prevSection the currentSection less 1
		nextSection = currentSection + 1;										//Set to nextSection the value of currentSection plus 1
		updateArrow(true);														//Set flag in true
	}

	$('.site-nav li').click(selectIndicator);

	/** Function to check just in case that the scroll of the user is not in the beginning */
	checkArrow = function(){
		flagClick = true;														//Set flagClick to false to avoid any unnecessary scroll
		let current;															//Variable we're gonna save the index of the section
		let topScroll = $(window).scrollTop();									//Get the scrollTop from the window
		if(topScroll < $("section:eq(" + (totalSections - 1) + ")").outerHeight() + $("section:eq(" + (totalSections - 1) + ")").offset().top){
			$('section').each(function(index, element){							//Get all the section on our page
				if(topScroll >= $(this).offset().top - 50){						//Check if topScroll is bigger than the top of the section
					current = $(this).index();									//If the conditional it's true we save the value in current
				}
			});
			base = topScroll;													//Update base to avoid problems on our function of Scroll
			currentSection = current;											//Set in currentSection the value of current
			prevSection = currentSection == 0 ? null : currentSection - 1;		//Check if the value of currenSection is 0 in which case set prevSection to null, otherwise set to prevSection the currentSection less 1
			nextSection = currentSection + 1;									//Set to nextSection the value of currentSection plus 1
			updateArrow(true);													//Set flag in true
		}else{
			base = topScroll;
			currentSection = totalSections - 1;									//Set in currentSection the value of current
			prevSection = currentSection == 0 ? null : currentSection - 1;		//Check if the value of currenSection is 0 in which case set prevSection to null, otherwise set to prevSection the currentSection less 1
			nextSection = currentSection + 1;									//Set to nextSection the value of currentSection plus 1
			arrowState = false;													//Check if the user scroll after the las section and we set arrowState to false
			stateArrow(true);													//We send true to the function to hide the arrow
		}
	}

	checkArrow();																//Run this by default to avoid problems on the indicator when the user already scroll the page 

	/** Function for little animation on the pictures */
	recipeTada = function(){
		var randNum = Math.floor(Math.random() * $('.recipe-thumb').length);
		$('.recipe-thumb').eq(randNum).addClass('is-tada').siblings().removeClass('is-tada');
	}

	setInterval(recipeTada, 3600);

	/** Function to start the gallery */
	startGallery = function(){
		var topScroll = $(window).scrollTop();
		if($('section.gallery').offset().top - $(window).height()/2 < topScroll){
			$('.recipe-thumb').each(function(i){
				setTimeout(() => {
					$('.recipe-thumb').eq(i).addClass('is-visible');
				}, 200 * (i + 1));
			});
		}
	}

	$(window).scroll(function(){
		if($(window).width() >= 775){
			indicatorState();
			indicatorSection();
		}
		startGallery();
	});											
});