window.onload = function() {
    const slides = document.querySelectorAll(".step");
    const dots = document.querySelectorAll(".dot");
    const continueBtn = document.querySelector(".continue-btn");
    const inputEmail = document.querySelector("input[type='email']");
    const inputName = document.querySelector("input[type='text']");
    const stepInfo = document.querySelector(".step-info");
    const topics = document.querySelectorAll(".topics-list li");

    const slider = function() {
        let currentSlide = 0;
        const maxSlide = slides.length;

        const currentStep = function(slide) {
            stepInfo.innerHTML = `Step ${slide + 1} of ${maxSlide}`;
        }

        const doneStep = function(slide) {
            document.querySelector(`.dot[data-dot='${slide - 1}']`).classList.add("done-step");
        }

        const activeDot = function(slide) {
            dots.forEach(dot => dot.classList.remove("current-dot"));
    
            document.querySelector(`.dot[data-dot="${slide}"`).classList.add("current-dot");
        }
        
        const activeSlider = function(slide) {
            slides.forEach(slide => slide.classList.remove("current-slide"));

            document.querySelector(`.step[data-slide="${slide}"]`).classList.add("current-slide");
        }
    
        const goToSlide = function(slide) {
            slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
        }
    
        const nextSlide = function() {
            if(currentSlide < maxSlide - 1) {
                currentSlide++;
            }
            if(currentSlide === maxSlide -1) {
                continueBtn.innerHTML = "Confirm";
            }

            doneStep(currentSlide);
            currentStep(currentSlide);
            goToSlide(currentSlide);
            activeDot(currentSlide);
            activeSlider(currentSlide);
        }

        const init = function() {
            goToSlide(0);
            activeDot(0);
            activeSlider(0);
        }
        init();

        continueBtn.addEventListener("click", nextSlide);
    }
    
    const confirmAlert = () => {
        if(continueBtn.textContent === "Confirm") {
            alert("✅ Success");
        }
    }

    const verifyInputs = () => {
        const inputs = [inputName, inputEmail];
        
        continueBtn.setAttribute("disabled", "disabled");
        
        const verifyMail = (email) => {
            const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return reg.test(email);
        }

        const verifyName = (name) => {
            if(name.length > 0) {
                return true;
            }
        }

        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if(verifyName(inputs[0].value) && verifyMail(inputs[1].value)) {
                    continueBtn.removeAttribute("disabled");
                }
            });
        });

    }
    const chosenTopics = () => {
        
        topics.forEach(item => {
            item.addEventListener("click", (e) => {
                const clicked = e.target;
                clicked.classList.toggle("chosen");
            });
        });

    }

    const summaryStep = () => {
        const summaryName = document.querySelector(".summary-name");
        const summaryMail = document.querySelector(".summary-email");
        const topicsSummary = document.querySelectorAll(".summary-topics ul");
        const topicsChosen = document.querySelectorAll(".chosen");

        summaryName.textContent = `Name: ${inputName.value}`;
        summaryMail.textContent = `Email: ${inputEmail.value}`;
        topicsChosen.forEach(topic => {
            let html = `<li><strong>${topic}</strong></li>`;
            topicsSummary.insertAdjacentHTML("beforeend", html);
        });


    }



    
    verifyInputs();
    
    chosenTopics();

    confirmAlert();

    summaryStep();

    slider();


}