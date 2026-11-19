const $ = (selector) => document.querySelector(selector);

$("#startButton").addEventListener("click", () => {
  $("#welcome").classList.add("fade-away");
  setTimeout(() => {
    $("#welcome").style.display = "none";
    $("#story").classList.remove("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 450);
});

function openMessage(title, message) {
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = message;
  $("#modal").classList.add("open");
}
document.querySelectorAll(".timeline-card").forEach(card => {
  card.addEventListener("click", () => openMessage(card.dataset.title, card.dataset.message));
});
document.querySelectorAll(".reason").forEach(card => {
  card.addEventListener("click", () => openMessage("A little reason ♡", card.dataset.message));
});
$(".close-modal").addEventListener("click", () => $("#modal").classList.remove("open"));
$("#modal").addEventListener("click", e => {
  if (e.target === $("#modal")) $("#modal").classList.remove("open");
});

document.querySelectorAll(".memory").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (!img || !img.getAttribute("src")) return;
    $("#lightboxImage").src = img.src;
    $("#lightboxCaption").textContent = card.dataset.caption;
    $("#lightbox").classList.add("open");
  });
});
function closeLightbox(){ $("#lightbox").classList.remove("open"); }
$(".lightbox-close").addEventListener("click", closeLightbox);
$("#lightbox").addEventListener("click", e => { if(e.target === $("#lightbox")) closeLightbox(); });

$("#envelope").addEventListener("click", () => $("#letterModal").classList.add("open"));
$(".close-letter").addEventListener("click", () => $("#letterModal").classList.remove("open"));
$("#letterModal").addEventListener("click", e => {
  if(e.target === $("#letterModal")) $("#letterModal").classList.remove("open");
});

$("#finalButton").addEventListener("click", () => {
  $("#finalMessage").classList.toggle("show");
  $("#finalButton").textContent = $("#finalMessage").classList.contains("show")
    ? "Sending you a thousand hugs ♡" : "One last surprise ♡";
  burstHearts(24);
});

function burstHearts(count) {
  const container = $(".ambient-hearts");
  for(let i=0;i<count;i++){
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > .5 ? "♡" : "♥";
    heart.style.left = Math.random()*100 + "%";
    heart.style.fontSize = (13+Math.random()*18)+"px";
    heart.style.animationDuration = (5+Math.random()*5)+"s";
    container.appendChild(heart);
    setTimeout(()=>heart.remove(),11000);
  }
}
setInterval(()=>burstHearts(1),1700);

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    $("#modal").classList.remove("open");
    $("#lightbox").classList.remove("open");
    $("#letterModal").classList.remove("open");
  }
});
