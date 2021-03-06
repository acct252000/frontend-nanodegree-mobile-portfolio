## Website Performance Optimization portfolio project

### Steps to Run the Application

1.  Check out the repository [here](https://github.com/acct252000/frontend-nanodegree-mobile-portfolio)
2.  To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

3. Open your browser and visit localhost:8080
4. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.  Open a new terminal window.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

5. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

6.  To access the pizza screen for pizza scrolling and resizing, click on the Cam's Pizzeria link.



### Optimizing index.html

Steps Taken:

1.  Compressed all images using ImageOptim

2.  Added async to analytics.js script tag

3.  Limited print.css with media="print" tag

4.  Inlined style.css file into body of index.html using `<script>` tags

5.  Minified index.html file

6.  Created pizzeria_small.jpg of pizzeria.jpg resized to 115px and changed src to smaller file.

### Optimizing pizza views

- Moved `document.body.scrollTop` measurement out of iterative loop (starting at line 515).  Moved `items.length` into variable ouside the loops and declared the phase variable outside the loop  Change `querySelectorAll` to `getElementsByClassName`

```
  var items = document.getElementsByClassName('mover');
    var itemsLength = items.length;
    var scrollTopMeasure = document.body.scrollTop / 1250;
    var phase;
    for (var i = 0; i < itemsLength; i++) {
        phase = Math.sin((scrollTopMeasure) + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
        
    }
  ```
-  Declared variable outside of loop  Changed `querySelector` to `getElementById` and moved outside of loop, and limited number of pizzas required by looking at screen height.

```
  document.addEventListener('DOMContentLoaded', function() {
    var cols = 8;

    //Calculates the maximum number of rows required
    var rows = window.screen.height/100 +1;
    var numberOfPizzasRequired = cols * rows;
    console.log(rows + 'is number of rows');
    console.log(numberOfPizzasRequired + 'is number of Pizzas');
    var s = 256;
    var elem;
    var pizzaGrid = document.getElementById('movingPizzas1');
    for (var i = 0; i < 200; i++) {
        elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        pizzaGrid.appendChild(elem);
    }
    updatePositions();
```

- This function was changed to account for all `.randomPizzaContainers` changing by the same amount,
therefore the dx and newwidth calculations were taken out of the iterative loop and calculated just once.
Additionally, the `.querySelectorAll` in the iterative loop was taken out and called once to populate the array
which was then cycled in the foorloop as opposed to repeated calls to `document.querySelectorAll`.

```
  function changePizzaSizes(size) {
-    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
-      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
-      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
-      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
+    var dx = determineDx(document.querySelector(".randomPizzaContainer"),size);
+    var newwidth = (document.querySelector(".randomPizzaContainer").offsetWidth + dx) + 'px';
+    var pizzaContainers = document.querySelectorAll(".randomPizzaContainer");
+     for (var i = 0; i < pizzaContainers.length; i++) {
+      //var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
+      pizzaContainers[i].style.width = newwidth;
```

-  `querySelector` was changed to `getElementById` in the following function.

```
    function changeSliderLabel(size) {
        switch (size) {
            case "1":
                document.getElementById("pizzaSize").innerHTML = "Small";
                return;
            case "2":
                document.getElementById("pizzaSize").innerHTML = "Medium";
                return;
            case "3":
                document.getElementById("pizzaSize").innerHTML = "Large";
                return;
            default:
                console.log("bug in changeSliderLabel");
        }
    }
```

### Steps to Check Workflow Optimization

1.  Ensure node package manager is installed on your machine.  If not installed, see website [here](https://nodejs.org)

2.  If gulp is not installed globally on your machine, run the command  `npm install -g gulp`.  You may want to preface this with `sudo` on Mac, password may be required.

3.  In terminal, navigate to the gulp folder in the local version of the repository.

4.  Type `npm install` to install all of the dependencies.

5.  Perform the workflow tasks in the following order by entering these commands in terminal

    1.  `gulp resizeImage`
    2.  `gulp minImages`
    3.  `gulp minifyHTML`

6. Resulting files are in the dist folder.


### Known Issues
index-nonmin.html was added; index was not changed to index.min due to specification of index.html in Project Rubric.   Many steps in how to run successfully of course copied from README in original project [here.](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)

Workflow management was added after original project; files in dist are not exact matches to those used in project.