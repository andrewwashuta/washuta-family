const reviewYearEl = document.getElementById("review-year");
const timelineEl = document.getElementById("timeline");
const lightboxEl = document.getElementById("lightbox");
const lightboxImage = lightboxEl.querySelector(".lightbox__image");
const lightboxCaption = lightboxEl.querySelector(".lightbox__caption");
const lightboxCloseButton = lightboxEl.querySelector(".lightbox__close");
const pageSections = document.querySelectorAll("header, main");

lightboxCaption.hidden = true;

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
  const stack = section.querySelector("[data-stack]");
  const gallery = section.querySelector("[data-gallery]");

  section.classList.toggle("is-open", isOpen);
  stack.setAttribute("aria-expanded", `${isOpen}`);
  stack.dataset.state = isOpen ? "open" : "closed";
  gallery.setAttribute("aria-hidden", `${!isOpen}`);
};

const closeAllMonths = (except) => {
  document.querySelectorAll(".month").forEach((section) => {
    if (section === except) return;
    if (!section.classList.contains("is-open")) return;
    setMonthState(section, false);
  });
};

let lastFocusedElement = null;

const openLightbox = (src, caption) => {
  lastFocusedElement = document.activeElement;
  lightboxImage.src = src;
  lightboxImage.alt = caption || "Expanded photo";
  lightboxCaption.textContent = caption || "";
  lightboxCaption.hidden = !caption;
  lightboxEl.classList.add("is-open");
  lightboxEl.setAttribute("aria-hidden", "false");
  setPageInert(true);
  document.body.classList.add("is-lightbox-open");
  lightboxCloseButton.focus();
};

const closeLightbox = () => {
  lightboxEl.classList.remove("is-open");
  lightboxEl.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  lightboxCaption.hidden = true;
  setPageInert(false);
  document.body.classList.remove("is-lightbox-open");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};

const trapLightboxFocus = (event) => {
  if (!lightboxEl.classList.contains("is-open")) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(lightboxEl.querySelectorAll(focusableSelectors)).filter(
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
  months.forEach((month) => {
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

    const stack = document.createElement("button");
    stack.className = "stack";
    stack.type = "button";
    stack.dataset.stack = "";
    stack.dataset.state = "closed";
    stack.setAttribute("aria-expanded", "false");
    stack.setAttribute("aria-controls", `${slug}-gallery`);
    stack.setAttribute("aria-label", `Toggle ${month.name} gallery`);

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
    summary.className = "text-sm leading-6 text-slate-500";
    summary.textContent = month.summary;

    const gallery = document.createElement("div");
    gallery.className = "month-gallery mt-3";
    gallery.dataset.gallery = "";
    gallery.id = `${slug}-gallery`;
    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", `${month.name} gallery`);
    gallery.setAttribute("aria-hidden", "true");

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-2 gap-3 md:grid-cols-3";

    month.images.forEach((image) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "gallery-item group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]";
      button.dataset.galleryItem = "";
      button.dataset.src = image.src;
      button.dataset.caption = image.caption;
      button.setAttribute("aria-label", `Open ${month.name} photo: ${image.caption}`);

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;
      img.loading = "lazy";

      const caption = document.createElement("span");
      caption.className = "px-3 py-2 text-[0.72rem] text-slate-500";
      caption.textContent = image.caption;

      button.appendChild(img);
      button.appendChild(caption);
      grid.appendChild(button);
    });

    gallery.appendChild(grid);
    card.appendChild(header);
    card.appendChild(stack);
    card.appendChild(summary);
    card.appendChild(gallery);

    section.appendChild(card);
    timelineEl.appendChild(section);

    stack.addEventListener("click", () => {
      const shouldOpen = !section.classList.contains("is-open");
      closeAllMonths(section);
      setMonthState(section, shouldOpen);
      if (shouldOpen) {
        gallery.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
  });
};

renderMonths();

timelineEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-gallery-item]");
  if (!button) return;
  openLightbox(button.dataset.src, button.dataset.caption);
});

lightboxEl.addEventListener("click", (event) => {
  if (event.target.matches("[data-close]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightboxEl.classList.contains("is-open")) {
    closeLightbox();
    return;
  }
  trapLightboxFocus(event);
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
