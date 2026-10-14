/* Renders the level guide from the data in js/levels.js. */
(function () {
  "use strict";

  const STORAGE_KEY = "smb-cleared-levels";
  const $ = (sel) => document.querySelector(sel);

  // ---------- Data prep ----------
  const slug = (id) => id.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const allLevels = [];
  WORLDS.forEach((w) => w.levels.forEach((l) => allLevels.push({ ...l, world: w })));
  const bonusWorld = { number: "bonus", theme: "Hidden bonus areas", color: "#ffd700" };
  BONUS_AREAS.forEach((l) => allLevels.push({ ...l, world: bonusWorld }));
  allLevels.forEach((l, i) => { l.key = slug(l.id); l.index = i; });

  const mainLevels = allLevels.filter((l) => l.world !== bonusWorld);
  const byKey = new Map(allLevels.map((l) => [l.key, l]));

  // ---------- Progress (saved in this browser only) ----------
  let cleared = new Set();
  try {
    cleared = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch (e) { /* storage unavailable: progress just won't persist */ }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...cleared])); } catch (e) {}
  }

  // ---------- Helpers ----------
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function worldLabel(world) {
    return world === bonusWorld ? "BONUS" : `WORLD ${world.number}`;
  }

  function sceneHTML(level) {
    const night = level.tags.includes("night") ? " scene-night" : "";
    const finalCastle = level.id === "8-4";
    switch (level.type) {
      case "overworld":
        return `<div class="scene scene-overworld${night}" aria-hidden="true">
          <div class="cloud c1"></div><div class="cloud c2"></div>
          <div class="cloud c3"></div><div class="cloud c4"></div>
          <div class="block" style="left:60px"></div>
          <div class="block" style="left:82px"></div>
          <div class="brick-row" style="right:10px">
            <div class="brick"></div><div class="brick"></div><div class="brick"></div>
          </div>
          <div class="pipe" style="right:60px;height:32px"><div class="pipe-top"></div></div>
          <span style="bottom:30px;left:12px;font-size:20px">🍄</span>
        </div>`;
      case "athletic":
        return `<div class="scene scene-athletic${night}" aria-hidden="true">
          <div class="cloud c1"></div><div class="cloud c2"></div>
          <div class="treetop" style="left:8px;width:60px;top:62px"></div>
          <div class="treetop" style="left:96px;width:44px;top:44px"></div>
          <div class="treetop" style="right:12px;width:56px;top:70px"></div>
          <span style="top:20px;left:104px;font-size:18px">🐢</span>
        </div>`;
      case "underground":
        return `<div class="scene scene-underground" aria-hidden="true">
          <div class="brick-row" style="top:8px;left:0;right:0;justify-content:center">
            <div class="brick"></div><div class="brick"></div><div class="brick"></div>
            <div class="brick"></div><div class="brick"></div><div class="brick"></div>
          </div>
          <div class="block" style="left:40px;background:#c84;"></div>
          <div class="block" style="left:62px;background:#c84;"></div>
          <span style="bottom:35px;right:20px;font-size:18px">🪙🪙🪙</span>
          <div class="pipe" style="left:110px;height:26px"><div class="pipe-top"></div></div>
        </div>`;
      case "castle":
        return `<div class="scene scene-castle" aria-hidden="true">
          <div class="castle-body">
            <div class="castle-tower"><div class="castle-flag"></div></div>
            <div class="castle-door"></div>
          </div>
          <div class="brick-row" style="left:0">
            <div class="brick"></div><div class="brick"></div><div class="brick"></div><div class="brick"></div>
          </div>
          <span style="top:20px;left:16px;font-size:22px">🔥</span>
          <span style="top:50px;left:40px;font-size:16px">🔥</span>
          ${finalCastle ? '<span style="top:14px;left:50%;font-size:28px">👑</span>' : ""}
        </div>`;
      case "underwater":
        return `<div class="scene scene-underwater" aria-hidden="true">
          <span class="fish" style="top:25px;left:10px">🐟</span>
          <span class="fish" style="top:55px;right:15px;animation-delay:1s">🐡</span>
          <span class="fish" style="top:40px;left:45%">🦑</span>
          <span style="bottom:10px;left:20px;font-size:16px">💧💧💧</span>
        </div>`;
      case "bonus":
        return `<div class="scene scene-bonus" aria-hidden="true">
          <span class="star-icon" style="top:20px;left:20px">⭐</span>
          <span class="star-icon" style="top:40px;right:20px;animation-delay:.5s">⭐</span>
          <span style="top:30px;left:50%;transform:translateX(-50%);font-size:30px">🪙</span>
          <span style="bottom:14px;width:100%;text-align:center;font-family:'VT323',monospace;font-size:22px;color:#ffd700">BONUS!</span>
        </div>`;
      default:
        return `<div class="scene scene-overworld" aria-hidden="true"></div>`;
    }
  }

  function tagsHTML(level) {
    const tags = [level.type, ...level.tags];
    return tags.map((t) => {
      const label = LEVEL_TYPES[t] ? LEVEL_TYPES[t].label : t;
      const title = LEVEL_TYPES[t] ? LEVEL_TYPES[t].hint : TAGS[t] || "";
      return `<span class="tag tag-${esc(t)}" title="${esc(title)}">${esc(label.toUpperCase())}</span>`;
    }).join("");
  }

  function difficultyHTML(n) {
    let pips = "";
    for (let i = 1; i <= 5; i++) pips += `<span class="${i <= n ? "on" : ""}">■</span>`;
    return `<span class="difficulty" title="Difficulty ${n} of 5" aria-label="Difficulty ${n} of 5">${pips}</span>`;
  }

  function idLabel(level) {
    return level.world === bonusWorld ? level.id.toUpperCase() : `LEVEL ${level.id}`;
  }

  // ---------- Render ----------
  function cardHTML(level, delay) {
    const isCleared = cleared.has(level.key);
    return `
      <a class="level-card${isCleared ? " cleared" : ""}" href="#level-${level.key}" data-key="${level.key}"
              style="animation-delay:${delay}s" aria-haspopup="dialog"
              aria-label="${esc(idLabel(level))}: ${esc(level.name)}${isCleared ? ", cleared" : ""}. Open details.">
        ${isCleared ? '<span class="cleared-badge" aria-hidden="true">✓ CLEAR</span>' : ""}
        ${sceneHTML(level)}
        <span class="card-info">
          <span class="card-top">
            <span class="level-id">${esc(idLabel(level))}</span>
            ${difficultyHTML(level.difficulty)}
          </span>
          <span class="level-name">${esc(level.name)}</span>
          <span class="level-desc">${esc(level.desc)}</span>
          <span class="level-tags">${tagsHTML(level)}</span>
        </span>
      </a>`;
  }

  function sectionHTML(world, levels) {
    const id = world === bonusWorld ? "world-bonus" : `world-${world.number}`;
    return `
      <section class="world-section" id="${id}" aria-labelledby="${id}-title">
        <div class="world-header" style="border-left-color:${world.color}">
          <h2 class="world-number" id="${id}-title" style="color:${world.color}">${worldLabel(world)}</h2>
          <div class="world-theme">${esc(world.theme)}</div>
          ${world === bonusWorld ? "" : `<div class="world-progress" data-world-progress="${world.number}"></div>`}
        </div>
        <div class="levels-grid">
          ${levels.map((l, i) => cardHTML(l, i * 0.07)).join("")}
        </div>
      </section>`;
  }

  function renderWorlds() {
    const html = WORLDS.map((w) => sectionHTML(w, allLevels.filter((l) => l.world === w))).join("")
      + sectionHTML(bonusWorld, allLevels.filter((l) => l.world === bonusWorld));
    $("#worldsContainer").innerHTML = html;
  }

  function renderNav() {
    const nav = $("#worldNav");
    const entries = [...WORLDS, bonusWorld];
    nav.innerHTML = entries.map((w) => {
      const target = w === bonusWorld ? "world-bonus" : `world-${w.number}`;
      const label = w === bonusWorld ? "BONUS" : `W${w.number}`;
      const full = w === bonusWorld ? "Bonus areas" : `World ${w.number}`;
      return `<button type="button" class="world-btn" data-target="${target}" aria-label="${full}">${label}<span class="done" data-done="${w.number}"></span></button>`;
    }).join("");
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".world-btn");
      if (!btn) return;
      const section = document.getElementById(btn.dataset.target);
      if (section.hidden) clearFilters();
      section.scrollIntoView();
    });
  }

  function renderLegend() {
    const legend = $("#legend");
    const types = Object.entries(LEVEL_TYPES).map(([t, info]) =>
      `<span class="tag tag-${t}" title="${esc(info.hint)}">${info.label.toUpperCase()}</span>`);
    const tags = Object.entries(TAGS).map(([t, hint]) =>
      `<span class="tag tag-${t}" title="${esc(hint)}">${t.toUpperCase()}</span>`);
    legend.innerHTML = types.concat(tags).join("");
  }

  function updateProgress() {
    const done = mainLevels.filter((l) => cleared.has(l.key)).length;
    const total = mainLevels.length;
    $("#progressText").textContent = `${done} / ${total} CLEARED`;
    $("#progressFill").style.width = `${(done / total) * 100}%`;
    $("#progressBar").setAttribute("aria-valuenow", done);
    $("#progressBar").setAttribute("aria-valuemax", total);

    WORLDS.forEach((w) => {
      const n = w.levels.filter((l) => cleared.has(slug(l.id))).length;
      const el = document.querySelector(`[data-world-progress="${w.number}"]`);
      if (el) el.textContent = n ? `${n}/${w.levels.length} cleared` : "";
      const mark = document.querySelector(`[data-done="${w.number}"]`);
      if (mark) mark.textContent = n === w.levels.length ? "✓" : "";
    });
  }

  function refreshCard(level) {
    const old = document.querySelector(`.level-card[data-key="${level.key}"]`);
    if (!old) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = cardHTML(level, 0).trim();
    const fresh = tmp.firstChild;
    fresh.style.animation = "none";
    fresh.hidden = old.hidden;
    old.replaceWith(fresh);
  }

  // ---------- Search & filter ----------
  let activeType = "all";

  function renderTypeFilters() {
    const wrap = $("#typeFilters");
    const options = [["all", "All"], ...Object.entries(LEVEL_TYPES).map(([t, i]) => [t, i.label])];
    wrap.innerHTML = options.map(([t, label]) =>
      `<button type="button" class="chip" data-type="${t}" aria-pressed="${t === activeType}">${label}</button>`).join("");
    wrap.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      activeType = chip.dataset.type;
      wrap.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.type === activeType));
      applyFilters();
    });
  }

  function searchText(level) {
    return [
      level.id, level.name, level.desc, level.tip, level.secret || "",
      (level.enemies || []).join(" "), level.tags.join(" "),
      LEVEL_TYPES[level.type].label, worldLabel(level.world),
    ].join(" ").toLowerCase();
  }

  function applyFilters() {
    const q = $("#search").value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    let shown = 0;

    allLevels.forEach((level) => {
      const card = document.querySelector(`.level-card[data-key="${level.key}"]`);
      const text = searchText(level);
      const match = (activeType === "all" || level.type === activeType)
        && terms.every((t) => text.includes(t));
      card.hidden = !match;
      if (match) shown++;
    });

    document.querySelectorAll(".world-section").forEach((s) => {
      s.hidden = !s.querySelector(".level-card:not([hidden])");
    });

    const filtering = terms.length || activeType !== "all";
    $("#resultCount").textContent = filtering ? `Showing ${shown} of ${allLevels.length} levels` : "";
    $("#emptyState").hidden = shown !== 0;
  }

  function clearFilters() {
    $("#search").value = "";
    activeType = "all";
    document.querySelectorAll("#typeFilters .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.type === "all"));
    applyFilters();
  }

  // ---------- Detail dialog ----------
  const dialog = $("#levelDialog");
  let current = null;
  let returnFocusTo = null;

  function dialogHTML(level) {
    const prev = allLevels[level.index - 1];
    const next = allLevels[level.index + 1];
    const isCleared = cleared.has(level.key);
    const enemies = (level.enemies || []).length
      ? `<h3>👾 ENEMIES &amp; HAZARDS</h3><ul>${level.enemies.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : "";
    return `
      ${sceneHTML(level)}
      <div class="dialog-body">
        <div class="card-top">
          <span class="dialog-id">${esc(worldLabel(level.world))} · ${esc(idLabel(level))}</span>
          ${difficultyHTML(level.difficulty)}
        </div>
        <h2 id="dialogTitle">${esc(level.name)}</h2>
        <p>${esc(level.desc)}</p>
        <div class="level-tags">${tagsHTML(level)}</div>
        <p class="type-hint">${esc(LEVEL_TYPES[level.type].hint)}</p>
        ${enemies}
        <h3>💡 BEGINNER TIP</h3>
        <p>${esc(level.tip)}</p>
        ${level.secret ? `<h3>🤫 SECRETS</h3><p>${esc(level.secret)}</p>` : ""}
        <div class="dialog-actions">
          ${level.world === bonusWorld ? "" : `<button type="button" class="btn btn-primary" data-action="toggle" aria-pressed="${isCleared}">${isCleared ? "✓ CLEARED" : "MARK CLEARED"}</button>`}
          <span class="spacer"></span>
          <button type="button" class="btn" data-action="prev" ${prev ? "" : "disabled"} aria-label="Previous level${prev ? ": " + esc(prev.id) : ""}">◀ ${prev ? esc(prev.world === bonusWorld ? "PREV" : prev.id) : ""}</button>
          <button type="button" class="btn" data-action="next" ${next ? "" : "disabled"} aria-label="Next level${next ? ": " + esc(next.id) : ""}">${next ? esc(next.world === bonusWorld ? "NEXT" : next.id) : ""} ▶</button>
        </div>
      </div>`;
  }

  function openLevel(key, { updateHash = true } = {}) {
    const level = byKey.get(key);
    if (!level) return;
    current = level;
    $("#dialogContent").innerHTML = dialogHTML(level);
    if (!dialog.open) {
      returnFocusTo = document.activeElement;
      dialog.showModal();
    }
    dialog.scrollTop = 0;
    if (updateHash) history.replaceState(null, "", `#level-${key}`);
  }

  function toggleCleared(level) {
    if (!level || level.world === bonusWorld) return;
    if (cleared.has(level.key)) cleared.delete(level.key); else cleared.add(level.key);
    saveProgress();
    refreshCard(level);
    updateProgress();
    if (dialog.open && current === level) {
      openLevel(level.key, { updateHash: false });
      dialog.querySelector('[data-action="toggle"]').focus();
    }
  }

  function step(delta) {
    if (!current) return;
    const target = allLevels[current.index + delta];
    if (target) openLevel(target.key);
  }

  dialog.addEventListener("close", () => {
    history.replaceState(null, "", location.pathname + location.search);
    const card = current && document.querySelector(`.level-card[data-key="${current.key}"]`);
    const focusTarget = card && !card.hidden ? card : returnFocusTo;
    if (focusTarget && focusTarget.focus) focusTarget.focus();
    current = null;
  });

  // Clicking the dark backdrop closes the dialog
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
    const action = e.target.closest("[data-action]");
    if (!action) return;
    if (action.dataset.action === "prev") step(-1);
    if (action.dataset.action === "next") step(1);
    if (action.dataset.action === "toggle") toggleCleared(current);
  });

  $("#dialogClose").addEventListener("click", () => dialog.close());

  $("#worldsContainer").addEventListener("click", (e) => {
    const card = e.target.closest(".level-card");
    if (!card || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    openLevel(card.dataset.key);
  });

  function openFromHash() {
    const m = location.hash.match(/^#level-(.+)$/);
    if (m && byKey.has(m[1])) openLevel(m[1], { updateHash: false });
  }
  window.addEventListener("hashchange", openFromHash);

  // ---------- Keyboard shortcuts ----------
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);

    if (dialog.open) {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "c" || e.key === "C") toggleCleared(current);
      return;
    }
    if (e.key === "/" && !typing) {
      e.preventDefault();
      $("#search").focus();
    }
    if (e.key === "Escape" && document.activeElement === $("#search")) {
      clearFilters();
    }
  });

  // ---------- Active world highlight & back-to-top ----------
  function setupScrollSpy() {
    const buttons = [...document.querySelectorAll(".world-btn")];
    let ticking = false;
    function update() {
      ticking = false;
      const line = $(".toolbar").offsetHeight + 40;
      let active = null;
      document.querySelectorAll(".world-section:not([hidden])").forEach((s) => {
        if (s.getBoundingClientRect().top <= line) active = s.id;
      });
      buttons.forEach((b) => {
        const on = b.dataset.target === active;
        // Scroll only the nav strip sideways; scrollIntoView would also move the page.
        if (on && !b.classList.contains("active")) {
          const nav = b.parentElement;
          nav.scrollLeft = b.offsetLeft - nav.offsetLeft - (nav.clientWidth - b.offsetWidth) / 2;
        }
        b.classList.toggle("active", on);
      });
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Keep anchored sections from hiding under the sticky toolbar.
  function syncScrollPadding() {
    document.documentElement.style.scrollPaddingTop = `${$(".toolbar").offsetHeight + 16}px`;
  }
  window.addEventListener("resize", syncScrollPadding);

  const backToTop = $("#backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 700);
  }, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  $("#resetProgress").addEventListener("click", () => {
    if (!cleared.size) return;
    if (!confirm("Reset all cleared levels?")) return;
    cleared.clear();
    saveProgress();
    allLevels.forEach(refreshCard);
    updateProgress();
  });

  $("#search").addEventListener("input", applyFilters);

  // ---------- Boot ----------
  renderLegend();
  renderNav();
  renderTypeFilters();
  renderWorlds();
  updateProgress();
  syncScrollPadding();
  setupScrollSpy();
  openFromHash();

  // Open the beginner guide automatically on a first visit.
  try {
    if (!localStorage.getItem("smb-visited")) {
      $("#guide").open = true;
      localStorage.setItem("smb-visited", "1");
    }
  } catch (e) {}
})();
