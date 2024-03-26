

function setTimeZone(){
    document.getElementById('timeZone').innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;

}

setTimeZone();

const timeCounter = document.getElementById('timerCounter');
function updateTime() {
    const n = new Date();
    const hours = String(n.getHours()).padStart(2, '0');
    const minutes = String(n.getMinutes()).padStart(2, '0');
    const seconds = String(n.getSeconds()).padStart(2, '0');
    timeCounter.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

updateTime();


const pageWidth = document.getElementById('pageWidth');
const pageHeight = document.getElementById('pageHeight')
function updateSize(){
    pageHeight.innerText = window.innerHeight;
    pageWidth.innerText = window.innerWidth;
}
updateSize();

window.addEventListener('resize', function() {
    updateSize()
});

window.addEventListener('load', function() {
    const loadTime = performance.now();
    const pageLoadTimeInSeconds = (loadTime / 1000).toFixed(2);
    document.getElementById('loadTime').innerText = (loadTime / 1000).toFixed(2);
});

const enterImage = document.getElementById('enterImage');
const reveal = document.getElementById('revealBackground');
function triggerReveal(){
    if(reveal.classList.contains('trigger'))
        return;

    const rect = enterImage.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + window.scrollX;
    const y = rect.top + rect.height / 2 + window.scrollY;
    reveal.style.top = y + 'px';
    reveal.style.left = x + 'px';
    reveal.classList.add('trigger');
    setTimeout(()=>{
        document.querySelector('body').classList.add('reveal');
    },1050)

    setupTypeAhead(8);
}

function enterEntered(){
    enterImage.src = 'assets/img/enter-pressed.png';
}
function enterLeft(){
    enterImage.src = 'assets/img/enter.png';
}

enterImage.addEventListener('mouseenter', ()=>{
    enterEntered();
    triggerReveal();
});
enterImage.addEventListener('touchstart', ()=>{
    enterEntered();
    triggerReveal();
});
enterImage.addEventListener('touchend', enterLeft);
enterImage.addEventListener('touchcancel', enterLeft);
enterImage.addEventListener('mouseleave', enterLeft);


document.getElementById('message-form').addEventListener('submit', function(event){
    event.preventDefault();

    Swal.fire({
        title: "Message sent!",

        icon: "success"
    });
});

window.scrollTo({
    top: 0,
});

const allTyping = Array.from(document.querySelectorAll('.type-ahead'));
function setupTypeAhead(speed) {


    window.addEventListener('scroll', function(){
        const windowHeight = window.innerHeight;
        const removals = [];
        for (let i = 0; i < allTyping.length; i++) {
            const typeAhead = allTyping[i];
            const position = typeAhead.getBoundingClientRect().top;

            if (position - 30 < windowHeight) {
                removals.push(typeAhead);

                const sourceElement = typeAhead.querySelector('.type-ahead .original');
                const destinationElement = typeAhead.querySelector('.type-ahead .typing');
                const text = sourceElement.textContent.trim();
                let index = 0;
                const height = typeAhead.getBoundingClientRect().height + 'px';
                typeAhead.style.height = height;
                typeAhead.style.maxHeight = height;
                function moveCharacter() {
                    sourceElement.textContent = sourceElement.textContent.substring(1);
                    destinationElement.textContent += text[index];
                    index++;
                    if (index >= text.length) {
                        clearInterval(intervalId);
                        setTimeout(()=> {
                            typeAhead.style.height = '';
                            typeAhead.style.maxHeight = '';
                        },150)
                    }

                }

                const intervalId = setInterval(moveCharacter, speed);
            }


        }

        removals.forEach(el => {
            allTyping.splice(allTyping.indexOf(el),1)
        })

    });
    window.dispatchEvent(new Event('scroll'));


}

const submitButton = document.querySelector('#message-form button')
function submitPressed(){
    submitButton.style.backgroundImage = 'url("assets/img/button-background-pressed.svg")';
}
function submitLeft(){
    submitButton.style.backgroundImage = '';
}
submitButton.addEventListener('touchstart', submitPressed);
submitButton.addEventListener('touchend', submitLeft);
submitButton.addEventListener('touchcancel', submitLeft);
submitButton.addEventListener('mousedown', submitPressed);
submitButton.addEventListener('mouseup', submitLeft);
submitButton.addEventListener('mouseleave', submitLeft);