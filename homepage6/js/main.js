(function () {
  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (header) {
    var setHeaderHeight = function () {
      root.style.setProperty("--header", header.offsetHeight + "px");
    };
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    setHeaderHeight();
    onScroll();
    window.addEventListener("resize", setHeaderHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        root.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        root.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var narrowNav = window.matchMedia("(max-width: 1199px)");
  function syncSubToggles() {
    document.querySelectorAll(".sub-toggle").forEach(function (button) {
      button.tabIndex = narrowNav.matches ? 0 : -1;
    });
  }
  syncSubToggles();
  if (narrowNav.addEventListener) narrowNav.addEventListener("change", syncSubToggles);

  document.querySelectorAll(".sub-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".has-sub");
      var open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = button.querySelector("[aria-hidden]");
      if (icon) icon.textContent = open ? "–" : "+";
    });
  });

  var revealNodes = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 12% 0px" }
    );
    revealNodes.forEach(function (node) { io.observe(node); });
  } else {
    revealNodes.forEach(function (node) { node.classList.add("in"); });
  }

  var filters = document.querySelectorAll(".filters button");
  var shots = document.querySelectorAll(".shot");
  var filterStatus = document.getElementById("filter-status");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var cat = button.getAttribute("data-filter");
      filters.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      var shown = 0;
      shots.forEach(function (shot) {
        var match = cat === "all" || shot.getAttribute("data-cat") === cat;
        shot.hidden = !match;
        if (match) shown += 1;
      });
      if (filterStatus) {
        filterStatus.textContent = shown + " photo" + (shown === 1 ? "" : "s") + " shown";
      }
      if (rail) {
        rail.scrollLeft = 0;
        syncRailButtons();
      }
    });
  });

  var rail = document.getElementById("door-rail");
  function railStep() {
    var card = rail && rail.querySelector(".shot:not([hidden])");
    if (!card) return Math.round((rail ? rail.clientWidth : 0) * 0.8);
    var styles = window.getComputedStyle(rail);
    var gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return Math.round(card.getBoundingClientRect().width + gap);
  }
  function syncRailButtons() {
    if (!rail) return;
    var max = rail.scrollWidth - rail.clientWidth;
    document.querySelectorAll("[data-scroll]").forEach(function (button) {
      var next = button.getAttribute("data-scroll") === "next";
      button.disabled = next ? rail.scrollLeft >= max - 4 : rail.scrollLeft <= 4;
    });
  }
  document.querySelectorAll("[data-scroll]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!rail || button.disabled) return;
      var dir = button.getAttribute("data-scroll") === "next" ? 1 : -1;
      rail.scrollBy({
        left: railStep() * dir,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  });
  if (rail) {
    rail.addEventListener("scroll", syncRailButtons, { passive: true });
    window.addEventListener("resize", syncRailButtons);
    syncRailButtons();
  }

  var reviewRail = document.getElementById("review-rail");
  function syncReviewButtons() {
    if (!reviewRail) return;
    var max = reviewRail.scrollWidth - reviewRail.clientWidth;
    document.querySelectorAll("[data-review-scroll]").forEach(function (button) {
      var next = button.getAttribute("data-review-scroll") === "next";
      button.disabled = next ? reviewRail.scrollLeft >= max - 4 : reviewRail.scrollLeft <= 4;
    });
  }
  document.querySelectorAll("[data-review-scroll]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!reviewRail || button.disabled) return;
      var card = reviewRail.querySelector(".g-card");
      var step = card ? card.getBoundingClientRect().width + 12 : reviewRail.clientWidth * 0.8;
      var dir = button.getAttribute("data-review-scroll") === "next" ? 1 : -1;
      reviewRail.scrollBy({
        left: step * dir,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  });
  if (reviewRail) {
    reviewRail.addEventListener("scroll", syncReviewButtons, { passive: true });
    window.addEventListener("resize", syncReviewButtons);
    syncReviewButtons();
  }
  document.querySelectorAll(".g-more").forEach(function (button) {
    var card = button.closest(".g-card");
    button.addEventListener("click", function () {
      var open = card.classList.toggle("is-open");
      button.textContent = open ? "Show less" : "Read more";
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var areaMap = document.getElementById("area-map");
  var areaOpen = document.getElementById("area-maps");
  var areaShowing = document.getElementById("area-showing");
  var shopMaps = "https://maps.app.goo.gl/z2mHF3x4AH4e7YBp8";
  document.querySelectorAll("[data-place]").forEach(function (button) {
    button.addEventListener("click", function () {
      var place = button.getAttribute("data-place");
      var zoom = button.getAttribute("data-zoom") || "12";
      var name = button.textContent.replace(/\s+/g, " ").trim();
      document.querySelectorAll("[data-place]").forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      if (areaMap) {
        areaMap.src = "https://maps.google.com/maps?q=" + encodeURIComponent(place) + "&z=" + encodeURIComponent(zoom) + "&output=embed";
        areaMap.title = "Map of " + name;
      }
      if (areaOpen) {
        areaOpen.href = button.getAttribute("data-shop") === "true"
          ? shopMaps
          : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
      }
      if (areaShowing) {
        areaShowing.textContent = button.getAttribute("data-shop") === "true"
          ? "Showing the shop in Boise."
          : "Showing " + name + ".";
      }
    });
  });

  var form = document.getElementById("quote-form");
  var formStatus = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var city = String(data.get("city") || "").trim();
      var service = String(data.get("service") || "").trim();
      var message = String(data.get("message") || "").trim();
      var body = [
        "Quote request for Garage Door Store Boise",
        "Name: " + name,
        "Phone: " + phone,
        "City: " + city,
        "Service: " + service,
        "Message: " + (message || "(none)")
      ].join("\n");
      var href = "mailto:boisedoors@gmail.com?subject=" +
        encodeURIComponent("Quote request from " + name) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      if (formStatus) {
        formStatus.textContent = "Your email app should open with this message. If it does not, call (208) 514-2871.";
      }
    });
  }

  var ask = document.getElementById("ask");
  var askBtn = document.getElementById("ask-open");
  var askDock = document.getElementById("ask-dock");
  var askPanel = document.getElementById("ask-panel");
  var askTriggers = [askBtn, askDock].filter(Boolean);
  var setAskExpanded = function (open) {
    askTriggers.forEach(function (trigger) {
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  };
  var focusAskTrigger = function () {
    var floating = askBtn && getComputedStyle(askBtn).display !== "none";
    var target = floating ? askBtn : askDock || askBtn;
    if (target) target.focus();
  };
  var setAsk = function (open) {
    if (!askPanel || !askTriggers.length) return;
    askPanel.hidden = !open;
    setAskExpanded(open);
    if (!open) focusAskTrigger();
  };
  if (askPanel && askTriggers.length) {
    askTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var open = askPanel.hidden;
        askPanel.hidden = !open;
        setAskExpanded(open);
        if (open) {
          var closeBtn = askPanel.querySelector(".ask__close");
          if (closeBtn) closeBtn.focus();
        }
      });
    });
    var askClose = askPanel.querySelector(".ask__close");
    if (askClose) askClose.addEventListener("click", function () { setAsk(false); });
    askPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        askPanel.hidden = true;
        setAskExpanded(false);
      });
    });
    document.addEventListener("click", function (event) {
      if (!ask || askPanel.hidden || ask.contains(event.target)) return;
      if (askDock && askDock.contains(event.target)) return;
      setAsk(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !askPanel.hidden) setAsk(false);
    });
  }

  var spineLinks = document.querySelectorAll(".spine a");
  var spyTargets = [];
  spineLinks.forEach(function (link) {
    var id = (link.getAttribute("href") || "").slice(1);
    var section = document.getElementById(id);
    if (section) spyTargets.push({ link: link, section: section });
  });
  if (spyTargets.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          spyTargets.forEach(function (item) {
            item.link.setAttribute("aria-current", item.section === entry.target ? "true" : "false");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    spyTargets.forEach(function (item) { spy.observe(item.section); });
  }
})();
