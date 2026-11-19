document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ЛОГИКА ДЛЯ АУДИОПЛЕЕРА
    // ==========================================
    const audio = document.getElementById('audio');
    
    if (audio) {
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');

        // 1. Кнопка "Включить / Выключить"
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

        // 2. Кнопка "Пауза / Продолжить"
        pauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                pauseBtn.innerHTML = '<span class="icon">⏸</span> Пауза';
            } else {
                audio.pause();
                pauseBtn.innerHTML = '<span class="icon">▶</span> Продолжить';
            }
        });

        // 3. Ползунок громкости
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });

        // 4. Обновление полосы прогресса
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = percent + '%';
            }
        });

        // 5. Перемотка по клику
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            audio.currentTime = (clickX / width) * audio.duration;
        });

        // 6. Что происходит, если трек доиграл до конца
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            progressBar.style.width = '0%';
            
            // Возвращаем все в исходное состояние
            playBtn.innerHTML = '<span class="icon">▶</span> Включить';
            pauseBtn.style.display = 'none';
        });
    }

    // ==========================================
    // 2. ЛОГИКА ДЛЯ ФОРМЫ
    // ==========================================
    const form = document.getElementById('forma');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nameValue = document.querySelector('input[type="text"]').value.trim();
            const genderChecked = document.querySelector('input[name="gender"]:checked');
            const roleValue = document.querySelector('select').value;

            if (nameValue !== '' && genderChecked !== null && roleValue !== '') {
                
                let genderText = "";
                if (genderChecked.value === 'm') {
                    genderText = "Мужской";
                } else {
                    genderText = "Женский";
                }

                alert(`Вы теперь в команде!\nВаше имя: ${nameValue}\nВаш пол: ${genderText}`);
                
                form.reset();
                
            } else {
                alert('Пожалуйста, заполните все поля!');
            }
        });
    }

    // ==========================================
    // 3. КНОПКА "НАВЕРХ"
    // ==========================================
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    // ==========================================
    // 4. ЛОГИКА ДЛЯ БУРГЕР-МЕНЮ (Мобильное меню)
    // ==========================================
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            // Переключаем класс active у кнопки (анимация в крестик)
            burgerMenu.classList.toggle('active');
            // Переключаем класс active у меню (показ/скрытие)
            navMenu.classList.toggle('active');
        });
    }

});