/*===== Header change color =====*/
$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 78) {
          $(".l-header").css("background" , "white");
        }
  
        else{
            $(".l-header").css("background" , "transparent");  	
        }
    })
  })



/*===== Background Particles =====*/ 
var gutterWidth = 100;

var Particle = function(x, y) {
    var t = this;
    t.x = x;
    t.y = y;
    
    t.elem = $('<div class="particle" />');
    t.elem.css({ left: x+"px", top: y+"px"});
    
    $('body').append(t.elem);
    
    /* create a new position every 500-1000 milliseconds */
    var milliSecs = 1000 + Math.random() * 500;
    t.ptinterval = setInterval(function() {
        var dx = Math.round(Math.random() * gutterWidth);
        var dy = Math.round(Math.random() * gutterWidth);
        t.elem.animate({left: (t.x + dx)+"px", top: (t.y + dy) + "px"}, 600);  
    }, milliSecs);
};





var particles = [];
var newParticle;

for(var x = 0; x < 1300; x = x + gutterWidth) {
    for(var y = 0; y < 700; y = y + gutterWidth) {
        newParticle = new Particle(x,y);
        particles.push(newParticle);
    }
}


/*===== Type Writer =====*/
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML =
        ".typewrite > .wrap { border-right: 2px solid;border-image:linear-gradient(to top, #ff0049, #3100ff) 1;outline: none;}";
    document.body.appendChild(css);
};

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
    delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .blog__img, .contact__input", { interval: 200 });


/*===== Mouse pointer effect =====*/
const coords = { x: 0, y: 0 };
const pointers = document.querySelectorAll(".pointer");
const colors = [
    "#ff0049",
    "#ff005b",
    "#ff006f",
    "#ff0082",
    "#ff0095",
    "#ff00a9",
    "#ff00bc",
    "#ff00cf",
    "#ff00e3",
    "#ff00f6",
    "#f400ff",
    "#e100ff",
    "#ce00ff",
    "#ba00ff",
    "#a700ff",
    "#9400ff",
    "#8000ff",
    "#6d00ff",
    "#5a00ff",
    "#4600ff",
    "#3100ff",
];

pointers.forEach(function (pointer, index) {
    pointer.x = 0;
    pointer.y = 0;
    pointer.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animatepointers() {
    let x = coords.x;
    let y = coords.y;

    pointers.forEach(function (pointer, index) {
        pointer.style.left = x - 9 + "px";
        pointer.style.top = y - 9 + "px";

        pointer.style.scale = (pointers.length - index) / pointers.length;

        pointer.x = x;
        pointer.y = y;

        const nextpointer = pointers[index + 1] || pointers[0];
        x += (nextpointer.x - x) * 0.5;
        y += (nextpointer.y - y) * 0.5;
    });

    requestAnimationFrame(animatepointers);
}

animatepointers();
