/**
 * FABÍOLA REIS | PSICANÁLISE CLÍNICA & FORENSE
 * Script Cinematográfico de Conversão & Autoavaliação
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualização do Ano no Rodapé
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        mobileToggle?.setAttribute('aria-expanded', String(isOpen));
        mobileToggle?.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        navMenu?.setAttribute('aria-hidden', String(!isOpen));
        mobileOverlay?.setAttribute('aria-hidden', String(!isOpen));
    };

    const closeMenu = () => {
        navMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        mobileToggle?.setAttribute('aria-expanded', 'false');
        mobileToggle?.setAttribute('aria-label', 'Abrir menu');
        navMenu?.setAttribute('aria-hidden', 'true');
        mobileOverlay?.setAttribute('aria-hidden', 'true');
    };

    if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.addEventListener('click', toggleMenu);
    }
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu?.classList.contains('open')) closeMenu();
    });
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // 4. Active Nav Item on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 220;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(headerBtn => {
        headerBtn.addEventListener('click', () => {
            const item = headerBtn.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Fechar outros itens
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                headerBtn.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                headerBtn.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 6. Interactive Quiz Logic (Autoavaliação Emocional)
    const questionScreens = document.querySelectorAll('.quiz-question-screen');
    const totalQuestions = questionScreens.length;
    const progressFill = document.getElementById('quizProgress');
    const stepIndicator = document.getElementById('quizStepIndicator');
    const questionsWrap = document.getElementById('quizQuestionsWrap');
    const resultScreen = document.getElementById('quizResultScreen');
    const resultLevelBadge = document.getElementById('resultLevelBadge');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');
    const btnQuizWhatsappResult = document.getElementById('btnQuizWhatsappResult');
    const btnRestartQuiz = document.getElementById('btnRestartQuiz');

    let currentStep = 1;
    let totalScore = 0;
    const WHATSAPP_PHONE = '5524920003702'; // Número oficial Dra. Fabíola Reis

    const optButtons = document.querySelectorAll('.quiz-opt');

    optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const points = parseInt(btn.getAttribute('data-points'), 10) || 0;
            totalScore += points;

            if (currentStep < totalQuestions) {
                currentStep++;
                showStep(currentStep);
            } else {
                finishQuiz();
            }
        });
    });

    function showStep(step) {
        questionScreens.forEach(screen => {
            const screenStep = parseInt(screen.getAttribute('data-step'), 10);
            if (screenStep === step) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        const progressPercent = (step / totalQuestions) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        if (stepIndicator) stepIndicator.textContent = `Pergunta ${step} de ${totalQuestions}`;
    }

    function finishQuiz() {
        if (questionsWrap) questionsWrap.style.display = 'none';
        if (stepIndicator) stepIndicator.style.display = 'none';
        if (progressFill) progressFill.style.width = '100%';
        if (resultScreen) resultScreen.style.display = 'block';

        let levelName = '';
        let titleText = '';
        let descText = '';
        let whatsappMessage = '';

        if (totalScore <= 7) {
            levelName = 'Sobrecarga Leve a Moderada';
            titleText = 'Sinais Iniciais de Anulação e Desgaste';
            descText = 'Você ainda preserva certa autonomia, mas já percebe episódios recorrentes de dúvida, culpa e concessões dolorosas. A análise clínica atua de forma preventiva e fortalecedora para que você preserve suas fronteiras emocionais.';
            whatsappMessage = 'Olá, Dra. Fabíola! Fiz a autoavaliação no seu site e meu resultado indicou Sobrecarga Leve/Moderada. Gostaria de entender como as sessões podem me ajudar a blindar minha autoestima.';
        } else if (totalScore <= 12) {
            levelName = 'Sobrecarga Significativa & Dependência Emocional';
            titleText = 'Desgaste Psíquico Acentuado e Perda de Identidade';
            descText = 'Suas respostas apontam que o relacionamento está consumindo grande parte da sua energia. O medo de ficar sozinha, o pânico de romper e o hábito de "pisar em ovos" indicam uma dependência estabelecida que exige acompanhamento especializado.';
            whatsappMessage = 'Olá, Dra. Fabíola! Fiz o teste no site e meu resultado deu Sobrecarga Significativa e Dependência Emocional. Preciso de suporte para quebrar esse ciclo.';
        } else {
            levelName = 'Sobrecarga Crônica & Alerta de Abuso Narcisista';
            titleText = 'Seu Estado Emocional Exige Acolhimento Imediato';
            descText = 'Suas respostas refletem profundo esgotamento, perda da lucidez por Gaslighting e crises de ansiedade severa. Você foi silenciada por muito tempo. Um espaço clínico de escuta protegida �� urgente para a reconstrução da sua história.';
            whatsappMessage = 'Olá, Dra. Fabíola! Realizei a autoavaliação e meu resultado apontou Sobrecarga Crônica e Alerta de Abuso. Decidi não desistir de mim e gostaria de agendar uma sessão com você.';
        }

        if (resultLevelBadge) resultLevelBadge.textContent = levelName;
        if (resultTitle) resultTitle.textContent = titleText;
        if (resultDesc) resultDesc.textContent = descText;

        if (btnQuizWhatsappResult) {
            btnQuizWhatsappResult.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
        }
    }

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener('click', () => {
            currentStep = 1;
            totalScore = 0;
            if (questionsWrap) questionsWrap.style.display = 'block';
            if (stepIndicator) stepIndicator.style.display = 'block';
            if (resultScreen) resultScreen.style.display = 'none';
            showStep(1);
        });
    }

    // 7. AGENTE SIMULADO DE ACOLHIMENTO E CAPTAÇÃO (ALTO PADRÃO / PSICANÁLISE)
    class AcolhimentoAgent {
        constructor() {
            this.WHATSAPP_PHONE = '5524920003702';
            this.modalBackdrop = document.getElementById('acolhimentoModalBackdrop');
            this.modalWindow = document.getElementById('acolhimentoModalWindow');
            this.triggerBtn = document.getElementById('acolhimentoTriggerBtn');
            this.tooltip = document.getElementById('acolhimentoTooltip');
            this.tooltipOpenTrigger = document.getElementById('tooltipOpenTrigger');
            this.tooltipCloseBtn = document.getElementById('tooltipCloseBtn');
            this.closeBtn = document.getElementById('chatCloseBtn');
            this.resetBtn = document.getElementById('chatResetBtn');
            this.messagesContainer = document.getElementById('chatMessagesContainer');
            this.interactiveFooter = document.getElementById('chatInteractiveFooter');

            this.state = {
                isOpen: false,
                currentStep: 1,
                hasStarted: false,
                userData: {
                    name: '',
                    reason: '',
                    modality: '',
                    timeSlot: ''
                }
            };

            this.init();
        }

        init() {
            if (!this.modalBackdrop || !this.triggerBtn) return;

            // Event Listeners de Abertura e Fechamento
            this.triggerBtn.addEventListener('click', () => this.open());
            if (this.tooltipOpenTrigger) {
                this.tooltipOpenTrigger.addEventListener('click', () => this.open());
            }
            if (this.tooltipCloseBtn) {
                this.tooltipCloseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.tooltip.classList.add('hidden');
                });
            }

            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.close());
            }
            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', () => this.reset());
            }

            this.modalBackdrop.addEventListener('click', (e) => {
                if (e.target === this.modalBackdrop) {
                    this.close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.state.isOpen) {
                    this.close();
                }
            });

            // Conectar outros gatilhos espalhados pela landing page
            document.querySelectorAll('.btn-open-agent-trigger').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open();
                });
            });
        }

        open() {
            this.state.isOpen = true;
            this.modalBackdrop.classList.add('active');
            this.modalBackdrop.setAttribute('aria-hidden', 'false');
            if (this.tooltip) {
                this.tooltip.classList.add('hidden');
            }

            if (!this.state.hasStarted) {
                this.state.hasStarted = true;
                this.startFlow();
            } else {
                this.scrollToBottom();
                const input = this.interactiveFooter.querySelector('.chat-text-input');
                if (input) input.focus();
            }
        }

        close() {
            this.state.isOpen = false;
            this.modalBackdrop.classList.remove('active');
            this.modalBackdrop.setAttribute('aria-hidden', 'true');
        }

        reset() {
            this.state.currentStep = 1;
            this.state.userData = { name: '', reason: '', modality: '', timeSlot: '' };
            this.clearMessages();
            this.startFlow();
        }

        clearMessages() {
            if (!this.messagesContainer) return;
            this.messagesContainer.innerHTML = `
                <div class="chat-security-banner">
                    <i class="fa-solid fa-lock"></i>
                    <span>Canal Seguro & Confidencial • Psicanálise Clínica</span>
                </div>
            `;
            this.interactiveFooter.innerHTML = '';
        }

        scrollToBottom() {
            if (!this.messagesContainer) return;
            setTimeout(() => {
                this.messagesContainer.scrollTo({
                    top: this.messagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }, 50);
        }

        showTyping() {
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-msg-row bot chat-typing-row';
            typingEl.id = 'chatTypingIndicator';
            typingEl.innerHTML = `
                <div class="chat-mini-avatar">
                    <img src="assets/logo.png" alt="Dra. Fabíola Reis">
                </div>
                <div class="chat-typing-bubble">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            `;
            this.messagesContainer.appendChild(typingEl);
            this.scrollToBottom();
        }

        hideTyping() {
            const typingEl = document.getElementById('chatTypingIndicator');
            if (typingEl) typingEl.remove();
        }

        async addBotMessage(htmlContent, delayMs = 550) {
            this.showTyping();
            await new Promise(resolve => setTimeout(resolve, delayMs));
            this.hideTyping();

            const msgEl = document.createElement('div');
            msgEl.className = 'chat-msg-row bot';
            msgEl.innerHTML = `
                <div class="chat-mini-avatar">
                    <img src="assets/logo.png" alt="Dra. Fabíola Reis">
                </div>
                <div class="chat-bubble bot">
                    ${htmlContent}
                </div>
            `;
            this.messagesContainer.appendChild(msgEl);
            this.scrollToBottom();
        }

        addUserMessage(textContent) {
            const msgEl = document.createElement('div');
            msgEl.className = 'chat-msg-row user';
            msgEl.innerHTML = `
                <div class="chat-bubble user">
                    ${this.escapeHtml(textContent)}
                </div>
            `;
            this.messagesContainer.appendChild(msgEl);
            this.scrollToBottom();
        }

        escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        async startFlow() {
            this.state.currentStep = 1;
            this.clearMessages();

            // Passo 1: Mensagens Iniciais de Acolhimento
            await this.addBotMessage("Olá. Seja muito bem-vindo(a) ao espaço de acolhimento da <strong>Dra. Fabíola Reis</strong>.", 450);
            await this.addBotMessage("Aqui, cada sessão é conduzida sob rigoroso <strong>sigilo clínico, escuta atenta e respeito</strong> ao seu momento.", 650);
            await this.addBotMessage("Como podemos chamar você?", 500);

            this.renderNameInput();
        }

        renderNameInput() {
            this.interactiveFooter.innerHTML = `
                <form class="chat-input-form" id="chatNameForm">
                    <input type="text" class="chat-text-input" id="chatNameInput" placeholder="Digite seu nome..." autocomplete="name" required>
                    <button type="submit" class="chat-send-btn" id="chatNameSubmit" aria-label="Enviar nome">
                        <span>OK</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </form>
            `;

            const form = document.getElementById('chatNameForm');
            const input = document.getElementById('chatNameInput');
            input.focus();

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = input.value.trim();
                if (!name) return;

                this.state.userData.name = name;
                this.interactiveFooter.innerHTML = '';
                this.addUserMessage(name);

                this.runStep2();
            });
        }

        async runStep2() {
            this.state.currentStep = 2;
            const name = this.state.userData.name;

            await this.addBotMessage(`É um prazer receber você, <strong>${this.escapeHtml(name)}</strong>. O que motivou a sua busca pelo processo psicanalítico neste momento?`, 550);

            const reasons = [
                { text: "Ansiedade, Angústia e Esgotamento", icon: "fa-cloud-bolt" },
                { text: "Conflitos nos Relacionamentos", icon: "fa-heart-crack" },
                { text: "Autoconhecimento & Transição de Ciclo", icon: "fa-compass" },
                { text: "Luto, Traumas e Perdas", icon: "fa-leaf" },
                { text: "Outras Questões Pessoais", icon: "fa-comment-dots" }
            ];

            let chipsHtml = `<div class="chat-chips-grid">`;
            reasons.forEach(r => {
                chipsHtml += `
                    <button type="button" class="chat-chip-btn" data-reason="${r.text}">
                        <span><i class="fa-solid ${r.icon}" style="margin-right: 6px;"></i> ${r.text}</span>
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                `;
            });
            chipsHtml += `</div>`;

            this.interactiveFooter.innerHTML = chipsHtml;
            this.scrollToBottom();

            this.interactiveFooter.querySelectorAll('.chat-chip-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const reason = btn.getAttribute('data-reason');
                    this.state.userData.reason = reason;
                    this.interactiveFooter.innerHTML = '';
                    this.addUserMessage(reason);
                    this.runStep3();
                });
            });
        }

        async runStep3() {
            this.state.currentStep = 3;
            await this.addBotMessage("Compreendo perfeitamente. Qual formato de atendimento melhor atende à sua rotina?", 550);

            const options = [
                {
                    title: "Online (Atendimento Global / Nacional)",
                    sub: "Sessões seguras por videochamada no Brasil ou exterior",
                    icon: "fa-laptop-medical"
                },
                {
                    title: "Presencial no Consultório",
                    sub: "Rua Dr. Mário Ramos, 122 - Centro, Barra Mansa - RJ",
                    icon: "fa-couch"
                }
            ];

            let optionsHtml = `<div class="chat-options-stack">`;
            options.forEach(opt => {
                optionsHtml += `
                    <button type="button" class="chat-option-card-btn" data-modality="${opt.title}">
                        <div class="option-icon-box">
                            <i class="fa-solid ${opt.icon}"></i>
                        </div>
                        <div class="option-text-box">
                            <span class="option-title">${opt.title}</span>
                            <span class="option-sub">${opt.sub}</span>
                        </div>
                    </button>
                `;
            });
            optionsHtml += `</div>`;

            this.interactiveFooter.innerHTML = optionsHtml;
            this.scrollToBottom();

            this.interactiveFooter.querySelectorAll('.chat-option-card-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const modality = btn.getAttribute('data-modality');
                    this.state.userData.modality = modality;
                    this.interactiveFooter.innerHTML = '';
                    this.addUserMessage(modality);
                    this.runStep4();
                });
            });
        }

        async runStep4() {
            this.state.currentStep = 4;
            await this.addBotMessage("Para organizarmos a sua pré-consulta com exclusividade, qual o melhor turno para o contato da nossa equipe?", 550);

            const shifts = [
                { name: "Manhã", time: "08h às 12h", icon: "fa-sun" },
                { name: "Tarde", time: "13h às 18h", icon: "fa-cloud-sun" },
                { name: "Noite", time: "18h às 21h", icon: "fa-moon" }
            ];

            let shiftsHtml = `<div class="chat-shift-grid">`;
            shifts.forEach(s => {
                shiftsHtml += `
                    <button type="button" class="chat-shift-btn" data-shift="${s.name}">
                        <i class="fa-solid ${s.icon} shift-icon"></i>
                        <span class="shift-name">${s.name}</span>
                        <span class="shift-time">${s.time}</span>
                    </button>
                `;
            });
            shiftsHtml += `</div>`;

            this.interactiveFooter.innerHTML = shiftsHtml;
            this.scrollToBottom();

            this.interactiveFooter.querySelectorAll('.chat-shift-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const shift = btn.getAttribute('data-shift');
                    this.state.userData.timeSlot = shift;
                    this.interactiveFooter.innerHTML = '';
                    this.addUserMessage(shift);
                    this.runStep5();
                });
            });
        }

        async runStep5() {
            this.state.currentStep = 5;
            const { name, reason, modality, timeSlot } = this.state.userData;

            await this.addBotMessage(`Perfeito, <strong>${this.escapeHtml(name)}</strong>! Suas preferências foram organizadas com total confidencialidade.`, 500);
            await this.addBotMessage("Clique no botão abaixo para concluir seu agendamento direto com a Dra. Fabíola Reis no WhatsApp.", 600);

            const payloadText = 
`Olá, Dra. Fabíola Reis!
Gostaria de solicitar um agendamento de Psicanálise.

• Nome: ${name}
• Motivo Principal: ${reason}
• Formato: ${modality}
• Melhor Turno: ${timeSlot}

Aguardo o retorno para verificar a disponibilidade de horários.`;

            const waLink = `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodeURIComponent(payloadText)}`;

            const closureHtml = `
                <div class="chat-closure-container">
                    <div class="chat-summary-card">
                        <div class="summary-header">
                            <i class="fa-solid fa-clipboard-check"></i>
                            <span>Resumo Confidencial</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item-label">Nome:</span>
                            <span class="summary-item-value">${this.escapeHtml(name)}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item-label">Motivo:</span>
                            <span class="summary-item-value">${this.escapeHtml(reason)}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item-label">Formato:</span>
                            <span class="summary-item-value">${this.escapeHtml(modality)}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-item-label">Melhor Turno:</span>
                            <span class="summary-item-value">${this.escapeHtml(timeSlot)}</span>
                        </div>
                    </div>

                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="chat-cta-whatsapp-btn" id="chatCtaWhatsApp">
                        <i class="fa-brands fa-whatsapp"></i>
                        <span>Concluir Agendamento no WhatsApp</span>
                    </a>

                    <button type="button" class="chat-restart-link-btn" id="chatRestartLink">
                        <i class="fa-solid fa-rotate-left"></i> Alterar preferências
                    </button>
                </div>
            `;

            this.interactiveFooter.innerHTML = closureHtml;
            this.scrollToBottom();

            const restartBtn = document.getElementById('chatRestartLink');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => this.reset());
            }
        }
    }

    // Instancia o Agente de Acolhimento
    window.acolhimentoAgent = new AcolhimentoAgent();

    // 8. GERENCIADOR DE CONSENTIMENTO LGPD & MODAL DE TERMOS E PRIVACIDADE
    class LGPDPrivacyManager {
        constructor() {
            this.STORAGE_KEY = 'fabiola_lgpd_accepted';
            this.banner = document.getElementById('lgpdConsentBanner');
            this.acceptBtn = document.getElementById('lgpdAcceptBtn');
            this.dismissBtn = document.getElementById('lgpdDismissBtn');
            this.modalBackdrop = document.getElementById('privacyModalBackdrop');
            this.modalWindow = document.getElementById('privacyModalWindow');
            this.closeBtn = document.getElementById('privacyCloseBtn');
            this.agreeBtn = document.getElementById('privacyAgreeBtn');
            this.tabBtnPrivacy = document.getElementById('tabBtnPrivacy');
            this.tabBtnTerms = document.getElementById('tabBtnTerms');
            this.tabContentPrivacy = document.getElementById('tabContentPrivacy');
            this.tabContentTerms = document.getElementById('tabContentTerms');

            this.init();
        }

        init() {
            // Verificar consentimento prévio
            const isAccepted = localStorage.getItem(this.STORAGE_KEY) === 'true';
            if (this.banner) {
                if (isAccepted) {
                    this.banner.classList.add('hidden');
                    document.body.classList.remove('has-lgpd-banner');
                } else {
                    setTimeout(() => {
                        this.banner.classList.remove('hidden');
                        document.body.classList.add('has-lgpd-banner');
                    }, 800);
                }
            }

            // Ações do Banner
            if (this.acceptBtn) {
                this.acceptBtn.addEventListener('click', () => {
                    localStorage.setItem(this.STORAGE_KEY, 'true');
                    if (this.banner) this.banner.classList.add('hidden');
                    document.body.classList.remove('has-lgpd-banner');
                });
            }

            if (this.dismissBtn) {
                this.dismissBtn.addEventListener('click', () => {
                    if (this.banner) this.banner.classList.add('hidden');
                    document.body.classList.remove('has-lgpd-banner');
                });
            }

            // Abertura do Modal por gatilhos (.open-privacy-btn e .open-terms-btn)
            document.querySelectorAll('.open-privacy-btn, .open-terms-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetTab = btn.getAttribute('data-tab') || 'privacy';
                    this.openModal(targetTab);
                });
            });

            // Fechamento do Modal
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeModal());
            }
            if (this.agreeBtn) {
                this.agreeBtn.addEventListener('click', () => {
                    localStorage.setItem(this.STORAGE_KEY, 'true');
                    if (this.banner) this.banner.classList.add('hidden');
                    document.body.classList.remove('has-lgpd-banner');
                    this.closeModal();
                });
            }

            if (this.modalBackdrop) {
                this.modalBackdrop.addEventListener('click', (e) => {
                    if (e.target === this.modalBackdrop) {
                        this.closeModal();
                    }
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modalBackdrop?.classList.contains('active')) {
                    this.closeModal();
                }
            });

            // Troca de Abas no Modal
            if (this.tabBtnPrivacy && this.tabBtnTerms) {
                this.tabBtnPrivacy.addEventListener('click', () => this.switchTab('privacy'));
                this.tabBtnTerms.addEventListener('click', () => this.switchTab('terms'));
            }
        }

        openModal(tab = 'privacy') {
            if (!this.modalBackdrop) return;
            this.switchTab(tab);
            this.modalBackdrop.classList.add('active');
            this.modalBackdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        closeModal() {
            if (!this.modalBackdrop) return;
            this.modalBackdrop.classList.remove('active');
            this.modalBackdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        switchTab(tabName) {
            const isPrivacy = tabName === 'privacy';
            if (this.tabBtnPrivacy) {
                this.tabBtnPrivacy.classList.toggle('active', isPrivacy);
                this.tabBtnPrivacy.setAttribute('aria-selected', String(isPrivacy));
            }
            if (this.tabBtnTerms) {
                this.tabBtnTerms.classList.toggle('active', !isPrivacy);
                this.tabBtnTerms.setAttribute('aria-selected', String(!isPrivacy));
            }
            if (this.tabContentPrivacy) {
                this.tabContentPrivacy.classList.toggle('active', isPrivacy);
            }
            if (this.tabContentTerms) {
                this.tabContentTerms.classList.toggle('active', !isPrivacy);
            }

            const body = this.modalBackdrop?.querySelector('.privacy-modal-body');
            if (body) body.scrollTop = 0;
        }
    }

    // Instancia o Gerenciador LGPD e Privacidade
    window.lgpdPrivacyManager = new LGPDPrivacyManager();

    // 9. Carrossel do Consultório (Auto-play + Controles + Touch)
    const consultorioCarousel = document.getElementById('consultorioCarousel');
    if (consultorioCarousel) {
        const slides = consultorioCarousel.querySelectorAll('.consultorio-slide');
        const dots = consultorioCarousel.querySelectorAll('.consultorio-dot');
        const prevBtn = document.getElementById('consultorioPrevBtn');
        const nextBtn = document.getElementById('consultorioNextBtn');
        let currentSlide = 0;
        let slideInterval = null;

        const showSlide = (index) => {
            if (index < 0) {
                currentSlide = slides.length - 1;
            } else if (index >= slides.length) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        const startAutoplay = () => {
            stopAutoplay();
            slideInterval = setInterval(nextSlide, 4500);
        };

        const stopAutoplay = () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
                showSlide(targetIdx);
                startAutoplay();
            });
        });

        consultorioCarousel.addEventListener('mouseenter', stopAutoplay);
        consultorioCarousel.addEventListener('mouseleave', startAutoplay);

        // Touch Swipe para Mobile
        let startX = 0;
        let endX = 0;

        consultorioCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoplay();
        }, { passive: true });

        consultorioCarousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoplay();
        }, { passive: true });

        startAutoplay();
    }
});

