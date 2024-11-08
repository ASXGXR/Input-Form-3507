
// Email Filled -> Scroll to Next
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


// Scroll To View
function scrollToView(sectionId, delay = 0) {
  setTimeout(() => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }, delay);
}



// When Any Checkbox Clicked
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