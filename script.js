async function askAdvisor() {
    const question = document.getElementById('userQuestion').value;
    if (!question) return alert("Please type your question.");

    document.getElementById('advisorResponse').innerHTML = "Thinking...";

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        document.getElementById('advisorResponse').innerHTML = data.answer;
    } catch (error) {
        document.getElementById('advisorResponse').innerHTML = "Error: " + error.message;
    }
}
