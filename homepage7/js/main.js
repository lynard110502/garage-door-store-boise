(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var film = document.getElementById("shop-film");
  if (film && !reduce) {
    film.src = "https://www.youtube-nocookie.com/embed/bSldLJXGTGU?autoplay=1&mute=1&loop=1&playlist=bSldLJXGTGU&rel=0&modestbranding=1&playsinline=1&origin=" + encodeURIComponent(window.location.origin);
  }
  var topbar = document.getElementById("topbar");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  var hero = document.querySelector(".hero");
  var finale = document.querySelector(".finale");
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");
  var note = form.querySelector("[name=message]");
  var currentDoor = "Black modern";

  var doors = [
    { style: "modern", windows: ["row"], finish: ["black"], hardware: "plain", src: "assets/images/black-modern.webp", pos: "88% 48%", origin: "80% 50%", zoom: 1.12, alt: "Black modern garage door with stacked windows", name: "Black modern", caption: "Black modern · stacked windows", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "modern", windows: ["row"], finish: ["natural"], hardware: "plain", src: "assets/images/cfg/modern-side.webp", alt: "Wood-tone modern door with rows of frosted windows", name: "Window-row modern", caption: "Modern · window rows", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "modern", windows: ["row"], finish: ["natural", "light"], hardware: "plain", src: "assets/images/cfg/plank-curve.webp", pos: "center 62%", alt: "Arched wood plank door with a stack of windows", name: "Arched plank", caption: "Plank · arched opening", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "modern", windows: ["none"], finish: ["light"], hardware: "plain", src: "assets/images/modern-4.webp", alt: "Light flush modern garage doors on a ranch house", name: "Light modern", caption: "Light modern · flush panels", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "classic", windows: ["top"], finish: ["light", "painted"], hardware: "plain", src: "assets/images/cfg/classic-a.webp", origin: "center 84%", zoom: 1.7, alt: "Three white traditional garage doors with top windows", name: "Traditional", caption: "Traditional · top windows", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "classic", windows: ["top"], finish: ["painted", "light"], hardware: "decorative", src: "assets/images/cfg/classic-b.webp", alt: "Beige traditional door with handles and strap hinges", name: "Traditional", caption: "Traditional · strap hardware", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "carriage", windows: ["decorative", "top"], finish: ["natural"], hardware: "decorative", src: "assets/images/cfg/carriage-brown.webp", origin: "72% 62%", zoom: 1.35, alt: "Brown carriage door in a stone arch with black hardware", name: "Carriage house", caption: "Carriage · stone arch", href: "https://garagedoorstoreboise.com/custom-carriage-garage-doors/" },
    { style: "carriage", windows: ["decorative"], finish: ["natural"], hardware: "decorative", src: "assets/images/carriage-2.webp", alt: "Wood carriage house doors with black strap hardware", name: "Wood carriage", caption: "Carriage · strap hardware", href: "https://garagedoorstoreboise.com/custom-carriage-garage-doors/" },
    { style: "wood", windows: ["row"], finish: ["natural"], hardware: "plain", src: "assets/images/wood-grain.webp", origin: "center 74%", zoom: 1.45, alt: "Wood-look garage doors with a window row", name: "Wood-look", caption: "Wood-look · window row", href: "https://garagedoorstoreboise.com/custom-wood-garage-doors/" },
    { style: "wood", windows: ["top"], finish: ["natural"], hardware: "plain", src: "assets/images/rv-wood.webp", alt: "Large wood-look garage door with a top window row", name: "Wood-look", caption: "Wood-look · tall top windows", href: "https://garagedoorstoreboise.com/custom-wood-garage-doors/" },
    { style: "wood", windows: ["top"], finish: ["natural"], hardware: "decorative", src: "assets/images/snow-door.webp", alt: "Wood garage door with a top window grid", name: "Wood", caption: "Wood · top window grid", href: "https://garagedoorstoreboise.com/custom-wood-garage-doors/" },
    { style: "glass", windows: ["full"], finish: ["black"], hardware: "plain", src: "assets/images/cfg/glass-home.webp", origin: "78% 68%", zoom: 1.65, alt: "Full-view glass garage door on a house", name: "Full-view glass", caption: "Full-view glass · home", href: "https://garagedoorstoreboise.com/commercial-garage-doors/" },
    { style: "glass", windows: ["row"], finish: ["light", "black"], hardware: "plain", src: "assets/images/glass.webp", alt: "Contemporary garage doors with a window row", name: "Window-row glass", caption: "Contemporary · window row", href: "https://garagedoorstoreboise.com/standard-garage-doors/" },
    { style: "commercial", windows: ["full", "none"], finish: ["black", "light"], hardware: "plain", src: "assets/images/cfg/commercial-bay.webp", origin: "68% 60%", zoom: 1.25, alt: "Tall commercial garage door in a shop bay", name: "Commercial bay", caption: "Commercial · shop bay", href: "https://garagedoorstoreboise.com/commercial-garage-doors/" }
  ];

  function measure() {
    document.documentElement.style.setProperty("--header", topbar.offsetHeight + "px");
  }

  function closeNav() {
    document.documentElement.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  measure();
  window.addEventListener("resize", measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  toggle.addEventListener("click", function () {
    var open = document.documentElement.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("scroll", function () {
    topbar.classList.toggle("is-solid", window.scrollY > 24);
  }, { passive: true });

  if (reduce) hero.classList.add("is-open");
  else requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-open"); }); });

  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero__photo"));
  var slide = 0;
  var slideTimer = null;
  var frame = document.querySelector(".hero__frame");

  function showSlide(next) {
    if (!slides.length) return;
    slides[slide].classList.remove("is-on");
    slide = (next + slides.length) % slides.length;
    slides[slide].classList.add("is-on");
  }

  function startSlides() {
    if (reduce || slides.length < 2 || slideTimer || document.hidden) return;
    slideTimer = setInterval(function () { showSlide(slide + 1); }, 4800);
  }

  function stopSlides() {
    clearInterval(slideTimer);
    slideTimer = null;
  }

  if (frame) {
    frame.addEventListener("mouseenter", stopSlides);
    frame.addEventListener("mouseleave", startSlides);
    frame.addEventListener("focusin", stopSlides);
    frame.addEventListener("focusout", startSlides);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopSlides();
    else startSlides();
  });

  startSlides();

  var collection = document.querySelector(".collection");
  if (collection && !reduce && "IntersectionObserver" in window) {
    var pieces = collection.querySelectorAll(".piece");
    var lined = false;
    var lineup = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || lined) return;
        collection.classList.add("is-lining");
        lineup.disconnect();
      });
    }, { threshold: 0.28 });
    lineup.observe(collection);
    collection.addEventListener("animationend", function (event) {
      if (lined || event.animationName !== "lineUp") return;
      if (event.target !== pieces[pieces.length - 1]) return;
      lined = true;
      collection.classList.add("is-lined");
    });
  }

  document.querySelectorAll(".sym__list button").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-sym");
      document.querySelectorAll(".sym__list button").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      document.querySelectorAll(".sym__card").forEach(function (card) {
        var show = card.id === "sym-" + key;
        card.hidden = !show;
        card.classList.toggle("is-shown", show);
      });
      if (window.matchMedia("(max-width: 979px)").matches) {
        var stage = document.querySelector(".sym__stage");
        var header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header")) || 68;
        var top = stage.getBoundingClientRect().top + window.scrollY - header - 8;
        window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
      }
    });
  });

  function choice(group) {
    var pressed = document.querySelector('.picks[data-group="' + group + '"] button[aria-pressed="true"]');
    return pressed ? pressed.getAttribute("data-value") : "any";
  }

  function scoreDoor(door, pick) {
    if (door.style !== pick.style) return -1;
    var score = 10;
    if (pick.windows !== "any") score += door.windows.indexOf(pick.windows) !== -1 ? 5 : -3;
    if (pick.finish !== "any") score += door.finish.indexOf(pick.finish) !== -1 ? 5 : -3;
    if (pick.hardware === "decorative") score += door.hardware === "decorative" ? 6 : -4;
    if (pick.hardware === "plain") score += door.hardware === "plain" ? 4 : -2;
    return score;
  }

  function exactDoor(door, pick) {
    var windows = pick.windows === "any" || door.windows.indexOf(pick.windows) !== -1;
    var finish = pick.finish === "any" || door.finish.indexOf(pick.finish) !== -1;
    var hardware = pick.hardware === "any" || door.hardware === pick.hardware;
    return windows && finish && hardware;
  }

  function showDoor() {
    var pick = {
      style: choice("style"),
      windows: choice("windows"),
      finish: choice("finish"),
      hardware: choice("hardware")
    };
    var best = null;
    var bestScore = -1;
    doors.forEach(function (door) {
      var value = scoreDoor(door, pick);
      if (value > bestScore) {
        best = door;
        bestScore = value;
      }
    });
    if (!best) return;
    var photo = document.getElementById("config-photo");
    var caption = document.getElementById("config-caption");
    var readout = document.getElementById("config-readout");
    var link = document.getElementById("config-link");
    photo.src = best.src;
    photo.alt = best.alt;
    var wideStage = window.matchMedia("(min-width: 980px) and (min-height: 900px)").matches;
    photo.style.objectPosition = best.pos || "center center";
    photo.style.transformOrigin = best.origin || "center center";
    photo.style.transform = best.zoom && wideStage ? "scale(" + best.zoom + ")" : "";
    caption.textContent = best.caption;
    link.href = best.href;
    currentDoor = best.name;
    readout.textContent = exactDoor(best, pick)
      ? best.name + ". A real gallery door."
      : "Closest gallery door: " + best.name + ". The photo does not show every option you picked.";
  }

  document.querySelectorAll(".picks").forEach(function (group) {
    group.querySelectorAll("button").forEach(function (button) {
      button.addEventListener("click", function () {
        group.querySelectorAll("button").forEach(function (other) {
          other.setAttribute("aria-pressed", other === button ? "true" : "false");
        });
        showDoor();
      });
    });
  });

  showDoor();
  window.matchMedia("(min-width: 980px) and (min-height: 900px)").addEventListener("change", showDoor);

  document.querySelector(".config__actions .btn--ghost").addEventListener("click", function () {
    if (!note.value) note.value = "Interested in: " + currentDoor + ".";
  });

  var split = document.getElementById("split");
  var clip = document.getElementById("split-clip");
  var range = document.getElementById("split-range");

  if (split && clip && range) {
    var clipImage = clip.querySelector("img");

    function paintSplit() {
      var value = range.value + "%";
      split.style.setProperty("--split", value);
      clipImage.style.width = split.offsetWidth + "px";
      clipImage.style.height = split.offsetHeight + "px";
    }

    range.addEventListener("input", paintSplit);
    window.addEventListener("resize", paintSplit);
    paintSplit();
  }

  var road = document.querySelector(".road");
  if (road && reduce) road.classList.add("is-still");
  else if (road && "IntersectionObserver" in window) {
    var roadWatcher = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        road.classList.add("is-go");
        obs.unobserve(road);
      });
    }, { threshold: 0.5 });
    roadWatcher.observe(road);
  } else if (road) road.classList.add("is-go");

  if (!reduce && "IntersectionObserver" in window) {
    var shut = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) finale.classList.add("is-shut");
    }, { threshold: 0.28 });
    shut.observe(finale);
  } else finale.classList.add("is-shut");

  document.querySelectorAll(".cities button").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".cities button").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      var place = button.getAttribute("data-place");
      var zoom = button.getAttribute("data-zoom") || "13";
      var lat = button.getAttribute("data-lat");
      var lng = button.getAttribute("data-lng");
      var shop = button.getAttribute("data-shop") === "true";
      var map = document.getElementById("area-map");
      var directions = document.getElementById("directions");
      var showing = document.getElementById("area-showing");
      var query = encodeURIComponent(place);
      var pin = lat && lng ? lat + "," + lng : query;
      map.src = "https://maps.google.com/maps?ll=" + pin + "&q=" + pin + "&z=" + zoom + "&output=embed";
      map.title = shop
        ? "Map of Garage Door Store Boise at 9075 W Hackamore Dr"
        : "Map of " + button.textContent.trim() + ", Idaho";
      directions.href = shop
        ? "https://maps.app.goo.gl/etDP5sgoajZEjkiAA"
        : "https://www.google.com/maps/search/?api=1&query=" + query;
      showing.textContent = "Showing " + button.textContent.trim();
    });
  });

  var reviewTrack = document.getElementById("review-track");
  var reviewPrev = document.querySelector(".voices__nav--prev");
  var reviewNext = document.querySelector(".voices__nav--next");

  if (reviewTrack && reviewPrev && reviewNext) {
    function reviewStep() {
      var card = reviewTrack.querySelector(".voices__card");
      if (!card) return 280;
      var styles = window.getComputedStyle(reviewTrack);
      var gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function reviewState() {
      var max = reviewTrack.scrollWidth - reviewTrack.clientWidth - 2;
      reviewPrev.disabled = reviewTrack.scrollLeft <= 2;
      reviewNext.disabled = reviewTrack.scrollLeft >= max;
    }

    reviewPrev.addEventListener("click", function () {
      reviewTrack.scrollBy({ left: -reviewStep(), behavior: reduce ? "auto" : "smooth" });
    });
    reviewNext.addEventListener("click", function () {
      reviewTrack.scrollBy({ left: reviewStep(), behavior: reduce ? "auto" : "smooth" });
    });
    reviewTrack.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        reviewTrack.scrollBy({ left: reviewStep(), behavior: reduce ? "auto" : "smooth" });
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        reviewTrack.scrollBy({ left: -reviewStep(), behavior: reduce ? "auto" : "smooth" });
      }
    });
    reviewTrack.addEventListener("scroll", reviewState, { passive: true });
    window.addEventListener("resize", reviewState);
    reviewState();
  }

  var ask = document.querySelector(".ask");
  var askBtn = document.querySelector(".ask__btn");
  var askPanel = document.getElementById("ask-panel");
  var askAnswer = document.getElementById("ask-answer");
  var askQuestions = ask ? ask.querySelectorAll(".ask__qs button") : [];
  var askCopy = {
    same: "Same-day service is published for spring changes, opener replacement, doors off track, and general maintenance. A new door is a free in-home visit, and it is not always the same day. The technician line is answered 24/7.",
    tune: "The published full tune-up is $125, tax and labor included. Call to confirm.",
    spring: "A dual spring change is published at $350, with a 10-year warranty on that job. Torque tubes are $450. Springs are not a do-it-yourself job. Call to confirm.",
    opener: "The published motor price is $700 for a 7-ft Genie 2028 belt drive, with 2 remotes and a keypad. Call to confirm.",
    where: "The shop is at 9075 W Hackamore Dr, Boise, ID 83709. Family owned, over 30 years in Boise."
  };

  function setAsk(open) {
    if (!ask || !askBtn || !askPanel) return;
    ask.classList.toggle("is-open", open);
    askBtn.setAttribute("aria-expanded", open ? "true" : "false");
    askBtn.setAttribute("aria-label", open ? "Close" : "Ask the shop");
    askPanel.hidden = !open;
    if (open) {
      var firstQuestion = ask.querySelector(".ask__qs button");
      if (firstQuestion) firstQuestion.focus();
    }
    if (!open && askAnswer) {
      askAnswer.textContent = "";
      askQuestions.forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    }
  }

  if (ask && askBtn) {
    askPanel.hidden = true;
    askBtn.addEventListener("click", function (event) {
      event.preventDefault();
      setAsk(!ask.classList.contains("is-open"));
    });
    askQuestions.forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-ask");
        var open = button.getAttribute("aria-expanded") === "true";
        askQuestions.forEach(function (other) { other.setAttribute("aria-expanded", "false"); });
        if (open) {
          askAnswer.textContent = "";
          return;
        }
        button.setAttribute("aria-expanded", "true");
        askAnswer.textContent = askCopy[key] || "";
      });
    });
    ask.querySelectorAll(".ask__actions a[href='#quote']").forEach(function (link) {
      link.addEventListener("click", function () { setAsk(false); });
    });
    document.addEventListener("click", function (event) {
      if (!ask.classList.contains("is-open") || ask.contains(event.target)) return;
      setAsk(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && ask.classList.contains("is-open")) {
        setAsk(false);
        askBtn.focus();
      }
    });
  }

  if (!reduce && "IntersectionObserver" in window) {
    var revealRoots = document.querySelectorAll("main > section:not(.hero), .foot");
    revealRoots.forEach(function (section) {
      section.classList.add("reveal", "reveal--section");
    });

    document.querySelectorAll(".hero__frame, .hero__facts li, .proof, .sym__list button, .prices, .config__stage, .jobs__list a, .why__plate, .voices__card, .home__plate, .home__map, .finale__cta, .finale__form, .foot img, .foot__social").forEach(function (node) {
      if (node.closest(".piece")) return;
      node.classList.add("reveal", "reveal--rise");
    });

    document.querySelectorAll("#hero-title, .hero__lede, .hero__actions, .eyebrow, h2, h3, .prices__label, .voices__lede, .home__line, .home__body, .finale__lede, .sym__intro > p, .config__copy > p, .why__copy p, .jobs__head p").forEach(function (node) {
      if (node.closest(".ask") || node.closest(".reveal--rise")) return;
      node.classList.add("reveal", "reveal--text");
    });

    var motionGroups = new Map();
    document.querySelectorAll(".reveal--text, .reveal--rise").forEach(function (node) {
      if (node.closest(".ask")) return;
      var group = node.closest("section, .foot") || document.body;
      var list = motionGroups.get(group) || [];
      list.push(node);
      motionGroups.set(group, list);
    });
    motionGroups.forEach(function (list) {
      list.forEach(function (node, index) {
        node.style.setProperty("--i", String(Math.min(index, 7)));
      });
    });

    document.querySelectorAll(".hero__facts li, .sym__board, .prices, .jobs__list a, .piece, .why__plate, .voices__plate, .voices__card, .home__plate, .home__map, .finale__cta, .finale__form, .config__stage").forEach(function (box) {
      box.classList.add("shine");
    });

    var revealItems = document.querySelectorAll(".reveal, .shine");
    function inView(el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 40 && rect.top < window.innerHeight * 0.9 && rect.right > 0 && rect.left < window.innerWidth;
    }
    revealItems.forEach(function (el) {
      if (inView(el)) el.classList.add("is-in");
    });
    document.documentElement.classList.add("has-reveal");

    var primed = new WeakSet();
    var revealWatcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          if (!primed.has(el)) {
            primed.add(el);
            el.classList.add("is-in");
            return;
          }
          el.classList.add("is-in");
        } else {
          primed.add(el);
          el.classList.remove("is-in");
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
    revealItems.forEach(function (el) { revealWatcher.observe(el); });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var lines = [
      "Name: " + String(data.get("name") || "").trim(),
      "Phone: " + String(data.get("phone") || "").trim(),
      "City: " + String(data.get("city") || "").trim(),
      "Need: " + String(data.get("need") || "").trim(),
      "Note: " + String(data.get("message") || "").trim()
    ].filter(function (line) { return !line.endsWith(": "); });
    var href = "mailto:boisedoors@gmail.com?subject=" + encodeURIComponent("Free quote for Garage Door Store Boise") + "&body=" + encodeURIComponent(lines.join("\n"));
    status.textContent = "Opening your email app with this note. It is not stored here. If nothing opens, call (208) 514-2871.";
    window.location.href = href;
  });

})();
