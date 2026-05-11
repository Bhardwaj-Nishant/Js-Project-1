const filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    HueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
};

const filterContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas");
const canvasContext = imageCanvas.getContext("2d");
const imageInput = document.querySelector("#image-input");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".preset")
let img = null;

function createFilterElement(name, unit = "%", value, min, max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.value = value
    input.min = min
    input.max = max
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()
    });

    return div
};

Object.keys(filters).forEach(keys =>{
    const filterElement = createFilterElement(keys,filters[keys].unit,filters[keys].value,filters[keys].min,filters[keys].max)

    filterContainer.appendChild(filterElement)
});

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imagePlaceholder.style.display = "none"
    imageCanvas.style.display = "block";

    if (!file) return;

    img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        canvasContext.drawImage(img,0,0,imageCanvas.width,imageCanvas.height);
    };
});

function applyFilters() {

    canvasContext.clearRect(0,0,imageCanvas.width,imageCanvas.height);

    canvasContext.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters.HueRotate.value}${filters.HueRotate.unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
    `;

    canvasContext.drawImage(img,0,0,imageCanvas.width,imageCanvas.height);
};

const defaultFilters = JSON.parse(
    JSON.stringify(filters)
);

resetButton.addEventListener("click", () => {

    Object.keys(filters).forEach(filterName => {

        filters[filterName].value =
            defaultFilters[filterName].value;

        document.getElementById(filterName).value =
            defaultFilters[filterName].value;
    });

    applyFilters();
});

downloadButton.addEventListener("click", ()=>{
    if(img){
        const link = document.createElement("a")
        link.download = "edited-image.png"
        link.href = imageCanvas.toDataURL()
        link.click()
    }
});

const presets = {
    vintage: {
        Brightness: 110,
        Contrast: 120,
        Saturation: 80,
        HueRotate: 350,
        Blur: 0,
        Grayscale: 10,
        Sepia: 40,
        Opacity: 100,
        Invert: 0
    },

    noir: {
        Brightness: 90,
        Contrast: 140,
        Saturation: 0,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 100,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    dreamy: {
        Brightness: 120,
        Contrast: 90,
        Saturation: 130,
        HueRotate: 10,
        Blur: 2,
        Grayscale: 0,
        Sepia: 10,
        Opacity: 100,
        Invert: 0
    },

    cyberpunk: {
        Brightness: 110,
        Contrast: 150,
        Saturation: 180,
        HueRotate: 45,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    frozen: {
        Brightness: 105,
        Contrast: 115,
        Saturation: 70,
        HueRotate: 180,
        Blur: 0,
        Grayscale: 10,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    sunset: {
        Brightness: 115,
        Contrast: 110,
        Saturation: 140,
        HueRotate: 330,
        Blur: 0,
        Grayscale: 0,
        Sepia: 20,
        Opacity: 100,
        Invert: 0
    },

    inverted: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 100
    },

    neon: {
        Brightness: 125,
        Contrast: 160,
        Saturation: 200,
        HueRotate: 25,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    moody: {
        Brightness: 85,
        Contrast: 135,
        Saturation: 75,
        HueRotate: 340,
        Blur: 1,
        Grayscale: 15,
        Sepia: 15,
        Opacity: 100,
        Invert: 0
    },

    silver: {
        Brightness: 105,
        Contrast: 115,
        Saturation: 40,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 20,
        Sepia: 5,
        Opacity: 100,
        Invert: 0
    },

    cinematic: {
        Brightness: 95,
        Contrast: 140,
        Saturation: 85,
        HueRotate: 350,
        Blur: 0,
        Grayscale: 10,
        Sepia: 12,
        Opacity: 100,
        Invert: 0
    },

    mist: {
        Brightness: 115,
        Contrast: 80,
        Saturation: 70,
        HueRotate: 0,
        Blur: 1,
        Grayscale: 8,
        Sepia: 0,
        Opacity: 95,
        Invert: 0
    },
};

Object.keys(presets).forEach(presetName => {

    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText = presetName;
    presetContainer.appendChild(presetButton);

    presetButton.addEventListener("click", () => {
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
            document.getElementById(filterName).value = preset[filterName];
        });
        applyFilters();
    });
});