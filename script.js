const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".fa-dice");
const promptinput = document.getElementById("promptinput");

const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
];

const ToggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    // if (document.body.classList.contains("dark-theme")) {
    //     document.body.classList.remove("dark-theme");
    // } else {
    //     document.body.classList.add("dark-theme");
    // }
};

const API_Key =
    "9b929c4bf717dcdb13e6d3b7a122ed0f05b67c600c0ef5653a8bae164fbefdb5163ac0b7e4314f5bed62fa4241168c85";

async function generateImage() {
    const prompt = document.getElementById("promptinput").value.trim();

    if (!prompt) return alert("Please enter a prompt...");

    document.getElementById("result").innerHTML =
        `<div class="loading-text">Generating Image... Plese wait..!</div>`;

    const form = new FormData();
    form.append("prompt", prompt);

    try {
        const res = await fetch(
            "https://clipdrop-api.co/text-to-image/v1",
            {
                method: "POST",
                headers: { "x-api-key": API_Key },
                body: form,
            }
        );

        if (!res.ok)
            throw new Error(
                `<div class="loading-text" style="color:red;">Image Generation Failed</div>`
            );

        const blob = await res.blob();
        const imgURL = URL.createObjectURL(blob);

        document.getElementById("result").innerHTML = `
            <div class="image-wrapper" id="imageContainer">
                <div class="icon-btns">
                    <button onclick="downloadImage('${imgURL}')">
                        <i class="fa-solid fa-download"></i>
                    </button>
                    <button onclick="deleteImage()">
                        <i class="fa-solid fa-trash-arrow-up"></i>
                    </button>
                </div>
                <img id="generatedImage" src="${imgURL}" alt="">
            </div>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML =
            `<div class="loading-text" style="color:red;">${error.message}</div>`;
    }
}

function downloadImage(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-image-generated.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function deleteImage() {
    document.getElementById("result").innerHTML = ``;
    // clear prompt input
     const input = document.getElementById("promptinput");

    if (input) {
        input.value = "";
        input.focus();
    }
}

// buttons
promptBtn.addEventListener("click", () => {
    const prompt =
        examplePrompts[
            Math.floor(Math.random() * examplePrompts.length)
        ];
    promptinput.value = prompt;
    promptinput.focus();
});

themeToggle.addEventListener("click", ToggleTheme);
