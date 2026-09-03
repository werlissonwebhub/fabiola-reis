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

    // 7. AGENTE CLÍNICO DE AUTOAVALIAÇÃO & RASTREIO EMOCIONAL (DRA. FABÍOLA REIS)
    // 7. AGENTE CLÍNICO DE AUTOAVALIAÇÃO & RASTREIO EMOCIONAL (DRA. FABÍOLA REIS)
    const CLINICAL_TRACK_GROUPS = [
        {
            title: 'Queixas Clínicas Gerais',
            tracks: [
                {
                    id: 'burnout',
                    title: 'Síndrome de Burnout & Esgotamento',
                    name: 'Síndrome de Burnout & Esgotamento',
                    shortName: 'Síndrome de Burnout & Esgotamento',
                    badge: 'Psicossomática e Carreira',
                    description: 'Investigação de exaustão profunda, desconexão de propósito e sobrecarga contínua.',
                    icon: 'fa-heart-pulse',
                    questions: [
                        {
                            id: 'b1',
                            question: 'Você sente um cansaço crônico que persiste mesmo após finais de semana ou períodos de repouso?',
                            text: 'Você sente um cansaço crônico que persiste mesmo após finais de semana ou períodos de repouso?',
                            summary: 'Cansaço crônico persistente',
                            options: [
                                { label: 'Raramente ou sob controle', score: 0 },
                                { label: 'Frequentemente, acordo já exausto(a)', score: 2 },
                                { label: 'Constante, sinto esgotamento físico e mental extremo', score: 3 }
                            ]
                        },
                        {
                            id: 'b2',
                            question: 'Percebe uma perda de sentido no trabalho, acompanhada de sentimentos de cinismo, indiferença ou frustração?',
                            text: 'Percebe uma perda de sentido no trabalho, acompanhada de sentimentos de cinismo, indiferença ou frustração?',
                            summary: 'Perda de sentido e indiferença no trabalho',
                            options: [
                                { label: 'Ainda encontro motivação na maior parte do tempo', score: 0 },
                                { label: 'Faço as tarefas no piloto automático, sem entusiasmo', score: 2 },
                                { label: 'Sinto total vazio e desapego do que antes fazia sentido', score: 3 }
                            ]
                        },
                        {
                            id: 'b3',
                            question: 'Tem apresentado manifestações físicas frequentes (dores de cabeça, alterações no sono, tensão muscular, problemas gastrointestinais)?',
                            text: 'Tem apresentado manifestações físicas frequentes (dores de cabeça, alterações no sono, tensão muscular, problemas gastrointestinais)?',
                            summary: 'Manifestações físicas e psicossomáticas',
                            options: [
                                { label: 'Não tenho sintomas físicos associados', score: 0 },
                                { label: 'Sintomas pontuais em dias de pico de estresse', score: 1 },
                                { label: 'Sintomas corporais frequentes e debilitantes', score: 3 }
                            ]
                        },
                        {
                            id: 'b4',
                            question: 'Sente que está abrindo mão excessivamente de limites pessoais, descanso e lazer para dar conta de demandas externas?',
                            text: 'Sente que está abrindo mão excessivamente de limites pessoais, descanso e lazer para dar conta de demandas externas?',
                            summary: 'Renúncia de limites e descanso',
                            options: [
                                { label: 'Consigo preservar meu tempo e dizer não', score: 0 },
                                { label: 'Tenho dificuldade de pausar e me sinto culpado(a) ao parar', score: 2 },
                                { label: 'Vivo em renúncia contínua de mim mesmo(a) em prol do trabalho', score: 3 }
                            ]
                        }
                    ]
                },
                {
                    id: 'ansiedade',
                    name: 'Ansiedade & Angústia',
                    shortName: 'Ansiedade & Angústia',
                    icon: 'fa-cloud-bolt',
                    questions: [
                        {
                            text: 'Vivencia sintomas físicos de alerta (aperto no peito, tensão muscular, nó na garganta ou insônia)?',
                            signal: 'Vivência de sintomas físicos de alerta (tensão muscular, aperto no peito, insônia)'
                        },
                        {
                            text: 'Preocupa-se excessivamente com cenários futuros e situações fora do seu controle direto?',
                            signal: 'Preocupação excessiva e ruminação sobre cenários futuros'
                        },
                        {
                            text: 'Sente dificuldade em desacelerar a mente, mesmo em períodos de descanso programado?',
                            signal: 'Dificuldade em desacelerar a mente no descanso'
                        },
                        {
                            text: 'Tem crises repentinas de sobrecarga emocional ou sensação constante de perigo iminente?',
                            signal: 'Crises de sobrecarga emocional e sensação de perigo iminente'
                        }
                    ]
                },
                {
                    id: 'relacionamentos',
                    name: 'Conflitos & Vínculos Afetivos',
                    shortName: 'Conflitos & Vínculos Afetivos',
                    icon: 'fa-heart-crack',
                    questions: [
                        {
                            text: 'Encontra dificuldade recorrente em estabelecer limites saudáveis nas suas relações?',
                            signal: 'Dificuldade recorrente em estabelecer limites saudáveis nas relações'
                        },
                        {
                            text: 'Sente desgaste frequente por assumir excesso de responsabilidades emocionais de terceiros?',
                            signal: 'Desgaste por assumir excesso de responsabilidades emocionais de terceiros'
                        },
                        {
                            text: 'Evita conversas difíceis ou confrontos por medo de rejeição ou perda do vínculo?',
                            signal: 'Evitação de confrontos por medo de rejeição ou perda do vínculo'
                        },
                        {
                            text: 'Sente que suas necessidades emocionais raramente são compreendidas ou atendidas?',
                            signal: 'Sensação de que necessidades emocionais raramente são atendidas'
                        }
                    ]
                },
                {
                    id: 'autoconhecimento',
                    name: 'Autoconhecimento & Transição',
                    shortName: 'Autoconhecimento & Transição',
                    icon: 'fa-compass',
                    questions: [
                        {
                            text: 'Encontra-se em momento de indecisão profunda sobre carreira, propósito ou projetos de vida?',
                            signal: 'Indecisão profunda sobre carreira, propósito ou projetos de vida'
                        },
                        {
                            text: 'Percebe padrões e escolhas repetitivas que sabotam seu crescimento pessoal?',
                            signal: 'Padrões e escolhas repetitivas que sabotam o crescimento pessoal'
                        },
                        {
                            text: 'Sente desconexão entre quem você é internamente e a persona que apresenta socialmente?',
                            signal: 'Desconexão entre identidade interna e persona social'
                        },
                        {
                            text: 'Busca clareza sobre suas potencialidades para iniciar um novo ciclo com segurança?',
                            signal: 'Busca de clareza sobre potencialidades para iniciar um novo ciclo'
                        }
                    ]
                },
                {
                    id: 'luto',
                    name: 'Luto, Traumas & Perdas',
                    shortName: 'Luto, Traumas & Perdas',
                    icon: 'fa-leaf',
                    questions: [
                        {
                            text: 'Carrega dores ou lembranças do passado que ainda provocam impacto emocional no presente?',
                            signal: 'Dores e lembranças do passado com impacto emocional no presente'
                        },
                        {
                            text: 'Enfrenta dificuldade persistente em aceitar e processar o encerramento de vínculos ou fases?',
                            signal: 'Dificuldade persistente em aceitar e processar o encerramento de vínculos ou fases'
                        },
                        {
                            text: 'Sente que uma perda significativa alterou seu ânimo e sua capacidade de planejar o futuro?',
                            signal: 'Perda significativa que alterou o ânimo e projetos futuros'
                        },
                        {
                            text: 'Vivencia bloqueios emocionais decorrentes de experiências dolorosas vividas na infância/juventude?',
                            signal: 'Bloqueios emocionais decorrentes de traumas do passado'
                        }
                    ]
                },
                {
                    id: 'outras',
                    name: 'Outras Questões Pessoais',
                    shortName: 'Outras Questões Pessoais',
                    icon: 'fa-comments',
                    questions: [
                        {
                            text: 'Sente uma sensação difusa de vazio ou insatisfação difícil de definir em palavras?',
                            signal: 'Sensação difusa de vazio ou insatisfação difícil de definir'
                        },
                        {
                            text: 'Percebe que o estresse do dia a dia tem drenado sua energia física e emocional?',
                            signal: 'Estresse cotidiano com drenagem de energia física e emocional'
                        },
                        {
                            text: 'Sente necessidade urgente de um espaço confidencial e neutro de escuta clínica?',
                            signal: 'Necessidade urgente de espaço confidencial e neutro de escuta clínica'
                        },
                        {
                            text: 'Tem dificuldade de compreender a origem das suas angústias atuais?',
                            signal: 'Dificuldade de compreender a origem das angústias atuais'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Perfis & Neurodivergências',
            tracks: [
                {
                    id: 'superdotacao',
                    name: 'Superdotação & Altas Habilidades',
                    shortName: 'Superdotação & Altas Habilidades',
                    icon: 'fa-lightbulb',
                    questions: [
                        {
                            text: 'Vivencia uma sensação profunda e histórica de não pertencimento nos círculos comuns?',
                            signal: 'Sensação profunda e histórica de não pertencimento social'
                        },
                        {
                            text: 'Sua mente processa estímulos e informações com velocidade que gera tédio em ambientes rotineiros?',
                            signal: 'Processamento mental acelerado com tédio em rotinas simples'
                        },
                        {
                            text: 'Possui curiosidade intelectual intensa e necessidade frequente de mergulhar em temas complexos?',
                            signal: 'Curiosidade intelectual intensa e necessidade de temas complexos'
                        },
                        {
                            text: 'Sente hipersensibilidade emocional, sensorial ou moral diante de incongruências do cotidiano?',
                            signal: 'Hipersensibilidade emocional, sensorial ou moral'
                        }
                    ]
                },
                {
                    id: 'tdah',
                    name: 'TDAH (Foco & Procrastinação)',
                    shortName: 'TDAH (Foco & Procrastinação)',
                    icon: 'fa-brain',
                    questions: [
                        {
                            text: 'Apresenta dificuldade persistente para iniciar, manter ou concluir tarefas burocráticas?',
                            signal: 'Dificuldade persistente para iniciar, manter ou concluir tarefas burocráticas'
                        },
                        {
                            text: 'Vivencia dispersão constante, saltando com frequência de um pensamento a outro?',
                            signal: 'Dispersão constante, saltando de um pensamento a outro'
                        },
                        {
                            text: 'Sofre com esquecimentos crônicos de compromissos, prazos ou perda diária de pertences?',
                            signal: 'Esquecimentos crônicos de compromissos, prazos ou perda de pertences'
                        },
                        {
                            text: 'Entra em episódios de hiperfoco intenso em temas de interesse, perdendo a noção do tempo?',
                            signal: 'Episódios de hiperfoco intenso com perda da noção do tempo'
                        }
                    ]
                },
                {
                    id: 'tea',
                    name: 'Traços do Espectro (TEA)',
                    shortName: 'Traços do Espectro (TEA)',
                    icon: 'fa-puzzle-piece',
                    questions: [
                        {
                            text: 'Ambientes com excesso de estímulos (luzes fortes, barulhos, aglomerações) causam exaustão mental?',
                            signal: 'Exaustão mental por excesso de estímulos (luzes, sons, aglomerações)'
                        },
                        {
                            text: 'Prefere rotinas previsíveis e sente desconforto ou ansiedade acentuada diante de mudanças bruscas?',
                            signal: 'Preferência por rotinas previsíveis e desconforto diante de mudanças bruscas'
                        },
                        {
                            text: 'Exige esforço consciente para decodificar regras sociais não explícitas em conversas de grupo?',
                            signal: 'Esforço consciente para decodificar regras sociais não explícitas'
                        },
                        {
                            text: 'Apresenta necessidade acentuada de períodos de recolhimento e silêncio após interações sociais?',
                            signal: 'Necessidade acentuada de períodos de recolhimento e silêncio pós-social'
                        }
                    ]
                },
                {
                    id: 'borderline',
                    name: 'Instabilidade & Borderline',
                    shortName: 'Instabilidade & Borderline (TPB)',
                    icon: 'fa-masks-theater',
                    questions: [
                        {
                            text: 'Vivencia oscilações bruscas e intensas de humor ao longo do mesmo dia após contratempos?',
                            signal: 'Oscilações bruscas e intensas de humor ao longo do dia após contratempos'
                        },
                        {
                            text: 'Sente um medo profundo e paralisante de rejeição ou de ser abandonado por pessoas próximas?',
                            signal: 'Medo profundo e paralisante de rejeição ou abandono'
                        },
                        {
                            text: 'Alterna entre a idealização máxima de alguém e uma decepção profunda em curto intervalo?',
                            signal: 'Alternância rápida entre idealização máxima e decepção profunda'
                        },
                        {
                            text: 'Toma atitudes impulsivas quando experimenta sensações intensas de vazio ou dor existencial?',
                            signal: 'Atitudes impulsivas diante de sensações de vazio ou dor existencial'
                        }
                    ]
                },
                {
                    id: 'bipolaridade',
                    name: 'Ciclos de Humor & Bipolaridade',
                    shortName: 'Ciclos de Humor & Bipolaridade',
                    icon: 'fa-wave-square',
                    questions: [
                        {
                            text: 'Alterna entre períodos de profunda desmotivação/apatia e fases de ânimo excessivo e hiperatividade?',
                            signal: 'Alternância entre fases de apatia e episódios de hiperatividade'
                        },
                        {
                            text: 'Durante as fases de alta energia, percebe redução drástica da necessidade de sono sem sentir cansaço?',
                            signal: 'Redução drástica da necessidade de sono sem sentir cansaço'
                        },
                        {
                            text: 'Realiza planos grandiosos ou impulsivos durante episódios de exaltação mental?',
                            signal: 'Planos grandiosos ou impulsivos em fases de exaltação mental'
                        },
                        {
                            text: 'Sofre com quedas bruscas de energia que paralisam compromissos previamente assumidos?',
                            signal: 'Quedas bruscas de energia que paralisam compromissos assumidos'
                        }
                    ]
                },
                {
                    id: 'narcisismo',
                    name: 'Traços Narcísicos / Relações Tóxicas',
                    shortName: 'Traços Narcísicos / Relações Tóxicas',
                    icon: 'fa-crown',
                    questions: [
                        {
                            text: 'Vivencia extrema sensibilidade a críticas, reagindo com ressentimento ou afastamento defensivo?',
                            signal: 'Extrema sensibilidade a críticas com ressentimento ou afastamento defensivo'
                        },
                        {
                            text: 'Sente dificuldade contínua em validar a perspectiva do outro quando ela diverge da sua?',
                            signal: 'Dificuldade contínua em validar perspectivas divergentes da sua'
                        },
                        {
                            text: 'Encontra-se preso a uma dinâmica relacional onde se sente manipulado ou desvalorizado?',
                            signal: 'Vivência de dinâmica relacional de manipulação ou desvalorização'
                        },
                        {
                            text: 'Exige padrão excessivo de perfeccionismo e reconhecimento em suas realizações?',
                            signal: 'Padrão excessivo de perfeccionismo e busca de reconhecimento'
                        }
                    ]
                },
                {
                    id: 'histrionica',
                    name: 'Expressividade & Histriônica',
                    shortName: 'Expressividade & Traços Histriônicos',
                    icon: 'fa-theater-masks',
                    questions: [
                        {
                            text: 'Sente desconforto evidente quando não ocupa o centro da atenção ou validação do grupo?',
                            signal: 'Desconforto evidente quando não ocupa o centro da atenção ou validação'
                        },
                        {
                            text: 'Suas reações emocionais são frequentemente consideradas intensas ou dramáticas pelos outros?',
                            signal: 'Reações emocionais consideradas intensas ou dramáticas'
                        },
                        {
                            text: 'Possui facilidade em ser influenciado pelo ambiente externo e pelas opiniões de terceiros?',
                            signal: 'Facilidade em ser influenciado pelo ambiente e opiniões de terceiros'
                        },
                        {
                            text: 'Tende a considerar as relações interpessoais muito mais íntimas do que de fato são?',
                            signal: 'Tendência a considerar as relações interpessoais mais íntimas do que de fato são'
                        }
                    ]
                }
            ]
        }
    ];

    const LIKERT_OPTIONS = [
        { label: 'Raramente', score: 1, icon: 'fa-regular fa-circle' },
        { label: 'Às Vezes', score: 2, icon: 'fa-regular fa-circle-dot' },
        { label: 'Com Frequência', score: 3, icon: 'fa-solid fa-circle-dot' },
        { label: 'Quase Sempre', score: 4, icon: 'fa-solid fa-circle-check' }
    ];

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
                    trackKey: '',
                    trackName: '',
                    trackShortName: '',
                    answers: [], // Array de { questionIndex, questionText, score, label, signal }
                    totalScore: 0
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
            this.state.userData = {
                name: '',
                trackKey: '',
                trackName: '',
                trackShortName: '',
                answers: [],
                totalScore: 0
            };
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
            if (this.interactiveFooter) {
                this.interactiveFooter.innerHTML = '';
                this.interactiveFooter.style.display = 'flex';
            }
        }

        scrollToBottom() {
            if (!this.messagesContainer) return;
            setTimeout(() => {
                this.messagesContainer.scrollTo({
                    top: this.messagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }, 60);
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

        async addBotMessage(htmlContent, delayMs = 500) {
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
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        async startFlow() {
            this.state.currentStep = 1;
            this.clearMessages();

            // Passo 1: Mensagens Iniciais de Acolhimento
            await this.addBotMessage("Olá. Seja muito bem-vindo(a) à <strong>Central Clínica de Autoavaliação & Rastreio</strong> da Dra. Fabíola Reis.", 400);
            await this.addBotMessage("Aqui, cada sessão e interação é conduzida sob rigoroso <strong>sigilo clínico, escuta atenta e respeito</strong> ao seu momento.", 550);
            await this.addBotMessage("Como podemos chamar você?", 450);

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

                this.runTrackSelection();
            });
        }

        async runTrackSelection() {
            this.state.currentStep = 2;
            const name = this.state.userData.name;

            await this.addBotMessage(`É um prazer receber você, <strong>${this.escapeHtml(name)}</strong>. Selecione abaixo a trilha que você deseja avaliar agora:`, 450);

            let selectionHtml = `<div class="chat-tracks-selection-wrap">`;

            CLINICAL_TRACK_GROUPS.forEach(group => {
                selectionHtml += `
                    <div class="chat-track-block-header">
                        <i class="fa-solid fa-layer-group"></i>
                        <span>${group.title}</span>
                    </div>
                    <div class="chat-chips-2col-grid">
                `;

                group.tracks.forEach(t => {
                    selectionHtml += `
                        <button type="button" class="chat-chip-btn-compact" data-track="${t.id}">
                            <i class="fa-solid ${t.icon}"></i>
                            <div class="chat-chip-content">
                                <span class="chat-chip-title">${t.name}</span>
                                ${t.badge ? `<span class="chat-chip-badge-alert">${t.badge}</span>` : ''}
                            </div>
                        </button>
                    `;
                });

                selectionHtml += `</div>`;
            });

            selectionHtml += `</div>`;

            this.interactiveFooter.innerHTML = selectionHtml;
            this.scrollToBottom();

            this.interactiveFooter.querySelectorAll('.chat-chip-btn-compact').forEach(btn => {
                btn.addEventListener('click', () => {
                    const trackId = btn.getAttribute('data-track');
                    let foundTrack = null;
                    for (const g of CLINICAL_TRACK_GROUPS) {
                        const match = g.tracks.find(t => t.id === trackId);
                        if (match) {
                            foundTrack = match;
                            break;
                        }
                    }
                    if (!foundTrack) return;

                    this.state.userData.trackKey = foundTrack.id;
                    this.state.userData.trackName = foundTrack.name;
                    this.state.userData.trackShortName = foundTrack.shortName;
                    this.state.userData.answers = [];
                    this.state.userData.totalScore = 0;

                    this.interactiveFooter.innerHTML = '';
                    this.addUserMessage(foundTrack.name);

                    this.startScreening(foundTrack);
                });
            });
        }

        async startScreening(track) {
            this.state.currentStep = 3;
            await this.addBotMessage(`Iniciaremos o rastreio para a trilha: <strong>${this.escapeHtml(track.name)}</strong>.`, 450);
            if (track.description) {
                await this.addBotMessage(`<em>${this.escapeHtml(track.description)}</em>`, 400);
            }
            await this.addBotMessage("Apresentaremos <strong>4 afirmações reflexivas</strong>. Selecione a resposta que melhor reflete sua vivência:", 500);

            this.renderQuestionStep(0, track);
        }

        renderQuestionStep(questionIndex, track) {
            const question = track.questions[questionIndex];
            const currentNumber = questionIndex + 1;
            const totalQuestions = track.questions.length;
            const progressPercent = (currentNumber / totalQuestions) * 100;
            const isCustomOptions = Array.isArray(question.options) && question.options.length > 0;
            const options = isCustomOptions ? question.options : LIKERT_OPTIONS;

            let optionsButtonsHtml = '';
            options.forEach(opt => {
                const optIcon = opt.icon || (opt.score === 0 ? 'fa-regular fa-circle' : (opt.score === 1 || opt.score === 2) ? 'fa-regular fa-circle-dot' : 'fa-solid fa-circle-check');
                optionsButtonsHtml += `
                    <button type="button" class="${isCustomOptions ? 'chat-option-btn-custom' : 'chat-likert-btn'}" data-score="${opt.score}" data-label="${this.escapeHtml(opt.label)}">
                        <i class="${optIcon} likert-icon"></i>
                        <span>${this.escapeHtml(opt.label)}</span>
                    </button>
                `;
            });

            const screeningHtml = `
                <div class="chat-screening-container">
                    <div class="chat-progress-header">
                        <span class="chat-progress-badge"><i class="fa-solid fa-clipboard-list"></i> Autoavaliação Clínica</span>
                        <span class="chat-progress-count">Pergunta ${currentNumber} de ${totalQuestions}</span>
                    </div>
                    <div class="chat-progress-bar-track">
                        <div class="chat-progress-bar-fill" style="width: ${progressPercent}%;"></div>
                    </div>
                    <div class="chat-question-card">
                        <p class="chat-question-text"><strong>${currentNumber}.</strong> ${this.escapeHtml(question.question || question.text)}</p>
                    </div>
                    <div class="${isCustomOptions ? 'chat-custom-options-grid' : 'chat-likert-grid'}">
                        ${optionsButtonsHtml}
                    </div>
                </div>
            `;

            this.interactiveFooter.innerHTML = screeningHtml;
            this.scrollToBottom();

            const btnSelector = isCustomOptions ? '.chat-option-btn-custom' : '.chat-likert-btn';
            this.interactiveFooter.querySelectorAll(btnSelector).forEach(btn => {
                btn.addEventListener('click', () => {
                    const score = parseInt(btn.getAttribute('data-score'), 10);
                    const label = btn.getAttribute('data-label');

                    // Salva resposta
                    this.state.userData.answers.push({
                        questionIndex: questionIndex,
                        questionId: question.id || `q${currentNumber}`,
                        questionText: question.question || question.text,
                        questionSummary: question.summary || question.question || question.text,
                        score: score,
                        label: label,
                        signal: question.signal || `${question.summary || question.question || question.text}: ${label}`
                    });
                    this.state.userData.totalScore += score;

                    this.interactiveFooter.innerHTML = '';
                    this.addUserMessage(`[P${currentNumber}] ${label}`);

                    if (questionIndex + 1 < totalQuestions) {
                        setTimeout(() => {
                            this.renderQuestionStep(questionIndex + 1, track);
                        }, 250);
                    } else {
                        setTimeout(() => {
                            this.renderClinicalReport();
                        }, 350);
                    }
                });
            });
        }

        async renderClinicalReport() {
            this.state.currentStep = 4;
            const { name, trackKey, trackName, trackShortName, answers, totalScore } = this.state.userData;
            const isBurnout = (trackKey === 'burnout');
            const maxScore = isBurnout ? 12 : 16;

            // Limpa o rodapé interativo para dar foco total ao prontuário no feed
            this.interactiveFooter.innerHTML = '';
            this.interactiveFooter.style.display = 'none';

            await this.addBotMessage(`Autoavaliação concluída, <strong>${this.escapeHtml(name)}</strong>! Geramos a sua síntese clínica preliminar com base nas suas respostas.`, 400);

            // Cálculos de Intensidade e Pontuação Numérica
            let levelTitle = '';
            let levelBadgeClass = '';
            let fillClass = '';
            let fillPercent = 0;
            let intensityLevel = '';

            if (isBurnout) {
                if (totalScore <= 3) {
                    levelTitle = 'Nível Leve / Preventivo';
                    levelBadgeClass = 'level-low';
                    fillClass = 'fill-low';
                    fillPercent = Math.max(25, Math.round((totalScore / 12) * 100));
                    intensityLevel = 'Nível Leve / Preventivo';
                } else if (totalScore <= 7) {
                    levelTitle = 'Nível Moderado / Alerta';
                    levelBadgeClass = 'level-mid';
                    fillClass = 'fill-mid';
                    fillPercent = Math.round((totalScore / 12) * 100);
                    intensityLevel = 'Nível Moderado / Alerta';
                } else {
                    levelTitle = 'Nível Alto / Atenção Clínica Imediata';
                    levelBadgeClass = 'level-high';
                    fillClass = 'fill-high';
                    fillPercent = Math.min(98, Math.round((totalScore / 12) * 100));
                    intensityLevel = 'Nível Alto / Atenção Clínica Imediata';
                }
            } else {
                if (totalScore <= 7) {
                    levelTitle = 'Indicadores Leves / Reação Situacional';
                    levelBadgeClass = 'level-low';
                    fillClass = 'fill-low';
                    fillPercent = Math.max(28, Math.round((totalScore / 16) * 100));
                    intensityLevel = 'LEVE';
                } else if (totalScore <= 12) {
                    levelTitle = 'Indicadores Moderados / Atenção Recomendada';
                    levelBadgeClass = 'level-mid';
                    fillClass = 'fill-mid';
                    fillPercent = Math.round((totalScore / 16) * 100);
                    intensityLevel = 'MODERADO';
                } else {
                    levelTitle = 'Indicadores Expressivos / Suporte Clínico Prioritário';
                    levelBadgeClass = 'level-high';
                    fillClass = 'fill-high';
                    fillPercent = Math.min(96, Math.round((totalScore / 16) * 100));
                    intensityLevel = 'EXPRESSIVO';
                }
            }

            // Identificação de Sinais Principais Mapeados
            let signalsHtml = '';
            if (isBurnout) {
                answers.forEach(a => {
                    signalsHtml += `
                        <div class="signal-item">
                            <i class="fa-solid fa-circle-check"></i>
                            <span><strong>${this.escapeHtml(a.questionSummary)}:</strong> ${this.escapeHtml(a.label)} (${a.score} pts)</span>
                        </div>
                    `;
                });
            } else {
                const strongAnswers = answers.filter(a => a.score >= 3);
                let mappedSignals = [];

                if (strongAnswers.length > 0) {
                    mappedSignals = strongAnswers.map(a => a.signal);
                } else {
                    const sorted = [...answers].sort((a, b) => b.score - a.score);
                    mappedSignals = sorted.slice(0, 2).map(a => a.signal);
                }

                mappedSignals.forEach(sig => {
                    signalsHtml += `
                        <div class="signal-item">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>${this.escapeHtml(sig)}</span>
                        </div>
                    `;
                });
            }

            // Formatação do payload WhatsApp (Conforme especificado pelo usuário)
            let payloadText = '';
            if (isBurnout) {
                const burnoutAnswersSummary = answers.map(a => `- ${a.questionSummary}: ${a.label} (${a.score} pts)`).join('\n');
                payloadText = 
`📋 NOVA TRIAGEM CLÍNICA RECEBIDA
Instituto / Dra. Fabíola Reis

PACIENTE: ${name}
EIXO: Síndrome de Burnout & Esgotamento
MAPEAMENTO: ${intensityLevel} (Pontuação: ${totalScore}/12)

--------------------------------------------------
RESPOSTAS IDENTIFICADAS:
${burnoutAnswersSummary}

--------------------------------------------------
SÍNTESE:
Paciente concluiu a triagem de Síndrome de Burnout & Esgotamento pelo portal oficial e solicita agendamento para avaliação psicanalítica individualizada.

Olá, Dra. Fabíola! Concluí minha autoavaliação de Burnout no seu site e gostaria de agendar uma consulta.`;
            } else {
                const strongAnswers = answers.filter(a => a.score >= 3);
                let mappedSignals = [];

                if (strongAnswers.length > 0) {
                    mappedSignals = strongAnswers.map(a => a.signal);
                } else {
                    const sorted = [...answers].sort((a, b) => b.score - a.score);
                    mappedSignals = sorted.slice(0, 2).map(a => a.signal);
                }

                const signalsBullets = mappedSignals.length > 0 
                    ? mappedSignals.map(s => `- ${s}`).join('\n')
                    : '- Indicadores dentro da faixa de estabilidade com preservação de autonomia.';

                payloadText = 
`[MINI PRONTUARIO DE AUTOAVALIACAO CLINICA]
Instituto / Dra. Fabiola Reis

PACIENTE: ${name}
TRILHA AVALIADA: ${trackName}
INTENSIDADE DE INDICADORES: [${intensityLevel} - Score: ${totalScore}/16]

--------------------------------------------------
SINAIS IDENTIFICADOS:
${signalsBullets}

--------------------------------------------------
SINTESE:
Paciente concluiu a triagem pelo portal oficial e solicita agendamento para avaliacao psicanalitica individualizada.

Ola, Dra. Fabiola! Conclui minha autoavaliacao no seu site e gostaria de agendar uma consulta.`;
            }

            const waLink = `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodeURIComponent(payloadText)}`;

            const reportCardHtml = `
                <div class="chat-clinical-report">
                    <div class="clinical-report-header">
                        <div class="report-header-title">
                            <i class="fa-solid fa-notes-medical"></i>
                            <span>SÍNTESE DE AUTOAVALIAÇÃO</span>
                        </div>
                        <span class="report-header-badge"><i class="fa-solid fa-shield-halved"></i> Sigilo Clínico</span>
                    </div>

                    <div class="clinical-patient-axis-row">
                        <span class="patient-name-tag">Paciente: <strong>${this.escapeHtml(name)}</strong></span>
                        <div class="axis-badge-tag">
                            <i class="fa-solid ${isBurnout ? 'fa-heart-pulse' : 'fa-compass'}"></i>
                            <span>Trilha: ${this.escapeHtml(trackName)}</span>
                        </div>
                    </div>

                    <!-- Termômetro Emocional Dourado -->
                    <div class="chat-thermometer-box">
                        <div class="thermometer-info-row">
                            <span class="thermometer-label">Termômetro de Intensidade:</span>
                            <span class="thermometer-level-tag ${levelBadgeClass}">${this.escapeHtml(levelTitle)} (${totalScore}/${maxScore})</span>
                        </div>
                        <div class="thermometer-track">
                            <div class="thermometer-fill ${fillClass}" style="width: ${fillPercent}%;"></div>
                        </div>
                        <div class="thermometer-scale-marks">
                            ${isBurnout ? `
                                <span>Leve (0-3)</span>
                                <span>Moderado (4-7)</span>
                                <span>Alto (8-12)</span>
                            ` : `
                                <span>Leve</span>
                                <span>Moderado</span>
                                <span>Expressivo</span>
                            `}
                        </div>
                    </div>

                    <!-- Sinais Principais Mapeados -->
                    <div class="chat-signals-box">
                        <div class="signals-box-title">
                            <i class="fa-solid fa-list-check"></i>
                            <span>${isBurnout ? 'Respostas Clínicas Assinaladas:' : 'Principais Sinais Identificados:'}</span>
                        </div>
                        <div class="signals-list">
                            ${signalsHtml}
                        </div>
                    </div>

                    <!-- Texto Conceitual Clínico -->
                    <div class="chat-conceptual-box">
                        ${isBurnout 
                            ? '"Suas respostas indicam sobrecarga psicossomática e exaustão que exigem escuta clínica cuidadosa e resgate de limites saudáveis."' 
                            : '"Suas respostas sugerem padrões comportamentais que exigem escuta atenta e elaboração psicanalítica individualizada."'}
                    </div>

                    <!-- Nota Ética Obrigatória -->
                    <div class="chat-ethical-notice">
                        <i class="fa-solid fa-shield-halved"></i> Instrumento reflexivo de triagem. Não substitui consulta médica ou avaliação formal.
                    </div>

                    <!-- CTA Dourado Oficial de Conversão -->
                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="chat-share-whatsapp-btn" id="chatShareWhatsappBtn">
                        <i class="fa-brands fa-whatsapp btn-wa-icon"></i>
                        <span>COMPARTILHAR RELATÓRIO COM A DRA. FABÍOLA</span>
                        <i class="fa-solid fa-arrow-right btn-arrow-icon"></i>
                    </a>

                    <!-- Botão Secundário para Refazer -->
                    <button type="button" class="chat-restart-link-btn" id="chatRestartSelfAssessment">
                        <i class="fa-solid fa-rotate-left"></i> Refazer Autoavaliação / Outra Trilha
                    </button>
                </div>
            `;

            // Injeta o card diretamente no feed de mensagens para rolagem contínua e sem bloqueio
            const reportRow = document.createElement('div');
            reportRow.className = 'chat-msg-row bot chat-report-row';
            reportRow.innerHTML = `
                <div class="chat-report-wrapper">
                    ${reportCardHtml}
                </div>
            `;
            this.messagesContainer.appendChild(reportRow);

            // Auto-scroll progressivo suave garantindo foco na base do container e no botão CTA
            this.scrollToBottom();
            setTimeout(() => this.scrollToBottom(), 150);
            setTimeout(() => this.scrollToBottom(), 450);

            const restartBtn = document.getElementById('chatRestartSelfAssessment');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    this.interactiveFooter.style.display = 'flex';
                    this.reset();
                });
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

