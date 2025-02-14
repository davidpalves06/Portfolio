const form = document.getElementById("contactForm")

form.addEventListener("submit",async (event) => {
    event.preventDefault()

    let response = await fetch(form.action, {method:'POST', body: new URLSearchParams(new FormData(form))});
    if (response.ok) {
        document.getElementById("from").value = ""
        document.getElementById("title").value = ""
        document.getElementById("message").value = ""
        alert("Message sent successfully!")
    } else {
        alert("Error sending message. Try again later!")
    }
})