const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        galleryItems.forEach(item => {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === itemCategory
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// Convert NodeList into an array
const images = Array.from(galleryItems);

let currentIndex = 0;


function openLightbox(index) {

    currentIndex = index;

    const item = images[currentIndex];

    const image = item.querySelector("img");
    const title = item.querySelector("h3");
    const category = item.querySelector(".image-overlay p");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Gallery image";
    
    lightboxTitle.textContent = title?.textContent || "Untitled";
    lightboxCategory.textContent = category?.textContent || "";
    imageCounter.textContent =
        `${currentIndex + 1} / ${images.length}`;

    lightbox.classList.add("active");

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
}


galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    // Enable scrolling again
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);


function showNextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}

nextBtn.addEventListener("click", showNextImage);


function showPreviousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    openLightbox(currentIndex);
}

prevBtn.addEventListener("click", showPreviousImage);


document.addEventListener("keydown", event => {

    // Only work when lightbox is open
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("show-menu");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close Menu" : "Open Menu"
        );

        menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show-menu");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open Menu");
            menuBtn.textContent = "☰";
        });
    });
}


const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show-menu");

    });

});