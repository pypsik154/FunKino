export function isAdBlockEnabled() {
    return new Promise((resolve) => {
        const adElement = document.createElement("div");
        adElement.className = "ads ad-banner ad-container"; // Часто блокируемые классы
        adElement.style.display = "none";
        document.body.appendChild(adElement);

        setTimeout(() => {
            if (adElement.offsetParent === null) {
                resolve(true); // AdBlock включён
            } else {
                resolve(false); // AdBlock отключён
            }
            adElement.remove();
        }, 100);
    });
}
