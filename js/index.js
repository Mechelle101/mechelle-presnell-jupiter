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
