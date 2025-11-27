// Selecciones principales
const heroEnvelope = document.getElementById("heroEnvelope");
const openEnvelope = document.getElementById("openEnvelope");
const invite = document.getElementById("invite");

// Abrir invitación
openEnvelope.addEventListener("click", () => {
  heroEnvelope.classList.add("hidden");
  setTimeout(() => {
    invite.classList.add("visible");
    invite.setAttribute("aria-hidden", "false");
    window.scrollTo(0, 0);
    setTimeout(() => {
      const s1 = document.getElementById("section1");
      if (s1) s1.classList.add("active");
    }, 300);
  }, 450);
});

// Observer para animaciones por seccion
const observerOptions = { root: null, rootMargin: "0px", threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Si es sección de contenido, activar hijos con retrasos
      if (entry.target.classList.contains("content-section")) {
        const timelineItems = entry.target.querySelectorAll(".timeline-item");
        const locationCards = entry.target.querySelectorAll(".location-card");
        const formElements = entry.target.querySelectorAll("input, select, .submit-btn, .floating");

        timelineItems.forEach((item, index) => {
          setTimeout(() => { item.style.transitionDelay = `${index * 0.08}s`; item.classList.add("active"); }, 200);
        });

        locationCards.forEach((card, index) => {
          setTimeout(() => { card.style.transitionDelay = `${index * 0.12}s`; card.classList.add("active"); }, 240);
        });

        formElements.forEach((el, index) => {
          setTimeout(() => { el.style.transitionDelay = `${index * 0.06}s`; el.classList.add("active"); }, 300);
        });
      }
    }
  });
}, observerOptions);

// Observar secciones
document.querySelectorAll(".content-section, .photo-section").forEach((s) => observer.observe(s));

// Scroll handler para efectos de foto/parallax/fade
window.addEventListener("scroll", () => {
  // parallax for photos (background position change)
  document.querySelectorAll(".parallax-photo").forEach((sec) => {
    const r = sec.getBoundingClientRect();
    const speed = 0.2;
    const offset = (r.top - window.innerHeight) * speed;
    sec.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    if (r.top < window.innerHeight && r.bottom > 0) {
      sec.classList.add("active");
      const inViewRatio = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight + r.height), 0), 1);
      sec.style.transform = `scale(${1 + inViewRatio * 0.02})`;
    } else {
      sec.classList.remove("active");
      sec.style.transform = `scale(1)`;
    }
  });
});

// cuenta regresiva
function updateCountdown(){
  const weddingDate = new Date("December 20, 2025 10:30:00").getTime();
  const now = Date.now();
  const distance = weddingDate - now;
  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  document.getElementById("days").innerText = String(Math.max(0,days)).padStart(2,"0");
  document.getElementById("hours").innerText = String(Math.max(0,hours)).padStart(2,"0");
  document.getElementById("minutes").innerText = String(Math.max(0,minutes)).padStart(2,"0");
  document.getElementById("seconds").innerText = String(Math.max(0,seconds)).padStart(2,"0");
}
setInterval(updateCountdown,1000);
updateCountdown();

// Enviar confirmación por WhatsApp
function enviarConfirmacion(destinatario){
  const numerosWhatsApp = {
    novia: "5491170734687",
    novio: "5491126958481",
  };

  const nombre = document.getElementById("rsvpName").value;
  const asistencia = document.getElementById("rsvpAtt").value;
  if(!nombre){ alert("Por favor ingresa tu nombre y apellido"); return; }
  if(!asistencia){ alert("Por favor selecciona una opción de asistencia"); return; }

  let mensaje = `¡Hola! Soy ${nombre}. `;
  mensaje += asistencia === "yes" ? "✅ Confirmo mi asistencia a tu boda con mucho gusto! " : "❌ Lamentablemente no podré asistir. ";
  mensaje += "¡Felicidades! 🎉";

  const numero = numerosWhatsApp[destinatario];
  const urlWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(urlWhatsApp,"_blank");

  const messageDiv = document.getElementById("rsvpMsg");
  const nombreDest = destinatario === "novia" ? "Yessica" : "Hugo";
  messageDiv.innerHTML = `<p style="color: var(--eucalipto); text-align:center;">✅ Confirmación enviada a ${nombreDest}<br><small>Se abrirá WhatsApp para que completes el envío</small></p>`;
  messageDiv.style.display = "block";
}

// Scroll button
document.getElementById("scrollBtn")?.addEventListener("click", () => {
  document.getElementById("section4")?.scrollIntoView({ behavior: "smooth" });
});