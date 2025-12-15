// Toggle class menu
$(function () {
  $(".menu").on("click", function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(".ss-menu1").addClass("visible1");
      $(".ss-menu2").addClass("visible2");
      $(".ss-menu3").addClass("visible3");
      $(".ss-menu4").addClass("visible4");
      $(".ss-menu5").addClass("visible5");
    } else {
      $(".ss-menu1").removeClass("visible1");
      $(".ss-menu2").removeClass("visible2");
      $(".ss-menu3").removeClass("visible3");
      $(".ss-menu4").removeClass("visible4");
      $(".ss-menu5").removeClass("visible5");
    }
  });
});
$(function () {
  $(".ss-menu").on("click", function () {
    $(".menu").removeClass("active");
    $(".ss-menu1").removeClass("visible1");
    $(".ss-menu2").removeClass("visible2");
    $(".ss-menu3").removeClass("visible3");
    $(".ss-menu4").removeClass("visible4");
    $(".ss-menu5").removeClass("visible5");
  });
});
// Función de throttle para optimizar eventos de scroll
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Cerrar menú en scroll (sin throttle para respuesta inmediata)
$(function () {
  $(window).on("scroll", function () {
    if ($(".menu").hasClass("active")) {
      $(".menu").removeClass("active");
      $(".ss-menu1").removeClass("visible1");
      $(".ss-menu2").removeClass("visible2");
      $(".ss-menu3").removeClass("visible3");
      $(".ss-menu4").removeClass("visible4");
      $(".ss-menu5").removeClass("visible5");
    }
  });
});

// Parallax effect and gsap
$(function () {
  if (!window.location.pathname.match("mentions")) {
    $(".rellax").css("transform", "translateX(-50%)");
    var rellax = new Rellax(".rellax");
  }
});

// Script adresse Email
// Listener pour chargement adresse mailto
window.addEventListener("load", function () {
  if (document.getElementById("insertMail")) {
    let name = "contact"; // Update yours informations here
    let domain = "yourbandname.com"; // Update yours informations here
    //let subject = "subject=Formulaire Tuco" ;
    let divMail = document.getElementById("insertMail");
    let newAhref = document.createElement("a");
    newAhref.href = "mailto:" + name + "@" + domain;
    newAhref.innerHTML = name + "@" + domain;
    divMail.appendChild(newAhref);
  }
});

// Manage vidéo
$(function () {
  $("video").on("click", function (event) {
    event.preventDefault();
    document.getElementById("tucoVideo").play();
  });
});

// Manage form
$(function () {
  // Name
  $("#nom").on("blur input", function () {
    if ($("#nom").val().length >= 50) {
      $("#helpNom").text("50 characters max").hide().show();
    } else {
      $("#helpNom").slideUp(400);
    }
  });
  // Phone
  $("#telephone").on("blur input", function () {
    let regexTelephone = /[0]{1}[1-7]{1}[0-9]{8}/;
    let telEntry = String(document.getElementById("telephone").value).replace(/\s/g, "");
    if (!telEntry.match(regexTelephone)) {
      $("#helpTel").text("Incorrect phone number").hide().show();
    } else {
      $("#helpTel").slideUp(400);
    }
  });

  // Email
  $("#mail").on("blur input", function () {
    let regexMail =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let mailEntry = $("input#mail").val();
    if (!mailEntry.match(regexMail)) {
      $("#helpMail").text("Incorrect email address").hide().show();
    } else {
      $("#helpMail").slideUp(400);
    }
  });
  // Check Robot
  $("#checkRobot").on("blur input", function () {
    if ($("#checkRobot").val() !== "7") {
      $("#helpRobot").text("Incorrect result of the operation").hide().show();
    } else {
      $("#helpRobot").slideUp(400);
    }
  });
  // Message
  $("#message").on("blur input", function () {
    if ($("#message").val().length >= 3000) {
      $("#helpMessage")
        .text("Your message must not exceed 3000 characters")
        .hide()
        .slideDown(400);
    } else {
      $("#helpMessage").slideUp(400);
    }
  });
});

// Contact form
$(function () {
  $(".contactForm").on("submit", function (e) {
    e.preventDefault();
    let nom = $("#nom").val();
    let telephone = $("#telephone").val();
    let mail = $("#mail").val();
    let message = $("#message").val();
    let newsletter = $('input[name="newsletter"]:checked').val();
    let checkRobot = $("#checkRobot").val();
    if ($("#checkRobot").val() === "7") {
      $.post(
        "../datas/sendFormContact.php",
        {
          nom: nom,
          telephone: telephone,
          mail: mail,
          message: message,
          newsletter: newsletter,
          checkRobot: checkRobot,
        },
        function (data, textStatus, xhr) {
          $("form").fadeOut(400, function () {
            $("#retourFormulaire").css({
              padding: "10px",
              "margin-top": "160px",
              "margin-bottom": "160px",
              "margin-left": "auto",
              "margin-right": "auto",
              color: "white",
              "font-size": "1rem",
              "text-align": "center",
            });
            $("#retourFormulaire").text(data);
          });
          $("#nom").val("");
          $("#telephone").val("");
          $("#mail").val("");
          $("#message").val("");
          $("#checkRobot").val("");
        }
      );
    } else {
      alert("Incorrect anti robot check result !");
    }
  });
});

// Form newsletter input blur
$(function () {
  let regexMail =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  $("#emailNews").on("blur input", function (event) {
    //event.preventDefault();
    let mailEntry = $("#emailNews").val();
    if (!mailEntry.match(regexMail)) {
      $("#helpMailNews").text("Incorrect email address").hide().show();
      $("#hideNews").hide();
    } else {
      $("#helpMailNews").slideUp(100, function () {
        // Apparition checkRobotNews
        $("#hideNews").fadeIn();
      });
    }
  });
  $("#checkRobotNews").on("blur input", function (event) {
    if ($("#checkRobotNews").val() !== "7") {
      $("#helpMailNews").text("Incorrect result").hide().show();
    } else {
      $("#helpMailNews").slideUp(100, function () {});
    }
  });
});

// Form newsletter ajax send
$(function () {
  $(".newsletterForm").on("submit", function (e) {
    e.preventDefault();
    let mail = $("#emailNews").val();
    let checkRobot = $("#checkRobotNews").val();
    if ($("#checkRobotNews").val() === "7") {
      $.post(
        "../datas/sendFormSubscription.php",
        { mail: mail, checkRobot: checkRobot },
        function (data, textStatus, xhr) {
          $(".newsletterForm").fadeOut(400, function () {
            $("#retourNewsFormulaire").css({
              padding: "10px",
              "margin-top": "60px",
              "margin-bottom": "60px",
              "margin-left": "auto",
              "margin-right": "auto",
              color: "white",
              "font-size": "1rem",
              "text-align": "center",
            });
            $("#retourNewsFormulaire").text(data);
          });
          $("#emailNews").val("");
          $("#checkRobotNews").val("");
        }
      );
    } else {
      alert("Incorrect anti robot check result !");
    }
  });
});

// Animations on scroll (con throttle para mejor rendimiento)
$(function () {
  const handleAnimations = throttle(function () {
    const sizePage = $(window).height();
    const trigger = 100;

    // Procesar todas las animaciones en un solo loop
    const animatables = document.querySelectorAll(".animatableY, .animatableX, .animatableOpacity");
    animatables.forEach(function(unit) {
      if (unit.getBoundingClientRect().top + trigger <= sizePage) {
        unit.classList.add("showed");
      }
    });
  }, 16); // ~60fps

  $(window).on("scroll", handleAnimations);
  // Ejecutar una vez al cargar para elementos visibles
  handleAnimations();
});

//Lazyload
$(function () {
  if (!window.location.pathname.match("mentions")) {
    lazyload();
  }
});

// Ya no se recarga la página al cambiar tamaño
// El parallax y las animaciones se manejan de forma responsiva

// Manejo de scroll UI (upArrow y scrollDown) - consolidado con throttle
$(function () {
  let lastScrollTop = 0;

  const handleScrollUI = throttle(function () {
    const scrollNow = $(window).scrollTop();

    // Mostrar flecha cuando scroll > 600 y el usuario está subiendo
    if (scrollNow > 600 && scrollNow < lastScrollTop) {
      $("#upArrow").show();
    } else {
      $("#upArrow").hide();
    }

    // Ocultar indicador de scroll down
    if (scrollNow >= 150) {
      $("#scrollDown").hide();
    } else {
      $("#scrollDown").show();
    }

    lastScrollTop = scrollNow;
  }, 100);

  $(window).on("scroll", handleScrollUI);

  // Click handler para subir
  $("#upArrow").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });
});
// Manage tag scroll down
$(function () {
  $("#scrollDown").on("click", function () {
    window.location.href = "#nextShow";
  });
});

// Locations
$(function () {
  $(".card").on("click", function (event) {
    event.stopPropagation(); // previene que otros clics afecten
    const link = $(this).data("link");
    if (link) {
      window.open(link, "_blank"); // abre en nueva pestaña
    }
  });
});

// Location socials
$(function () {
  $(".facebook").on("click", function (event) {
    event.preventDefault();
    window.location.href = "https://facebook.com/";
  });
  $(".instagram").on("click", function (event) {
    event.preventDefault();
    window.location.href = "https://www.instagram.com/";
  });
});

// Ajustar altura de secciones para móviles
function ajustarAlturaSecciones() {
  const altura = window.innerHeight * 0.7 + "px";
  document.querySelectorAll(".ss-nextShow, .ss-music").forEach(el => {
    el.style.height = altura;
  });
}

// Ejecutar al cargar y al cambiar tamaño
window.addEventListener("load", ajustarAlturaSecciones);
window.addEventListener("resize", ajustarAlturaSecciones);

