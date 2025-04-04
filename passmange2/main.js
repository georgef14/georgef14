document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const strength = checkPasswordStrength(password);

    document.getElementById('passwordStrength').innerText = `Password Strength: ${strength}`;
});

function checkPasswordStrength(password) {
    // Implement your password strength checking logic here
    // This can include checking length, complexity, etc.
    return "Strong"; // Placeholder, replace with actual strength indicator
}
