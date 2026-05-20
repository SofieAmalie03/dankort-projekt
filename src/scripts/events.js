const filterButtons = document.querySelectorAll(".filter-btn");
const eventItems = document.querySelectorAll(".event-item");
const loadMoreButton = document.querySelector(".load-more");

let activeFilter = "all";
let visibleLimit = 5;

function updateEvents() {
  let visibleCount = 0;
  let totalMatchingEvents = 0;

  eventItems.forEach((eventItem) => {
    if (!(eventItem instanceof HTMLElement)) return;

    const eventCategory = eventItem.dataset.category;

    const matchesFilter =
      activeFilter === "all" || activeFilter === eventCategory;

    if (matchesFilter) {
      totalMatchingEvents++;

      if (visibleCount < visibleLimit) {
        eventItem.style.display = "block";
        visibleCount++;
      } else {
        eventItem.style.display = "none";
      }
    } else {
      eventItem.style.display = "none";
    }
  });

  if (loadMoreButton instanceof HTMLElement) {
    if (totalMatchingEvents <= visibleLimit) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  }
}

filterButtons.forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) return;

  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    visibleLimit = 5;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    updateEvents();
  });
});

if (loadMoreButton instanceof HTMLButtonElement) {
  loadMoreButton.addEventListener("click", () => {
    visibleLimit += 5;
    updateEvents();
  });
}

updateEvents();
