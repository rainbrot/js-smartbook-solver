// Feel free to edit and optimize the code to your heart's content since I'm not that great of a programmer

var courseId = ""; // Put the id of your course here (See README.md for instructions on how to find yours!!)

///////////////////////////////// Functions that deobfuscate McGraw Hill's Smartbook
let b64DecodeUnicode = function(input) {
  return decodeURIComponent(atob(input).split("").map(J => "%" + ("00" + J.charCodeAt(0).toString(16)).slice(-2)).join(""))
};

let decipherPayload = function(input) {
  if (input.length % 9 > 0 || input.match(/[^a-zA-Z0-9\/= +]/g))
      throw new Error("Hidata payload does not match the interface");
  const J = input.replace(/(.)(.)(.)(.)(.)(.)(.)(.)(.)/g, "$2$6$8$1$4$9$3$5$7").replace(/ +$/, ""),
      _e = b64DecodeUnicode(J);
  return JSON.parse(_e)
};
///////////////////////////////// The actual code, I'm way too lazy to add comments for everything it does, so you can decipher it yourself :D
let answerQ = function() {
  fetch("https://bento.mheducation.com/files/smart-factory/"+courseId+"/smart-package/assessment-items/" + document.getElementsByClassName("readspeaker")[0].getAttribute("data-probe-id") + ".json", {
      "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
      },
      "referrer": "https://learning.mheducation.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
  }).then(function(a) {
      return a.json();
  }).then(function(json) {
      const payload = json.hidata.payload;
      var result = decipherPayload(payload);
      const type = document.getElementsByClassName("_visuallyHidden")[0].textContent;

      if (type == "Fill in the blank question.") {
          if (result.answers.length == 1) {
              var answr = ("ANSWER: " + result.answers[0].values[0])
              var answrElement = document.createElement('p');
              answrElement.style = 'color: red; font-weight: bold; font-size: 20px;';
              answrElement.innerHTML = answr;
              document.getElementsByClassName('prompt')[0].children[0].appendChild(answrElement);
          } else {
              var answr = "";
              for (i = 0; i < result.answers.length; i++) {
                  answr += "ANSWER: " + result.answers[i].values[0] + "<br>"
              }
              var answrElement = document.createElement('p');
              answrElement.style = 'color: red; font-weight: bold; font-size: 20px;';
              answrElement.innerHTML = answr;
              document.getElementsByClassName('prompt')[0].children[0].appendChild(answrElement);
          }
      };

      if (type == "Multiple choice question.") {
          var rawanswrs = []
          var answrs = []
          var choices = [];
          for (i = 0; i < result.choices.length; i++) {
              choices.push(result.choices[i]);
              rawanswrs.push(document.getElementsByClassName("choiceText")[i].innerHTML);
              answrs.push(document.getElementsByClassName("choiceText")[i].innerHTML);
          }
          choices.sort((a, b) => {
              const A = a.content.toUpperCase();
              const B = b.content.toUpperCase();
              if (A < B) {
                  return -1;
              };
              if (A > B) {
                  return 1;
              };

          });
          answrs.sort();
          for (i = 0; i < choices.length; i++) {
              if (choices[i].key == result.answer) {
                  console.log(i);
                  var btn = document.querySelectorAll('input[type="radio"]');
                  btn[rawanswrs.indexOf(answrs[i])].click();
              }
          };
          document.getElementsByClassName("btn-confidence")[0].disabled = false;
          setTimeout(function() {
              document.getElementsByClassName("btn-confidence")[0].click();
          }, 300);
          setTimeout(function() {
              document.getElementsByClassName("next-button")[0].click();
          }, 900);
      };

      if (type == "Multiple select question.") {
          var rawanswrs = [];
          var answrs = [];
          var choices = [];
          for (i = 0; i < result.choices.length; i++) {
              choices.push(result.choices[i]);
              rawanswrs.push(document.getElementsByClassName("choiceText")[i].innerHTML);
              answrs.push(document.getElementsByClassName("choiceText")[i].innerHTML);
          }
          choices.sort((a, b) => {
              const A = a.content.toUpperCase();
              const B = b.content.toUpperCase();
              if (A < B) {
                  return -1;
              };
              if (A > B) {
                  return 1;
              };

          });
          answrs.sort();
          for (i = 0; i < choices.length; i++) {
              for (v = 0; v < result.answers.length; v++) {
                  if (choices[i].key == result.answers[v]) {
                      console.log(i);
                      var btn = document.querySelectorAll('input[type="checkbox"]');
                      btn[rawanswrs.indexOf(answrs[i])].click();
                  };
              };
          };
          document.getElementsByClassName("btn-confidence")[0].disabled = false;
          setTimeout(function() {
              document.getElementsByClassName("btn-confidence")[0].click();
          }, 300);
          setTimeout(function() {
              document.getElementsByClassName("next-button")[0].click();
          }, 900);
      };
      if (type == "True false question.") {
          answrs = [document.getElementsByClassName("choiceText")[0].innerHTML, document.getElementsByClassName("choiceText")[1].innerHTML];
          for (i = 0; i < 2; i++) {
              if (answrs[i].toLowerCase() == result.answer.toLowerCase()) {
                  console.log(i);
                  var btn = document.querySelectorAll('input[type="radio"]');
                  btn[i].click();
              };
          };
          document.getElementsByClassName("btn-confidence")[0].disabled = false;
          setTimeout(function() {
              document.getElementsByClassName("btn-confidence")[0].click();
          }, 300);
          setTimeout(function() {
              document.getElementsByClassName("next-button")[0].click();
          }, 900);
      };

      if (type == "Drag and drop application.") {
          if (document.getElementsByClassName('choice-item-wrapper').length > 0) {
              var answrs = [];
              var promptElements = [];
              for (i = 0; i < result.prompts.length; i++) {
                  var answr = result.answers[i].choices[0];
                  var prmpt = result.answers[i].prompt;
                  document.querySelectorAll('.content').forEach((elem) => {
                      if (elem.innerHTML.includes(result.prompts[i].content)) {
                          promptElements.push({
                              "element": elem,
                              "id": result.prompts[i].key
                          });
                      }
                  });
                  answrs.push({
                      "answer": answr,
                      "prompt": prmpt
                  });
              }
              answrs.sort((a, b) => {
                  const A = a.prompt.toUpperCase();
                  const B = b.prompt.toUpperCase();
                  if (A < B) {
                      return -1;
                  };
                  if (A > B) {
                      return 1;
                  };

              });
              promptElements.sort((a, b) => {
                  const A = a.id.toUpperCase();
                  const B = b.id.toUpperCase();
                  if (A < B) {
                      return -1;
                  };
                  if (A > B) {
                      return 1;
                  };

              });
              for (i = 0; i < promptElements.length; i++) {
                  var answrElem = document.querySelector('div[id="choices:' + answrs[i].answer + '"]').innerHTML;
                  promptElements[i].element.innerHTML += answrElem;
              }
          } else {
              for (i = 0; i < result.answers.length; i++) {
                  var elem = document.querySelector('div[id="choices:' + result.answers[i] + '"]');
                  elem.innerHTML += (i + 1);
              }
          }
      }
  });
};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.altKey) {
      answerQ();
  }
  if (evt.keyCode == 13) {
      document.getElementsByClassName("btn-confidence")[0].disabled = false;
      setTimeout(function() {
          document.getElementsByClassName("btn-confidence")[0].click();
      }, 800);
      setTimeout(function() {
          document.getElementsByClassName("next-button")[0].click();
      }, 1900);
  }
};
