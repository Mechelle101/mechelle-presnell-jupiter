// selecting the parent where to add the footer
const body = document.body;

// create the footer element
const footer = document.createElement("footer");

// append the footer to the parent element
body.appendChild(footer);

// creating a variable and assigning a Date obj
const today = new Date();

// create a thisYear variable and assign it the current year
const thisYear = today.getFullYear();

// create a copyright variable and use it to create a <p> element</p>
const copyright = document.createElement("p");

// set the inner HTML of the copyright <p> element
copyright.innerHTML = `Mechelle Presnell \u00A9 ${thisYear}`;

// appending the copyright element to the footer
footer.appendChild(copyright);

// CREATING A LIST OF SKILLS
//create an array of skills
const skills = ["HTML", "CSS", "Adobe Photoshop", "GitHub", "Python", "MySQL", "Java", "Wordpress", "Technical Writing"];

// selecting the skills section by ID
const skillsSection = document.getElementById("skills");

// select the ul element inside the skills section
const skillsList = skillsSection.querySelector("ul");

//iterate over the skills array with a forEach
skills.forEach(skillsText => {
  //creating a new li element
  const skill = document.createElement("li");
  //setting the inner text of the list item to the current skill
  skill.textContent = skillsText;
  //append the skill element to the skillsList
  skillsList.appendChild(skill);
});

// lesson 12 code
// Select the "leave_message" form by its name attribute
const messageForm = document.forms["leave_message"];

// Add an event listener for the submit event
messageForm.addEventListener("submit", function(event) {
  // prevent the default behavior of the "submit" event (page refresh)
  event.preventDefault();

  // retrieve the values from the form fields
  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;

  // select the messages section and the ul inside of it
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // show the message section if hidden
  messageSection.style.display = "block";

  // create a new li element
  const newMessage = document.createElement("li");

  // setting the inner HTML of the newMessage element
  newMessage.innerHTML = `
    <a href="mailto:${userEmail}">${userName}</a>
    <span> says: ${userMessage}</span>
    `;

  // creating a new button element for removing the message
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  // adding an event listener to the removeButton
  removeButton.addEventListener("click", function() {
    //find the button's parent element (the li) and remove it
    const entry = removeButton.parentNode;
    entry.remove();

    //hide the messages section if the list is empty
    if(messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  // create an edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  // adding event listener to the edit button
  editButton.addEventListener("click", function() {
    //prompt the user to enter a new message
    const newMessageText = prompt("Edit your message: ", userMessage);
    if(newMessageText !== null && newMessageText.trim() !== "") {
      // update the message in the span
      newMessage.querySelector("span").innerText = `says: ${newMessageText}`;
    }
  });

  //append the edit and remove buttons to the newMessage element
  newMessage.appendChild(editButton);

  //append the removeButton to the to the newMessage element
  newMessage.appendChild(removeButton);
  
  //append the newMessage to the to the messageList element
  messageList.appendChild(newMessage);

  // Reset the form fields
  event.target.reset();
});

//hide the message section when there are no messages
document.addEventListener("DOMContentLoaded", function() {
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  if(messageList.children.length === 0) {
    messageSection.style.display = "none";
  } 
});

  //selecting the projects section and li 
  //I feel like this needs to be before the fetch() method...
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("li");

fetch('https://api.github.com/users/Mechelle101/repos')
  .then(response => {
    //checking if the response is ok code 200 range
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //returning the parsed JSON date from the repo
    return response.json();
  })
  .then(data => {
    //parse the response JSON date, stored in repositories
    const repositories =  JSON.parse(JSON.stringify(data)); 
    //logged repos to the console...
    console.log('repositories: ', repositories);

    //iterate over the repo array...
    for(let i = 0; i < repositories.length; i++) {
      //create a new li element for each repo
      const project = document.createElement("li");
      //set the inner text of of the project to the repository name
      project.innerText = repositories[i].name;
      //append the project element to the projectList element
      projectList.appendChild(project);
    }

  })
  .catch(error => {
    //handling the errors and notifying the user
    console.error(`An error occurred ${error.message}`);

    //show any error message in the project section
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Could not fetch Repositories. Please try again later.";
    projectSection.appendChild(errorMessage);

    // if(error.message.includes('404'))  {
    //   console.error(`User not found ${error.message}`);
    // } else {
    //   console.error(`Something went wrong, try again ${error.message}`);
    // }
  });



