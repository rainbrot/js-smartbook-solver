# js-smartbook-solver
A js script that automatically solves McGrawHill Smartbooks. May not work for some problems with weird formatting like algebraic equations.

# How to find your Course Id
**(Make sure that before doing all of this, you're able to use Inspect element on your computer)**

To find your course id, navigate to your smartbook questions page, use **Inspect Element**, and click on the Network tab. While the network tab is open, answer a question. You should see a weird UUID pop up (A mix of random numbers and lowercase letters with dashes inbetween). Right click on it, and then click "Open in new tab" button.

![inspect](https://github.com/rainbrot/js-smartbook-solver/blob/main/inspect.png?raw=true)

The part of the link between "smart-factory" and "smart-package" is your course id. In my case, this is **cf3ce96e-01d5-4dad-a6cb-f9596a0b5219**. If you're in the same high school as me, and in same 9th grade physics course as me, you can just use that course id.

![link](https://github.com/rainbrot/js-smartbook-solver/blob/main/link.png?raw=true)

# How to use it
First, copy the code from [shortened.js](https://github.com/rainbrot/js-smartbook-solver/blob/main/shortened.js) (or from [solver.js](https://github.com/rainbrot/js-smartbook-solver/blob/main/solver.js), but they do literally the exact same thing), then get the part of the code that says **var courseId = "";** and put your course id between the quotes.
Second, go to your smartbook questions page and open Inspect Element, then navigate to the console and paste in the code. (You may need to type in "allow pasting" then press enter before you paste the code in)

It's that easy!

To get the answer to the question, press the alt key each time and depending on the type of question, it will either answer it for you or just display the answer on the page. For true or false questions, multiple choice questions, and multiple select questions it will answer it for you and move on. For fill in the blank questions, it will display the answer(s) under the question because McGraw Hill has a really complicated system that prevents javascript code from automatically typing in textboxes. For drag and drop questions, it will display the correct answer next to the boxes. For sorting questions, it will display the order that each box is supposed to be in. It doesn't work at all for any other types of questions.

Also, if you want to avoid moving your mouse to the answer with high confidence button every time you answer something, you can just press enter and the script will automatically submit your answer and move on to the next question.
