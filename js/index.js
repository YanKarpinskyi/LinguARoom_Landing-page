const modal = document.getElementById('formModal');
const openBtn = document.querySelector('.join-btn');
const closeBtn = document.getElementById('closeFormBtn');
const form = document.getElementById('betaForm');
const countrySelect = document.getElementById('country');
const otherCountryInput = document.getElementById('otherCountry');

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

countrySelect.addEventListener('change', function() {
    if (this.value === 'other') {
        otherCountryInput.style.display = 'block';
        otherCountryInput.required = true;
    } else {
        otherCountryInput.style.display = 'none';
        otherCountryInput.required = false;
        otherCountryInput.value = '';
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(() => {
        alert('Thank you for your application!');
        form.reset();
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    })
    .catch(() => {
        alert('Thank you for your application!');
        form.reset();
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const questions = document.querySelectorAll('.question');
questions.forEach((question) => {
    const answer = question.nextElementSibling;
    const answerContent = answer ? answer.querySelector('.answer-content') : null;
    const arrow = question.querySelector('.faq-arrow');
    
    if (!answer || !answerContent || !question.dataset.answer) {
        return;
    }

    question.addEventListener('click', () => {
        const isOpen = answer.classList.contains('open');

        document.querySelectorAll('.answer').forEach(ans => ans.classList.remove('open'));
        document.querySelectorAll('.faq-arrow').forEach(arr => arr.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            answerContent.textContent = question.dataset.answer;
            answer.classList.add('open');
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        } else {
            answer.classList.remove('open');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        }
    });
});
