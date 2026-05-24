const filterButtons = document.querySelectorAll(".filter-btn");
const eventItems = document.querySelectorAll(".event-item");
const loadMoreButton = document.querySelector(".load-more");

let activeFilter = "all";
let expanded = false;
const startLimit = 5;

function getMatchingEvents() {
  return Array.from(eventItems).filter((eventItem) => {
    if (!(eventItem instanceof HTMLElement)) return false;

    const eventCategory = eventItem.dataset.category;

    return activeFilter === "all" || activeFilter === eventCategory;
  });
}

function updateEvents() {
  const matchingEvents = getMatchingEvents();

  eventItems.forEach((eventItem) => {
    if (eventItem instanceof HTMLElement) {
      eventItem.style.display = "none";
    }
  });

  matchingEvents.forEach((eventItem, index) => {
    if (!(eventItem instanceof HTMLElement)) return;

    if (expanded || index < startLimit) {
      eventItem.style.display = "block";
    }
  });

  if (loadMoreButton instanceof HTMLButtonElement) {
    if (matchingEvents.length <= startLimit) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
      loadMoreButton.textContent = expanded
        ? "Se færre events ↑"
        : "Se flere events ↓";
    }
  }
}

filterButtons.forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) return;

  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    expanded = false;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    updateEvents();
  });
});

if (loadMoreButton instanceof HTMLButtonElement) {
  loadMoreButton.addEventListener("click", () => {
    expanded = !expanded;
    updateEvents();
  });
}

updateEvents();
