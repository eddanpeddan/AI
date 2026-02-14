// ÄNDRA DENNA RAD beroende på var du kör backend
const API_URL = "http://127.0.0.1:8188";
// När du flyttar till RunPod:
// const API_URL = "https://din-backend-url.com/api/generate";

async function generateImage() {
    const prompt = document.getElementById("prompt").value;
    const status = document.getElementById("status");
    const resultImg = document.getElementById("result");

    if (!prompt) {
        alert("Skriv en prompt först!");
        return;
    }

    status.innerHTML = "Genererar bild...";
    resultImg.style.display = "none";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        // Hämta bildfilen från backend /api/image/:name
        const imageName = data.output.images[0].filename;

        resultImg.src = `http://localhost:3000/api/image/${imageName}`;
        resultImg.style.display = "block";
        status.innerHTML = "";
    }
    catch (err) {
        console.error(err);
        status.innerHTML = "Fel: Kunde inte generera bild.";
    }
}
