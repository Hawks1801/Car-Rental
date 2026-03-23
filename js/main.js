(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });

    // Chatbot Injection
    const chatbotHTML = `
        <div class="chatbot-toggle" id="chatToggle">
            <i class="fa fa-comments"></i>
        </div>
        <div class="chatbot-container" id="chatContainer">
            <div class="chatbot-header">
                <span>VM Rental Assistant</span>
                <i class="fa fa-times" id="closeChat" style="cursor: pointer;"></i>
            </div>
            <div class="chatbot-messages" id="chatMessages">
                <div class="message bot">Hello! How can I help you today?</div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="chatInput" placeholder="Type your message...">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Chatbot Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatContainer.style.display = 'flex';
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.style.display = 'none';
        });
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        input = input.toLowerCase();
        if (input.includes('price') || input.includes('cost')) return "Our rental prices start from 30,000/Day for Audi A4. Check the Cars page for more details!";
        if (input.includes('location') || input.includes('where')) return "We are based in Nikol, Ahmedabad, India. We have many pickup points!";
        if (input.includes('contact') || input.includes('phone')) return "You can reach us at +91 8128680855 or ramavatvraj@gmail.com";
        if (input.includes('ev') || input.includes('electric') || input.includes('charge')) return "We have a premium electric fleet and a new EV Charging Map feature! Check out the EV Charging page.";
        if (input.includes('hello') || input.includes('hi')) return "Hello! How can I help you with your car rental today?";
        return "I'm not sure about that. Please contact our support or visit our contact page for more help!";
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim() !== '') {
                const userText = chatInput.value.trim();
                addMessage(userText, 'user');
                chatInput.value = '';
                
                setTimeout(() => {
                    const botResponse = getBotResponse(userText);
                    addMessage(botResponse, 'bot');
                }, 500);
            }
        });
    }

    // Voice Search Logic
    const voiceBtns = document.querySelectorAll('.voice-search-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        voiceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetInputId = this.getAttribute('data-target');
                const targetInput = document.getElementById(targetInputId);
                
                recognition.start();
                this.classList.add('listening');

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    if (targetInput) targetInput.value = transcript;
                    this.classList.remove('listening');
                };

                recognition.onspeechend = () => {
                    recognition.stop();
                    this.classList.remove('listening');
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    this.classList.remove('listening');
                };
            });
        });
    } else {
        voiceBtns.forEach(btn => btn.style.display = 'none');
        console.warn("Speech Recognition API not supported in this browser.");
    }
    
})(jQuery);

