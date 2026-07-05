(function () {
    const DURATION = 1000;
    const EXIT_SELECTOR = 'a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])';

    function sameOrigin(url) {
        return url.origin === window.location.origin;
    }

    function ensureOverlay() {
        let overlay = document.querySelector(".page-transition");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "page-transition";
            overlay.setAttribute("aria-hidden", "true");
            overlay.innerHTML = '<div class="page-transition__heart"></div>';
            document.body.prepend(overlay);
        }
        return overlay;
    }

    function playEnter() {
        ensureOverlay();
        document.body.classList.add("is-page-entering");
        window.setTimeout(() => {
            document.body.classList.remove("is-page-entering");
        }, DURATION);
    }

    function playExit(url) {
        ensureOverlay();
        document.body.classList.add("is-page-exiting");
        window.setTimeout(() => {
            window.location.href = url.href;
        }, DURATION);
    }

    document.addEventListener("DOMContentLoaded", () => {
        playEnter();

        document.addEventListener("click", (event) => {
            const link = event.target.closest(EXIT_SELECTOR);
            if (!link || event.defaultPrevented) {
                return;
            }

            const url = new URL(link.href, window.location.href);
            if (!sameOrigin(url)) {
                return;
            }

            if (
                url.pathname === window.location.pathname &&
                url.search === window.location.search &&
                url.hash
            ) {
                return;
            }

            event.preventDefault();
            playExit(url);
        });
    });

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            document.body.classList.remove("is-page-exiting");
            document.body.classList.remove("is-page-entering");
            const overlay = document.querySelector(".page-transition");
            if (overlay) {
                overlay.remove();
            }
            playEnter();
        }
    });
})();
