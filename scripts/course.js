const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const courseCard = document.getElementById("courses");
const buttons = document.getElementById("buttons");
const credits = document.getElementById("credits");
const dialogBox = document.getElementById("course-description");

const allButton = document.createElement("button");
const cseButton = document.createElement("button");
const wddButton = document.createElement("button");

const courseList = document.createElement("ul");
courseCard.appendChild(courseList);

buttons.appendChild(allButton);
buttons.appendChild(cseButton);
buttons.appendChild(wddButton);

allButton.innerHTML = `All`;
cseButton.textContent = "CSE";
wddButton.textContent = "WDD";


let currentFilter = "ALL"; // "CSE", "WDD", or "ALL"

function activeButton(button){
  cseButton.style.border = "1px solid black";
  wddButton.style.border = "1px solid black";
  allButton.style.border = "1px solid black";
  button.style.border = "3px solid green"
}

function selectButton(type, button){
  currentFilter = type;
  activeButton(button);
  courseList.innerHTML = "";
  filterCourses();
}

cseButton.addEventListener("click", (event) => {
  event.preventDefault();
  selectButton("CSE", cseButton);
});

wddButton.addEventListener("click", (event) => {
  event.preventDefault();
  selectButton("WDD", wddButton);
});

allButton.addEventListener("click", (event) => {
  event.preventDefault();
  selectButton("ALL", allButton);
});

function displayCourses(courses) {
  courses.forEach((course) => {
    const subject = course.subject;
    const number = course.number;
    const title = course.title;
    const completed = course.completed;

    const description = course.description;
    
    const listItem = document.createElement("li");

    listItem.innerHTML = `${subject} ${number} ${title}`;

    listItem.addEventListener("click", () =>{
      dialogBox.innerHTML = ""; 
      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.innerText = "❌";
      
      const content = document.createElement("div");
      content.innerHTML = `<strong>${subject} ${number} ${title}</strong> <br>Credits: ${course.credits}<br> ${description}<br>Technology: ${course.technology}`;
      
      dialogBox.appendChild(closeButton);
      dialogBox.appendChild(content);

      dialogBox.showModal();
      dialogBox.focus();

      closeButton.addEventListener("click", () => {
        dialogBox.close();
      });

      dialogBox.addEventListener(
        "click",
        (event) => {
          const rect = dialogBox.getBoundingClientRect();
          const clickedInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

          if (!clickedInDialog) {
            dialogBox.close();
          }
        },
        { once: true }
      );
    });



    if (completed) {
      listItem.style.color = "white";
      listItem.style.backgroundColor = "rgb(7, 76, 121)";
      listItem.textContent += " ✅";
    }
    courseList.appendChild(listItem);
  });
}

displayCourses(courses);

const cseCourses = courses.filter((course) => course.subject === "CSE");
const wddCourses = courses.filter((course) => course.subject === "WDD");
let creditText = document.createElement("p");

courseCard.appendChild(creditText);

function getCredits(courseType){
  let totalCredits = courseType.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);
  creditText.innerHTML = `Total credits: ${totalCredits}`;
}

getCredits(courses);

function filterCourses() {
  if (currentFilter === "CSE") {
    displayCourses(cseCourses);
    getCredits(cseCourses);
  } else if (currentFilter === "WDD") {
    displayCourses(wddCourses);
    getCredits(wddCourses);
  } else {
    displayCourses(courses);
    getCredits(courses);
  }
}






