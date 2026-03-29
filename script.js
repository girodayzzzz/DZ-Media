document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  if (!intro || !main) return;

  const canUseStorage = (() => {
    try {
      const key = "__dz_intro_check__";
      sessionStorage.setItem(key, "1");
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  })();

  const showMain = () => {
    requestAnimationFrame(() => {
      main.classList.add("is-visible");
    });
  };

  const introSeen = canUseStorage && sessionStorage.getItem("dz_intro_seen") === "yes";

  if (introSeen) {
    intro.style.display = "none";
    intro.setAttribute("aria-hidden", "true");
    showMain();
    return;
  }

  setTimeout(() => {
    intro.style.transition = "opacity 550ms ease";
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      intro.setAttribute("aria-hidden", "true");
      if (canUseStorage) sessionStorage.setItem("dz_intro_seen", "yes");
      showMain();
    }, 560);
  }, 1650);
});
