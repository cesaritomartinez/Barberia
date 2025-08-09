// --- DATA CONSTANTS ---
const BARBERS = [
  {
    id: 1,
    name: "Martín",
    specialty: "Cortes Clásicos",
    description:
      "Con más de 15 años de experiencia, Martín es un referente en cortes tradicionales. Su estilo meticuloso y atención al detalle hacen que cada servicio sea un verdadero ritual clásico.",
    imageUrl: "./assets/equipo-1.jpg",
  },
  {
    id: 2,
    name: "Lucas",
    specialty: "Corte Fade / Degradé",
    description:
      "Joven, creativo y preciso. Lucas domina los cortes modernos con transiciones limpias y estilos urbanos. Su enfoque está en lograr un look actual sin perder la prolijidad profesional.",
    imageUrl: "./assets/equipo-2.jpg",
  },
  {
    id: 3,
    name: "Nicolás",
    specialty: "Diseño de Barba",
    description:
      "Especialista en perfilado y cuidado de barba. Nicolás transforma cada sesión en una experiencia de relajación, combinando técnicas de afilado clásico con un toque personalizado.",
    imageUrl: "./assets/equipo-3.jpg",
  },
  {
    id: 4,
    name: "Federico",
    specialty: "Afeitado Tradicional",
    description:
      "Federico combina lo mejor del afeitado tradicional con cortes clásicos y toques modernos, adaptando cada estilo a la personalidad del cliente. Con años de oficio, sabe escuchar y asesorar para lograr el mejor resultado.",
    imageUrl: "./assets/equipo-4.jpg",
  },
];

const SERVICES = [
  {
    id: "corte-cabello",
    name: "Corte de Cabello",
    price: 450,
    description:
      "Corte clásico o moderno, adaptado a tu estilo. Incluye lavado, retoque de contornos y finalización con producto.",
  },
  {
    id: "diseno-barba",
    name: "Diseño de Barba",
    price: 400,
    description:
      "Perfilado y rebaje con navaja, toalla caliente y terminación precisa para resaltar tus facciones.",
  },
  {
    id: "afeitado-tradicional",
    name: "Afeitado Tradicional",
    price: 400,
    description:
      "Afeitado al ras con técnica clásica, espuma caliente y navaja. Una experiencia relajante y prolija.",
  },
  {
    id: "corte-fade",
    name: "Corte Fade/Degradé",
    price: 500,
    description:
      "Corte en degradé bajo, medio o alto, con transiciones suaves y acabado limpio.",
  },
];

const GALLERY_LOCAL = ["./assets/locales-1.png", "./assets/locales-2.png"];

const GALLERY_TRABAJOS = [
  "./assets/trabajo-1.jpg",
  "./assets/trabajos-2.jpg",
  "./assets/trabajos-3.jpg",
  "./assets/trabajos-4.jpg",
];

const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});

const homePage = document.getElementById("home-page");
const adminPageContainer = document.getElementById("admin-page-container");

// --- TEMPLATES ---

const adminPageTemplate = `
<div id="admin-page" class="admin-page">
    <div id="login-container">
      <div class="login-wrapper">
          <div class="login-box">
              <h2 class="login-title">Acceso Admin</h2>
              <form id="login-form" class="login-form">
                  <div class="form-group">
                      <label for="admin-user">Usuario</label>
                      <input id="admin-user" type="text" value="" />
                  </div>
                  <div class="form-group">
                      <label for="password">Contraseña</label>
                      <input type="password" id="password" required />
                  </div>
                  <p id="login-error" class="error-message hidden"></p>
                  <button type="submit" class="button button-primary full-width">Ingresar</button>
                  <div class="login-footer">
                       <a href="#" class="link">Volver al inicio</a>
                  </div>
              </form>
          </div>
      </div>
    </div>
    <div id="dashboard-container" class="hidden">
        <header class="dashboard-header">
            <div class="container dashboard-header-content">
                <h1 class="dashboard-title">Panel de Administración</h1>
                <div>
                     <a href="#" class="link light mr-4">Ver Sitio</a>
                    <button id="logout-button" class="button button-primary">Cerrar Sesión</button>
                </div>
            </div>
        </header>
        <main class="container dashboard-main">
            <div class="dashboard-content">
                <div class="table-header">
                    <h2 class="table-title">Turnos Agendados</h2>
                    <div class="filter-container">
                         <label for="filterDate">Filtrar por fecha:</label>
                        <input type="date" id="filterDate" class="date-filter"/>
                    </div>
                </div>
                
                <div class="table-wrapper">
                    <table class="bookings-table">
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Teléfono</th>
                                <th>Servicio</th>
                                <th>Barbero</th>
                            </tr>
                        </thead>
                        <tbody id="bookings-table-body"></tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>
`;

// --- RENDER FUNCTIONS ---

const initializeHomePageContent = () => {
  // Dynamic content
  document.getElementById("gallery-container").innerHTML = `
        <div class="gallery-column">
            <h3 class="gallery-subtitle">Nuestro local</h3>
            <div class="gallery-image-grid-single">${GALLERY_LOCAL.map(
              (src, index) =>
                `<img key="${index}" src=${src} alt="Local view ${
                  index + 1
                }" class="gallery-image"/>`
            ).join("")}</div>
        </div>
        <div class="gallery-column">
            <h3 class="gallery-subtitle">Trabajos Realizados</h3>
            <div class="gallery-image-grid-double">${GALLERY_TRABAJOS.map(
              (src, index) =>
                `<img key="${index}" src="${src}" alt="Work example ${
                  index + 1
                }" class="gallery-image"/>`
            ).join("")}</div>
        </div>
    `;
  document.getElementById("team-container").innerHTML = BARBERS.map(
    (barber) => `
        <div class="team-member">
            <img src="${barber.imageUrl}" alt="${barber.name}" class="team-member-img"/>
            <h3 class="team-member-name">${barber.name}</h3>
            <p class="team-member-specialty">${barber.specialty}</p>
            <p class="team-member-description">${barber.description}</p>
        </div>
    `
  ).join("");
  document.getElementById("services-container").innerHTML = SERVICES.map(
    (service) => `
        <div class="service-card">
            <h3 class="service-name">${service.name}</h3>
            <p class="service-price">$${service.price}</p>
            <p class="service-description">${service.description}</p>
        </div>
    `
  ).join("");
  renderBookingForm();
};

const renderBookingForm = (bookingData = null) => {
  const container = document.getElementById("booking-form-container");
  if (bookingData) {
    const service = SERVICES.find((s) => s.id === bookingData.serviceId);
    const barber = BARBERS.find((b) => b.id === bookingData.barberId);
    const date = new Date(bookingData.date + "T00:00:00").toLocaleDateString(
      "es-ES",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    container.innerHTML = `
            <div class="booking-success">
                <p class="booking-success-title">Reserva realizada correctamente</p>
                <p><strong>Día:</strong> ${date}</p>
                <p><strong>Hora:</strong> ${bookingData.time}</p>
                <p><strong>Servicio:</strong> ${service ? service.name : ""}</p>
                <p><strong>Barbero:</strong> ${
                  barber ? barber.name : "Asignado por el local"
                }</p>
                <button id="new-booking-btn" class="button button-success">Hacer otra reserva</button>
            </div>
        `;
    document
      .getElementById("new-booking-btn")
      .addEventListener("click", () => renderBookingForm());
  } else {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 29);
    const maxDateStr = maxDate.toISOString().split("T")[0];

    container.innerHTML = `
            <form id="booking-form" class="booking-form" novalidate>
                 <div class="form-grid">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Nombre Completo" required />
                        <p class="error-message hidden" data-error-for="name"></p>
                    </div>
                    <div class="form-group">
                        <input type="date" name="date" required min="${minDate}" max="${maxDateStr}" />
                        <p class="error-message hidden" data-error-for="date"></p>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Celular (ej: 099123456)" required />
                        <p class="error-message hidden" data-error-for="phone"></p>
                    </div>
                     <div class="form-group">
                        <select name="time" required>
                            <option value="">Horas disponibles</option>
                            ${TIME_SLOTS.map(
                              (slot) =>
                                `<option value="${slot}">${slot}</option>`
                            ).join("")}
                        </select>
                        <p class="error-message hidden" data-error-for="time"></p>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Tu Correo" required />
                        <p class="error-message hidden" data-error-for="email"></p>
                    </div>
                    <div class="form-group">
                        <select name="serviceId" required>
                            <option value="">Servicio</option>
                            ${SERVICES.map(
                              (s) =>
                                `<option value="${s.id}">${s.name}</option>`
                            ).join("")}
                        </select>
                        <p class="error-message hidden" data-error-for="serviceId"></p>
                    </div>
                    <div class="form-group-full">
                        <select name="barberId">
                            <option value="">Barbero (Opcional)</option>
                            ${BARBERS.map(
                              (b) =>
                                `<option value="${b.id}">${b.name} (${b.specialty})</option>`
                            ).join("")}
                        </select>
                    </div>
                </div>
                <p id="form-error" class="error-message hidden" style="text-align: center; margin-top: 1.5rem;"></p>
                <div class="form-footer">
                    <button type="submit" class="button button-dark">Registrar Turno</button>
                </div>
            </form>
        `;
    setupBookingForm();
  }
};

const renderAdminPage = () => {
  adminPageContainer.innerHTML = adminPageTemplate;
  const isAuthenticated =
    sessionStorage.getItem("isAdminAuthenticated") === "true";
  const loginContainer = document.getElementById("login-container");
  const dashboardContainer = document.getElementById("dashboard-container");

  if (isAuthenticated) {
    loginContainer.classList.add("hidden");
    dashboardContainer.classList.remove("hidden");
    renderAdminDashboard();
  } else {
    loginContainer.classList.remove("hidden");
    dashboardContainer.classList.add("hidden");
    setupAdminLogin();
  }
  document.querySelector(".link").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "#/";
  });
};

const renderAdminDashboard = () => {
  const filterDateInput = document.getElementById("filterDate");
  const today = new Date().toISOString().split("T")[0];
  filterDateInput.value = today;

  const displayBookings = () => {
    const date = filterDateInput.value;
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const filtered = storedBookings
      .filter((b) => b.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));

    const tableBody = document.getElementById("bookings-table-body");
    if (filtered.length > 0) {
      tableBody.innerHTML = filtered
        .map(
          (b) => `
                <tr>
                    <td>${b.time}</td>
                    <td>${b.name}</td>
                    <td>${b.phone}</td>
                    <td>${
                      SERVICES.find((s) => s.id === b.serviceId)?.name || "N/A"
                    }</td>
                    <td>${
                      BARBERS.find((br) => br.id === b.barberId)?.name || "N/A"
                    }</td>
                </tr>
            `
        )
        .join("");
    } else {
      tableBody.innerHTML = `<tr><td colspan="5" class="empty-table-message">No hay turnos para la fecha seleccionada.</td></tr>`;
    }
  };

  filterDateInput.addEventListener("change", displayBookings);
  document.getElementById("logout-button").addEventListener("click", () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    handleRoute();
  });
  document.querySelector(".link.light").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "#/";
  });

  displayBookings();
};

// --- EVENT HANDLERS & SETUP ---

const setupMobileMenu = () => {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const openIcon = document.getElementById("mobile-menu-open-icon");
  const closeIcon = document.getElementById("mobile-menu-close-icon");

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });

  document.querySelectorAll(".nav-link-mobile").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });
};

const setupBookingForm = () => {
  const form = document.getElementById("booking-form");
  const container = document.getElementById("booking-form-container");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let isValid = true;

    document.querySelectorAll("[data-error-for]").forEach((el) => {
      el.classList.add("hidden");
      el.textContent = "";
    });
    const formErrorEl = document.getElementById("form-error");
    formErrorEl.classList.add("hidden");
    formErrorEl.textContent = "";

    if (!data.name.trim()) {
      document.querySelector('[data-error-for="name"]').textContent =
        "El nombre es obligatorio.";
      isValid = false;
    }
    if (!data.phone.trim()) {
      document.querySelector('[data-error-for="phone"]').textContent =
        "El celular es obligatorio.";
      isValid = false;
    } else if (!/^\d{9}$/.test(data.phone.trim())) {
      document.querySelector('[data-error-for="phone"]').textContent =
        "El celular debe tener 9 dígitos numéricos.";
      isValid = false;
    }
    if (!data.email.trim()) {
      document.querySelector('[data-error-for="email"]').textContent =
        "El correo es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      document.querySelector('[data-error-for="email"]').textContent =
        "Formato de correo inválido.";
      isValid = false;
    }
    if (!data.serviceId) {
      document.querySelector('[data-error-for="serviceId"]').textContent =
        "Debe seleccionar un servicio.";
      isValid = false;
    }
    if (!data.date) {
      document.querySelector('[data-error-for="date"]').textContent =
        "Debe seleccionar una fecha.";
      isValid = false;
    }else {
  const selectedDate = new Date(data.date);
  const dayOfWeek = selectedDate.getDay(); // 0 = domingo, 6 = sábado
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    document.querySelector('[data-error-for="date"]').textContent =
      "No se puede reservar turnos para sábados ni domingos.";
    isValid = false;
  }
}
    if (!data.time) {
      document.querySelector('[data-error-for="time"]').textContent =
        "Debe seleccionar una hora.";
      isValid = false;
    }

    document.querySelectorAll("[data-error-for]").forEach((el) => {
      if (el.textContent) el.classList.remove("hidden");
    });

    if (!isValid) return;

    // Advanced validation
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    let barberIdToBook = data.barberId ? parseInt(data.barberId, 10) : null;

    if (barberIdToBook) {
      // User selected a barber, check if they are available
      const isBooked = existingBookings.some(
        (b) =>
          b.date === data.date &&
          b.time === data.time &&
          b.barberId === barberIdToBook
      );
      if (isBooked) {
        formErrorEl.textContent =
          "El barbero seleccionado no está disponible en ese horario. Por favor, elige otro.";
        formErrorEl.classList.remove("hidden");
        return;
      }
    } else {
      // User did not select a barber, find an available one
      const bookedBarberIdsAtSlot = existingBookings
        .filter((b) => b.date === data.date && b.time === data.time)
        .map((b) => b.barberId);

      const availableBarber = BARBERS.find(
        (b) => !bookedBarberIdsAtSlot.includes(b.id)
      );

      if (availableBarber) {
        barberIdToBook = availableBarber.id;
      } else {
        formErrorEl.textContent =
          "Lo sentimos, no hay barberos disponibles en el horario seleccionado. Por favor, elige otra hora.";
        formErrorEl.classList.remove("hidden");
        return;
      }
    }

    // If we get here, everything is OK to book
    const newBooking = {
      id: new Date().toISOString(),
      ...data,
      barberId: barberIdToBook,
    };
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    renderBookingForm(newBooking);
    container.scrollIntoView({ behavior: "smooth" });
  });
};

const setupAdminLogin = () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("admin-user").value.trim();
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("login-error");

    // Limpio errores anteriores
    errorEl.textContent = "";
    errorEl.classList.add("hidden");

    if (user === "admin" && password === "barberia") {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      handleRoute();
    } else {
      errorEl.textContent = "Usuario o contraseña incorrectos.";
      errorEl.classList.remove("hidden");
    }
  });
};

const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#/")) {
        return; // Let the router handle this
      }
      e.preventDefault();
      const targetId = href === "#" ? "home-page" : href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
};

// --- ROUTER ---
const handleRoute = () => {
  const hash = window.location.hash || "#/";

  if (hash === "#/admin") {
    homePage.style.display = "none";
    adminPageContainer.style.display = "block";
    renderAdminPage();
  } else {
    homePage.style.display = "block";
    adminPageContainer.style.display = "none";
    if (hash.length > 1 && !hash.startsWith("#/")) {
      setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  // Calculamos fechas dinámicas: hoy, mañana y pasado mañana
  function ajustarFechaSiEsFinDeSemana(fecha, offsetDiasSiEsSabado = 2, offsetDiasSiEsDomingo = 2) {
  const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
  if (dia === 6) {
    fecha.setDate(fecha.getDate() + offsetDiasSiEsSabado); // sábado -> lunes
  } else if (dia === 0) {
    fecha.setDate(fecha.getDate() + offsetDiasSiEsDomingo); // domingo -> martes
  }
  return fecha;
}

const hoy = ajustarFechaSiEsFinDeSemana(new Date());
const fechaHoy = hoy.toISOString().split("T")[0];

// Generamos fechaManana asegurándonos que no coincida con hoy
let manana = new Date(hoy);
manana.setDate(manana.getDate() + 1);
manana = ajustarFechaSiEsFinDeSemana(manana);
let fechaManana = manana.toISOString().split("T")[0];
if (fechaManana === fechaHoy) {
  manana.setDate(manana.getDate() + 1);
  manana = ajustarFechaSiEsFinDeSemana(manana);
  fechaManana = manana.toISOString().split("T")[0];
}

// Generamos fechaPasado asegurándonos que no coincida con las anteriores
let pasado = new Date(manana);
pasado.setDate(pasado.getDate() + 1);
pasado = ajustarFechaSiEsFinDeSemana(pasado);
let fechaPasado = pasado.toISOString().split("T")[0];
while (fechaPasado === fechaHoy || fechaPasado === fechaManana) {
  pasado.setDate(pasado.getDate() + 1);
  pasado = ajustarFechaSiEsFinDeSemana(pasado);
  fechaPasado = pasado.toISOString().split("T")[0];
}

  const reservasIniciales = [
    // 5 para hoy
    {
      id: `${fechaHoy}T09:00:00.000Z`,
      name: "Carlos Sosa",
      phone: "099222333",
      email: "carlos@mail.com",
      date: fechaHoy,
      time: "09:00",
      serviceId: "corte-cabello",
      barberId: 2
    },
    {
      id: `${fechaHoy}T09:30:00.000Z`,
      name: "Elena Ruiz",
      phone: "091111222",
      email: "elena@mail.com",
      date: fechaHoy,
      time: "09:30",
      serviceId: "afeitado-tradicional",
      barberId: 4
    },
    {
      id: `${fechaHoy}T10:00:00.000Z`,
      name: "Martín López",
      phone: "095444555",
      email: "martin@mail.com",
      date: fechaHoy,
      time: "10:00",
      serviceId: "diseno-barba",
      barberId: 3
    },
    {
      id: `${fechaHoy}T10:30:00.000Z`,
      name: "Romina Díaz",
      phone: "097777888",
      email: "romina@mail.com",
      date: fechaHoy,
      time: "10:30",
      serviceId: "corte-fade",
      barberId: 2
    },
    {
      id: `${fechaHoy}T11:00:00.000Z`,
      name: "Luis García",
      phone: "096666777",
      email: "luis@mail.com",
      date: fechaHoy,
      time: "11:00",
      serviceId: "corte-cabello",
      barberId: 1
    },

    // 3 para mañana
    {
      id: `${fechaManana}T10:00:00.000Z`,
      name: "Juan Pérez",
      phone: "099123456",
      email: "juan@mail.com",
      date: fechaManana,
      time: "10:00",
      serviceId: "corte-cabello",
      barberId: 1
    },
    {
      id: `${fechaManana}T11:00:00.000Z`,
      name: "Ana Gómez",
      phone: "098765432",
      email: "ana@mail.com",
      date: fechaManana,
      time: "11:00",
      serviceId: "diseno-barba",
      barberId: 3
    },
    {
      id: `${fechaManana}T12:00:00.000Z`,
      name: "Jorge Silva",
      phone: "092000111",
      email: "jorge@mail.com",
      date: fechaManana,
      time: "12:00",
      serviceId: "afeitado-tradicional",
      barberId: 4
    },

    // 4 para pasado mañana
    {
      id: `${fechaPasado}T09:00:00.000Z`,
      name: "Lucía Torres",
      phone: "094333222",
      email: "lucia@mail.com",
      date: fechaPasado,
      time: "09:00",
      serviceId: "corte-fade",
      barberId: 2
    },
    {
      id: `${fechaPasado}T10:00:00.000Z`,
      name: "Miguel Acosta",
      phone: "090888999",
      email: "miguel@mail.com",
      date: fechaPasado,
      time: "10:00",
      serviceId: "diseno-barba",
      barberId: 3
    },
    {
      id: `${fechaPasado}T10:30:00.000Z`,
      name: "Sara Méndez",
      phone: "093111444",
      email: "sara@mail.com",
      date: fechaPasado,
      time: "10:30",
      serviceId: "afeitado-tradicional",
      barberId: 4
    },
    {
      id: `${fechaPasado}T11:00:00.000Z`,
      name: "Rodrigo Cano",
      phone: "098000111",
      email: "rodrigo@mail.com",
      date: fechaPasado,
      time: "11:00",
      serviceId: "corte-cabello",
      barberId: 1
    }
  ];

  localStorage.setItem("bookings", JSON.stringify(reservasIniciales));

  // Inicialización normal de la app
  initializeHomePageContent();
  setupMobileMenu();
  setupSmoothScroll();
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
});

