
// EMAIL COMPLETE -> Scroll to Next
const emailEndings = [".com", ".co.uk", ".org", ".net", ".edu", ".gov", ".mil", ".co", ".io", ".us", ".ca", ".de", ".fr", ".es", ".au", ".it", ".nl", ".jp", ".kr", ".cn", ".in", ".br", ".mx", ".ru", ".ch", ".se", ".no", ".dk", ".fi", ".be", ".pt", ".pl", ".gr", ".za", ".nz", ".ae", ".sg", ".hk", ".tr", ".sa", ".ph", ".my", ".th", ".vn", ".id", ".eg", ".ie", ".il", ".at", ".cz", ".sk", ".hu", ".cl", ".ar", ".pe", ".ro", ".bg", ".hr", ".si", ".lt", ".lv", ".ee", ".is", ".mt", ".by", ".ua", ".rs", ".me"];
const emailInput = document.getElementById('email');
const delay = 800; // ms delay

emailInput.addEventListener('input', checkEmail);
function checkEmail() {
  const emailValue = emailInput.value;
  const hasValidEnding = emailEndings.some(ending => emailValue.endsWith(ending));
  if (hasValidEnding) {
    scrollToView('q1', delay)
  }
}


// SCROLL TO VIEW
function scrollToView(sectionId, delay = 0) {
  setTimeout(() => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }, delay);
}


// DownArrow After Box Select
const checkboxes = document.querySelectorAll('.large-boxes input[type="checkbox"]');
const bouncingArrow = document.querySelector('.bouncing-arrow');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    // Fade in arrow
    if (Array.from(checkboxes).some(chk => chk.checked)) {
      bouncingArrow.style.opacity = '1'; // Fade in
    } else {
      bouncingArrow.style.opacity = '0'; // Fade out
    }
  });
});
// Scroll to next section upon arrow click
bouncingArrow.addEventListener('click', () => {
  scrollToView('q2')
});


// Hides Sections
const section_list = [
  ".spoken-word",
  ".artist",
  ".band",
];

// Define Paths
const paths = {
  FOR_REC: ".recording",
  FOR_MIX: ".mixing",
  FOR_MASTER: ".mastering"
};


// Hide + Show Sections: spoken-word, artist, band,..
function hideSections() {
  section_list.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.display = "none";
    });
  });
}
function showSections(selector) {
  hideSections();
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
      element.style.display = 'flex';
  });
}


// Shows Next Question
function showNextQuestion(index, questions) {
  // Add a short delay before showing the next question
  setTimeout(() => {
      questions.forEach((q2, i) => {
          q2.style.display = i <= index ? 'flex' : 'none';
          setTimeout(() => q2.classList.toggle('show', i <= index), 10);
      });

      if (index + 1 < questions.length) {
          questions[index + 1].style.display = 'flex';
          setTimeout(() => {
              questions[index + 1].classList.add('show');
              // Scroll to the next question once it's displayed
              scrollToView(questions[index + 1]);
          }, 10); // Add a small delay to trigger the show transition
      }
  }, 300); // Delay before executing the logic
}


// Changes Label Text (Artist/Band Name)
function changeLabelText(changeto) {
  document.querySelector('label[for="ARTIST_NAME"]').textContent = changeto;
}


// PATHS (Recording, Mixing, Mastering)
function hideAllPaths() {
  Object.values(paths).forEach(pathClass => {
    document.querySelectorAll(pathClass).forEach(element => {
      element.style.display = 'none';
    });
  });
}
// Show path based on checkboxes
function updatePaths() {
  hideAllPaths(); // Hide all paths first
  Object.keys(paths).forEach(key => {
    if (document.getElementById(key).checked) {
      document.querySelectorAll(paths[key]).forEach(element => {
        element.style.display = 'flex';
      });
    }
  });
}


// 'OTHER' INPUT FIELD
// Fades In
function fadeInInput(input) {
  input.style.width = '0';
  input.style.opacity = '0';
  input.style.display = 'block';
  input.style.pointerEvents = 'auto';
  input.style.transition = 'width 0.9s ease-in-out, opacity 0.7s ease-in-out';
  setTimeout(() => {
    input.style.opacity = '1';
    input.style.width = '100%';
  }, 0); // ensure transition is applied after the initial render
}
// Adds Input After 'Other' Selected
function addOtherInput(event) {
  try {
    const clickedLabel = event.currentTarget;
    const section = clickedLabel.closest('.section');
    const optionsContainer = section.querySelector('.tick-boxes');
    const existingInput = optionsContainer.querySelector('form input[type="text"]');
    
    if (!existingInput) {
      const form = document.createElement('form');
      form.classList.add("grid-col-span-2");
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Please Specify..';

      // Animate Fading In Input
      fadeInInput(input);
      form.appendChild(input);
      optionsContainer.appendChild(form);

    }
  } catch (error) {
    console.error('An error occurred in addOtherInput:', error);
  }
}


// When '+' Clicked, adds extra input
let itemCount = 3;
function addNewInput() {
  // Selects container where inputs are added
  const container = document.querySelector('.tick-boxes.equipment');
  itemCount++;

  // Creates new input element
  const newFormItem = document.createElement('div');
  newFormItem.classList.add('form-item');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.id = `equipment${itemCount}`;
  newInput.name = `equipment${itemCount}`;
  newInput.placeholder = `Item ${itemCount}...`;

  // Append the input to the new div
  newFormItem.appendChild(newInput);

  // Inserts before the + button
  const addButton = document.querySelector('.add-item-button');
  container.insertBefore(newFormItem, addButton);
}


// Gets CSS Variable
function getCSSVariableValue(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}


// HIGHLIGHT (STROKE EFFECT)

function highlightText(element, isChecked) {
  if (isChecked) {
    element.style.backgroundColor = spanColor;
    element.style.color = textSelectedColor;
    // element.style.borderColor = spanColor;
  } else {
    element.style.backgroundColor = '';
    element.style.color = '';
    // element.style.borderColor = '';
  }
}


// REMOVES HIGHLIGHT EFFECT

function deselectLBox(label, highlightStroke) {
  const highlightDuration = getCSSVariableValue('--highlight-duration').trim();
  label.classList.remove('rotate');
  if (highlightStroke) {
    highlightStroke.style.animation = `reverseStroke ${highlightDuration} ease forwards`;  
  }
}


// DOC FULLY LOADED:
document.addEventListener('DOMContentLoaded', function() {


  // ADDS ROTATE TO ALL OPTIONS

  const optionElements = document.querySelectorAll('.option');
  optionElements.forEach(element => {
    element.classList.add('hover-rotate');
  });

  hideSections();
  hideAllPaths();


  // LARGE BOX SELECTION

  const highlightDuration = getCSSVariableValue('--highlight-duration').trim();
  const inputs = document.querySelectorAll('.option input[type="checkbox"], .large-box input[type="checkbox"], .option input[type="radio"], .large-box input[type="radio"]');

  inputs.forEach(input => {
    input.addEventListener('change', function() {
      // Find the closest parent that is either '.option' or '.large-box'
      const parentOption = this.closest('.option, .large-box');
  
      if (parentOption.classList.contains('large-box')) {
        const label = parentOption;
        const highlightStroke = this.nextElementSibling.querySelector('.highlight-stroke path');
  
        if (this.checked) {
          // For radio buttons, deselect other options only if they are active
          if (this.type === 'radio') {
            // Find all radio buttons in the same group (same name)
            const groupName = this.name;
            const radiosInGroup = document.querySelectorAll(`input[name="${groupName}"]`);
  
            radiosInGroup.forEach(radio => {
              if (radio !== this) {
                const otherLabel = radio.closest('.large-box');
                const otherHighlightStroke = radio.nextElementSibling.querySelector('.highlight-stroke path');
                // Only deselect if the other label is active (has 'rotate' class)
                if (otherLabel.classList.contains('rotate')) {
                  deselectLBox(otherLabel, otherHighlightStroke);
                }
              }
            });
          }
  
          label.classList.add('rotate');
          highlightStroke.style.animation = `drawStroke ${highlightDuration} ease forwards`;
        } else {
          deselectLBox(label, highlightStroke);
        }
  
        // Update paths
        const key = this.id;
        if (paths[key]) {
          updatePaths();
        }
      } else {
        // Handle regular option behavior
        if (this.type === 'radio') {
          // For radio buttons, deselect other options only if they are active
          const groupName = this.name;
          const radiosInGroup = document.querySelectorAll(`input[name="${groupName}"]`);
  
          radiosInGroup.forEach(radio => {
            const optionElement = radio.closest('.option');
            if (radio !== this) {
              // Only deselect if the option is highlighted
              if (optionElement.style.backgroundColor || optionElement.style.color) {
                highlightText(optionElement, false);
              }
            } else {
              highlightText(optionElement, true);
            }
          });
        } else {
          // For checkboxes
          highlightText(parentOption, this.checked);
        }
      }
    });
  });




  const artistInput = document.querySelector('.artist-input');

  artistInput.addEventListener('input', function () {

    const minInputWidth = 160;      // Increased minimum width of input (px)
    const widthPerCharacter = 17.6;   // Slightly smaller width increase per character for smoother growth
    
    const defaultFontSize = 22;     // Default font size in pixels
    const fontSizeReductionRate = 0.25;  // Rate at which font size decreases per character
    const fontSizeLimit = 16;       // Minimum font size
    const characterLimit = 12;      // Start reducing font size slightly earlier
    
    const length = this.value.length;
  
    // Adjust width based on character length
    this.style.width = `${Math.max(minInputWidth, length * widthPerCharacter)}px`;
          
    // Adjust font size after reaching character limit
    if (length > characterLimit) {
      this.style.fontSize = `${Math.max(defaultFontSize - (length - characterLimit) * fontSizeReductionRate, fontSizeLimit)}px`;
    } else {
      this.style.fontSize = `${defaultFontSize}px`; // Default font size
    }
  });
  
  

  artistInput.addEventListener('focus', () => {
    artistInput.style.left = '50%';
    artistInput.style.transform = 'translate(-50%, 80%)';
  });
  artistInput.addEventListener('blur', () => {
    artistInput.style.left = '0';
    artistInput.style.transform = 'translate(0, 80%)';
  });
  
  
  



});






// SELECTS CERTAIN BOXES BASED ON IDs

// function selectBoxes(ids) {
//   const boxes = document.querySelector('.question.large-section .large-boxes');

//   // Deselects All
//   boxes.querySelectorAll('.large-box').forEach(box => {
//     const label = box.closest('.large-box');
//     const input = label.querySelector('input[type="checkbox"]');
//     const highlightStroke = label.querySelector('.highlight-stroke path');
    
//     // Uncheck the checkbox to remove the :checked style
//     if (input && input.checked) {
//       input.checked = false;
//     }
//     if (highlightStroke) {
//       deselectLBox(label, highlightStroke);
//     }
//   });

//   // Scrolls the view
//   scrollToView(boxes);

//   // Add a class to disable hover effects
//   boxes.classList.add('disable-hover');

//   // Delay before starting to check the boxes
//   setTimeout(() => {
//     // Check the checkboxes with a delay
//     ids.forEach((id, index) => {
//       setTimeout(() => {
//         const checkbox = document.getElementById(id);
//         if (checkbox) {
//           checkbox.checked = true;
//           checkbox.dispatchEvent(new Event('change'));
//         }

//         // Remove the class to re-enable hover effects after the last checkbox
//         if (index === ids.length - 1) {
//           setTimeout(() => {
//             boxes.classList.remove('disable-hover');
//           }, 300);
//         }
//       }, index * 280); // ms delay between each checkbox
//     });

//     // Shows next question
//     const questions = document.querySelectorAll('.question');
//     showNextQuestion(0,questions);

//   }, 450); // ms delay before function

// }