# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: Oracle of Changes

<!-- This is the starter code for WDI projects. Please update this README file with information specific to your project. Replace this paragraph for instance, with a short description of your project. Then update the sections below. Refer to your project specificaion for instructions on how to submit your projects. -->

## Getting Started

<!-- Provide instructions here about how to get your project running on our local machine. Do we just need to clone and open a certain file or do we need to install anything first. -->

### Prerequisites

<!-- What is needed to install and run the project, how do we install them -->

```
Code example
```

### How to Use

<!-- A step by step guide on how to install and use the project, for example if this is a game, how do we play it. -->

```
Code example
```

<!-- More steps... -->

```
until finished
```

## Live Version

<!-- Where is this deployed online (github pages, heroku etc), give us the link and any access details we need. -->

## Built With

<!-- What did you use to build it, list the technologies, plugins, gems, packages etc. -->

- [Node.js](https://nodejs.org/)
- [Bulma v0.6.1](https://bulma.io) (overall styling)
- [jQuery UI v1.12.1](https://jqueryui.com) (slider bar widget)
- [jQuery](http://jquery.com/) (yarrow stalk oracle)
- JavaScript
- CSS
- HTML

## Workflow

<!-- Did you write user stories, draw wireframes, use task tracking, produce ERDs? Did you use source control, with regular commits? Include links to them here. -->

### Wireframes

#### Landing page

The navigation bar slides up and hides itself when the page is scrolled up. It will slide down to reveal itself again when the page is scrolled down.

![Landing page](./documentation/wireframes/01_home.png)

#### Sign in modal

![Sign in modal](./documentation/wireframes/02_signin.png)

#### Sign up modal

![Sign up modal](./documentation/wireframes/03_signup.png)

#### Consult Oracle page

Desktop and laptop users can hover their mouse cursors over the yarrow stalks and the gap will follow the cursor. The mouse cursor will change from the default arrow to a gloved hand pointer when it is over a gap. Upon reaching the desired spot, simply click on the gap to split the yarrow stalks. Clicking on the stalks will not trigger any split.

![Consult page for bigger viewports](./documentation/wireframes/04_consult.png)

The slider bar below the yarrow stalks is primarily intended for smartphone and tablet users as they will not be able to hover over the stalk and precisely choose where the spilt the stalks. With the slider bar, smartphone and tablet users will be able to split the stalk with the same precision as desktop and laptop users. 

The yarrow stalks will resize to fit the width on smaller screens.

![Consult page for smaller viewports](./documentation/wireframes/05_consult_responsive.png)

#### Navigation Bar Burger and Menu for Smaller Viewports

![Navigaton bar turns into navigation burger and menu for smaller viewports](./documentation/wireframes/06_menu_responsive.png)

#### Display of divination result and individual past record

![Display of divination result and individual past record](./documentation/wireframes/07_records.png)


### User Stories

As a casual user of the Oracle of Changes, I
- want to try the traditional yarrow stalk oracle without having to follow complicated instructions and physical equipment.
- want to try the yarrow stalk oracle without having to create an account
- do not want to be bogged down by the repetitive, lengthly, and mistakes prone procedure of the yarrow stalk oracle.

As a serious/committed user of the Oracle of Changes, I
- want to regularly consult the traditional yarrow stalk oracle without the hefty time commitment (typically 20 to 30 minutes to obtain a hexagram).
- want the divination result to be automatically generated from the hexagram obtained from the oracle
- want to conveniently refer to reliable sources for divination texts.
- want reliable Chinese-English correspondence of divination texts at my fingertips.
- want a clean, streamlined experience stripped of all the kitsch and clichéd design commonly associated with all things fortune-telling and Chinese.

## Acknowledgments

- [Chinese Text Project](http://ctext.org/)
- [Bulma.io](https://bulma.io) for making possible the following JavaScript interactivity:
	- Navigation burger button toggle and animation effect 
		- "Burger-button-transforms-to-and-from-close-button"
	- Navigation burger menu dropdown effect,
	- Navigation bar scrolling effects, including:
		- "Conceal-while-scrolling-down",
		- "Reveal-while-scrolling-up", and 
		- "Cast-shadow-when-visible-and-fade-out-when-top-is-reached"
	- Modal toggle
- [Russell W. Cottrell, M.D.](http://www.russellcottrell.com/md/me.shtm) for his innovative [Virtual Yarrow Stalks](http://www.russellcottrell.com/VirtualYarrowStalks/). Instead of relying on the coin toss method or a random number generator, Dr. Cottrell's Virtual Yarrow Stalks featured a brilliant workaround by simply laying the yarrow stalks in a neat row across the screen with an inserted gap to simulate the split. This, I believe, is the best possible virtual counterpart to the physical spliting of yarrow stalks by hand. Dr. Cottrell's Virtual Yarrow Stalks subtantially replicates the traditional yarrow stalk method by intelligently adapting to the constraints of the new medium. Additionally, unlike the coin toss method, this allows uneven probabilities of obtaining lines 6, 7, 8, and 9 to be retained.