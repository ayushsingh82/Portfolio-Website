'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables (only if they exist)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
if (modalContainer && overlay) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      if (modalImg) modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      if (modalImg) modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks.length > 0 && pages.length > 0) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all pages and navigation links
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
      }
      for (let j = 0; j < navigationLinks.length; j++) {
        navigationLinks[j].classList.remove("active");
      }

      // Add active class to clicked navigation link
      this.classList.add("active");

      // Find and activate the matching page
      const clickedPage = this.textContent.toLowerCase().trim();
      let pageFound = false;
      
      for (let j = 0; j < pages.length; j++) {
        if (clickedPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
          pageFound = true;
          window.scrollTo(0, 0);
          break;
        }
      }
      
      // Debug: log if page not found
      if (!pageFound) {
        console.log("Page not found for:", clickedPage);
        console.log("Available pages:", Array.from(pages).map(p => p.dataset.page));
      }

    });
  }
}

// Project modal variables
const projectModalTriggers = document.querySelectorAll("[data-project-modal-trigger]");
const projectModal = document.querySelector("[data-project-modal]");
const projectModalOverlay = document.querySelector("[data-project-overlay]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");

// Project modal toggle function
const projectModalFunc = function () {
  if (projectModal && projectModalOverlay) {
    projectModal.classList.toggle("active");
    projectModalOverlay.classList.toggle("active");
  }
}

// Add click event to all project modal triggers (eye icons)
if (projectModalTriggers.length > 0) {
  for (let i = 0; i < projectModalTriggers.length; i++) {
    projectModalTriggers[i].addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get the project item
      const projectItem = this.closest("[data-project-description]");
      
      if (projectItem) {
        // Get project data
        const projectTitle = projectItem.querySelector(".project-title").textContent;
        const projectDescription = projectItem.getAttribute("data-project-description");
        
        // Update modal content
        if (projectModalTitle) projectModalTitle.textContent = projectTitle;
        if (projectModalText) projectModalText.textContent = projectDescription;
        
        // Show modal
        projectModalFunc();
      }
    });
  }
}

// Close modal events
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
}
if (projectModalOverlay) {
  projectModalOverlay.addEventListener("click", projectModalFunc);
}

}); // End of DOMContentLoaded