/**
 * assessments.js - Catálogo de Módulos de Triagem Clínica & Autoavaliação
 * Dra. Fabíola Reis - Psicanálise & Saúde Emocional
 */

const CLINICAL_ASSESSMENTS = [
  // MÓDULO NOVO: SÍNDROME DE BURNOUT & ESGOTAMENTO
  {
    id: "burnout",
    title: "Síndrome de Burnout & Esgotamento",
    name: "Síndrome de Burnout & Esgotamento",
    shortName: "Síndrome de Burnout & Esgotamento",
    badge: "Psicossomática e Carreira",
    description: "Investigação de exaustão profunda, desconexão de propósito e sobrecarga contínua.",
    icon: "fa-heart-pulse",
    category: "Queixas Clínicas Gerais",
    maxScore: 12,
    questions: [
      {
        id: "b1",
        question: "Você sente um cansaço crônico que persiste mesmo após finais de semana ou períodos de repouso?",
        text: "Você sente um cansaço crônico que persiste mesmo após finais de semana ou períodos de repouso?",
        summary: "Cansaço crônico persistente",
        options: [
          { label: "Raramente ou sob controle", score: 0 },
          { label: "Frequentemente, acordo já exausto(a)", score: 2 },
          { label: "Constante, sinto esgotamento físico e mental extremo", score: 3 }
        ]
      },
      {
        id: "b2",
        question: "Percebe uma perda de sentido no trabalho, acompanhada de sentimentos de cinismo, indiferença ou frustração?",
        text: "Percebe uma perda de sentido no trabalho, acompanhada de sentimentos de cinismo, indiferença ou frustração?",
        summary: "Perda de sentido e indiferença no trabalho",
        options: [
          { label: "Ainda encontro motivação na maior parte do tempo", score: 0 },
          { label: "Faço as tarefas no piloto automático, sem entusiasmo", score: 2 },
          { label: "Sinto total vazio e desapego do que antes fazia sentido", score: 3 }
        ]
      },
      {
        id: "b3",
        question: "Tem apresentado manifestações físicas frequentes (dores de cabeça, alterações no sono, tensão muscular, problemas gastrointestinais)?",
        text: "Tem apresentado manifestações físicas frequentes (dores de cabeça, alterações no sono, tensão muscular, problemas gastrointestinais)?",
        summary: "Manifestações físicas e psicossomáticas frequentes",
        options: [
          { label: "Não tenho sintomas físicos associados", score: 0 },
          { label: "Sintomas pontuais em dias de pico de estresse", score: 1 },
          { label: "Sintomas corporais frequentes e debilitantes", score: 3 }
        ]
      },
      {
        id: "b4",
        question: "Sente que está abrindo mão excessivamente de limites pessoais, descanso e lazer para dar conta de demandas externas?",
        text: "Sente que está abrindo mão excessivamente de limites pessoais, descanso e lazer para dar conta de demandas externas?",
        summary: "Renúncia de limites pessoais e lazer",
        options: [
          { label: "Consigo preservar meu tempo e dizer não", score: 0 },
          { label: "Tenho dificuldade de pausar e me sinto culpado(a) ao parar", score: 2 },
          { label: "Vivo em renúncia contínua de mim mesmo(a) em prol do trabalho", score: 3 }
        ]
      }
    ]
  },

  // QUEIXAS CLÍNICAS GERAIS
  {
    id: "ansiedade",
    title: "Ansiedade & Angústia",
    name: "Ansiedade & Angústia",
    shortName: "Ansiedade & Angústia",
    icon: "fa-cloud-bolt",
    category: "Queixas Clínicas Gerais",
    maxScore: 16
  },
  {
    id: "relacionamentos",
    title: "Conflitos & Vínculos Afetivos",
    name: "Conflitos & Vínculos Afetivos",
    shortName: "Conflitos & Vínculos Afetivos",
    icon: "fa-heart-crack",
    category: "Queixas Clínicas Gerais",
    maxScore: 16
  },
  {
    id: "autoconhecimento",
    title: "Autoconhecimento & Transição",
    name: "Autoconhecimento & Transição",
    shortName: "Autoconhecimento & Transição",
    icon: "fa-compass",
    category: "Queixas Clínicas Gerais",
    maxScore: 16
  },
  {
    id: "luto",
    title: "Luto, Traumas & Perdas",
    name: "Luto, Traumas & Perdas",
    shortName: "Luto, Traumas & Perdas",
    icon: "fa-leaf",
    category: "Queixas Clínicas Gerais",
    maxScore: 16
  },
  {
    id: "outras",
    title: "Outras Questões Pessoais",
    name: "Outras Questões Pessoais",
    shortName: "Outras Questões Pessoais",
    icon: "fa-comments",
    category: "Queixas Clínicas Gerais",
    maxScore: 16
  },

  // PERFIS & NEURODIVERGÊNCIAS
  {
    id: "superdotacao",
    title: "Superdotação & Altas Habilidades",
    name: "Superdotação & Altas Habilidades",
    shortName: "Superdotação & Altas Habilidades",
    icon: "fa-lightbulb",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "tdah",
    title: "TDAH (Foco & Procrastinação)",
    name: "TDAH (Foco & Procrastinação)",
    shortName: "TDAH (Foco & Procrastinação)",
    icon: "fa-brain",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "tea",
    title: "Traços do Espectro (TEA)",
    name: "Traços do Espectro (TEA)",
    shortName: "Traços do Espectro (TEA)",
    icon: "fa-puzzle-piece",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "borderline",
    title: "Instabilidade & Borderline",
    name: "Instabilidade & Borderline",
    shortName: "Instabilidade & Borderline (TPB)",
    icon: "fa-masks-theater",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "bipolaridade",
    title: "Ciclos de Humor & Bipolaridade",
    name: "Ciclos de Humor & Bipolaridade",
    shortName: "Ciclos de Humor & Bipolaridade",
    icon: "fa-wave-square",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "narcisismo",
    title: "Traços Narcísicos / Relações Tóxicas",
    name: "Traços Narcísicos / Relações Tóxicas",
    shortName: "Traços Narcísicos / Relações Tóxicas",
    icon: "fa-crown",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  },
  {
    id: "histrionica",
    title: "Expressividade & Histriônica",
    name: "Expressividade & Histriônica",
    shortName: "Expressividade & Traços Histriônicos",
    icon: "fa-theater-masks",
    category: "Perfis & Neurodivergências",
    maxScore: 16
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CLINICAL_ASSESSMENTS };
}
