// ==================== CONFIG ====================

const API_CONFIG = {
  BASE_URL: "https://pro-7no5.onrender.com",
  PREDICT_PATH: "/predict",
};

const NEIGHBOURHOODS_BY_BOROUGH = {
  Manhattan: ["Harlem", "Upper West Side", "East Village", "Chelsea", "Midtown", "Washington Heights"],
  Brooklyn: ["Williamsburg", "Bushwick", "Park Slope", "Bedford-Stuyvesant", "Greenpoint", "Crown Heights"],
  Queens: ["Astoria", "Long Island City", "Flushing", "Ridgewood", "Jackson Heights"],
  Bronx: ["Riverdale", "Mott Haven", "Fordham", "Pelham Bay"],
  "Staten Island": ["St. George", "Tompkinsville", "Stapleton"],
};

const ROOM_TYPES = [
  "Entire home/apt",
  "Private room",
  "Shared room"
];

// ==================== APP ====================

(() => {
  const form = document.getElementById("predictForm");
  const submitBtn = document.getElementById("submitBtn");
  const formNote = document.getElementById("formNote");

  const latInput = document.getElementById("latitude");
  const lngInput = document.getElementById("longitude");
  const boroughSelect = document.getElementById("neighbourhood_group");
  const neighbourhoodList = document.getElementById("neighbourhoodList");

  const states = {
    idle: document.getElementById("stateIdle"),
    loading: document.getElementById("stateLoading"),
    error: document.getElementById("stateError"),
    done: document.getElementById("stateDone"),
  };

  const verdictValue = document.getElementById("verdictValue");
  const gaugeFill = document.getElementById("gaugeFill");
  const gaugeNumber = document.getElementById("gaugeNumber");
  const probBars = document.getElementById("probBars");
  const rawToggle = document.getElementById("rawToggle");
  const rawJson = document.getElementById("rawJson");
  const retryBtn = document.getElementById("retryBtn");
  const errorText = document.getElementById("errorText");

  const GAUGE_CIRCUMFERENCE = 540;

  // ---------------- STATES ----------------

  function showState(name) {
    Object.values(states).forEach((el) => {
      if (el) el.classList.add("hidden");
    });

    if (states[name]) {
      states[name].classList.remove("hidden");
    }
  }

  // ---------------- BOROUGH ----------------

  boroughSelect.addEventListener("change", () => {
    const options = NEIGHBOURHOODS_BY_BOROUGH[boroughSelect.value] || [];

    neighbourhoodList.innerHTML = options
      .map((item) => `<option value="${item}"></option>`)
      .join("");
  });

  // ---------------- GAUGE ----------------

  function animateNumber(el, target) {
    let current = 0;

    const step = Math.max(1, Math.ceil(target / 30));

    function tick() {
      current = Math.min(current + step, target);
      el.textContent = current + "%";

      if (current < target) {
        requestAnimationFrame(tick);
      }
    }

    tick();
  }

  // ---------------- RESULT ----------------

  function renderResult(data) {

    const prediction = data.prediction;
    const probability = Array.isArray(data.probability)
      ? data.probability
      : [];

    verdictValue.textContent = prediction;

    const highest = Math.max(...probability);
    const percent = Math.round(highest * 100);

    // Gauge
    const offset = GAUGE_CIRCUMFERENCE - highest * GAUGE_CIRCUMFERENCE;

    gaugeFill.style.strokeDashoffset = offset;

    // Blue color
    gaugeFill.style.stroke = "#e8b85c";

    animateNumber(gaugeNumber, percent);

    probBars.innerHTML = "";

    const ROOM_TYPES = [
      "Entire home/apt",
      "Private room",
      "Shared room"
    ];

    const COLORS = [
      "#e8b85c",   
      "#e8b85c",   
      "#e8b85c"    
    ];

    probability.forEach((value, index) => {

      const row = document.createElement("div");

      row.className = "prob-bar-row";

      row.innerHTML = `
        <span class="prob-label">${ROOM_TYPES[index]}</span>

        <span class="prob-bar-track">
            <span class="prob-bar-fill"></span>
        </span>

        <span>${Math.round(value * 100)}%</span>
      `;

      probBars.appendChild(row);

      const fill = row.querySelector(".prob-bar-fill");

      fill.style.width = `${value * 100}%`;
      fill.style.background = COLORS[index];
    });

    rawJson.textContent = JSON.stringify(data, null, 2);

    rawJson.classList.add("hidden");
    rawToggle.textContent = "View raw response ▾";

    showState("done");
  }

  rawToggle.addEventListener("click", () => {
    const hidden = rawJson.classList.toggle("hidden");

    rawToggle.textContent = hidden
      ? "View raw response ▾"
      : "Hide raw response ▴";
  });

  // ---------------- API ----------------

  async function runPrediction() {
    formNote.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      latitude: parseFloat(latInput.value),
      longitude: parseFloat(lngInput.value),
      neighbourhood_group: boroughSelect.value,
      neighbourhood: document.getElementById("neighbourhood").value,
      price: parseFloat(document.getElementById("price").value),
      minimum_nights: parseInt(document.getElementById("minimum_nights").value),
      number_of_reviews: parseInt(document.getElementById("number_of_reviews").value),
      reviews_per_month: parseFloat(document.getElementById("reviews_per_month").value),
      calculated_host_listings_count: parseInt(
        document.getElementById("calculated_host_listings_count").value
      ),
      availability_365: parseInt(
        document.getElementById("availability_365").value
      ),
    };

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    showState("loading");

    try {
      const response = await fetch(
        API_CONFIG.BASE_URL + API_CONFIG.PREDICT_PATH,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      renderResult(data);
    } catch (err) {
      errorText.textContent =
        err.message || "Prediction failed.";

      showState("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runPrediction();
  });

  retryBtn.addEventListener("click", runPrediction);
})();