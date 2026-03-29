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

  const introSeen = canUseStorage && sessionStorage.getItem("dz_intro_seen") === "yes";

  main.style.opacity = "1";

  if (introSeen) {
    intro.style.display = "none";
    intro.setAttribute("aria-hidden", "true");
    return;
  }

  setTimeout(() => {
    intro.style.transition = "opacity 600ms ease";
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      intro.setAttribute("aria-hidden", "true");
      if (canUseStorage) sessionStorage.setItem("dz_intro_seen", "yes");
    }, 620);
  }, 1350);
});
