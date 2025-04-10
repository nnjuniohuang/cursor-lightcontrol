const lightSource = document.getElementById('lightSource');
const brightnessSlider = document.getElementById('brightness');
const colorTempSlider = document.getElementById('colorTemp');

brightnessSlider.addEventListener('input', updateLight);
colorTempSlider.addEventListener('input', updateLight);

function updateLight() {
    const brightness = brightnessSlider.value;
    const colorTemp = colorTempSlider.value;

    // Update brightness
    lightSource.style.boxShadow = `0 0 ${brightness / 2}px rgba(255, 255, 255, ${brightness / 100})`;

    // Update color temperature
    const color = colorTemperatureToRGB(colorTemp);
    lightSource.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function colorTemperatureToRGB(kelvin) {
    let temp = kelvin / 100;
    let red, green, blue;

    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        blue = temp <= 19 ? 0 : temp - 10;
        blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
    }

    return {
        r: clamp(red, 0, 255),
        g: clamp(green, 0, 255),
        b: clamp(blue, 0, 255)
    };
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
} 