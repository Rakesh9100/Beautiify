//preoader code
function preloader(){
    function revealTospan() {
        document.querySelectorAll(".reveal")
            .forEach(function (elem) {
                // create 2 spans
                let parent = document.createElement("span");
                let child = document.createElement("span")
    
                // Giving class to both parent and and child spans
                parent.classList.add("parent");
                child.classList.add("child");
    
                child.innerHTML = elem.innerHTML; // text content of elem assigned to child
                parent.appendChild(child); // put child inside parent
    
                elem.innerHTML = "";
                elem.appendChild(parent);
    
                // Logging for verification
                console.log(elem); // Logging the element after modification
            })
    }
    
    revealTospan();
    
    var t1= gsap.timeline();
    
    gsap.from(".topheading h5",{
        x:120,
        opacity:0,
        stagger:.2,
        duration:1.35,
        color: "green",
        ease: Power3.easeInOut
        })
    
    t1.from(".child span",{
    x:120,
    opacity:0,
    stagger:.2,
    duration:1.5,
    color: "green",
    ease: Power3.easeInOut
    })
    
    t1.to(".parent .child", {
        y: "-100%", 
        duration: 1,
        ease: Power3.easeInOut
    });
    
    t1.to(".loader", {
        height:0,
        duration: 1,
        ease: Power3.easeInOut
    });
    
    t1.to(".green", {
        height:"100%",
        top:0,
        delay:-1,
        duration: 1,
        ease: Power3.easeInOut
    });
    t1.to(".green", {
        height:"0%",
        delay:-.2,
        duration: 1,
        ease: Power3.easeInOut
    });
    t1.from(".main", {
        display: "none",
        delay: 0.2,
        duration: 1,
        transition: "all 0.2s ease",
        ease: Power3.easeInOut,
        onComplete: function () {
            document.querySelector(".main").style.display = "block";
            document.querySelector(".loader").style.overflow = "visible";
          },
      });
    }
preloader();
    
    
    // rest script
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    hamburger.addEventListener("click", mobileMenu);
    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
    
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach(n => n.addEventListener("click", closeMenu));
    
    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
    
    let calcScrollValue = () => {
        let scrollProg = document.getElementById("progress");
        let pos = document.documentElement.scrollTop;
        let calcHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);
        if (pos > 100) {
            scrollProg.style.display = "grid";
        } else {
            scrollProg.style.display = "none";
        }
        scrollProg.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
        });
        scrollProg.style.background = `conic-gradient(#0063ba ${scrollValue}%, #d499de ${scrollValue}%)`;
    };
    
    window.addEventListener('scroll', function () {
        var scrollToTopButton = document.getElementById('progress');
        if (window.pageYOffset > 200) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
    
    document.getElementById("year").textContent = new Date().getFullYear();