document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  const canUseSessionStorage = (() => {
    try {
      const key = "__dz_session_check__";
      sessionStorage.setItem(key, "1");
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  })();

  const canUseLocalStorage = (() => {
    try {
      const key = "__dz_local_check__";
      localStorage.setItem(key, "1");
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  })();

  const showMain = () => {
    if (!main) return;
    requestAnimationFrame(() => {
      main.classList.add("is-visible");
    });
  };

  if (intro && main) {
    const introSeen = canUseSessionStorage && sessionStorage.getItem("dz_intro_seen") === "yes";

    if (introSeen) {
      intro.style.display = "none";
      intro.setAttribute("aria-hidden", "true");
      showMain();
    } else {
      setTimeout(() => {
        intro.style.transition = "opacity 550ms ease";
        intro.style.opacity = "0";

        setTimeout(() => {
          intro.style.display = "none";
          intro.setAttribute("aria-hidden", "true");
          if (canUseSessionStorage) sessionStorage.setItem("dz_intro_seen", "yes");
          showMain();
        }, 560);
      }, 1650);
    }
  } else {
    showMain();
  }

  const cookieAccepted = canUseLocalStorage && localStorage.getItem("dz_cookie_accepted") === "yes";

  if (!cookieAccepted) {
    const cookieBanner = document.createElement("section");
    cookieBanner.className = "cookie-banner";
    cookieBanner.setAttribute("role", "dialog");
    cookieBanner.setAttribute("aria-live", "polite");
    cookieBanner.innerHTML = `
      <p>We use cookies to improve your experience and analyze site traffic.</p>
      <button type="button" class="main-cta cookie-accept">Accept Cookies</button>
    `;

    document.body.appendChild(cookieBanner);

    const acceptButton = cookieBanner.querySelector(".cookie-accept");
    if (acceptButton) {
      acceptButton.addEventListener("click", () => {
        if (canUseLocalStorage) localStorage.setItem("dz_cookie_accepted", "yes");
        cookieBanner.remove();
      });
    }
  }

  const bookingForm = document.getElementById("booking-form");
  const bookingMessage = document.getElementById("booking-message");

  if (bookingForm && bookingMessage) {
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(bookingForm);
      const goals = formData.get("goals");

      if (goals && !formData.get("message") && !formData.get("details")) {
        formData.append("details", goals.toString());
      }

      try {
        const response = await fetch("https://formspree.io/f/mzdkrejv", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        bookingMessage.textContent = "Your strategy call request has been sent. We will contact you soon.";
        bookingForm.reset();
      } catch (error) {
        bookingMessage.textContent = "Something went wrong. Please try again.";
      }
    });
  }

  const whatsappLink = document.createElement("a");
  whatsappLink.className = "whatsapp-float";
  whatsappLink.href = "https://wa.me/38670665050";
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.setAttribute("aria-label", "Piši na WhatsApp");
  whatsappLink.textContent = "WhatsApp";
  document.body.appendChild(whatsappLink);

});
