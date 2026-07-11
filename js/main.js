/* ============================================================
   Nana Aba Nhyira — Portfolio
   Pure vanilla JavaScript (no jQuery, no external libraries)
   ============================================================ */
(function () {
    "use strict";

    /* ---------- Spinner ---------- */
    window.addEventListener("load", function () {
        var spinner = document.getElementById("spinner");
        if (spinner) {
            spinner.classList.remove("show");
            setTimeout(function () { spinner.style.display = "none"; }, 450);
        }
    });
    // Fallback in case 'load' already fired
    setTimeout(function () {
        var s = document.getElementById("spinner");
        if (s && s.classList.contains("show")) {
            s.classList.remove("show");
            setTimeout(function () { s.style.display = "none"; }, 450);
        }
    }, 1500);

    /* ---------- Mobile nav toggle ---------- */
    var navToggle = document.getElementById("navToggle");
    var navCollapse = document.getElementById("navCollapse");
    if (navToggle && navCollapse) {
        navToggle.addEventListener("click", function () {
            navCollapse.classList.toggle("open");
        });
        navCollapse.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navCollapse.classList.remove("open");
            });
        });
    }

    /* ---------- Smooth scrolling for in-page links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var id = this.getAttribute("href");
            if (id.length > 1) {
                var target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({ top: top, behavior: "smooth" });
                }
            }
        });
    });

    /* ---------- Scrollspy: highlight active nav link ---------- */
    var sections = ["home", "about", "skill", "service", "process", "project", "contact"]
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    var navLinks = navCollapse ? navCollapse.querySelectorAll("a") : [];

    function onScrollSpy() {
        var pos = window.pageYOffset + 120;
        var current = sections[0].id;
        sections.forEach(function (sec) {
            if (sec.offsetTop <= pos) current = sec.id;
        });
        navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + current);
        });
    }
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    onScrollSpy();

    /* ---------- Back to top ---------- */
    var backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 300) backToTop.classList.add("show");
            else backToTop.classList.remove("show");
        }, { passive: true });
        backToTop.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var revObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { revObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("show"); });
    }

    /* ---------- Counters ---------- */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-target"), 10) || 0;
        var duration = 1600, start = null;
        function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window && counters.length) {
        var cObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    cObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { cObserver.observe(el); });
    } else {
        counters.forEach(function (el) { el.textContent = el.getAttribute("data-target"); });
    }

    /* ---------- Progress bars ---------- */
    var bars = document.querySelectorAll(".progress-bar[data-width]");
    function fillBars(container) {
        container.querySelectorAll(".progress-bar[data-width]").forEach(function (bar) {
            bar.style.width = bar.getAttribute("data-width") + "%";
        });
    }
    if ("IntersectionObserver" in window && bars.length) {
        var pObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    fillBars(entry.target.closest(".row") || entry.target.parentElement);
                    pObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        bars.forEach(function (bar) { pObserver.observe(bar); });
    } else {
        document.querySelectorAll(".progress").forEach(function (p) { fillBars(p); });
    }

    /* ---------- Typed text ---------- */
    var typedOut = document.querySelector(".typed-text-output");
    var typedSrc = document.querySelector(".typed-text");
    if (typedOut && typedSrc) {
        var words = typedSrc.textContent.split(",").map(function (w) { return w.trim(); });
        var w = 0, c = 0, deleting = false;
        function tick() {
            var full = words[w];
            if (deleting) {
                c--;
            } else {
                c++;
            }
            typedOut.textContent = full.substring(0, c);
            var delay = deleting ? 45 : 95;
            if (!deleting && c === full.length) {
                delay = 1600; deleting = true;
            } else if (deleting && c === 0) {
                deleting = false; w = (w + 1) % words.length; delay = 350;
            }
            setTimeout(tick, delay);
        }
        tick();
    }

    /* ---------- Tabs ---------- */
    var tabButtons = document.querySelectorAll(".tabs-nav button");
    tabButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var id = btn.getAttribute("data-tab");
            tabButtons.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            document.querySelectorAll(".tab-pane").forEach(function (pane) {
                pane.classList.toggle("active", pane.id === id);
            });
        });
    });

    /* ---------- Portfolio filter ---------- */
    var filters = document.getElementById("filters");
    if (filters) {
        var items = document.querySelectorAll("#portfolio .portfolio-item");
        filters.querySelectorAll("li").forEach(function (li) {
            li.addEventListener("click", function () {
                filters.querySelectorAll("li").forEach(function (x) { x.classList.remove("active"); });
                li.classList.add("active");
                var filter = li.getAttribute("data-filter");
                items.forEach(function (item) {
                    var show = filter === "*" || item.classList.contains(filter.substring(1));
                    item.style.display = show ? "" : "none";
                });
            });
        });
    }

    /* ---------- Lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
        var lbImg = lightbox.querySelector("img");
        document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                lbImg.src = btn.getAttribute("data-lightbox");
                lightbox.classList.add("open");
            });
        });
        lightbox.querySelector(".close").addEventListener("click", function () {
            lightbox.classList.remove("open");
        });
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) lightbox.classList.remove("open");
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") lightbox.classList.remove("open");
        });
    }

    /* ---------- Contact form (delivered to owner's email via Web3Forms) ---------- */
    var form = document.getElementById("contactForm");
    if (form) {
        var submitBtn = form.querySelector('button[type="submit"]');
        var successMsg = document.getElementById("formSuccess");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var data = Object.fromEntries(new FormData(form).entries());
            data.subject = data.subject || "New message from your portfolio";
            data.message = "Name: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message;

            function fallbackMailto() {
                var body = "Name: " + data.name + "%0AEmail: " + data.email + "%0A%0A" + data.message;
                window.location.href = "mailto:nhyiraappiah159@gmail.com?subject=" +
                    encodeURIComponent(data.subject) + "&body=" + body;
                if (successMsg) successMsg.classList.remove("d-none");
                form.reset();
            }

            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(data)
            })
                .then(function (res) { return res.json(); })
                .then(function (json) {
                    if (json.success) {
                        if (successMsg) successMsg.classList.remove("d-none");
                        form.reset();
                    } else {
                        fallbackMailto();
                    }
                })
                .catch(function () { fallbackMailto(); })
                .finally(function () {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send Message"; }
                });
        });
    }
})();
