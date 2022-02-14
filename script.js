(function init() {
    gsap.registerPlugin(ScrollTrigger);


    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

})();

gsap.to("#three", {
    scrollTrigger: {
        trigger: "#scnd",
        start: "top top",
        scroller: "#main",
        pin: true,
        scrub: 2,
    },
    top: '-60%',
    onUpdate: ()=>{
        let img = document.querySelector("#three");
        let imgRect = document.querySelector("#three").getBoundingClientRect().top;
        let val = Math.floor(imgRect*.007);
        console.log(imgRect);
        let scalingRange = gsap.utils.mapRange(10, -10, 1, 2, val);
        img.style.transform = `translate(-50%, 0) scale(${scalingRange}) rotate3d(1,1,0,${imgRect*.08}deg)`
    }
})

gsap.to("#sctext .text h1", {
    repeat: -1,
    x: "-100%",
    ease: "linear",
    duration: 4
})

const elems = document.querySelectorAll(".elems");
elems.forEach(elem => {
    elem.addEventListener("mousemove", function(dets){
        elem.children[1].style.opacity = 1;
        elem.children[1].style.transform = `translate(-50%,-50%) translate(${dets.screenX*.3}px, -${dets.screenY*.05}px) rotate(${dets.screenX*.03}deg)`;
    });

    elem.addEventListener("mouseleave", function(){
        elem.children[1].style.opacity = 0;
    });
})


let texts = document.querySelectorAll(".texta");

gsap.set(".texta", {opacity: 0})

texts.forEach(t => {
    gsap.to(t, {
        scrollTrigger: {
            trigger: t,
            scroller: "#main",
            start: "top 100%"
        },
        opacity: 1,
        onStart: function(){
            $(t).textillate({ in: { effect: 'fadeInUp' } });
        }
    })
})

let val = document.querySelector(".screen").getBoundingClientRect().left;

document.querySelector("#home").addEventListener("scroll", function(){
    let newval = document.querySelector(".screen").getBoundingClientRect().left;
    let skewedval = Math.floor((newval - val)*.6);
    document.querySelectorAll(".photu").forEach(photu => {
        photu.style.transform = `skew(${skewedval}deg)`;
    })
    val = newval;
})

document.querySelector("#cross").addEventListener("click", function(){
    document.querySelector("#fullnav").style.transform = "translateX(0%)"
});

document.querySelector("#menu").addEventListener("click", function(){
    document.querySelector("#fullnav").style.transform = "translateX(100%)"
});