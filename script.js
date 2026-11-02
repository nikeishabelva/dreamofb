
(() => {
  "use strict";

  const STORAGE_KEY = "belvasDreamCollection_v1";

  const form = document.getElementById("dreamForm");
  const titleInput = document.getElementById("dreamTitle");
  const storyInput = document.getElementById("dreamStory");
  const categoryInput = document.getElementById("dreamCategory");
  const whenInput = document.getElementById("dreamWhen");

  const dreamList = document.getElementById("dreamList");
  const dreamCount = document.getElementById("dreamCount");
  const searchInput = document.getElementById("dreamSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const charCount = document.getElementById("charCount");
  const formMessage = document.getElementById("formMessage");

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  let dreams = loadDreams();

  function loadDreams() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveDreams() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dreams)
      );
      return true;
    } catch {
      formMessage.textContent =
        "Your browser could not save this dream.";
      return false;
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function renderDreams() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    const visible = dreams.filter(dream => {
      const matchesText =
        (dream.title + " " + dream.story)
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        dream.category === category;

      return matchesText && matchesCategory;
    });

    dreamCount.textContent =
      `${dreams.length} ${dreams.length === 1 ? "dream" : "dreams"} saved`;

    if (visible.length === 0) {
      dreamList.innerHTML = `
        <div class="empty-state">
          <span>☁</span>
          <h3>Your dream journal is waiting...</h3>
          <p>Write your first dream and it will appear here.</p>
          <a href="#write">add your first dream ↗</a>
        </div>
      `;
      return;
    }

    dreamList.innerHTML = visible.map(dream => `
      <article class="dream-card-item">
        <div class="dream-meta">
          <span class="category-tag">
            ${escapeHTML(dream.category)}
          </span>
          <span class="dream-date">
            ${escapeHTML(dream.date)}
          </span>
        </div>

        <h3>${escapeHTML(dream.title)}</h3>

        <p>${escapeHTML(dream.story)}</p>

        <div class="dream-card-bottom">
          <span class="dream-when">
            ♡ ${escapeHTML(dream.when)}
          </span>

          <button
            class="delete-dream"
            type="button"
            data-delete="${escapeHTML(dream.id)}">
            delete ×
          </button>
        </div>
      </article>
    `).join("");
  }

  // Save a new dream
  form.addEventListener("submit", event => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const story = storyInput.value.trim();

    if (!title || !story) {
      formMessage.textContent =
        "Please complete your dream first ♡";
      return;
    }

    const newDream = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),

      title,
      story,
      category: categoryInput.value,
      when: whenInput.value,

      date: new Date().toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      )
    };

    dreams.unshift(newDream);

    if (!saveDreams()) {
      dreams.shift();
      return;
    }

    form.reset();

    charCount.textContent = "0 / 700";

    formMessage.textContent =
      "Your dream has been saved! Keep believing ✧";

    renderDreams();

    document
      .getElementById("collection")
      .scrollIntoView({ behavior: "smooth" });
  });

  // Character counter
  storyInput.addEventListener("input", () => {
    charCount.textContent =
      `${storyInput.value.length} / 700`;
  });

  // Delete a dream
  dreamList.addEventListener("click", event => {
    const button = event.target.closest("[data-delete]");

    if (!button) return;

    const id = button.dataset.delete;

    dreams = dreams.filter(dream => dream.id !== id);

    saveDreams();
    renderDreams();
  });

  // Search dreams
  searchInput.addEventListener("input", renderDreams);

  // Filter dreams
  categoryFilter.addEventListener("change", renderDreams);

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      mainNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.textContent = "☰";
    }
  });

  // Initial display
  renderDreams();

})();
