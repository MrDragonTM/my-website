document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ЛОГИКА ДЛЯ АУДИОПЛЕЕРА (Страница Биография)
    // ==========================================
    const audio = document.getElementById('audio');
    
    if (audio) {
        try {
            const playBtn = document.getElementById('play-btn');
            const pauseBtn = document.getElementById('pause-btn');
            const volumeSlider = document.getElementById('volume-slider');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');

            if (playBtn && pauseBtn) {
                playBtn.addEventListener('click', () => {
                    if (audio.paused || audio.ended) {
                        audio.play();
                        playBtn.innerHTML = '<span class="icon">■</span> Выключить';
                        pauseBtn.style.display = 'inline-flex'; 
                        pauseBtn.innerHTML = '<span class="icon">⏸</span> Пауза';
                    } else {
                        audio.pause();
                        audio.currentTime = 0;
                        progressBar.style.width = '0%';
                        playBtn.innerHTML = '<span class="icon">▶</span> Включить';
                        pauseBtn.style.display = 'none';
                    }
                });

                pauseBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        audio.play();
                        pauseBtn.innerHTML = '<span class="icon">⏸</span> Пауза';
                    } else {
                        audio.pause();
                        pauseBtn.innerHTML = '<span class="icon">▶</span> Продолжить';
                    }
                });
            }

            if (volumeSlider) {
                volumeSlider.addEventListener('input', (e) => {
                    audio.volume = e.target.value;
                });
            }

            if (progressBar) {
                audio.addEventListener('timeupdate', () => {
                    if (audio.duration) {
                        const percent = (audio.currentTime / audio.duration) * 100;
                        progressBar.style.width = percent + '%';
                    }
                });
            }

            if (progressContainer) {
                progressContainer.addEventListener('click', (e) => {
                    const rect = progressContainer.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const width = rect.width;
                    audio.currentTime = (clickX / width) * audio.duration;
                });
            }

            audio.addEventListener('ended', () => {
                audio.currentTime = 0;
                if(progressBar) progressBar.style.width = '0%';
                if(playBtn) playBtn.innerHTML = '<span class="icon">▶</span> Включить';
                if(pauseBtn) pauseBtn.style.display = 'none';
            });
        } catch (e) {
            console.log("Ошибка в аудиоплеере:", e);
        }
    }

    // ==========================================
    // 2. ЛОГИКА ДЛЯ ФОРМЫ (Страница Главная)
    // ==========================================
    const form = document.getElementById('forma');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nameValue = document.querySelector('input[type="text"]').value.trim();
            const genderChecked = document.querySelector('input[name="gender"]:checked');
            const roleValue = document.querySelector('select').value;

            if (nameValue !== '' && genderChecked !== null && roleValue !== '') {
                let genderText = genderChecked.value === 'm' ? "Мужской" : "Женский";
                alert(`Вы теперь в команде!\nВаше имя: ${nameValue}\nВаш пол: ${genderText}`);
                form.reset();
            } else {
                alert('Пожалуйста, заполните все поля!');
            }
        });
    }

    // ==========================================
    // 3. КНОПКА "НАВЕРХ" (На всех страницах)
    // ==========================================
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            // Более надежный способ узнать, прокручена ли страница
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
            if (scrollTop > 150) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        };

        window.addEventListener("scroll", toggleBackToTop);
        document.addEventListener("scroll", toggleBackToTop); // Дублируем для старых браузеров
        toggleBackToTop(); // Проверяем сразу при загрузке

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }

    // ==========================================
    // 4. ЛОГИКА ДЛЯ БУРГЕР-МЕНЮ (Мобильное меню)
    // ==========================================
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

});