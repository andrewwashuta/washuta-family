const reviewYearEl = document.getElementById("review-year");
const timelineEl = document.getElementById("timeline");
const monthModal = document.getElementById("month-modal");
const modalTitle = monthModal.querySelector("[data-modal-title]");
const modalCaption = monthModal.querySelector("[data-modal-caption]");
const modalCount = monthModal.querySelector("[data-modal-count]");
const modalScroller = monthModal.querySelector("[data-modal-scroller]");
const modalPrev = monthModal.querySelector("[data-modal-prev]");
const modalNext = monthModal.querySelector("[data-modal-next]");
const modalCloseButton = monthModal.querySelector(".month-modal__close");
const pageSections = document.querySelectorAll("header, main");

modalCaption.hidden = true;

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

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const setPageInert = (isInert) => {
  pageSections.forEach((section) => {
    if (isInert) {
      section.setAttribute("aria-hidden", "true");
      if ("inert" in section) {
        section.inert = true;
      }
      return;
    }
    section.removeAttribute("aria-hidden");
    if ("inert" in section) {
      section.inert = false;
    }
  });
};

const setMonthState = (section, isOpen) => {
  const card = section.querySelector(".month-card");
  section.classList.toggle("is-open", isOpen);
  if (card) {
    card.setAttribute("aria-expanded", `${isOpen}`);
  }
};

const closeAllMonths = (except) => {
  document.querySelectorAll(".month").forEach((section) => {
    if (section === except) return;
    if (!section.classList.contains("is-open")) return;
    setMonthState(section, false);
  });
};

let lastFocusedElement = null;
let activeSection = null;
let activeIndex = 0;
let modalScrollRaf = null;

const updateModalMeta = () => {
  const total = modalScroller.children.length;
  if (!total) return;
  const width = modalScroller.clientWidth || 1;
  const nextIndex = Math.max(0, Math.min(total - 1, Math.round(modalScroller.scrollLeft / width)));
  activeIndex = nextIndex;
  const slide = modalScroller.children[activeIndex];
  const caption = slide?.dataset.caption || "";
  modalCaption.textContent = caption;
  modalCaption.hidden = caption.length === 0;
  modalCount.textContent = `${activeIndex + 1} / ${total}`;
  modalPrev.disabled = activeIndex === 0;
  modalNext.disabled = activeIndex === total - 1;
};

const handleModalScroll = () => {
  if (modalScrollRaf) return;
  modalScrollRaf = window.requestAnimationFrame(() => {
    modalScrollRaf = null;
    updateModalMeta();
  });
};

const scrollToIndex = (index) => {
  const total = modalScroller.children.length;
  if (total === 0) return;
  const clamped = Math.max(0, Math.min(total - 1, index));
  const width = modalScroller.clientWidth || 1;
  modalScroller.scrollTo({ left: width * clamped, behavior: "smooth" });
};

const buildSlides = (images) => {
  modalScroller.innerHTML = "";
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "month-modal__slide";
    slide.dataset.caption = image.caption;
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-label", `${index + 1} of ${images.length}`);

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.caption;
    img.loading = "lazy";

    slide.appendChild(img);
    modalScroller.appendChild(slide);
  });
};

const openMonthModal = (month, originEl) => {
  lastFocusedElement = document.activeElement;
  activeSection = originEl?.closest(".month") ?? null;
  closeAllMonths(activeSection);
  if (activeSection) {
    setMonthState(activeSection, true);
  }

  if (originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    monthModal.style.setProperty("--modal-origin-x", `${originX}%`);
    monthModal.style.setProperty("--modal-origin-y", `${originY}%`);
  }

  buildSlides(month.images);
  modalTitle.textContent = month.name;
  modalScroller.scrollLeft = 0;
  activeIndex = 0;
  updateModalMeta();

  monthModal.classList.add("is-open");
  monthModal.setAttribute("aria-hidden", "false");
  setPageInert(true);
  document.body.classList.add("is-modal-open");
  modalCloseButton.focus();
};

const closeMonthModal = () => {
  monthModal.classList.remove("is-open");
  monthModal.setAttribute("aria-hidden", "true");
  modalScroller.innerHTML = "";
  modalTitle.textContent = "";
  modalCaption.textContent = "";
  modalCaption.hidden = true;
  modalCount.textContent = "";
  setPageInert(false);
  document.body.classList.remove("is-modal-open");
  if (activeSection) {
    setMonthState(activeSection, false);
    activeSection = null;
  }
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};

const trapModalFocus = (event) => {
  if (!monthModal.classList.contains("is-open")) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(monthModal.querySelectorAll(focusableSelectors)).filter(
    (node) => !node.hasAttribute("disabled")
  );

  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const renderMonths = () => {
  months.forEach((month, index) => {
    const slug = slugify(month.name);
    const section = document.createElement("section");
    section.className =
      "month flex-shrink-0 w-[85vw] max-w-[380px] md:w-[42vw] md:max-w-[420px]";
    section.id = `month-${slug}`;

    const card = document.createElement("article");
    card.className =
      "month-card group flex h-full flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-stone-300 hover:-transtone-y-1 active:scale-[0.99]";
    card.setAttribute("aria-labelledby", `${slug}-title`);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `View ${month.name} photos`);

    // Header with month name
    const header = document.createElement("div");
    header.className = "flex items-center justify-between";

    const title = document.createElement("h2");
    title.className = "text-lg font-semibold tracking-tight text-stone-900";
    title.id = `${slug}-title`;
    title.textContent = month.name;

    const photoCount = document.createElement("span");
    photoCount.className = "text-xs text-stone-400";
    photoCount.textContent = `${month.images.length} photos`;

    header.appendChild(title);
    header.appendChild(photoCount);

    // Hero grid - shows first 3 images in a grid layout
    const heroGrid = document.createElement("div");
    heroGrid.className = "grid grid-cols-2 grid-rows-2 gap-1.5 rounded-xl overflow-hidden aspect-[4/3]";
    heroGrid.setAttribute("aria-hidden", "true");

    const gridImages = month.images.slice(0, 3);
    gridImages.forEach((image, idx) => {
      const item = document.createElement("div");
      item.className = idx === 0
        ? "row-span-2 relative overflow-hidden rounded-lg"
        : "relative overflow-hidden rounded-md";

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;
      img.loading = "lazy";
      img.className = "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105";

      item.appendChild(img);
      heroGrid.appendChild(item);
    });

    // Summary text
    const summary = document.createElement("p");
    summary.className = "text-sm leading-relaxed text-stone-600 flex-1";
    summary.textContent = month.summary;

    // Highlights/details section
    const details = document.createElement("div");
    details.className = "pt-3 border-t border-stone-100";

    const detailText = document.createElement("p");
    detailText.className = "text-xs text-stone-400 leading-relaxed";
    detailText.textContent = month.highlights || "Tap to view all photos and memories from this month.";

    details.appendChild(detailText);

    card.appendChild(header);
    card.appendChild(heroGrid);
    card.appendChild(summary);
    card.appendChild(details);

    section.appendChild(card);
    timelineEl.appendChild(section);

    // Make entire card clickable
    const handleCardClick = () => {
      openMonthModal(month, card);
    };

    card.addEventListener("click", handleCardClick);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    });
  });
};

renderMonths();

modalPrev.addEventListener("click", () => {
  scrollToIndex(activeIndex - 1);
});

modalNext.addEventListener("click", () => {
  scrollToIndex(activeIndex + 1);
});

modalScroller.addEventListener("scroll", handleModalScroll);

monthModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close]")) {
    closeMonthModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (monthModal.classList.contains("is-open")) {
    if (event.key === "Escape") {
      closeMonthModal();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
      return;
    }
  }
  trapModalFocus(event);
});
