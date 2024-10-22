
// Email Filled -> Scroll to Next
const emailEndings = [".com", ".co.uk", ".org", ".net", ".edu", ".gov", ".mil", ".co", ".io", ".us", ".ca", ".de", ".fr", ".es", ".au", ".it", ".nl", ".jp", ".kr", ".cn", ".in", ".br", ".mx", ".ru", ".ch", ".se", ".no", ".dk", ".fi", ".be", ".pt", ".pl", ".gr", ".za", ".nz", ".ae", ".sg", ".hk", ".tr", ".sa"];
const emailInput = document.getElementById('email');
const delay = 1200; // ms delay

function checkEmail() {
  const emailValue = emailInput.value;
  const hasValidEnding = emailEndings.some(ending => emailValue.endsWith(ending));
  if (hasValidEnding) {
    setTimeout(() => {
      document.getElementById('next-section').scrollIntoView({ behavior: 'smooth' });
    }, delay);
  }
}

emailInput.addEventListener('input', checkEmail);