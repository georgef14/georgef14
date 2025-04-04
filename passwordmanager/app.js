function saveAccount() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push({ username, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    updateAccountList();
}

// Update the account list display
function updateAccountList() {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let accountList = document.getElementById("account-list");
    accountList.innerHTML = "";

    accounts.forEach((account, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${account.username} - ${"*".repeat(account.password.length)}`;
        accountList.appendChild(listItem);
    });
}

// Export saved accounts to a JSON file
function exportToJson() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
        alert("No accounts to export.");
        return;
    }

    let blob = new Blob([accounts], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "accounts.json";
    link.click();
}

// Import accounts from a JSON file
function importFromJson(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let importedAccounts = JSON.parse(e.target.result);
        localStorage.setItem("accounts", JSON.stringify(importedAccounts));
        updateAccountList();
    };
    reader.readAsText(file);
}

// Password strength checker
document.getElementById("password").addEventListener("input", function () {
    let password = this.value;
    let strengthIndicator = document.getElementById("strength-indicator");

    if (password.length < 6) {
        strengthIndicator.textContent = "Weak";
        strengthIndicator.style.color = "red";
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) {
        strengthIndicator.textContent = "Strong";
        strengthIndicator.style.color = "green";
    } else {
        strengthIndicator.textContent = "Medium";
        strengthIndicator.style.color = "orange";
    }
});

// Load saved accounts on page load
window.onload = updateAccountList;
