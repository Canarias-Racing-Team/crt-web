(function () {
  // Cliente: cambia el año sin recargar usando plantillas pre-renderizadas
  const links = Array.from(document.querySelectorAll(".js-year-link"));
  const container = document.getElementById("supporters-container");
  if (!container) return;

  function showYear(y, push) {
    if (!y) return;
    const tmpl = document.getElementById("tmpl-supporters-" + y);
    if (!tmpl) return;
    container.innerHTML = "";
    container.appendChild(tmpl.content.cloneNode(true));
    links.forEach(function (l) {
      if (l.dataset.year === y) l.classList.add("text-primary");
      else l.classList.remove("text-primary");
    });
    if (push !== false) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("year", y);
        history.pushState({ year: y }, "", url.toString());
      } catch (e) {}
    }
  }

  links.forEach(function (el) {
    el.addEventListener("click", function (ev) {
      ev.preventDefault();
      const y = el.dataset.year;
      showYear(y, true);
    });
  });

  window.addEventListener("popstate", function (ev) {
    const y =
      (ev.state && ev.state.year) ||
      new URL(window.location.href).searchParams.get("year") ||
      (links[0] && links[0].dataset.year);
    showYear(y, false);
  });

  // Inicial: query param o valor servidor en data-selected-year
  const initial =
    new URL(window.location.href).searchParams.get("year") ||
    container.dataset.selectedYear ||
    (links[0] && links[0].dataset.year);
  showYear(initial, false);
})();
