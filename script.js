const reviewYearEl = document.getElementById("review-year");
const timelineEl = document.getElementById("timeline");
const lightboxEl = document.getElementById("lightbox");
const lightboxImage = lightboxEl.querySelector(".lightbox__image");
const lightboxCaption = lightboxEl.querySelector(".lightbox__caption");

const reviewYear = new Date().getFullYear() - 1;
reviewYearEl.textContent = reviewYear;

const months = [
  {
    name: "January",
    tag: "Fresh starts",
    summary:
      "Cozy mornings, hot cocoa after sled rides, and a new tradition of Sunday waffles.",
    images: [
      { src: "https://picsum.photos/seed/jan-1/900/1200", caption: "Snowy backyard adventures." },
      { src: "https://picsum.photos/seed/jan-2/900/1200", caption: "The annual puzzle marathon." },
      { src: "https://picsum.photos/seed/jan-3/900/1200", caption: "Quiet library afternoons." },
      { src: "https://picsum.photos/seed/jan-4/900/1200", caption: "Fireside story time." },
    ],
  },
  {
    name: "February",
    tag: "Warm hearts",
    summary:
      "Handmade valentines, a surprise snow day, and a living room dance party.",
    images: [
      { src: "https://picsum.photos/seed/feb-1/900/1200", caption: "Glittery valentines on display." },
      { src: "https://picsum.photos/seed/feb-2/900/1200", caption: "Snowball mission in the park." },
      { src: "https://picsum.photos/seed/feb-3/900/1200", caption: "Homemade heart-shaped pizzas." },
      { src: "https://picsum.photos/seed/feb-4/900/1200", caption: "Movie night cocoa station." },
    ],
  },
  {
    name: "March",
    tag: "First blooms",
    summary:
      "Early hikes, garden prep, and the first picnic of the season by the lake.",
    images: [
      { src: "https://picsum.photos/seed/mar-1/900/1200", caption: "Windy trail smiles." },
      { src: "https://picsum.photos/seed/mar-2/900/1200", caption: "Planting seedlings together." },
      { src: "https://picsum.photos/seed/mar-3/900/1200", caption: "Picnic blanket + sunshine." },
      { src: "https://picsum.photos/seed/mar-4/900/1200", caption: "Rainy day fort building." },
    ],
  },
  {
    name: "April",
    tag: "Play outside",
    summary:
      "Weekend soccer games, splashy rain walks, and pastel egg adventures.",
    images: [
      { src: "https://picsum.photos/seed/apr-1/900/1200", caption: "Sideline cheers." },
      { src: "https://picsum.photos/seed/apr-2/900/1200", caption: "Colorful egg hunt." },
      { src: "https://picsum.photos/seed/apr-3/900/1200", caption: "Umbrella runway." },
      { src: "https://picsum.photos/seed/apr-4/900/1200", caption: "Kitchen cupcake test run." },
    ],
  },
  {
    name: "May",
    tag: "Golden evenings",
    summary:
      "School performances, bike rides at sunset, and the first backyard campout.",
    images: [
      { src: "https://picsum.photos/seed/may-1/900/1200", caption: "Stage lights and proud smiles." },
      { src: "https://picsum.photos/seed/may-2/900/1200", caption: "Bike trail breakthroughs." },
      { src: "https://picsum.photos/seed/may-3/900/1200", caption: "Campfire marshmallow magic." },
      { src: "https://picsum.photos/seed/may-4/900/1200", caption: "Garden blooms on deck." },
    ],
  },
  {
    name: "June",
    tag: "Summer energy",
    summary:
      "Pool afternoons, messy popsicles, and day trips that stretched late.",
    images: [
      { src: "https://picsum.photos/seed/jun-1/900/1200", caption: "Poolside cannonballs." },
      { src: "https://picsum.photos/seed/jun-2/900/1200", caption: "Popsicle rainbow." },
      { src: "https://picsum.photos/seed/jun-3/900/1200", caption: "Road trip playlists." },
      { src: "https://picsum.photos/seed/jun-4/900/1200", caption: "Backyard sprinkler parties." },
    ],
  },
  {
    name: "July",
    tag: "Big sky days",
    summary:
      "Fourth of July sparklers, lake weekends, and sunset paddleboarding.",
    images: [
      { src: "https://picsum.photos/seed/jul-1/900/1200", caption: "Sparklers after dusk." },
      { src: "https://picsum.photos/seed/jul-2/900/1200", caption: "Lake dock leaps." },
      { src: "https://picsum.photos/seed/jul-3/900/1200", caption: "Sunset paddle session." },
      { src: "https://picsum.photos/seed/jul-4/900/1200", caption: "Berry picking haul." },
    ],
  },
  {
    name: "August",
    tag: "Road miles",
    summary:
      "Mountain air, roadside diners, and the loudest family sing-alongs.",
    images: [
      { src: "https://picsum.photos/seed/aug-1/900/1200", caption: "Summit selfie." },
      { src: "https://picsum.photos/seed/aug-2/900/1200", caption: "Trail snacks break." },
      { src: "https://picsum.photos/seed/aug-3/900/1200", caption: "Vintage roadside stop." },
      { src: "https://picsum.photos/seed/aug-4/900/1200", caption: "Cabin board games." },
    ],
  },
  {
    name: "September",
    tag: "New routines",
    summary:
      "Back-to-school energy, fresh notebooks, and after-dinner walks.",
    images: [
      { src: "https://picsum.photos/seed/sep-1/900/1200", caption: "First-day outfits." },
      { src: "https://picsum.photos/seed/sep-2/900/1200", caption: "Homework nook refresh." },
      { src: "https://picsum.photos/seed/sep-3/900/1200", caption: "Evening neighborhood stroll." },
      { src: "https://picsum.photos/seed/sep-4/900/1200", caption: "Apple orchard visit." },
    ],
  },
  {
    name: "October",
    tag: "Autumn glow",
    summary:
      "Pumpkin carving, crunchy leaves, and the spookiest movie marathons.",
    images: [
      { src: "https://picsum.photos/seed/oct-1/900/1200", caption: "Pumpkin patch portrait." },
      { src: "https://picsum.photos/seed/oct-2/900/1200", caption: "Jack-o'-lantern lineup." },
      { src: "https://picsum.photos/seed/oct-3/900/1200", caption: "Leaf piles takeoff." },
      { src: "https://picsum.photos/seed/oct-4/900/1200", caption: "Costume test run." },
    ],
  },
  {
    name: "November",
    tag: "Gather + savor",
    summary:
      "Turkey trials, gratitude notes, and long chats around the table.",
    images: [
      { src: "https://picsum.photos/seed/nov-1/900/1200", caption: "Pie baking lineup." },
      { src: "https://picsum.photos/seed/nov-2/900/1200", caption: "Table setting ritual." },
      { src: "https://picsum.photos/seed/nov-3/900/1200", caption: "Gratitude notes." },
      { src: "https://picsum.photos/seed/nov-4/900/1200", caption: "Friendsgiving laughter." },
    ],
  },
  {
    name: "December",
    tag: "Lights on",
    summary:
      "Tree trimming, cookie exchanges, and the coziest holiday nights.",
    images: [
      { src: "https://picsum.photos/seed/dec-1/900/1200", caption: "Ornament memories." },
      { src: "https://picsum.photos/seed/dec-2/900/1200", caption: "Snowy night drive." },
      { src: "https://picsum.photos/seed/dec-3/900/1200", caption: "Cookie decorating." },
      { src: "https://picsum.photos/seed/dec-4/900/1200", caption: "Fireplace glow." },
    ],
  },
];

const closeAllMonths = (except) => {
  document.querySelectorAll(".month.is-open").forEach((month) => {
    if (month === except) return;
    month.classList.remove("is-open");
    const button = month.querySelector(".image-stack");
    const gallery = month.querySelector(".month-gallery");
    button.setAttribute("aria-expanded", "false");
    gallery.setAttribute("aria-hidden", "true");
  });
};

const openLightbox = (src, caption) => {
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightboxEl.classList.add("is-open");
  lightboxEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-lightbox-open");
};

const closeLightbox = () => {
  lightboxEl.classList.remove("is-open");
  lightboxEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-lightbox-open");
};

const renderMonths = () => {
  months.forEach((month, index) => {
    const section = document.createElement("section");
    section.className = "month";
    if (index === months.length - 1) {
      section.classList.add("is-last");
    }

    const card = document.createElement("div");
    card.className = "month-card";

    const header = document.createElement("div");
    header.className = "month-header";
    header.innerHTML = `<h2>${month.name}</h2><span class="month-tag">${month.tag}</span>`;

    const stack = document.createElement("button");
    stack.className = "image-stack";
    stack.type = "button";
    stack.setAttribute("aria-expanded", "false");
    stack.setAttribute("aria-label", `View ${month.name} gallery`);

    const stackImages = month.images.slice(0, 3);
    stackImages.forEach((image, idx) => {
      const frame = document.createElement("span");
      frame.className = "stack-item";
      frame.style.setProperty("--i", idx);
      frame.style.zIndex = 10 - idx;

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;
      img.loading = "lazy";

      frame.appendChild(img);
      stack.appendChild(frame);
    });

    const remaining = month.images.length - stackImages.length;
    if (remaining > 0) {
      const count = document.createElement("span");
      count.className = "stack-count";
      count.textContent = `+${remaining}`;
      stack.appendChild(count);
    }

    const summary = document.createElement("p");
    summary.className = "month-summary";
    summary.textContent = month.summary;

    const gallery = document.createElement("div");
    gallery.className = "month-gallery";
    gallery.setAttribute("aria-hidden", "true");

    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    month.images.forEach((image) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-item";

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;
      img.loading = "lazy";
      img.dataset.caption = image.caption;

      const caption = document.createElement("figcaption");
      caption.textContent = image.caption;

      figure.appendChild(img);
      figure.appendChild(caption);
      grid.appendChild(figure);
    });

    gallery.appendChild(grid);
    card.appendChild(header);
    card.appendChild(stack);
    card.appendChild(summary);
    card.appendChild(gallery);

    const step = document.createElement("div");
    step.className = "timeline-step";
    step.innerHTML = `<span class="step-dot"></span><span class="step-line"></span><span>${month.name}</span>`;

    section.appendChild(card);
    section.appendChild(step);
    timelineEl.appendChild(section);

    stack.addEventListener("click", () => {
      const isOpen = section.classList.toggle("is-open");
      closeAllMonths(section);
      stack.setAttribute("aria-expanded", `${isOpen}`);
      gallery.setAttribute("aria-hidden", `${!isOpen}`);
      if (isOpen) {
        gallery.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
  });
};

renderMonths();

timelineEl.addEventListener("click", (event) => {
  const figure = event.target.closest(".gallery-item");
  if (!figure) return;
  const img = figure.querySelector("img");
  openLightbox(img.src, img.dataset.caption || img.alt);
});

lightboxEl.addEventListener("click", (event) => {
  if (event.target.matches("[data-close]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightboxEl.classList.contains("is-open")) {
    closeLightbox();
  }
});

timelineEl.addEventListener(
  "wheel",
  (event) => {
    const hasVerticalOverflow = timelineEl.scrollHeight > timelineEl.clientHeight;
    if (hasVerticalOverflow) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    timelineEl.scrollBy({ left: event.deltaY, behavior: "smooth" });
    event.preventDefault();
  },
  { passive: false }
);
