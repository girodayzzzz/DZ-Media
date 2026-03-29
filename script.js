document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

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
    if (!main) return;
    requestAnimationFrame(() => {
      main.classList.add("is-visible");
    });
  };

  if (intro && main) {
    const introSeen = canUseStorage && sessionStorage.getItem("dz_intro_seen") === "yes";

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
          if (canUseStorage) sessionStorage.setItem("dz_intro_seen", "yes");
          showMain();
        }, 560);
      }, 1650);
    }
  } else {
    showMain();
  }

  const bookingForm = document.getElementById("booking-form");
  const bookingMessage = document.getElementById("booking-message");

  if (bookingForm && bookingMessage) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!(bookingForm instanceof HTMLFormElement)) return;
      if (!bookingForm.checkValidity()) {
        bookingMessage.textContent = "Please complete all required fields before submitting.";
        bookingMessage.classList.add("is-error");
        return;
      }

      const formData = new FormData(bookingForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        date: String(formData.get("date") || "").trim(),
        goals: String(formData.get("goals") || "").trim()
      };

      const subject = encodeURIComponent(`New Strategy Call Booking - ${payload.company}`);
      const body = encodeURIComponent(
        `New booking request details:\n\n` +
          `Name: ${payload.name}\n` +
          `Email: ${payload.email}\n` +
          `Company: ${payload.company}\n` +
          `Preferred Date: ${payload.date}\n` +
          `Project Goals: ${payload.goals}\n`
      );

      if (canUseStorage) {
        sessionStorage.setItem("dz_booking_draft", JSON.stringify(payload));
      }

      bookingMessage.classList.remove("is-error");
      bookingMessage.textContent = "Thanks! Opening your email app now so your booking details can be sent automatically.";

      window.location.href = `mailto:hello@dzmedia.local?subject=${subject}&body=${body}`;
      bookingForm.reset();
    });
  }
});
