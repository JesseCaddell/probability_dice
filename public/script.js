async function calculateProbability() {
    const sides = parseInt(document.getElementById("sides").value);
    const diceCount = parseInt(document.getElementById("dice").value);
    const rollCount = parseInt(document.getElementById("rolls").value);

    // Validate inputs
    if (isNaN(sides) || isNaN(diceCount) || isNaN(rollCount) || sides < 2 || diceCount < 1 || rollCount < 1) {
        alert("Please enter valid values for N, M, and K.");
        return;
    }

    // Send data to the server
    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sides, diceCount, rollCount }),
        });

        if (!response.ok) {
            throw new Error("Failed to calculate probability distribution");
        }

        const distribution = await response.json();

        // Display results
        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = "<h3>Probability Distribution:</h3><table><tr><th>Sum</th><th>Probability</th></tr>";

        for (let sum in distribution) {
            resultContainer.innerHTML += `<tr><td>${sum}</td><td>${distribution[sum]}</td></tr>`;
        }

        resultContainer.innerHTML += "</table>";
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}