/**
 * Showing a confirmation-message (add, delete, edit)
 * @param {string} message - message-text
 * @param {string} imgSrc - path of an image which should be displayed
 */
async function smallAnimatedLabel(message, imgSrc) {
    const timeout = 500;

    setTimeout(() => {
        const overlay = document.createElement("div");
        overlay.classList.add("small-overlay");

        overlay.appendChild(document.createTextNode(message));

        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            overlay.appendChild(img);
        }

        overlay.style.position = "fixed";
        overlay.style.right = "-50vw";
        overlay.style.gap = "10px";
        overlay.style.transition = "all 0.3s ease-in-out";
        overlay.style.zIndex = "9999";

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.right = "20vw";
        }, 10);

        if (window.innerWidth <= 450) {
            setTimeout(() => {
                overlay.style.right = "-100vw";
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 2000);
            }, 2000);
        } else {
            setTimeout(() => {
                overlay.style.right = "-50vw";
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 2000);
            }, 2000);
        }

    }, timeout);
}
