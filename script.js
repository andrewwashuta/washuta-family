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
    layout: "stack",
    layoutLabel: "Preview style: stacked frames",
    summary:
      "Cozy mornings, hot cocoa after sled rides, and a new tradition of Sunday waffles.",
    images: [
      { src: "https://picsum.photos/seed/jan-1/1200/900", caption: "Snowy backyard adventures." },
      { src: "https://picsum.photos/seed/jan-2/900/1200", caption: "The annual puzzle marathon." },
      { src: "https://picsum.photos/seed/jan-3/900/1200", caption: "Quiet library afternoons." },
      { src: "https://picsum.photos/seed/jan-4/900/1200", caption: "Fireside story time." },
    ],
  },
  {
    name: "February",
    tag: "Warm hearts",
    layout: "grid-count",
    layoutLabel: "Preview style: grid + count",
    summary:
      "Handmade valentines, a surprise snow day, and a living room dance party.",
    images: [
      { src: "https://picsum.photos/seed/feb-1/1200/900", caption: "Glittery valentines on display." },
      { src: "https://picsum.photos/seed/feb-2/900/1200", caption: "Snowball mission in the park." },
      { src: "https://picsum.photos/seed/feb-3/1200/900", caption: "Homemade heart-shaped pizzas." },
      { src: "https://picsum.photos/seed/feb-4/900/1200", caption: "Movie night cocoa station." },
      { src: "https://picsum.photos/seed/feb-5/1200/900", caption: "Paper garlands everywhere." },
      { src: "https://picsum.photos/seed/feb-6/900/1200", caption: "Dessert tasting lineup." },
      { src: "https://picsum.photos/seed/feb-7/1200/900", caption: "Surprise snowman build." },
      { src: "https://picsum.photos/seed/feb-8/900/1200", caption: "Cozy story corner." },
    ],
  },
  {
    name: "March",
    tag: "First blooms",
    layout: "grid-four",
    layoutLabel: "Preview style: four-up grid",
    summary:
      "Early hikes, garden prep, and the first picnic of the season by the lake.",
    images: [
      { src: "https://picsum.photos/seed/mar-1/1200/900", caption: "Windy trail smiles." },
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
  const preview = section.querySelector("[data-preview]");
  if (!preview) return;
  section.classList.toggle("is-open", isOpen);
  preview.setAttribute("aria-expanded", `${isOpen}`);
  preview.dataset.state = isOpen ? "open" : "closed";
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

const setFrameRatio = (img, frame) => {
  const applyRatio = () => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    if (!width || !height) return;
    const ratio = width / height;
    let frameRatio = "3 / 4";
    if (ratio > 1.2) {
      frameRatio = "4 / 3";
    } else if (ratio > 0.9) {
      frameRatio = "1 / 1";
    }
    frame.style.setProperty("--frame-ratio", frameRatio);
  };

  if (img.complete) {
    applyRatio();
  } else {
    img.addEventListener("load", applyRatio, { once: true });
  }
};

const buildSlides = (images) => {
  modalScroller.innerHTML = "";
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "month-modal__slide";
    slide.dataset.caption = image.caption;
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-label", `${index + 1} of ${images.length}`);

    const media = document.createElement("div");
    media.className = "month-modal__media";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.caption;
    img.loading = "lazy";
    setFrameRatio(img, media);

    media.appendChild(img);
    slide.appendChild(media);
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
      "month snap-start flex-shrink-0 w-[84vw] max-w-[420px] md:w-[44vw] md:max-w-[480px]";
    section.id = `month-${slug}`;

    const card = document.createElement("article");
    card.className =
      "month-card flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-transform duration-500";
    card.setAttribute("aria-labelledby", `${slug}-title`);

    const header = document.createElement("div");
    header.className = "flex items-center justify-between gap-3";

    const title = document.createElement("h2");
    title.className = "text-lg font-semibold tracking-tight text-slate-900";
    title.id = `${slug}-title`;
    title.textContent = month.name;

    const tag = document.createElement("span");
    tag.className =
      "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-slate-500";
    tag.textContent = month.tag;

    header.appendChild(title);
    header.appendChild(tag);

    let layoutLabel = null;
    if (month.layoutLabel) {
      layoutLabel = document.createElement("p");
      layoutLabel.className = "layout-label";
      layoutLabel.textContent = month.layoutLabel;
    }

    const layout = month.layout || "stack";
    const preview = document.createElement("button");
    preview.type = "button";
    preview.dataset.preview = "";
    preview.dataset.state = "closed";
    preview.setAttribute("aria-expanded", "false");
    preview.setAttribute("aria-haspopup", "dialog");
    preview.setAttribute("aria-label", `Open ${month.name} photos`);

    if (layout === "stack") {
      preview.className = "stack";
      preview.style.setProperty("--stack-direction", index % 2 === 0 ? "1" : "-1");

      const stackImages = month.images.slice(0, 3);
      stackImages.forEach((image, idx) => {
        const frame = document.createElement("span");
        frame.className = "stack-item";
        frame.style.setProperty("--index", idx);
        frame.style.zIndex = 10 - idx;

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.caption;
        img.loading = "lazy";
        setFrameRatio(img, frame);

        frame.appendChild(img);
        preview.appendChild(frame);
      });

      const remaining = month.images.length - stackImages.length;
      if (remaining > 0) {
        const count = document.createElement("span");
        count.className = "stack-count";
        count.textContent = `+${remaining}`;
        preview.appendChild(count);
      }
    } else {
      preview.className = "preview-grid";
      const gridImages = month.images.slice(0, layout === "grid-count" ? 3 : 4);
      gridImages.forEach((image) => {
        const tile = document.createElement("span");
        tile.className = "preview-tile";

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.caption;
        img.loading = "lazy";
        setFrameRatio(img, tile);

        tile.appendChild(img);
        preview.appendChild(tile);
      });

      if (layout === "grid-count") {
        const remaining = month.images.length - gridImages.length;
        const tile = document.createElement("span");
        tile.className = "preview-tile preview-count";
        if (remaining > 0) {
          tile.textContent = `+${remaining}`;
        } else if (month.images[3]) {
          const img = document.createElement("img");
          img.src = month.images[3].src;
          img.alt = month.images[3].caption;
          img.loading = "lazy";
          setFrameRatio(img, tile);
          tile.appendChild(img);
        } else {
          tile.textContent = "View";
        }
        preview.appendChild(tile);
      }
    }

    const summary = document.createElement("p");
    summary.className = "text-sm leading-6 text-slate-500";
    summary.textContent = month.summary;

    card.appendChild(header);
    if (layoutLabel) {
      card.appendChild(layoutLabel);
    }
    card.appendChild(preview);
    card.appendChild(summary);

    section.appendChild(card);
    timelineEl.appendChild(section);

    preview.addEventListener("click", () => {
      openMonthModal(month, preview);
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
