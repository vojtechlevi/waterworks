const dateElement = document.getElementById("dayDate");

export function formatDate(date) {
  dateElement.classList.remove("hidden");
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  dateElement.textContent = `${year}-${month}-${day}`;
}
