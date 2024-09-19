
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


// FUNCTIONS

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


// Moves view to large boxes
function moveViewToBoxes(boxes) {
  if (boxes) {
    // Scroll smoothly to the large boxes, aligning to the top
    boxes.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
// Selects
function selectBoxes(ids) {
  const boxes = document.querySelector('.section.large-section .large-boxes');

  // Deselects All
  boxes.querySelectorAll('.large-box').forEach(box => {
    const label = box.closest('.large-box');
    const highlightStroke = label.querySelector('.highlight-stroke path');
    if (highlightStroke) {
      deselectLBox(label, highlightStroke);
    }
  });

  // Scrolls the view
  moveViewToBoxes(boxes);

  // Add a class to disable hover effects
  boxes.classList.add('disable-hover');

  // Delay before starting to check the boxes
  setTimeout(() => {
    // Check the checkboxes with a delay
    ids.forEach((id, index) => {
      setTimeout(() => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
        }

        // Remove the class to re-enable hover effects after the last checkbox
        if (index === ids.length - 1) {
          setTimeout(() => {
            boxes.classList.remove('disable-hover');
          }, 300);
        }
      }, index * 280); // ms delay between each checkbox
    });
  }, 450); // ms delay before function
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


// 'OTHER' Input Field
// Fading in
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


// Removes higlight + rotation
function deselectLBox(label, highlightStroke) {
  const highlightDuration = getCSSVariableValue('--highlight-duration').trim();
  label.classList.remove('rotate');
  if (highlightStroke) {
    highlightStroke.style.animation = `reverseStroke ${highlightDuration} ease forwards`;  
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


// When Info Clicked
function showInfo(element, type) {
  let infoText = '';
  
  // Predefine info text based on the type
  switch(type) {
    case 'recording':
      infoText = 'Recording involves capturing your music in its rawest form, laying down each track with extreme precision. At 3507, you’ll have access to top-tier equipment and a creative environment that allows your music to impress, whether you’re a solo artist, band, or spoken word vocalist.';
      break;
    case 'mixing':
      infoText = 'Mixing is where your track begins to take shape. All the individual elements are expertly blended to create a cohesive piece of music for you. This involves everything from adjusting levels, applying effects, and panning sounds to masterfully bring your piece to life.';
      break;
    case 'mastering':
      infoText = 'Mastering is the final touch that takes your track from a great song to a fully-fledged piece. It involves various measures to make your track sound professional and polished across all devices. This means everyone can enjoy your work the way you intended.';
      break;
    default:
      infoText = 'No information available.';
  }
  
  // Update the info-text in the popup
  const popup = document.getElementById('info-popup');
  document.getElementById('info-text').innerText = infoText;
  
  // Get the position of the clicked element
  const rect = element.getBoundingClientRect();
  
  // Use requestAnimationFrame for smoother style updates
  requestAnimationFrame(() => {
    popup.style.top = rect.bottom + window.scrollY + 16 + 'px';
    popup.style.left = rect.left + 'px';
    // Show the popup after positioning
    popup.style.display = 'block';
  });
}
function closeInfoPopup() {
  document.getElementById('info-popup').style.display = 'none';
}



// CSS Variables
// Gets CSS Variable
function getCSSVariableValue(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}



// DOC FULLY LOADED:
document.addEventListener('DOMContentLoaded', function() {

  // Adds rotate to every box
  const optionElements = document.querySelectorAll('.option');
  optionElements.forEach(element => {
    element.classList.add('hover-rotate');
  });

  hideSections();
  hideAllPaths();

  // Getting CSS Variables
  let spanColor = getCSSVariableValue('--span-color').trim();
  const textSelectedColor = getCSSVariableValue('--text-selected').trim();


  // Handles Large Box Selection
  const highlightDuration = getCSSVariableValue('--highlight-duration').trim();
  // Select all checkboxes
  const checkboxes = document.querySelectorAll('.large-box input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const label = this.closest('.large-box');
      const highlightStroke = this.nextElementSibling.querySelector('.highlight-stroke path');
      
      if (this.checked) {
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
    });
  });  


  // Closing Info Popup
  // when clicking anywhere else
  document.addEventListener('click', function(event) {
    const popup = document.getElementById('info-popup');
    const isClickInside = popup.contains(event.target) || event.target.classList.contains('info-text');
    if (!isClickInside) {
      closeInfoPopup();
    }
  });
  // when pressing esc
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeInfoPopup();
    }
  });


  // Position Aware Button
  $(function() {
    $('.btn-posnawr')
        .on('mouseenter', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX });
        })
        .on('mouseleave', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({ top: relY, left: relX });
        });

    $('[href=#]').click(function() {
        return false;
    });
  });


  // Radio Options: When Clicked
  document.querySelectorAll('.option input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', function() { // When change happens
      const parentBox = this.closest('.tick-boxes');

      // Resets all options
      parentBox.querySelectorAll('.option').forEach((box) => {
        box.style.backgroundColor = '';
        box.style.color = '';
        box.classList.remove('rotate');
        // box.style.borderColor = '';
      });

      // Apply the selected styling
      let optionSelected = "";
      if (this.checked) {
        optionSelected = this.closest('.option')
        optionSelected.style.color = textSelectedColor;
        optionSelected.style.backgroundColor = spanColor;
        optionSelected.classList.add('rotate'); // rotates
        // this.closest('.option').style.borderColor = spanColor;
      }

      // Visibility of "Other" input-box
      const otherInputForm = parentBox.querySelector('form.grid-col-span-2');
      if (otherInputForm) {
        if (this.value === 'OTHER') {
          fadeInInput(otherInputForm);
        } else {
          otherInputForm.style.opacity = '0';
          otherInputForm.style.display = 'none';
          otherInputForm.style.pointerEvents = 'none'; // prevents interaction
        }
      }
    });
  });


  // Checkbox Options: When Clicked
  document.querySelectorAll('.option input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
      const parentOption = this.closest('.option');

      // If the parent does NOT have the 'large-box' class
      if (!parentOption.classList.contains('large-box')) {
        if (this.checked) {
          parentOption.style.backgroundColor = spanColor;
          parentOption.style.color = textSelectedColor;
          // parentOption.style.borderColor = spanColor;
        } else {
          parentOption.style.backgroundColor = '';
          parentOption.style.color = '';
          // parentOption.style.borderColor = '';
        }
      }
    });
  });
});