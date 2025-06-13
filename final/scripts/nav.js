const hamButton = document.createElement("button");
hamButton.setAttribute("id", "myButton");
hamButton.setAttribute("aria-label", "menu");

const navbar = document.getElementById("navbar");
const nav = document.createElement("nav");
navbar.appendChild(nav);
navbar.appendChild(hamButton);

const navUL = document.createElement("ul");
navUL.classList.add("menuLinks");
nav.appendChild(navUL);

const navLinks = [
  { text: "Home", href: "index.html" },
  { text: "Explore Recipes", href: "explore-recipes.html" },
  { text: "My Cookbook", href: "my-cookbook.html" },
  { text: "Sign Up", href: "signup.html" },
];

navLinks.forEach((link) => {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  const navLI = document.createElement("li");
  navUL.appendChild(navLI);

  const linkEl = document.createElement("a");
  navLI.appendChild(linkEl);
  linkEl.setAttribute("href", `${link.href}`);
  linkEl.setAttribute("title", `${link.text}`);
  linkEl.textContent = `${link.text}`;
  navLI.appendChild(linkEl);

  if (link.href === page) {
    linkEl.classList.add("active");
  }
});

hamButton.addEventListener("click", () => {
  navUL.classList.toggle("open");
  console.log("Clicked!");
  hamButton.classList.toggle("open");
});
