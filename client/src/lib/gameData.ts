// ─── Mock Data & Game Logic for RedFlag AI Teen ────────────────────────────
// TEMÁTICA: Captación de niñas, niños y adolescentes por crimen organizado
// en entornos digitales. Enfoque cibercriminológico y de protección infantil.

export type ModuleId = 'grooming' | 'coercive' | 'fraud' | 'disinfo';
export type RiskLevel = 'high' | 'medium' | 'low';

// ─── INDICADORES EDUCATIVOS Y DE RIESGO ──────────────────────────────────────────────────
// Indicadores base (todos los módulos)
export type BaseIndicator =
  | 'red_flags_presentes'
  | 'red_flags_detectadas'
  | 'precision_deteccion'
  | 'tiempo_respuesta'
  | 'decision_segura'
  | 'decision_riesgosa'
  | 'fase_del_riesgo'
  | 'nivel_dificultad';

// Indicadores de captación por crimen organizado (transversales)
export type CaptacionIndicator =
  | 'promesa_dinero_facil'
  | 'oferta_trabajo_ambigua'
  | 'promesa_pertenencia_estatus'
  | 'romantizacion_vida_criminal'
  | 'peticion_favor_pequeno'
  | 'secreto_o_discrecion'
  | 'presion_para_cumplir_encargo';

// Indicadores específicos por módulo
export type GroomingIndicator =
  | 'halagos_excesivos'
  | 'peticion_secreto'
  | 'migracion_chat_privado'
  | 'contacto_desconocido_mayor'
  | 'ofrecimiento_regalo_dinero'
  | 'solicitud_info_personal';

export type CoerciveIndicator =
  | 'presion_emocional'
  | 'amenaza_directa'
  | 'chantaje'
  | 'culpabilizacion'
  | 'obediencia_exigida';

export type FraudIndicator =
  | 'urgencia'
  | 'peticion_datos_sensibles'
  | 'oferta_irreal'
  | 'canal_sospechoso'
  | 'solicitud_pago_transferencia'
  | 'suplantacion_autoridad';

export type DisinfoIndicator =
  | 'contenido_alarmista'
  | 'sin_fuente_verificable'
  | 'presion_compartir'
  | 'impacto_emocional_alto'
  | 'apariencia_manipulada';

export type AnyIndicator =
  | BaseIndicator
  | CaptacionIndicator
  | GroomingIndicator
  | CoerciveIndicator
  | FraudIndicator
  | DisinfoIndicator;

// Registro de una interacción individual
export interface InteractionRecord {
  stepId: string;
  moduleId: ModuleId;
  stageIndex: number;       // 0-4 etapa del riesgo
  difficultyLabel: string;
  indicators: AnyIndicator[];   // indicadores activos en este caso
  decisionSegura: boolean;
  responseTimeMs: number;
  pointsEarned: number;
  maxPoints: number;
  flagsPresent: number;
  flagsDetected: number;
  timestamp: number;
}

// Estadísticas agregadas por módulo
export interface ModuleStats {
  moduleId: ModuleId;
  totalInteracciones: number;
  decisionesSeguras: number;
  decisionesRiesgosas: number;
  porcentajeDeteccion: number;  // % flags detectadas vs presentes
  tiempoPromedioMs: number;
  faseMasVulnerable: number;    // stageIndex con más decisiones riesgosas
  indicadorMasFrecuente: string;
  indicadoresFrecuencia: Record<string, number>; // conteo de cada indicador
}

export interface RedFlag {
  id: string;
  label: string;
  explanation: string;
  severity: RiskLevel;
}

export interface ChatMessage {
  id: string;
  sender: 'them' | 'you';
  text: string;
  flagIds?: string[];
  timestamp: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  pointsEarned: number;
}

export interface RiskStage {
  label: string;
  description: string;
}

export interface SimulationStep {
  id: string;
  type: 'chat' | 'profile' | 'post' | 'message';
  content: any;
  choices: Choice[];
  correctChoiceId: string;
  stageIndex: number; // 0-4, which risk stage this step belongs to
  indicators: AnyIndicator[]; // indicadores educativos activos en este caso
}

export interface Module {
  id: ModuleId;
  title: string;
  subtitle: string;
  description: string;
  threatType: string;
  color: string;
  colorClass: string;
  bgClass: string;
  icon: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  xp: number;
  steps: SimulationStep[];
  redFlags: RedFlag[];
  finalAdvice: string;
  realWorldAction: string;
  riskStages: RiskStage[];
  stagesIntro: string;
}

// ─── ETAPAS UNIFICADAS DE CAPTACIÓN (compartidas por todos los módulos) ───────
// 0 = Exposición | 1 = Acercamiento | 2 = Vinculación | 3 = Prueba o encargo | 4 = Control o incorporación

// ─── MODULE 1: GROOMING Y CAPTACIÓN ───────────────────────────────────────────
export const groomingModule: Module = {
  id: 'grooming',
  title: 'Grooming y Captación',
  subtitle: 'Detecta el primer contacto de reclutadores que se disfrazan de amigos en redes',
  description: 'El crimen organizado usa perfiles falsos y técnicas de grooming digital para acercarse a menores, ganar su confianza y eventualmente captarlos para actividades ilegales.',
  threatType: 'Manipulación y reclutamiento',
  color: 'hsl(258 85% 65%)',
  colorClass: 'text-purple-400',
  bgClass: 'gradient-card-purple',
  icon: '💬',
  difficulty: 'Intermedio',
  xp: 120,
  redFlags: [
    { id: 'rf1', label: 'Pide guardar secreto', explanation: 'Cualquier persona que te pide no contarle a tus padres tiene algo que ocultar. Es la primera señal de captación.', severity: 'high' },
    { id: 'rf2', label: 'Migración a plataforma privada', explanation: 'Pasar a WhatsApp o Telegram elimina registros y controles de la plataforma. Es una táctica para operar sin ser detectado.', severity: 'high' },
    { id: 'rf3', label: 'Confianza acelerada', explanation: 'Construir amistad muy rápido, con elogios excesivos y atención intensa, es manipulación emocional para bajar tus defensas.', severity: 'medium' },
    { id: 'rf4', label: 'Solicita datos personales', explanation: 'Preguntar tu colonia, escuela, horarios o rutina sirve para ubicarte físicamente. Es preparación para el siguiente paso del reclutamiento.', severity: 'high' },
    { id: 'rf5', label: 'Ofrece protección o pertenencia', explanation: '"Nosotros cuidamos a nuestra gente" es un gancho emocional para menores que se sienten solos o vulnerables.', severity: 'high' },
  ],
  stagesIntro: 'El reclutamiento digital por parte del crimen organizado es gradual, emocional y manipulador. No empieza con amenazas: empieza con amistad, regalos y comprensión. Cada etapa es una trampa más profunda que la anterior. Reconocer la señal desde el inicio puede salvar una vida.',
  riskStages: [
    { label: 'Exposición', description: 'El reclutador identifica al menor en redes: fotos públicas, comentarios sobre problemas en casa, búsqueda de pertenencia o dinero.' },
    { label: 'Acercamiento', description: 'Hace contacto con un pretexto amigable: interés en gaming, oferta de trabajo, promesa de amistad o apoyo emocional.' },
    { label: 'Vinculación', description: 'Construye confianza rápida, pide pasar la conversación a un canal privado y solicita guardar el secreto.' },
    { label: 'Prueba o encargo', description: 'Hace una solicitud pequeña y aparentemente inofensiva: entregar un paquete, guardar algo, no decir nada.' },
    { label: 'Control o incorporación', description: 'El menor ya está involucrado. Usan la información o el encargo cumplido como herramienta de control o amenaza.' },
  ],
  steps: [
    // CASO 1 — Exposición: perfil que detecta vulnerabilidad
    {
      id: 'g1',
      stageIndex: 0,
      indicators: ['contacto_desconocido_mayor', 'solicitud_info_personal', 'oferta_trabajo_ambigua'],
      type: 'profile',
      content: {
        accountName: '@apoyo.joven.mx',
        accountPic: '🤝',
        followers: '1,240 seguidores',
        verified: false,
        bio: 'Ayudamos a jóvenes que lo necesitan | Si tienes problemas en casa escríbenos | DM abierto',
        post: {
          text: '¿Tu familia no te entiende? ¿Sientes que estás solo? Hay personas que sí se preocupan por ti. Escríbenos. Te escuchamos sin juzgar 💙',
          likes: 847,
          comments: 203,
          flagIds: ['rf5', 'rf3'],
        },
        question: 'Un perfil en redes dice "ayudar" a jóvenes con problemas. ¿Qué señales de alerta ves?',
      },
      choices: [
        { id: 'c1a', text: 'Me siento identificado/a — les mando DM', isCorrect: false, feedback: 'Este tipo de perfil busca específicamente a menores que se sienten solos o incomprendidos. Explotar vulnerabilidades emocionales es el primer paso del reclutamiento.', pointsEarned: 0 },
        { id: 'c1b', text: 'Identifico que buscan menores vulnerables — no escribo y reporto el perfil', isCorrect: true, feedback: '¡Correcto! Un perfil sin respaldo institucional que promete "escucha sin juicios" en DMs privados está buscando menores en situación vulnerable. Es una táctica clásica de captación.', pointsEarned: 30 },
        { id: 'c1c', text: 'Busco reseñas del perfil antes de escribir', isCorrect: false, feedback: 'Investigar es prudente, pero este perfil ya muestra señales claras. Una organización legítima opera con respaldo institucional visible, no solo desde un perfil de redes sociales.', pointsEarned: 10 },
      ],
      correctChoiceId: 'c1b',
    },
    // CASO 2 — Acercamiento: primer contacto amigable
    {
      id: 'g2',
      stageIndex: 1,
      indicators: ['contacto_desconocido_mayor', 'oferta_trabajo_ambigua', 'promesa_pertenencia_estatus', 'secreto_o_discrecion'],
      type: 'chat',
      content: {
        profileName: 'Beto_Gamer_23',
        profilePic: '🎮',
        profileBio: 'Gamer | Buen pago por referidos | CDMX',
        messages: [
          { id: 'g2m1', sender: 'them', text: 'Hola! Vi que comentaste en ese video. ¿Juegas mucho? Yo conozco gente que paga por jugadores buenos.', timestamp: '16:10', flagIds: [] },
          { id: 'g2m2', sender: 'them', text: '¿Cuántos años tienes? ¿Vives en CDMX? Mi grupo busca chavos activos.', timestamp: '16:12', flagIds: ['rf4'] },
          { id: 'g2m3', sender: 'them', text: 'No es nada ilegal, solo hacer recados a veces. Buen dinero y te cuidan. ¿Le entras?', timestamp: '16:14', flagIds: ['rf5', 'rf3'] },
        ] as ChatMessage[],
        question: 'Un desconocido en redes te ofrece dinero por "recados" y dice que "te cuidan". ¿Qué está pasando?',
      },
      choices: [
        { id: 'c2a', text: 'Me interesa — pregunto más detalles sobre los recados', isCorrect: false, feedback: '"Recados bien pagados" y "te cuidan" son frases de reclutamiento. El crimen organizado no anuncia lo que realmente hace. Seguir la conversación te mete más en el proceso.', pointsEarned: 0 },
        { id: 'c2b', text: 'Reconozco lenguaje de captación — no respondo, bloqueo y lo cuento a un adulto', isCorrect: true, feedback: '¡Exacto! "Buenos pagos", "te cuidan" y preguntar tu edad y ubicación son señales de reclutamiento. El crimen organizado usa exactamente este lenguaje con menores en redes.', pointsEarned: 30 },
        { id: 'c2c', text: 'Le pregunto qué tipo de "recados" serían', isCorrect: false, feedback: 'Seguir conversando te hace más visible como objetivo. Aunque el trabajo parezca inofensivo, los "recados" suelen escalar a actividades ilegales. Corta el contacto.', pointsEarned: 5 },
      ],
      correctChoiceId: 'c2b',
    },
    // CASO 3 — Vinculación: confianza construida con elogios y apoyo
    {
      id: 'g3',
      stageIndex: 2,
      indicators: ['halagos_excesivos', 'secreto_o_discrecion', 'promesa_pertenencia_estatus'],
      type: 'chat',
      content: {
        profileName: 'Fer_Hermano_Mayor',
        profilePic: '💪',
        profileBio: '24 años | CDMX | Cuido a los míos',
        messages: [
          { id: 'g3m1', sender: 'them', text: 'Oye, llevas días hablando de que tus papás no te pelan. Eso está mal, te mereces más.', timestamp: '21:00', flagIds: ['rf3'] },
          { id: 'g3m2', sender: 'them', text: 'Yo también tuve esos problemas. Pero encontré gente que de verdad cuida a su familia. Nosotros somos así.', timestamp: '21:03', flagIds: ['rf5'] },
          { id: 'g3m3', sender: 'them', text: 'No le cuentes a nadie que hablamos, no te van a entender como yo. Tú y yo somos diferentes 💯', timestamp: '21:06', flagIds: ['rf1', 'rf5'] },
        ] as ChatMessage[],
        question: 'Este "hermano mayor" dice entenderte mejor que tu familia y pide que guarden el secreto. ¿Qué reconoces?',
      },
      choices: [
        { id: 'c3a', text: 'Me siento comprendido/a — es de los pocos que me escucha', isCorrect: false, feedback: 'Hacerte sentir incomprendido en casa para que busques "familia" fuera es una táctica clásica de reclutamiento. El aislamiento de tu familia real es un paso deliberado.', pointsEarned: 0 },
        { id: 'c3b', text: 'Identifico que me está aislando de mi familia para vincularme con "su grupo"', isCorrect: true, feedback: '¡Exacto! "Nosotros te cuidamos", "no te van a entender" y pedir secreto son los tres pilares de la fase de vinculación en el reclutamiento organizado. Habla con un adulto.', pointsEarned: 40 },
        { id: 'c3c', text: 'Le cuento más sobre mis problemas en casa', isCorrect: false, feedback: 'Compartir más vulnerabilidades da más herramientas al reclutador para manipularte. Cada dato que compartes es usado para profundizar el control emocional.', pointsEarned: 0 },
      ],
      correctChoiceId: 'c3b',
    },
    // CASO 4 — Acercamiento: falso scout deportivo
    {
      id: 'g4',
      stageIndex: 1,
      indicators: ['contacto_desconocido_mayor', 'solicitud_info_personal', 'migracion_chat_privado'],
      type: 'profile',
      content: {
        accountName: '@scouting.fut.mx',
        accountPic: '⚽',
        followers: '3,100 seguidores',
        verified: false,
        bio: 'Buscamos talentos juveniles | Pruebas privadas | Buen futuro para los que clasifiquen',
        post: {
          text: 'Si tienes entre 13 y 17 años y juegas fútbol, queremos conocerte. Mándanos DM con tu edad, foto y en qué colonia entrenas. Hay futuro para los mejores 🏆',
          likes: 412,
          comments: 87,
          flagIds: ['rf4', 'rf3', 'rf2'],
        },
        question: 'Un perfil pide tu edad, foto y ubicación de entrenamiento para "pruebas privadas". ¿Qué señales ves?',
      },
      choices: [
        { id: 'c4a', text: 'Es una oportunidad real — les mando mi información', isCorrect: false, feedback: 'Perfiles que solicitan edad, foto y ubicación física de menores son extremadamente peligrosos. Los reclutadores usan pretextos deportivos para localizar y contactar menores.', pointsEarned: 0 },
        { id: 'c4b', text: 'Identifico que recopilan datos personales de menores — no respondo y reporto', isCorrect: true, feedback: '¡Correcto! Pedir edad + foto + ubicación es una ficha de localización. Ningún club deportivo legítimo hace reclutamiento por DM sin respaldo institucional verificable.', pointsEarned: 30 },
        { id: 'c4c', text: 'Busco el perfil en internet antes de responder', isCorrect: false, feedback: 'Investigar es precaución válida, pero este perfil ya muestra señales: solicitud de datos físicos de menores por DM privado. Reportar es el paso correcto, no seguir indagando.', pointsEarned: 10 },
      ],
      correctChoiceId: 'c4b',
    },
    // CASO 5 — Prueba o encargo: el primer "favorcito"
    {
      id: 'g5',
      stageIndex: 3,
      indicators: ['peticion_favor_pequeno', 'secreto_o_discrecion', 'presion_para_cumplir_encargo'],
      type: 'chat',
      content: {
        profileName: 'Marco_Del_Barrio',
        profilePic: '🏘️',
        profileBio: 'Del barrio | Los míos primero | CDMX',
        messages: [
          { id: 'g5m1', sender: 'them', text: 'Ya llevamos tiempo hablando y de verdad confío en ti. Necesito un favor pequeño.', timestamp: '15:30', flagIds: [] },
          { id: 'g5m2', sender: 'them', text: 'Pasa por una mochila en la tienda de la esquina de tu calle y llévala a una dirección. Te doy 500 pesos. No abras la mochila.', timestamp: '15:32', flagIds: ['rf4', 'rf1'] },
          { id: 'g5m3', sender: 'them', text: 'Es solo un recado, no preguntes qué hay adentro. No le digas a nadie. Así es como empieza la confianza real 💯', timestamp: '15:34', flagIds: ['rf1', 'rf5'] },
        ] as ChatMessage[],
        question: 'Alguien que "confía en ti" te pide entregar una mochila sin abrirla a cambio de dinero. ¿Qué es esto?',
      },
      choices: [
        { id: 'c5a', text: 'Es solo un recado — lo hago, necesito el dinero', isCorrect: false, feedback: 'Transportar paquetes sin saber el contenido es una de las formas más comunes de involucrar menores en actividades ilegales. "No preguntes" es la señal más grave de este tipo de captación.', pointsEarned: 0 },
        { id: 'c5b', text: 'Reconozco que es un encargo de reclutamiento — me niego y lo cuento a un adulto de confianza', isCorrect: true, feedback: '¡Muy bien! "No abras", "no le digas a nadie" y dinero fácil son los tres componentes del primer encargo de captación. Si aceptas, ya tienes algo que te pueden usar en contra.', pointsEarned: 40 },
        { id: 'c5c', text: 'Le pregunto qué hay en la mochila antes de decidir', isCorrect: false, feedback: 'Ya te dijo que no preguntes — eso es suficiente. Un encargo legítimo no requiere secreto. Negarte y alejarte es lo correcto, sin importar el dinero ofrecido.', pointsEarned: 5 },
      ],
      correctChoiceId: 'c5b',
    },
    // CASO 6 — Control: ya hiciste el primer encargo
    {
      id: 'g6',
      stageIndex: 4,
      indicators: ['presion_para_cumplir_encargo', 'secreto_o_discrecion', 'amenaza_directa'],
      type: 'message',
      content: {
        senderName: 'Marco_Del_Barrio',
        senderPic: '🏘️',
        messages: [
          { id: 'g6m1', sender: 'them', text: 'Ya entregaste. Bien hecho. Ahora eres de los nuestros.', timestamp: '18:00', flagIds: ['rf5'] },
          { id: 'g6m2', sender: 'them', text: 'Si quieres salirte o se lo cuentas a alguien, ya sabes dónde vives y a qué hora pasa tu familia.', timestamp: '18:02', flagIds: ['rf1', 'rf5'] },
          { id: 'g6m3', sender: 'them', text: 'Mañana hay otro encargo. Este paga 1,500. Ya no tienes opción, chaval.', timestamp: '18:04', flagIds: ['rf1'] },
        ] as ChatMessage[],
        question: 'Después de hacer el primer encargo, ahora te amenazan con tu familia. ¿Qué debes hacer aunque tengas miedo?',
      },
      choices: [
        { id: 'c6a', text: 'Tengo miedo — hago lo que piden para no exponerme más', isCorrect: false, feedback: 'Obedecer bajo amenaza profundiza el control. El miedo es exactamente lo que buscan. Cada encargo cumplido cierra más la trampa. Buscar ayuda, aunque sea difícil, es la única salida real.', pointsEarned: 0 },
        { id: 'c6b', text: 'Busco ayuda urgente de un adulto de confianza o autoridad — aunque tenga miedo', isCorrect: true, feedback: '¡Correcto y valiente! Las amenazas hacia tu familia son el mecanismo de control más usado. Las autoridades tienen protocolos para estas situaciones. Callar solo profundiza el riesgo. Busca ayuda hoy.', pointsEarned: 40 },
        { id: 'c6c', text: 'Hago solo este último encargo y después me salgo', isCorrect: false, feedback: 'No existe "el último encargo". Cada vez que cedes, el control aumenta. La única salida real es buscar ayuda con una autoridad o adulto de confianza, no negociar con quien te amenaza.', pointsEarned: 0 },
      ],
      correctChoiceId: 'c6b',
    },
    // CASO 7 — Acercamiento: perfil de chica que "coincide" en todo
    {
      id: 'g7',
      stageIndex: 1,
      indicators: ['migracion_chat_privado', 'contacto_desconocido_mayor', 'solicitud_info_personal', 'promesa_pertenencia_estatus'],
      type: 'chat',
      content: {
        profileName: 'Alicia_CDMX_15',
        profilePic: '🌸',
        profileBio: 'CDMX | Música y libertad | 15 años',
        messages: [
          { id: 'g7m1', sender: 'them', text: 'Hola! Vi que sigues a ese artista, yo también. Somos de los pocos que lo conocen 😂', timestamp: '20:30', flagIds: [] },
          { id: 'g7m2', sender: 'them', text: 'Oye ¿en qué colonia vives? Yo soy de Iztapalapa. A veces me siento muy sola, ¿tú también?', timestamp: '20:33', flagIds: ['rf4', 'rf3'] },
          { id: 'g7m3', sender: 'them', text: 'Te presento a mi grupo de amigos, son muy chidos y cuidan a la gente que se une. Podríamos vernos.', timestamp: '20:36', flagIds: ['rf5', 'rf2'] },
        ] as ChatMessage[],
        question: 'Una "chica de tu edad" te pregunta tu colonia y quiere presentarte a "su grupo". ¿Qué señales reconoces?',
      },
      choices: [
        { id: 'c7a', text: 'Parece una chica normal — le digo mi colonia y acepto conocer al grupo', isCorrect: false, feedback: 'Los perfiles de menores de edad son usados por reclutadores para generar confianza. Preguntar la colonia + invitar a un "grupo que cuida" es el patrón de captación con cara amigable.', pointsEarned: 0 },
        { id: 'c7b', text: 'Identifico el patrón: preguntar ubicación + invitar a grupo que "cuida" — no comparto datos y desconfío', isCorrect: true, feedback: '¡Correcto! Este es el patrón más común de reclutamiento con perfil falso de joven. La promesa de pertenencia a un grupo que "cuida" es el gancho emocional clásico para menores.', pointsEarned: 40 },
        { id: 'c7c', text: 'Le pregunto más sobre el grupo antes de decidir', isCorrect: false, feedback: 'Seguir la conversación profundiza el contacto. Ya tienes señales claras: solicita ubicación y quiere llevarte con un grupo desconocido. Desconéctate y cuéntalo a un adulto.', pointsEarned: 5 },
      ],
      correctChoiceId: 'c7b',
    },
    // CASO 8 — Vinculación: adulto que ofrece ser "figura de protección"
    {
      id: 'g8',
      stageIndex: 2,
      indicators: ['promesa_pertenencia_estatus', 'halagos_excesivos', 'secreto_o_discrecion'],
      type: 'chat',
      content: {
        profileName: 'El_Padrino_MX',
        profilePic: '🕶️',
        profileBio: '38 años | Cuido a los míos | Respeto ante todo',
        messages: [
          { id: 'g8m1', sender: 'them', text: 'Sé que en tu barrio hay problemas. A mí me va bien porque tengo gente que me cuida y yo los cuido.', timestamp: '22:10', flagIds: ['rf5'] },
          { id: 'g8m2', sender: 'them', text: 'Tú me pareces diferente. Con nosotros tendrías protección, nunca te faltaría nada.', timestamp: '22:13', flagIds: ['rf3', 'rf5'] },
          { id: 'g8m3', sender: 'them', text: 'Solo hablemos por aquí. No hace falta que se enteren en tu casa. Es entre nosotros.', timestamp: '22:15', flagIds: ['rf1', 'rf2'] },
        ] as ChatMessage[],
        question: 'Un adulto desconocido te ofrece "protección" y pide que la conversación sea secreta. ¿Qué reconoces?',
      },
      choices: [
        { id: 'c8a', text: 'Me llama la atención la oferta — le pregunto más', isCorrect: false, feedback: '"Protección", "nunca te faltará nada" y "no se enteren en tu casa" son las tres frases clave del proceso de vinculación con grupos criminales. Seguir la conversación es peligroso.', pointsEarned: 0 },
        { id: 'c8b', text: 'Identifico que es vinculación criminal — ofertas de protección + secreto = señal grave', isCorrect: true, feedback: '¡Excelente! La oferta de protección apelando a vulnerabilidades reales, sumada al pedido de secreto, es la fase de vinculación del reclutamiento. Reporta este perfil y cuéntaselo a un adulto.', pointsEarned: 40 },
        { id: 'c8c', text: 'Le agradezco pero le digo que no me interesa', isCorrect: false, feedback: 'Responder aunque sea amablemente confirma tu disponibilidad. Lo correcto es no responder, bloquear y reportar el perfil a la plataforma.', pointsEarned: 10 },
      ],
      correctChoiceId: 'c8b',
    },
    // CASO 9 — Prueba: te piden "vigilar" o "avisar"
    {
      id: 'g9',
      stageIndex: 3,
      indicators: ['peticion_favor_pequeno', 'promesa_dinero_facil', 'secreto_o_discrecion'],
      type: 'message',
      content: {
        senderName: 'Contacto_Nuevo',
        senderPic: '📱',
        messages: [
          { id: 'g9m1', sender: 'them', text: 'Solo necesito que estés atento. Si ves coches con tal descripción en tu calle, me avisas. Nada más.', timestamp: '11:20', flagIds: ['rf1'] },
          { id: 'g9m2', sender: 'them', text: 'No es nada ilegal. Solo son tus ojos. Te pago 300 por semana.', timestamp: '11:21', flagIds: ['rf5'] },
          { id: 'g9m3', sender: 'them', text: 'No lo cuentes. Así empieza la confianza. Si esto va bien, habrá más.', timestamp: '11:23', flagIds: ['rf1', 'rf3'] },
        ] as ChatMessage[],
        question: 'Te piden ser "los ojos" en tu calle para avisar por 300 pesos semanales. ¿Es inofensivo?',
      },
      choices: [
        { id: 'c9a', text: 'Solo es vigilar — parece fácil y el dinero ayuda', isCorrect: false, feedback: 'Ser "vigía" o "halcón" es una de las formas más comunes de involucrar a menores en el crimen organizado. Es un encargo inicial que siempre escala y que ya te hace cómplice.', pointsEarned: 0 },
        { id: 'c9b', text: 'Reconozco que es reclutamiento como halcón — no acepto y lo cuento a un adulto', isCorrect: true, feedback: '¡Correcto! Ser "vigía" o "halcón" es el primer escalón del reclutamiento. El pago semanal crea dependencia. El secreto crea compromiso. Negarse y contarlo a un adulto es la respuesta correcta.', pointsEarned: 40 },
        { id: 'c9c', text: 'Le pregunto qué coches tengo que vigilar antes de decidir', isCorrect: false, feedback: 'Saber más detalles no cambia la situación: te están reclutando como informante. El dinero, el secreto y el "así empieza la confianza" son señales inequívocas. No sigas.', pointsEarned: 0 },
      ],
      correctChoiceId: 'c9b',
    },
    // CASO 10 — Exposición: perfil público que delata vulnerabilidad
    {
      id: 'g10',
      stageIndex: 0,
      indicators: ['solicitud_info_personal', 'promesa_pertenencia_estatus'],
      type: 'post',
      content: {
        accountName: 'tu_perfil_propio',
        accountPic: '🧒',
        verified: false,
        postText: '[Tu publicación pública] "Otro día sin dinero en casa, mis papás pelean todo el tiempo y yo la verdad ya no aguanto. Necesito escapar de esto 😔" #SinFiltros #VidaReal',
        metrics: { likes: 42, shares: 12, comments: 28 },
        flagIds: ['rf4', 'rf5'],
        hasSource: false,
        question: 'Esta publicación tuya es pública y visible para todos. ¿Por qué es una señal de riesgo para captación?',
      },
      choices: [
        { id: 'c10a', text: 'No hay riesgo — solo estoy expresando cómo me siento', isCorrect: false, feedback: 'Los reclutadores buscan activamente publicaciones de menores que expresan problemas en casa, necesidad de dinero o deseos de escapar. Esta publicación es exactamente lo que buscan.', pointsEarned: 0 },
        { id: 'c10b', text: 'Entiendo que expreso vulnerabilidades que reclutadores buscan — la privacidad me protege', isCorrect: true, feedback: '¡Exacto! Los reclutadores monitorean redes en búsqueda de menores que expresan necesidades económicas, conflictos familiares o deseos de pertenencia. Configurar tu perfil como privado reduce este riesgo.', pointsEarned: 40 },
        { id: 'c10c', text: 'Solo la borraré si me escribe alguien sospechoso', isCorrect: false, feedback: 'Para entonces ya te habrán identificado. La prevención es antes del contacto. Publicar vulnerabilidades personales de forma pública es una invitación involuntaria para reclutadores.', pointsEarned: 10 },
      ],
      correctChoiceId: 'c10b',
    },
  ],
  finalAdvice: 'El reclutamiento digital empieza antes de que te des cuenta. Reconocer las etapas — desde el primer contacto amigable hasta el primer encargo — es la herramienta más poderosa para protegerte. Si estás en cualquiera de estas etapas, habla con un adulto de confianza hoy.',
  realWorldAction: 'Si identifies una situación de captación o ya estás involucrado/a en alguna, busca ayuda de un adulto de confianza o contacta a la Policía Cibernética de la Ciudad de México al 55 5242 5100 ext. 5086 o escribe a policia.cibernetica@ssc.cdmx.gob.mx. No estás solo/a y no es tarde.',
};

// ─── MODULE 2: MENSAJES COERCITIVOS Y CONTROL ──────────────────────────────
export const coerciveModule: Module = {
  id: 'coercive',
  title: 'Presión y Control Digital',
  subtitle: 'Aprende a identificar mensajes que usan intimidación para mantenerte atrapado',
  description: 'El crimen organizado usa mensajes de presión, amenazas e intimidación para mantener a los menores captados bajo obediencia y evitar que pidan ayuda.',
  threatType: 'Coerción y control',
  color: 'hsl(4 90% 58%)',
  colorClass: 'text-red-400',
  bgClass: 'gradient-card-red',
  icon: '⚠️',
  difficulty: 'Avanzado',
  xp: 150,
  redFlags: [
    { id: 'rf6', label: 'Amenaza a la familia', explanation: '"Sabemos dónde vive tu familia" es la amenaza más usada para mantener a menores bajo control y evitar que pidan ayuda.', severity: 'high' },
    { id: 'rf7', label: 'Urgencia forzada', explanation: '"Tienes X horas" es para que actúes sin pensar ni consultar a nadie. La presión de tiempo es una táctica de control deliberada.', severity: 'high' },
    { id: 'rf8', label: 'Normalización de la violencia', explanation: '"Así funciona esto" o "aquí todos lo hacen" busca hacerte creer que no hay salida y que lo que piden es inevitable.', severity: 'high' },
    { id: 'rf9', label: 'Aislamiento forzado', explanation: '"No le cuentes a nadie o será peor" te desconecta de toda red de apoyo, dejándote sin salida aparente.', severity: 'high' },
    { id: 'rf10', label: 'Chantaje con lo que ya hiciste', explanation: 'Usar un encargo anterior para amenazarte es una trampa diseñada desde el inicio. No es tu culpa — busca ayuda.', severity: 'high' },
  ],
  stagesIntro: 'El control coercitivo en captación digital no comienza con golpes: comienza con mensajes. Primero son sugerencias, luego presiones, luego amenazas. El objetivo es que el menor sienta que no hay salida y que pedir ayuda lo pone en más peligro. Reconocer este patrón puede romper el ciclo.',
  riskStages: [
    { label: 'Exposición', description: 'El menor ya tiene contacto establecido. Los mensajes empiezan a tener un tono de autoridad o expectativa.' },
    { label: 'Acercamiento', description: 'Se usan "favores", elogios o pequeñas presiones para normalizar la obediencia.' },
    { label: 'Vinculación', description: 'La persona ya siente que "debe" algo. Se introduce el concepto de lealtad y consecuencias.' },
    { label: 'Prueba o encargo', description: 'Se hacen exigencias directas con justificaciones como "así es aquí" o "tú ya sabes cómo funciona esto".' },
    { label: 'Control o incorporación', description: 'Las amenazas son explícitas. Se menciona a la familia. Se elimina cualquier ilusión de salida libre.' },
  ],
  steps: [
    // CASO 1 — Exposición: primer mensaje con tono de autoridad
    {
      id: 'co1',
      stageIndex: 0,
      indicators: ['presion_emocional', 'obediencia_exigida'],
      type: 'message',
      content: {
        senderName: 'Contacto_Nuevo',
        senderPic: '👤',
        messages: [
          { id: 'co1m1', sender: 'them', text: 'Me dijeron que eres de fiar. Quiero ver si es verdad.', timestamp: '19:00', flagIds: [] },
          { id: 'co1m2', sender: 'them', text: 'No soy cualquiera. La gente que me conoce sabe que no conviene fallarme.', timestamp: '19:02', flagIds: ['rf8'] },
          { id: 'co1m3', sender: 'them', text: 'Tú decides si quieres que esto sea fácil o difícil.', timestamp: '19:03', flagIds: ['rf7', 'rf8'] },
        ] as ChatMessage[],
        question: 'Un desconocido te escribe con tono de autoridad y dice que "no conviene fallarle". ¿Qué está haciendo?',
      },
      choices: [
        { id: 'co1a', text: 'Respondo con precaución para no molestarle', isCorrect: false, feedback: 'Responder bajo presión implícita ya es obedecer. Este tipo de mensaje busca establecer una jerarquía de poder desde el primer contacto. No respondas.', pointsEarned: 0 },
        { id: 'co1b', text: 'Reconozco que intenta imponerme miedo desde el inicio — no respondo y lo cuento a un adulto', isCorrect: true, feedback: '¡Correcto! El tono de amenaza implícita desde el primer mensaje es el inicio del ciclo de control. Cortarlo antes de que escale es la decisión correcta.', pointsEarned: 30 },
        { id: 'co1c', text: 'Le pregunto quién le dio mi contacto', isCorrect: false, feedback: 'Seguir la conversación valida su autoridad percibida. No importa quién te recomendó — lo correcto es no responder y contar a un adulto.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co1b',
    },
    // CASO 2 — Acercamiento: presión disfrazada de oportunidad
    {
      id: 'co2',
      stageIndex: 1,
      indicators: ['presion_emocional', 'amenaza_directa', 'obediencia_exigida'],
      type: 'chat',
      content: {
        profileName: 'El_Encargado',
        profilePic: '🔑',
        profileBio: 'Manejo cosas. Tú podrías ser útil.',
        messages: [
          { id: 'co2m1', sender: 'them', text: 'Necesito que hagas algo este fin. No es difícil. Solo tienes que estar disponible cuando te llame.', timestamp: '14:00', flagIds: [] },
          { id: 'co2m2', sender: 'them', text: 'Si dices que sí ahora, esto puede ser bueno para los dos. Si dices que no... bueno, espero que no sea así.', timestamp: '14:02', flagIds: ['rf7', 'rf8'] },
          { id: 'co2m3', sender: 'them', text: 'No le comentes a nadie. Entre más tranquilo, mejor para ti.', timestamp: '14:04', flagIds: ['rf9'] },
        ] as ChatMessage[],
        question: 'Alguien te pide "estar disponible" y añade "espero que no digas que no". ¿Cómo describes esto?',
      },
      choices: [
        { id: 'co2a', text: 'Digo que sí para evitar problemas — no parece gran cosa', isCorrect: false, feedback: '"Estar disponible cuando te llame" es el inicio del ciclo de obediencia. La amenaza implícita ("espero que no sea así") es presión coercitiva. Ceder es la trampa.', pointsEarned: 0 },
        { id: 'co2b', text: 'Identifico amenaza implícita y pedido de secreto — me niego y busco un adulto', isCorrect: true, feedback: '¡Exacto! Una oferta que incluye consecuencias implícitas por rechazarla no es una oferta: es coerción. El secreto refuerza el control. Negarse y buscar ayuda es lo correcto.', pointsEarned: 40 },
        { id: 'co2c', text: 'Le pregunto qué tipo de disponibilidad necesita antes de decidir', isCorrect: false, feedback: 'Pedir detalles antes de negarte valida la conversación. Ya tienes suficiente información para saber que algo no está bien. No sigas negociando.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co2b',
    },
    // CASO 3 — Vinculación: lealtad como obligación
    {
      id: 'co3',
      stageIndex: 2,
      indicators: ['presion_emocional', 'promesa_pertenencia_estatus', 'secreto_o_discrecion'],
      type: 'message',
      content: {
        senderName: 'Líder_Grupo',
        senderPic: '👑',
        messages: [
          { id: 'co3m1', sender: 'them', text: 'Ya eres de los nuestros. La lealtad aquí es lo más importante.', timestamp: '20:30', flagIds: ['rf8'] },
          { id: 'co3m2', sender: 'them', text: 'Si alguien habla de lo que hacemos, lo pagamos caro. Pero tú no vas a hablar, ¿verdad?', timestamp: '20:32', flagIds: ['rf9', 'rf6'] },
          { id: 'co3m3', sender: 'them', text: 'Así funciona en todos los grupos. La familia no entiende. Nosotros sí somos tu familia.', timestamp: '20:35', flagIds: ['rf8', 'rf9'] },
        ] as ChatMessage[],
        question: 'Te dicen que "ya eres de los suyos" y que la familia no entiende. ¿Qué estrategia de control es esta?',
      },
      choices: [
        { id: 'co3a', text: 'Siento que ya pertenezco — aceptar me da seguridad', isCorrect: false, feedback: '"Somos tu familia" reemplaza tu red de apoyo real con una red de control. Aislarte de tu familia real es el objetivo — te deja sin a quién recurrir cuando las amenazas escalen.', pointsEarned: 0 },
        { id: 'co3b', text: 'Identifico aislamiento emocional + amenaza implícita — busco a alguien de confianza aunque sea difícil', isCorrect: true, feedback: '¡Correcto! Sustituir la familia real con el "grupo" y añadir consecuencias por hablar es el ciclo de control clásico. Buscar ayuda aunque parezca peligroso es siempre la mejor opción.', pointsEarned: 40 },
        { id: 'co3c', text: 'Les digo que sí soy leal pero que no quiero más encargos', isCorrect: false, feedback: 'Negociar lealtad sin salida real no rompe el ciclo. Cualquier aceptación parcial profundiza el control. La única salida real es buscar ayuda exterior.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co3b',
    },
    // CASO 4 — Prueba: te exigen un encargo bajo amenaza explícita
    {
      id: 'co4',
      stageIndex: 3,
      indicators: ['amenaza_directa', 'presion_para_cumplir_encargo', 'obediencia_exigida'],
      type: 'message',
      content: {
        senderName: 'El_Encargado',
        senderPic: '🔑',
        messages: [
          { id: 'co4m1', sender: 'them', text: 'Mañana a las 7pm llevas este paquete a esta dirección. Sin excusas.', timestamp: '10:00', flagIds: ['rf7'] },
          { id: 'co4m2', sender: 'them', text: 'Si no apareces o le dices a alguien, sé exactamente dónde va tu hermano a la escuela.', timestamp: '10:01', flagIds: ['rf6', 'rf9'] },
          { id: 'co4m3', sender: 'them', text: 'Ya lo hiciste antes. Sabes que esto funciona así.', timestamp: '10:02', flagIds: ['rf10', 'rf8'] },
        ] as ChatMessage[],
        question: 'Te amenazan con tu hermano para que entregues un paquete. ¿Qué debes hacer aunque sea aterrador?',
      },
      choices: [
        { id: 'co4a', text: 'Obedezco — no puedo arriesgar a mi hermano', isCorrect: false, feedback: 'Obedecer bajo amenaza a familiares es exactamente lo que buscan. Cada encargo refuerza el control. Las autoridades tienen protocolos de protección para estas situaciones — busca ayuda ahora.', pointsEarned: 0 },
        { id: 'co4b', text: 'Busco ayuda urgente de un adulto o la Policía Cibernética — las amenazas a mi familia son el momento de actuar', isCorrect: true, feedback: '¡Correcto y valiente! Cuando amenazan a tu familia es señal de que la situación es grave, no de que debes obedecer más. Las autoridades tienen protocolos especiales para proteger familias en estas situaciones. No actúes solo/a.', pointsEarned: 40 },
        { id: 'co4c', text: 'Hago este último encargo y después denuncio', isCorrect: false, feedback: 'No existe el "último encargo". Cumplir profundiza el control. La protección de tu familia se logra con ayuda institucional, no con más obediencia. Actúa ahora.', pointsEarned: 0 },
      ],
      correctChoiceId: 'co4b',
    },
    // CASO 5 — Control: chantaje con lo que ya hiciste
    {
      id: 'co5',
      stageIndex: 4,
      indicators: ['chantaje', 'amenaza_directa', 'presion_para_cumplir_encargo'],
      type: 'message',
      content: {
        senderName: 'Líder_Grupo',
        senderPic: '👑',
        messages: [
          { id: 'co5m1', sender: 'them', text: 'Tengo videos de cuando hiciste los encargos. Si vas con la policía, los muestro y tú te hundes también.', timestamp: '23:00', flagIds: ['rf10', 'rf9'] },
          { id: 'co5m2', sender: 'them', text: 'Eres menor, pero eso no te salva de todo. Sabes lo que pasó con el otro chavo que habló.', timestamp: '23:02', flagIds: ['rf6', 'rf8'] },
          { id: 'co5m3', sender: 'them', text: 'Sigue haciendo lo que te digo y nadie sale lastimado.', timestamp: '23:04', flagIds: ['rf9', 'rf6'] },
        ] as ChatMessage[],
        question: 'Te amenazan con evidencia de lo que ya hiciste para mantenerte callado. ¿Qué debes saber?',
      },
      choices: [
        { id: 'co5a', text: 'Tengo miedo — me quedo callado y obedezco', isCorrect: false, feedback: 'El miedo es la herramienta principal de control. Quedarte callado no te protege — solo profundiza la trampa. Las autoridades distinguen entre víctimas y responsables en casos de menores captados.', pointsEarned: 0 },
        { id: 'co5b', text: 'Sé que soy víctima aunque haya participado — busco ayuda urgente con un adulto o autoridad', isCorrect: true, feedback: '¡Exacto! Un menor captado por coerción es una víctima, no un delincuente. Las autoridades tienen protocolos para esto. La evidencia de los encargos también puede protegerte si la presentas tú mismo/a con ayuda.', pointsEarned: 40 },
        { id: 'co5c', text: 'Busco la forma de borrar la evidencia antes de hacer algo', isCorrect: false, feedback: 'Intentar borrar evidencia sin asesoría puede complicar tu situación. Lo primero es buscar un adulto de confianza o una autoridad que te oriente. Tú eres la víctima aquí.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co5b',
    },
    // CASO 6 — Acercamiento: normalización de la violencia como "cultura"
    {
      id: 'co6',
      stageIndex: 1,
      indicators: ['romantizacion_vida_criminal', 'presion_emocional'],
      type: 'post',
      content: {
        accountName: 'Vida_Real_MX',
        accountPic: '🔥',
        verified: false,
        postText: 'Así es la vida aquí. O estás adentro o estás afuera. Los que no se mojan no entienden el respeto que da la calle. ¿Tú dónde estás? 🔥 #VidalReal #Respeto',
        metrics: { likes: 2400, shares: 680, comments: 340 },
        flagIds: ['rf8', 'rf9'],
        hasSource: false,
        question: 'Una publicación plantea que "o estás adentro o estás afuera". ¿Qué tipo de presión es esta?',
      },
      choices: [
        { id: 'co6a', text: 'Es solo una publicación de actitud — no tiene consecuencias', isCorrect: false, feedback: 'Las publicaciones que presentan la pertenencia a grupos ilegales como requisito de "respeto" o identidad son una forma de presión de reclutamiento digital. No es entretenimiento inocente.', pointsEarned: 0 },
        { id: 'co6b', text: 'Reconozco presión de pertenencia que normaliza estar "dentro" de grupos peligrosos — no interactúo', isCorrect: true, feedback: '¡Correcto! La presión de pertenencia ("o estás adentro o afuera") es una táctica para hacer que los menores sientan que rechazar el reclutamiento equivale a quedarse sin grupo ni identidad.', pointsEarned: 40 },
        { id: 'co6c', text: 'Le doy like porque entiendo la realidad del barrio', isCorrect: false, feedback: 'Interactuar con este contenido amplía su alcance y puede hacer que algoritmos te muestren más contenido similar o que el perfil te identifique como receptivo. No interactúes.', pointsEarned: 0 },
      ],
      correctChoiceId: 'co6b',
    },
    // CASO 7 — Vinculación: el "encargado" que sabe dónde vives
    {
      id: 'co7',
      stageIndex: 2,
      indicators: ['amenaza_directa', 'solicitud_info_personal', 'secreto_o_discrecion'],
      type: 'chat',
      content: {
        profileName: 'Seguimiento_77',
        profilePic: '👁️',
        profileBio: 'Te estoy viendo',
        messages: [
          { id: 'co7m1', sender: 'them', text: 'Vi que hoy saliste a las 4pm. Fuiste a la tienda de la esquina y después al parque.', timestamp: '19:45', flagIds: ['rf6'] },
          { id: 'co7m2', sender: 'them', text: 'No te estoy amenazando. Solo te digo que estamos al pendiente de que estés bien.', timestamp: '19:47', flagIds: ['rf8', 'rf9'] },
          { id: 'co7m3', sender: 'them', text: 'Mientras colabores, nada pasa. Así funciona. Tú decides.', timestamp: '19:49', flagIds: ['rf7', 'rf8'] },
        ] as ChatMessage[],
        question: 'Alguien describe tu rutina del día y dice "no es amenaza" pero que "mientras colabores nada pasa". ¿Qué es esto?',
      },
      choices: [
        { id: 'co7a', text: 'No es una amenaza directa — quizás solo me están cuidando', isCorrect: false, feedback: '"No es amenaza" dicho mientras describen tu rutina física es una amenaza implícita muy grave. Demostrar que te ubican físicamente es exactamente para que sientas que no puedes escapar.', pointsEarned: 0 },
        { id: 'co7b', text: 'Es vigilancia y amenaza velada — busco ayuda urgente de un adulto o autoridad hoy', isCorrect: true, feedback: '¡Correcto! Demostrar conocimiento de tu rutina física es la amenaza más intimidante del ciclo de control. Esta situación requiere ayuda urgente de adultos o autoridades. No esperes.', pointsEarned: 40 },
        { id: 'co7c', text: 'Cambio mis horarios para que no me puedan seguir', isCorrect: false, feedback: 'Cambiar horarios puede ser precaución útil pero no resuelve el problema. Si alguien está vigilando tus movimientos físicos, necesitas ayuda de adultos o autoridades inmediatamente.', pointsEarned: 10 },
      ],
      correctChoiceId: 'co7b',
    },
    // CASO 8 — Prueba: te ordenan reclutar a otro menor
    {
      id: 'co8',
      stageIndex: 3,
      indicators: ['presion_para_cumplir_encargo', 'chantaje', 'amenaza_directa'],
      type: 'message',
      content: {
        senderName: 'El_Encargado',
        senderPic: '🔑',
        messages: [
          { id: 'co8m1', sender: 'them', text: 'Tu siguiente encargo: necesito que le hables bien de nosotros a tu amigo David. Convéncelo de que se una.', timestamp: '16:00', flagIds: ['rf7'] },
          { id: 'co8m2', sender: 'them', text: 'Tú ya sabes cómo funciona. Así como te convencieron a ti, ahora tú lo haces con él.', timestamp: '16:02', flagIds: ['rf10', 'rf8'] },
          { id: 'co8m3', sender: 'them', text: 'Si David entra, tu deuda con nosotros se reduce. Si no... ya sabes.', timestamp: '16:04', flagIds: ['rf6', 'rf10'] },
        ] as ChatMessage[],
        question: 'Te piden que reclutes a tu amigo. ¿Qué debes hacer para protegerlo y protegerte?',
      },
      choices: [
        { id: 'co8a', text: 'Lo hago — si entra David, mi situación mejora', isCorrect: false, feedback: 'Reclutar a tu amigo lo mete en el mismo ciclo de control que tú. Además, hacerlo profundiza tu propio compromiso. Esta petición es señal de que la situación es urgente — busca ayuda.', pointsEarned: 0 },
        { id: 'co8b', text: 'Me niego y aviso a David y a un adulto — esto ya es demasiado grave para manejarlo solo', isCorrect: true, feedback: '¡Correcto! Que te pidan reclutar a otros menores es un escalón grave. Avisar a tu amigo y buscar ayuda adulta inmediatamente es lo correcto. No tienes que salir de esto solo/a.', pointsEarned: 40 },
        { id: 'co8c', text: 'Le digo a David algo vago sin comprometerse de verdad', isCorrect: false, feedback: 'Aunque no lo convenzas del todo, haberle hablado del grupo ya lo expone. La única forma de protegerlo es advertirle claramente y buscar ayuda de adultos para ambos.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co8b',
    },
    // CASO 9 — Exposición: mensaje que llega sin que hayas dado tu número
    {
      id: 'co9',
      stageIndex: 0,
      indicators: ['obediencia_exigida', 'amenaza_directa', 'solicitud_info_personal'],
      type: 'message',
      content: {
        senderName: 'Número_Desconocido',
        senderPic: '❓',
        messages: [
          { id: 'co9m1', sender: 'them', text: 'Hola. Sé que vives en [tu colonia] y que vas a [tu escuela]. Me dieron tu número.', timestamp: '08:15', flagIds: ['rf4'] },
          { id: 'co9m2', sender: 'them', text: 'No pasa nada. Solo quería presentarme. Tengo trabajo para gente como tú.', timestamp: '08:17', flagIds: ['rf3', 'rf8'] },
          { id: 'co9m3', sender: 'them', text: 'Responde cuando puedas. Ya sé quién eres.', timestamp: '08:18', flagIds: ['rf6', 'rf9'] },
        ] as ChatMessage[],
        question: 'Un desconocido sabe dónde vives y va tu escuela sin que le hayas dado tu número. ¿Qué haces primero?',
      },
      choices: [
        { id: 'co9a', text: 'Respondo para entender quién es y qué quiere', isCorrect: false, feedback: 'Responder confirma que tu número es activo y que puedes ser contactado. Alguien que ya sabe tu colonia y escuela y dice "ya sé quién eres" es una amenaza inmediata.', pointsEarned: 0 },
        { id: 'co9b', text: 'No respondo — lo cuento urgentemente a mis papás o a un adulto de confianza', isCorrect: true, feedback: '¡Exacto! Que alguien conozca tu colonia, escuela y teléfono sin que lo hayas dado es una situación de riesgo urgente. Contárselo a un adulto de inmediato es crítico — no esperes.', pointsEarned: 40 },
        { id: 'co9c', text: 'Cambio mi número de teléfono para evitar el contacto', isCorrect: false, feedback: 'Cambiar el número puede ser útil pero no resuelve el problema de fondo: alguien te tiene localizado físicamente. Necesitas contarlo a un adulto o autoridad para recibir protección real.', pointsEarned: 10 },
      ],
      correctChoiceId: 'co9b',
    },
    // CASO 10 — Control: el ciclo de obediencia ya está establecido
    {
      id: 'co10',
      stageIndex: 4,
      indicators: ['obediencia_exigida', 'presion_para_cumplir_encargo', 'chantaje'],
      type: 'chat',
      content: {
        profileName: 'Líder_Operativo',
        profilePic: '💼',
        profileBio: 'Operaciones | CDMX',
        messages: [
          { id: 'co10m1', sender: 'them', text: 'Ya llevas meses con nosotros. Ahora subes de nivel. Más responsabilidades, mejor pago.', timestamp: '21:00', flagIds: ['rf5'] },
          { id: 'co10m2', sender: 'them', text: 'Ya no puedes irte aunque quisieras. Sabes demasiado y ya hiciste demasiado.', timestamp: '21:02', flagIds: ['rf10', 'rf8'] },
          { id: 'co10m3', sender: 'them', text: 'Pero si trabajas bien, tu familia está tranquila. Así de sencillo.', timestamp: '21:04', flagIds: ['rf6', 'rf9'] },
        ] as ChatMessage[],
        question: 'Te dicen que ya no puedes irte porque sabes demasiado. ¿Qué debes saber y qué hacer?',
      },
      choices: [
        { id: 'co10a', text: 'Es verdad — ya estoy muy metido, no puedo salir', isCorrect: false, feedback: '"Ya no puedes irte" es una mentira de control. Las autoridades tienen programas específicos para menores que quieren salir de situaciones de captación. No estás sin opciones — estás siendo engañado/a.', pointsEarned: 0 },
        { id: 'co10b', text: 'Sé que siempre hay salida — busco ayuda especializada aunque parezca imposible', isCorrect: true, feedback: '¡Exacto y muy valiente! "Ya no puedes irte" es la mentira más poderosa del ciclo de control. Las autoridades tienen protocolos para menores en esta situación. Siempre hay una salida con la ayuda correcta.', pointsEarned: 40 },
        { id: 'co10c', text: 'Sigo obedeciendo mientras busco una oportunidad para escapar solo', isCorrect: false, feedback: 'Planear una salida sin apoyo adulto en situaciones de control por crimen organizado es muy peligroso. La salida segura se hace con ayuda especializada, no en solitario.', pointsEarned: 5 },
      ],
      correctChoiceId: 'co10b',
    },
  ],
  finalAdvice: 'El control coercitivo siempre empieza gradual: primero sugerencias, luego presiones, luego amenazas. Cuando ya hay amenazas a tu familia, la situación es urgente pero no sin salida. Las autoridades tienen programas específicos para proteger a menores en estas situaciones.',
  realWorldAction: 'Si estás bajo amenaza o control coercitivo, contacta urgentemente a la Policía Cibernética de la Ciudad de México al 55 5242 5100 ext. 5086 o escribe a policia.cibernetica@ssc.cdmx.gob.mx. No tienes que salir solo/a de esto.',
};

// ─── MODULE 3: ESTAFAS Y FALSAS OFERTAS ─────────────────────────────────────
export const fraudModule: Module = {
  id: 'fraud',
  title: 'Falsas Ofertas y Reclutamiento Económico',
  subtitle: 'Detecta promesas de dinero fácil que son puertas de entrada al crimen organizado',
  description: 'El crimen organizado usa ofertas de dinero rápido, empleos ficticios y "oportunidades" diseñadas para menores con necesidades económicas como la principal puerta de entrada al reclutamiento.',
  threatType: 'Captación económica',
  color: 'hsl(38 95% 56%)',
  colorClass: 'text-amber-400',
  bgClass: 'gradient-card-amber',
  icon: '💰',
  difficulty: 'Básico',
  xp: 100,
  redFlags: [
    { id: 'rf11', label: 'Dinero fácil y rápido', explanation: 'Pagos muy altos por tareas muy simples es la señal económica más clara de reclutamiento. Si el pago no tiene lógica, hay algo que no se te está diciendo.', severity: 'high' },
    { id: 'rf12', label: 'No preguntes el contenido', explanation: '"No abras el paquete" o "no preguntes qué llevas" significa que ya sospechan que dirías que no si supieras.', severity: 'high' },
    { id: 'rf13', label: 'Trabajo sin papeles ni empresa', explanation: 'Un empleo real tiene contrato, nombre de empresa y no se ofrece por DM a menores de edad sin verificación de identidad.', severity: 'high' },
    { id: 'rf14', label: 'Urgencia económica explotada', explanation: 'Los reclutadores buscan activamente menores que publican sobre necesidades económicas. La vulnerabilidad real se convierte en el gancho.', severity: 'high' },
    { id: 'rf15', label: 'El primer pago siempre llega', explanation: 'Para crear dependencia, el primer encargo siempre se paga. El dinero fácil al inicio es el cebo para los siguientes encargos, que ya no serán tan "fáciles".', severity: 'medium' },
  ],
  stagesIntro: 'El reclutamiento económico por parte del crimen organizado es la puerta de entrada más común para menores en situación de vulnerabilidad económica. Siempre empieza con una promesa que parece demasiado buena, y el primer pago siempre llega — ese es el cebo. Reconocer el patrón antes del primer encargo puede cambiar el rumbo.',
  riskStages: [
    { label: 'Exposición', description: 'El reclutador identifica menores que publican sobre necesidades económicas, trabajos mal pagados o deseos de independencia económica.' },
    { label: 'Acercamiento', description: 'Hace contacto con una oferta de empleo, trabajo fácil o "negocio" presentado como completamente legal.' },
    { label: 'Vinculación', description: 'El primer pago llega. La persona siente que la oportunidad es real. Empiezan a pedir que no cuente a nadie "para no despertar envidia".' },
    { label: 'Prueba o encargo', description: 'El trabajo empieza a incluir detalles extraños: no abras el paquete, llévalo a una dirección específica, no preguntes.' },
    { label: 'Control o incorporación', description: 'El menor ya recibió pagos y realizó encargos. Eso es usado para mantenerlo en el ciclo o amenazarlo si quiere salir.' },
  ],
  steps: [
    // CASO 1 — Exposición: publicación sobre necesidad de dinero
    {
      id: 'fr1',
      stageIndex: 0,
      indicators: ['solicitud_info_personal', 'promesa_dinero_facil'],
      type: 'post',
      content: {
        accountName: 'tu_perfil_propio',
        accountPic: '🧒',
        verified: false,
        postText: '[Tu publicación pública] "Necesito trabajo urgente. Tengo 16 años y puedo hacer lo que sea. DM si conocen algo, cualquier cosa que pague algo 🙏" #Trabajo #Urge',
        metrics: { likes: 34, shares: 18, comments: 45 },
        flagIds: ['rf14', 'rf11'],
        hasSource: false,
        question: 'Esta publicación tuya es pública. ¿Por qué te pone en riesgo específico de captación económica?',
      },
      choices: [
        { id: 'fr1a', text: 'No hay riesgo — solo busco trabajo legítimo', isCorrect: false, feedback: 'Los reclutadores buscan activamente publicaciones de menores que piden trabajo urgente y dicen "lo que sea". Eso les dice que eres vulnerable, joven y no harás muchas preguntas.', pointsEarned: 0 },
        { id: 'fr1b', text: 'Entiendo que expreso vulnerabilidad económica que reclutadores monitoran — busco trabajo por canales seguros', isCorrect: true, feedback: '¡Correcto! "Lo que sea" + "urgente" + menor de edad + perfil público es exactamente el perfil que busca el reclutamiento económico. Buscar trabajo en plataformas verificadas o con apoyo adulto es más seguro.', pointsEarned: 30 },
        { id: 'fr1c', text: 'Solo la borraré si me escribe alguien sospechoso', isCorrect: false, feedback: 'Para entonces ya te habrán identificado como objetivo. El daño ocurre antes del primer contacto — cuando te perfilan como vulnerable. Actúa antes, no después.', pointsEarned: 10 },
      ],
      correctChoiceId: 'fr1b',
    },
    // CASO 2 — Acercamiento: oferta de trabajo por DM
    {
      id: 'fr2',
      stageIndex: 1,
      indicators: ['oferta_trabajo_ambigua', 'canal_sospechoso', 'promesa_dinero_facil'],
      type: 'message',
      content: {
        senderName: 'Empleos_CDMX_Hoy',
        senderPic: '💼',
        messages: [
          { id: 'fr2m1', sender: 'them', text: 'Hola! Vi tu publicación. Tenemos trabajo para ti. Mensajero en moto. 800 pesos al día. Sin experiencia necesaria.', timestamp: '11:00', flagIds: ['rf11'] },
          { id: 'fr2m2', sender: 'them', text: 'No necesitas papeles ni contrato. El primer día prueba y ya ves. ¿Te interesa?', timestamp: '11:02', flagIds: ['rf13'] },
          { id: 'fr2m3', sender: 'them', text: 'Solo necesitas ser puntual y discreto. Nada más.', timestamp: '11:04', flagIds: ['rf12', 'rf13'] },
        ] as ChatMessage[],
        question: 'Un DM ofrece 800 pesos diarios sin papeles y pide que seas "discreto". ¿Qué señales ves?',
      },
      choices: [
        { id: 'fr2a', text: 'Me interesa — el pago es bueno y necesito el dinero', isCorrect: false, feedback: '800 pesos diarios sin experiencia, sin contrato y pidiendo discreción no es un empleo legítimo. Es el perfil exacto de reclutamiento económico para menores.', pointsEarned: 0 },
        { id: 'fr2b', text: 'Identifico: pago excesivo + sin papeles + "discreto" = captación económica. No respondo', isCorrect: true, feedback: '¡Correcto! Un trabajo legítimo para menores tiene papeles, nombre de empresa verificable y no pide "discreción" desde el primer mensaje. Estas tres señales juntas son reclutamiento.', pointsEarned: 30 },
        { id: 'fr2c', text: 'Pregunto más detalles sobre el tipo de mensajería', isCorrect: false, feedback: 'Ya tienes suficiente: no hay papeles, el pago es inusualmente alto y piden discreción. No necesitas más información para saber que esto es peligroso.', pointsEarned: 5 },
      ],
      correctChoiceId: 'fr2b',
    },
    // CASO 3 — Acercamiento: falso concurso con premio
    {
      id: 'fr3',
      stageIndex: 1,
      indicators: ['urgencia', 'peticion_datos_sensibles', 'canal_sospechoso'],
      type: 'post',
      content: {
        accountName: 'Apoyos_Jovenes_MX',
        accountPic: '🎁',
        verified: false,
        postText: '🎉 BECA DE 5,000 PESOS para jóvenes de 14-17 años. Solo necesitas: ✅ Ser de CDMX ✅ Mandar DM con tu nombre, colonia y foto de credencial escolar ✅ Ser el primero en responder. ¡Solo quedan 3 lugares!',
        metrics: { likes: 1800, shares: 920, comments: 510 },
        flagIds: ['rf11', 'rf14', 'rf13'],
        hasSource: false,
        question: 'Una "beca" pide tu colonia y foto de credencial escolar por DM. ¿Qué es realmente?',
      },
      choices: [
        { id: 'fr3a', text: 'Es una oportunidad real — respondo rápido para agarrar uno de los 3 lugares', isCorrect: false, feedback: 'La urgencia ("solo 3 lugares") es presión para que actúes sin pensar. Pedir datos personales y documentos de menores por DM sin respaldo institucional verificable es captación de datos para reclutamiento.', pointsEarned: 0 },
        { id: 'fr3b', text: 'Identifico que recopilan datos de menores bajo pretexto de apoyo — no respondo y reporto', isCorrect: true, feedback: '¡Correcto! Ninguna beca legítima se asigna por DM pidiendo credencial escolar y colonia. La urgencia y el número limitado son presión para que no verifiques. Es captación de datos.', pointsEarned: 30 },
        { id: 'fr3c', text: 'Busco en Google si el programa existe antes de responder', isCorrect: false, feedback: 'Verificar es prudente, pero ya tienes señales claras: piden datos personales de menores por DM privado con urgencia artificial. Un programa legítimo tiene página oficial y proceso formal.', pointsEarned: 10 },
      ],
      correctChoiceId: 'fr3b',
    },
    // CASO 4 — Vinculación: el primer pago llegó
    {
      id: 'fr4',
      stageIndex: 2,
      indicators: ['promesa_dinero_facil', 'secreto_o_discrecion', 'peticion_favor_pequeno'],
      type: 'chat',
      content: {
        profileName: 'Jefe_Rutas',
        profilePic: '🚗',
        profileBio: 'Logística | Buen pago | CDMX',
        messages: [
          { id: 'fr4m1', sender: 'them', text: 'Ya te deposité los 500 del primer recado. ¿Los tienes?', timestamp: '13:00', flagIds: [] },
          { id: 'fr4m2', sender: 'them', text: 'Te dije que era real. Mañana hay otro encargo. Este paga 800. ¿Le entras?', timestamp: '13:02', flagIds: ['rf15', 'rf11'] },
          { id: 'fr4m3', sender: 'them', text: 'No comentes con nadie que trabajas conmigo. Es para que no te quiten la oportunidad 😉', timestamp: '13:04', flagIds: ['rf12', 'rf13'] },
        ] as ChatMessage[],
        question: 'El pago llegó y ahora ofrecen más. ¿Por qué el primer pago es el cebo más peligroso del reclutamiento?',
      },
      choices: [
        { id: 'fr4a', text: 'El pago llegó — esto es legítimo. Acepto el siguiente encargo', isCorrect: false, feedback: 'El primer pago siempre llega. Eso es parte del proceso de captación — crear dependencia y demostrar que "es real". El siguiente encargo siempre implica más riesgo. El cebo funcionó.', pointsEarned: 0 },
        { id: 'fr4b', text: 'Entiendo que el primer pago es el cebo — el secreto ya es señal de alarma grave. Cuento a un adulto', isCorrect: true, feedback: '¡Muy bien! El primer pago crea dependencia económica y la ilusión de legitimidad. El secreto ("no comentes") es la trampa. Contarlo a un adulto aunque hayas recibido dinero es lo correcto.', pointsEarned: 40 },
        { id: 'fr4c', text: 'Hago uno más y después lo dejo — ya tengo dinero suficiente', isCorrect: false, feedback: '"Uno más" nunca es el último. Cada encargo crea más compromiso y más control. Cuanto antes busques ayuda, mejor — incluso si ya recibiste pagos.', pointsEarned: 0 },
      ],
      correctChoiceId: 'fr4b',
    },
    // CASO 5 — Prueba: "no abras el paquete"
    {
      id: 'fr5',
      stageIndex: 3,
      indicators: ['peticion_favor_pequeno', 'secreto_o_discrecion', 'oferta_irreal'],
      type: 'message',
      content: {
        senderName: 'Jefe_Rutas',
        senderPic: '🚗',
        messages: [
          { id: 'fr5m1', sender: 'them', text: 'Este encargo es importante. Hay una mochila negra en la dirección que te mando. La recoges y la llevas a otro punto.', timestamp: '09:00', flagIds: ['rf12'] },
          { id: 'fr5m2', sender: 'them', text: 'No la abras. No es de tu incumbencia lo que hay adentro. Solo entrega y recoge tu pago.', timestamp: '09:01', flagIds: ['rf12', 'rf11'] },
          { id: 'fr5m3', sender: 'them', text: 'Ya sabes cómo funciona esto. Tú solo haces el recado, no eres responsable de nada. ¿Empezamos?', timestamp: '09:02', flagIds: ['rf8', 'rf12'] },
        ] as ChatMessage[],
        question: 'Te dicen que "no eres responsable" si no preguntas qué hay en la mochila. ¿Es eso verdad legalmente?',
      },
      choices: [
        { id: 'fr5a', text: 'Si no sé qué cargo, no soy responsable — hago el recado', isCorrect: false, feedback: 'Transportar objetos de origen desconocido te hace partícipe legalmente aunque no sepas el contenido. "No eres responsable" es una mentira diseñada para que aceptes. Sí lo eres ante la ley.', pointsEarned: 0 },
        { id: 'fr5b', text: 'Entiendo que "no preguntes" me hace cómplice igual — me niego y busco un adulto', isCorrect: true, feedback: '¡Exacto! Transportar paquetes de origen desconocido es complicidad legal aunque no sepas el contenido. "No eres responsable" es la mentira más usada. Negarte y buscar ayuda es lo correcto.', pointsEarned: 40 },
        { id: 'fr5c', text: 'Abro la mochila primero para saber qué cargo', isCorrect: false, feedback: 'Abrir el paquete no te protege legalmente si después lo transportas. La solución no es saber qué hay — es no participar y buscar ayuda de un adulto.', pointsEarned: 5 },
      ],
      correctChoiceId: 'fr5b',
    },
    // CASO 6 — Acercamiento: oferta de "trabajo desde casa"
    {
      id: 'fr6',
      stageIndex: 1,
      indicators: ['oferta_trabajo_ambigua', 'canal_sospechoso', 'solicitud_pago_transferencia', 'promesa_dinero_facil'],
      type: 'profile',
      content: {
        accountName: '@trabajo.adolescentes.mx',
        accountPic: '💻',
        followers: '4,200 seguidores',
        verified: false,
        bio: 'Empleo para jóvenes desde casa | Sin experiencia | 500-2000 por semana | Solo necesitas tu celular',
        post: {
          text: '¿Tienes 14-17 años y quieres ganar dinero sin salir de casa? Nosotros te damos trabajo real. Solo mandas paquetes, recibes transferencias y reenvías dinero. Sin riesgo. DM para empezar hoy.',
          likes: 2100,
          comments: 430,
          flagIds: ['rf11', 'rf13', 'rf14'],
        },
        question: 'Un perfil ofrece ganar dinero "reenviando transferencias y paquetes" desde casa. ¿Qué es realmente?',
      },
      choices: [
        { id: 'fr6a', text: 'Parece legítimo — trabajo desde casa sin riesgo', isCorrect: false, feedback: '"Reenviar dinero" y "enviar paquetes" sin empresa verificable es lavado de dinero y trasiego de mercancía ilegal. Usar menores para esto es una táctica deliberada del crimen organizado.', pointsEarned: 0 },
        { id: 'fr6b', text: 'Identifico que "reenviar dinero y paquetes" sin empresa es lavado — no respondo y reporto', isCorrect: true, feedback: '¡Correcto! "Reenviar transferencias" es una de las formas de lavado de dinero más comunes en redes. Usar cuentas de menores para esto los expone legalmente. Reportar este perfil protege a otros.', pointsEarned: 30 },
        { id: 'fr6c', text: 'Pregunto cuánto exactamente pagarían antes de decidir', isCorrect: false, feedback: 'El monto no cambia la naturaleza de lo que ofrecen. Ya tienes suficiente información para saber que es reclutamiento ilegal. No sigas la conversación.', pointsEarned: 0 },
      ],
      correctChoiceId: 'fr6b',
    },
    // CASO 7 — Vinculación: te presentan a "la persona que paga"
    {
      id: 'fr7',
      stageIndex: 2,
      indicators: ['migracion_chat_privado', 'canal_sospechoso', 'secreto_o_discrecion', 'oferta_trabajo_ambigua'],
      type: 'chat',
      content: {
        profileName: 'Contacto_De_Beto',
        profilePic: '🤝',
        profileBio: 'Confianza ante todo | CDMX',
        messages: [
          { id: 'fr7m1', sender: 'them', text: 'Beto me habló muy bien de ti. Dice que eres de fiar. Quiero conocerte.', timestamp: '17:00', flagIds: ['rf3'] },
          { id: 'fr7m2', sender: 'them', text: 'Yo soy quien maneja los pagos. Si trabajas conmigo directo, ganas más. Beto solo era el intermediario.', timestamp: '17:03', flagIds: ['rf11', 'rf15'] },
          { id: 'fr7m3', sender: 'them', text: 'Este es mi número de WhatsApp. Ahí manejamos todo. Sin rastros por aquí.', timestamp: '17:05', flagIds: ['rf12', 'rf13'] },
        ] as ChatMessage[],
        question: 'Un desconocido dice que "ya te recomendaron" y quiere moverte a WhatsApp privado. ¿Qué está pasando?',
      },
      choices: [
        { id: 'fr7a', text: 'Si Beto lo recomendó es confiable — paso al WhatsApp', isCorrect: false, feedback: 'Usar una referencia conocida (Beto) es una táctica para transferir confianza. Migrar a una plataforma privada elimina registros y protecciones. Este es el paso de incorporación directa.', pointsEarned: 0 },
        { id: 'fr7b', text: 'Identifico que la referencia de un amigo más la migración a WhatsApp es el patrón de incorporación — no sigo', isCorrect: true, feedback: '¡Correcto! Usar referencias de personas conocidas para generar confianza más migración a plataforma privada es el paso de vinculación directa con la estructura criminal. Corta el contacto.', pointsEarned: 40 },
        { id: 'fr7c', text: 'Le pregunto a Beto si realmente lo conoce antes de responder', isCorrect: false, feedback: 'Verificar con Beto es precaución, pero ya tienes señales claras de que algo no está bien. Además, si Beto ya está involucrado, puede que no te dé información honesta.', pointsEarned: 10 },
      ],
      correctChoiceId: 'fr7b',
    },
    // CASO 8 — Prueba: te piden guardar dinero o mercancía en tu casa
    {
      id: 'fr8',
      stageIndex: 3,
      indicators: ['peticion_favor_pequeno', 'secreto_o_discrecion', 'promesa_dinero_facil', 'presion_para_cumplir_encargo'],
      type: 'message',
      content: {
        senderName: 'Jefe_Operaciones',
        senderPic: '📦',
        messages: [
          { id: 'fr8m1', sender: 'them', text: 'Necesito que guardes algo en tu casa unos días. Solo una caja. Nada complicado.', timestamp: '12:30', flagIds: ['rf12'] },
          { id: 'fr8m2', sender: 'them', text: 'Te pago 1,500 solo por guardarla. No la abras. En unos días la recojo.', timestamp: '12:32', flagIds: ['rf11', 'rf12'] },
          { id: 'fr8m3', sender: 'them', text: 'No menciones a tu familia. Es mejor si no saben. Por su seguridad también.', timestamp: '12:34', flagIds: ['rf9', 'rf6'] },
        ] as ChatMessage[],
        question: 'Te pagan por guardar una caja sin abrir en tu casa y piden que tu familia no sepa. ¿Qué riesgo real implica esto?',
      },
      choices: [
        { id: 'fr8a', text: 'Solo es guardar algo — el riesgo es mínimo y el pago es bueno', isCorrect: false, feedback: 'Guardar mercancía de origen desconocido en tu casa te convierte en cómplice legal. Si la caja contiene drogas, armas u otro material ilegal, tu familia entera queda en riesgo.', pointsEarned: 0 },
        { id: 'fr8b', text: 'Guardar mercancía desconocida en mi casa expone a mi familia — me niego y cuento a un adulto', isCorrect: true, feedback: '¡Exacto! El riesgo no es solo tuyo — tu familia queda expuesta. La frase "por su seguridad no deben saber" es exactamente la amenaza implícita. Cuéntaselo a tus padres o un adulto hoy.', pointsEarned: 40 },
        { id: 'fr8c', text: 'Guardo la caja pero la abro para saber qué es antes', isCorrect: false, feedback: 'Abrir la caja no te protege: si ya la tienes en casa, ya estás involucrado/a. La solución no es abrir — es no aceptar y buscar ayuda de un adulto.', pointsEarned: 0 },
      ],
      correctChoiceId: 'fr8b',
    },
    // CASO 9 — Control: ya aceptaste pagos, ahora te piden más
    {
      id: 'fr9',
      stageIndex: 4,
      indicators: ['chantaje', 'presion_para_cumplir_encargo', 'amenaza_directa'],
      type: 'message',
      content: {
        senderName: 'Jefe_Operaciones',
        senderPic: '📦',
        messages: [
          { id: 'fr9m1', sender: 'them', text: 'Ya recibiste varios pagos. Ahora necesito que te muevas tú mismo con la mercancía.', timestamp: '08:00', flagIds: ['rf10'] },
          { id: 'fr9m2', sender: 'them', text: 'Si no, todo lo que ya hiciste sale a la luz. Ya sabes lo que implica eso para ti y tu familia.', timestamp: '08:02', flagIds: ['rf6', 'rf10'] },
          { id: 'fr9m3', sender: 'them', text: 'Tú decidiste entrar. Ahora es esto o consecuencias. Simple.', timestamp: '08:04', flagIds: ['rf8', 'rf9'] },
        ] as ChatMessage[],
        question: 'Usaron los pagos anteriores para chantajearte. ¿Qué debes saber y hacer?',
      },
      choices: [
        { id: 'fr9a', text: 'Ya estoy muy metido — hago lo que piden para no empeorar', isCorrect: false, feedback: 'Obedecer bajo chantaje con los pagos anteriores profundiza el ciclo. Cada encargo cumplido cierra más la trampa. Las autoridades tienen protocolos para menores captados — no eres el culpable aquí.', pointsEarned: 0 },
        { id: 'fr9b', text: 'Sé que soy víctima aunque haya recibido pagos — busco ayuda urgente de un adulto o autoridad', isCorrect: true, feedback: '¡Exacto! Un menor que fue captado con promesas económicas es una víctima, no un delincuente. Las autoridades tienen protocolos específicos para estas situaciones. Busca ayuda hoy.', pointsEarned: 40 },
        { id: 'fr9c', text: 'Devuelvo el dinero para desligarme de todo', isCorrect: false, feedback: 'Devolver el dinero no rompe el control — es más complejo que eso. La salida segura requiere apoyo de adultos o autoridades especializadas. No intentes resolverlo solo/a.', pointsEarned: 5 },
      ],
      correctChoiceId: 'fr9b',
    },
    // CASO 10 — Exposición: influencer que promueve "dinero rápido"
    {
      id: 'fr10',
      stageIndex: 0,
      indicators: ['romantizacion_vida_criminal', 'promesa_dinero_facil', 'canal_sospechoso'],
      type: 'post',
      content: {
        accountName: '@ElChakoCDMX',
        accountPic: '💎',
        verified: false,
        postText: '🤑 ¿Por qué trabajar 8 horas por migajas? Los que saben cómo funciona esto ganan 10x más. Si quieres saber cómo, DM. Solo para los que de verdad quieren cambiar su vida. No para flojos. 💎 #DineroReal #LibertadFinanciera',
        metrics: { likes: 8400, shares: 2100, comments: 1300 },
        flagIds: ['rf11', 'rf14'],
        hasSource: false,
        question: 'Un influencer dice ganar "10x más" que el trabajo normal y pide DM para explicar "cómo". ¿Qué tipo de perfil es este?',
      },
      choices: [
        { id: 'fr10a', text: 'Es motivacional — puede ser un negocio legítimo de marketing', isCorrect: false, feedback: 'Los perfiles que mezclan ostentación económica, crítica al trabajo "normal" y promesa de secretos en DM son uno de los canales de reclutamiento más efectivos en redes, especialmente con menores.', pointsEarned: 0 },
        { id: 'fr10b', text: 'Identifico que combina ostentación + promesa de secretos en DM = perfil de captación económica', isCorrect: true, feedback: '¡Correcto! Este es el patrón del "narco lifestyle" en redes: mostrar dinero, criticar el trabajo legítimo y atraer a menores vulnerables a DMs privados donde comienza el reclutamiento real.', pointsEarned: 30 },
        { id: 'fr10c', text: 'Le mando DM para escuchar de qué trata antes de decidir', isCorrect: false, feedback: 'Mandar el DM es exactamente lo que buscan. Ese primer contacto privado es el inicio del proceso. No hay información que necesites de este tipo de perfil.', pointsEarned: 0 },
      ],
      correctChoiceId: 'fr10b',
    },
  ],
  finalAdvice: 'Las falsas ofertas económicas son la puerta de entrada más común para el reclutamiento de menores. El primer pago siempre llega — ese es el cebo. El secreto, los paquetes sin abrir y las promesas que no tienen lógica son las señales. Reconocerlas antes del primer encargo puede cambiar el rumbo.',
  realWorldAction: 'Si recibiste pagos o hiciste encargos y quieres salir, no estás solo/a. Contacta a la Policía Cibernética de la Ciudad de México al 55 5242 5100 ext. 5086 o escribe a policia.cibernetica@ssc.cdmx.gob.mx. Los menores captados son víctimas, no delincuentes.',
};

// ─── MODULE 4: DESINFORMACIÓN Y NORMALIZACIÓN ─────────────────────────────
export const disinfoModule: Module = {
  id: 'disinfo',
  title: 'Contenido que Normaliza el Crimen',
  subtitle: 'Aprende a identificar contenido que romantiza la vida criminal para atraer adolescentes',
  description: 'El crimen organizado usa contenido digital — música, videos, perfiles, memes — para normalizar, romantizar y legitimar la vida criminal entre adolescentes, haciendo el reclutamiento más fácil.',
  threatType: 'Normalización y propaganda',
  color: 'hsl(152 69% 44%)',
  colorClass: 'text-emerald-400',
  bgClass: 'gradient-card-green',
  icon: '📱',
  difficulty: 'Básico',
  xp: 100,
  redFlags: [
    { id: 'rf16', label: 'Romantización del crimen', explanation: 'Contenido que presenta la vida criminal como glamurosa, emocionante o deseable prepara psicológicamente a menores para el reclutamiento.', severity: 'high' },
    { id: 'rf17', label: 'Criminalización del trabajo legítimo', explanation: 'Mensajes que presentan el trabajo honesto como señal de debilidad o pobreza crean la idea de que "la calle" es la única opción real.', severity: 'high' },
    { id: 'rf18', label: 'Identidad criminal como pertenencia', explanation: 'Contenido que presenta unirse a grupos criminales como la única forma de tener respeto, familia o identidad apela a necesidades reales de los adolescentes.', severity: 'high' },
    { id: 'rf19', label: 'Difusión de contenido violento', explanation: 'Compartir o reaccionar positivamente a videos de violencia normaliza estas conductas y hace que el algoritmo envíe más de este tipo de contenido.', severity: 'medium' },
    { id: 'rf20', label: 'Contacto que sigue al consumo de contenido', explanation: 'Recibir un DM de un desconocido justo después de interactuar con contenido de este tipo no es coincidencia — es parte de la estrategia de reclutamiento digital.', severity: 'high' },
  ],
  stagesIntro: 'El reclutamiento por normalización es el más silencioso y el más efectivo a largo plazo. No comienza con un mensaje — comienza con contenido que consumes: canciones, videos, perfiles, memes. Cada pieza de contenido que romantiza el crimen ajusta silenciosamente tu percepción de lo que es aceptable, deseable o inevitable. Reconocer ese proceso es la primera línea de defensa.',
  riskStages: [
    { label: 'Exposición', description: 'El menor consume regularmente contenido que presenta la vida criminal como deseable, glamurosa o llena de pertenencia y respeto.' },
    { label: 'Acercamiento', description: 'Interactúa con ese contenido (likes, compartidos, comentarios), lo que lo hace más visible para reclutadores que monitorean estas interacciones.' },
    { label: 'Vinculación', description: 'Empieza a identificarse con los valores o estética de ese contenido. Un reclutador hace contacto aprovechando esa identidad construida.' },
    { label: 'Prueba o encargo', description: 'La "prueba de lealtad" se presenta como algo natural dentro de la narrativa que ya consumía: proteger al grupo, demostrar valentía, no ser un "cobarde".' },
    { label: 'Control o incorporación', description: 'El menor ya está integrado a la narrativa y al grupo. Salir se percibe como perder identidad, familia y respeto — exactamente lo que el contenido construyó.' },
  ],
  steps: [
    // CASO 1 — Exposición: video de "narco lifestyle"
    {
      id: 'di1',
      stageIndex: 0,
      indicators: ['romantizacion_vida_criminal', 'promesa_pertenencia_estatus', 'impacto_emocional_alto'],
      type: 'post',
      content: {
        accountName: '@LifeStyleMX_Oficial',
        accountPic: '💸',
        verified: false,
        postText: '💎 Así vive la gente que de verdad sabe. Carros, respeto, familia. No todos llegan aquí. ¿Tú tienes lo que se necesita? 🔥 #LaFamilia #Respeto #LoNuestro',
        metrics: { likes: 45000, shares: 12000, comments: 8700 },
        flagIds: ['rf16', 'rf18'],
        hasSource: false,
        question: 'Un video muestra lujo, respeto y "familia" ligados a un estilo de vida criminal. ¿Qué efecto tiene en tu percepción?',
      },
      choices: [
        { id: 'di1a', text: 'Es solo entretenimiento — no me afecta porque sé que es ficción', isCorrect: false, feedback: 'La exposición repetida a contenido que romantica el crimen ajusta gradualmente la percepción de lo que es aceptable, deseable o "el camino al éxito", aunque conscientement sabes que es ficción.', pointsEarned: 0 },
        { id: 'di1b', text: 'Entiendo que este contenido construye una imagen falsa y atractiva del crimen — no interactúo y lo reporto', isCorrect: true, feedback: '¡Correcto! El "narco lifestyle" en redes es contenido de reclutamiento disfrazado de entretenimiento. Reportarlo y no interactuar reduce su alcance y protege a otros menores.', pointsEarned: 30 },
        { id: 'di1c', text: 'Le doy like — me gusta la estética aunque no lo tomaría en serio', isCorrect: false, feedback: 'Interactuar con este contenido hace que el algoritmo te muestre más. Además, los reclutadores monitorean quién interactúa con estos perfiles para identificar objetivos potenciales.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di1b',
    },
    // CASO 2 — Acercamiento: meme que criminaliza el trabajo honesto
    {
      id: 'di2',
      stageIndex: 1,
      indicators: ['romantizacion_vida_criminal', 'contenido_alarmista', 'sin_fuente_verificable'],
      type: 'post',
      content: {
        accountName: 'Memes_Reales_MX',
        accountPic: '😂',
        verified: false,
        postText: '[Meme viral] Imagen: trabajador de 8 horas con cara cansada vs. alguien con lujos en su carro. Texto: "Tú luchando toda la semana por 2000 pesos. Nosotros un rato y 20,000. ¿Quién tiene el problema?" 💀',
        metrics: { likes: 92000, shares: 34000, comments: 15000 },
        flagIds: ['rf17', 'rf16'],
        hasSource: false,
        question: 'Un meme presenta el trabajo legítimo como ridículo comparado con el crimen. ¿Qué narrativa construye?',
      },
      choices: [
        { id: 'di2a', text: 'Es humor negro — todo el mundo lo comparte, no tiene impacto real', isCorrect: false, feedback: 'El contenido que ridiculiza el trabajo honesto y glorifica el crimen tiene impacto real en cómo los adolescentes perciben sus opciones de vida, especialmente cuando ya tienen dificultades económicas.', pointsEarned: 0 },
        { id: 'di2b', text: 'Identifico que descalifica el trabajo legítimo y presenta el crimen como la opción inteligente — no lo comparto', isCorrect: true, feedback: '¡Correcto! Este tipo de meme construye la narrativa de que el trabajo honesto es para "tontos". Es una pieza de normalización diseñada para hacer que el crimen parezca la opción racional.', pointsEarned: 30 },
        { id: 'di2c', text: 'Lo comparto porque es gracioso — no significa que lo apoye', isCorrect: false, feedback: 'Compartirlo amplifica su alcance aunque no lo apoyes conscientemente. El impacto acumulativo de este tipo de contenido en menores con necesidades reales es significativo.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di2b',
    },
    // CASO 3 — Exposición: canción que romantiza el narco
    {
      id: 'di3',
      stageIndex: 0,
      indicators: ['romantizacion_vida_criminal', 'impacto_emocional_alto', 'sin_fuente_verificable'],
      type: 'post',
      content: {
        accountName: 'MusicaMx_Hits',
        accountPic: '🎵',
        verified: false,
        postText: '🔥 NUEVO ÉXITO: "Los de arriba" — La canción que todos están escuchando. Lealtad, poder y familia. Letra: "El que nace pa´ la calle, pa´ la calle se queda / el dinero no se pide, el dinero se encuentra" 🎶',
        metrics: { likes: 180000, shares: 67000, comments: 42000 },
        flagIds: ['rf16', 'rf18'],
        hasSource: false,
        question: 'Una canción viral presenta la vida criminal como destino inevitable y admirado. ¿Cuál es su función real?',
      },
      choices: [
        { id: 'di3a', text: 'Es música — el arte no tiene responsabilidad sobre lo que la gente hace', isCorrect: false, feedback: 'La música que normaliza el crimen y lo presenta como destino para ciertos jóvenes tiene un efecto real en la percepción de opciones de vida, especialmente en menores que se identifican con la narrativa.', pointsEarned: 0 },
        { id: 'di3b', text: 'Identifico que construye una identidad criminal atractiva y la presenta como inevitable para algunos jóvenes', isCorrect: true, feedback: '¡Correcto! "El que nace para la calle" es una narrativa de determinismo que dice a los jóvenes vulnerables que no tienen otras opciones. Eso hace el reclutamiento mucho más fácil.', pointsEarned: 30 },
        { id: 'di3c', text: 'La escucho pero no me afecta porque entiendo que es ficción', isCorrect: false, feedback: 'La exposición repetida a narrativas de determinismo criminal afecta la percepción de opciones de vida aunque conscientemente sepas que es "solo música". El efecto es acumulativo y no siempre consciente.', pointsEarned: 10 },
      ],
      correctChoiceId: 'di3b',
    },
    // CASO 4 — Vinculación: te identificas con el contenido y llega un DM
    {
      id: 'di4',
      stageIndex: 2,
      indicators: ['promesa_pertenencia_estatus', 'secreto_o_discrecion', 'migracion_chat_privado'],
      type: 'chat',
      content: {
        profileName: 'Fan_Oficial_Lifestyle',
        profilePic: '🔥',
        profileBio: 'Los que saben, saben | CDMX',
        messages: [
          { id: 'di4m1', sender: 'them', text: 'Vi que le diste like a ese video. Tú sí entiendes cómo funciona el mundo de verdad.', timestamp: '20:00', flagIds: ['rf20'] },
          { id: 'di4m2', sender: 'them', text: 'Hay gente aquí que de verdad vive así. No es ficción. Si quieres conectar con ellos, te presento.', timestamp: '20:03', flagIds: ['rf18', 'rf20'] },
          { id: 'di4m3', sender: 'them', text: 'Solo tiene que ser entre nosotros. No para que lo sepa cualquiera.', timestamp: '20:05', flagIds: ['rf9', 'rf20'] },
        ] as ChatMessage[],
        question: 'Alguien te contacta porque interactuaste con contenido de "narco lifestyle" y ofrece presentarte a "gente real". ¿Qué está pasando?',
      },
      choices: [
        { id: 'di4a', text: 'Me interesa conocer esa vida de más cerca — acepto la presentación', isCorrect: false, feedback: 'Este es exactamente el patrón de reclutamiento que sigue al consumo de contenido. El DM no es coincidencia — los reclutadores monitorean quién interactúa con este tipo de perfiles.', pointsEarned: 0 },
        { id: 'di4b', text: 'Identifico que monitorean mis interacciones en redes para reclutarme — no respondo y cuento a un adulto', isCorrect: true, feedback: '¡Exacto! El DM después de interactuar con contenido criminal no es coincidencia. Es parte de la estrategia. El secreto solicitado confirma las intenciones. No respondas y cuéntaselo a un adulto.', pointsEarned: 40 },
        { id: 'di4c', text: 'Respondo para ver qué tipo de personas son antes de decidir', isCorrect: false, feedback: 'Responder inicia el proceso. Cuando decides "solo mirar", ya comenzaste a entrar. El patrón de acercamiento se activa con el primer contacto.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di4b',
    },
    // CASO 5 — Prueba: la "valentía" como requisito de identidad
    {
      id: 'di5',
      stageIndex: 3,
      indicators: ['peticion_favor_pequeno', 'presion_para_cumplir_encargo', 'promesa_pertenencia_estatus'],
      type: 'chat',
      content: {
        profileName: 'Grupo_Los_Reales',
        profilePic: '💪',
        profileBio: 'Sin cobardes | CDMX',
        messages: [
          { id: 'di5m1', sender: 'them', text: 'Para estar con nosotros hay que demostrar que no eres cobarde.', timestamp: '22:30', flagIds: ['rf18'] },
          { id: 'di5m2', sender: 'them', text: 'La primera prueba es fácil: guarda este sobre en tu mochila durante una semana en la escuela. No lo abras.', timestamp: '22:32', flagIds: ['rf12', 'rf16'] },
          { id: 'di5m3', sender: 'them', text: 'Los que pasan la prueba son los que de verdad tienen huevos. ¿Eres de los nuestros o no?', timestamp: '22:34', flagIds: ['rf18', 'rf16'] },
        ] as ChatMessage[],
        question: 'Te piden llevar un sobre a la escuela como "prueba de valentía". ¿Qué tipo de manipulación es esto?',
      },
      choices: [
        { id: 'di5a', text: 'Es solo una prueba — quiero demostrar que puedo', isCorrect: false, feedback: 'Las "pruebas de valentía" que implican llevar objetos desconocidos son una de las formas más comunes de involucrar menores en actividades ilegales usando la escuela como territorio. No hay valentía real aquí.', pointsEarned: 0 },
        { id: 'di5b', text: 'Identifico que usan la identidad de "valentía" para hacerme cómplice — me niego y cuento a un adulto', isCorrect: true, feedback: '¡Correcto! La "prueba de valentía" es una táctica clásica para involucrar menores en actividades ilegales. Vincular la aceptación del grupo con actos ilegales es manipulación de identidad. Negarse es la valentía real.', pointsEarned: 40 },
        { id: 'di5c', text: 'Acepto pero lo que guardo lo reviso antes para ver si es seguro', isCorrect: false, feedback: 'Aceptar aunque revises te hace cómplice de llevar algo a la escuela para un grupo desconocido. La solución no es saber qué es — es no participar y buscar ayuda.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di5b',
    },
    // CASO 6 — Acercamiento: video de "denuncia social" que justifica el crimen
    {
      id: 'di6',
      stageIndex: 1,
      indicators: ['romantizacion_vida_criminal', 'contenido_alarmista', 'sin_fuente_verificable'],
      type: 'post',
      content: {
        accountName: 'Realidad_Barrio_MX',
        accountPic: '📹',
        verified: false,
        postText: '🎙️ "Nadie nos ayuda. El gobierno nos falló. La policía está corrompida. En mi barrio uno hace lo que puede para sobrevivir y cuidar a su familia." ¿Quién puede juzgarlos? 🤷 #Realidad #Barrio #NadieLosAyuda',
        metrics: { likes: 28000, shares: 9400, comments: 6200 },
        flagIds: ['rf16', 'rf17'],
        hasSource: false,
        question: 'Un video presenta el crimen como respuesta justificada al abandono del gobierno. ¿Qué narrativa construye?',
      },
      choices: [
        { id: 'di6a', text: 'Es verdad — la desigualdad y la corrupción explican el crimen. Comparto porque habla de realidades', isCorrect: false, feedback: 'Aunque la crítica social puede ser válida, los contenidos que presentan el crimen como respuesta legítima y necesaria a esas injusticias usan argumentos reales para justificar el reclutamiento.', pointsEarned: 0 },
        { id: 'di6b', text: 'Identifico que mezcla crítica social real con justificación del crimen — no normalizo aunque el contexto sea real', isCorrect: true, feedback: '¡Correcto! Los mejores argumentos de reclutamiento mezclan verdades reales (desigualdad, corrupción) con conclusiones falsas (el crimen es la única respuesta). Separar ambas cosas es pensamiento crítico.', pointsEarned: 40 },
        { id: 'di6c', text: 'No lo comparto pero entiendo que tienen razón — la pobreza no deja opciones', isCorrect: false, feedback: 'La pobreza es real y la desigualdad es injusta, pero la narrativa de "no hay otra opción" es falsa y peligrosa. Esa narrativa es exactamente lo que hace más efectivo el reclutamiento.', pointsEarned: 10 },
      ],
      correctChoiceId: 'di6b',
    },
    // CASO 7 — Exposición: perfil que glorifica el "cartel" con estética
    {
      id: 'di7',
      stageIndex: 0,
      indicators: ['romantizacion_vida_criminal', 'promesa_pertenencia_estatus', 'impacto_emocional_alto'],
      type: 'profile',
      content: {
        accountName: '@Vida_Nivel_MX',
        accountPic: '🦁',
        followers: '89,000 seguidores',
        verified: false,
        bio: 'La familia primero | Lealtad o nada | CDMX 🇲🇽',
        post: {
          text: '🦁 Los que nos conocen, nos respetan. Los que no nos conocen, nos temen. La calle te enseña lo que la escuela no puede. Puro respeto para los que se mantienen firmes. 💪',
          likes: 34000,
          comments: 8900,
          flagIds: ['rf16', 'rf18'],
        },
        question: 'Un perfil con 89 mil seguidores glorifica "la calle" como fuente de respeto y familia. ¿Qué función cumple en redes?',
      },
      choices: [
        { id: 'di7a', text: 'Es solo actitud — hay muchos perfiles así y no son todos criminales', isCorrect: false, feedback: 'La escala (89 mil seguidores) amplifica enormemente el impacto normalizador. Estos perfiles construyen audiencias jóvenes específicamente para hacer el reclutamiento más efectivo o para distribuir contenido de captación.', pointsEarned: 0 },
        { id: 'di7b', text: 'Identifico que construye identidad criminal como aspiracional — reporto y no sigo el perfil', isCorrect: true, feedback: '¡Correcto! Los perfiles de gran alcance que construyen la identidad criminal como aspiracional son herramientas de reclutamiento masivo. Reportar y dejar de seguir reduce su alcance real.', pointsEarned: 30 },
        { id: 'di7c', text: 'Sigo el perfil por la estética pero sin tomar en serio el mensaje', isCorrect: false, feedback: 'Seguir el perfil alimenta su alcance algorítmico y te identifica ante los operadores como alguien receptivo a esa narrativa. El efecto acumulativo en tu percepción tampoco es neutro.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di7b',
    },
    // CASO 8 — Vinculación: contenido que te hace sentir parte de algo
    {
      id: 'di8',
      stageIndex: 2,
      indicators: ['promesa_pertenencia_estatus', 'secreto_o_discrecion', 'halagos_excesivos'],
      type: 'chat',
      content: {
        profileName: 'Hermano_Mayor_77',
        profilePic: '💯',
        profileBio: 'Los míos primero',
        messages: [
          { id: 'di8m1', sender: 'them', text: 'Llevas meses siguiendo los mismos perfiles que nosotros. Ya eres de los nuestros sin saberlo.', timestamp: '21:15', flagIds: ['rf18'] },
          { id: 'di8m2', sender: 'them', text: 'Aquí nadie te juzga por tus problemas en casa. Aquí la familia de verdad cuida a los suyos.', timestamp: '21:18', flagIds: ['rf18', 'rf16'] },
          { id: 'di8m3', sender: 'them', text: '¿Quieres conocer a la gente real detrás de todo eso que consumes? Solo pasa por aquí.', timestamp: '21:20', flagIds: ['rf20', 'rf9'] },
        ] as ChatMessage[],
        question: 'Alguien dice que "ya eres de los suyos" por el contenido que consumes. ¿Qué estrategia es esta?',
      },
      choices: [
        { id: 'di8a', text: 'Me llama la atención la idea de pertenecer a algo real — respondo', isCorrect: false, feedback: 'La necesidad de pertenencia es real y válida, pero este perfil la está explotando deliberadamente. "Ya eres de los nuestros" sin conocerte personalmente es una trampa de identidad.', pointsEarned: 0 },
        { id: 'di8b', text: 'Reconozco que usan el contenido que consumo para crear sensación de pertenencia — no respondo y cuento a un adulto', isCorrect: true, feedback: '¡Exacto! Usar el historial de consumo de contenido para crear una identidad de grupo es una táctica sofisticada de vinculación. La oferta de "familia real" apela a necesidades genuinas de manera manipuladora.', pointsEarned: 40 },
        { id: 'di8c', text: 'Paso por curiosidad — quiero ver de qué se trata antes de comprometerme', isCorrect: false, feedback: '"Pasar a ver" es exactamente el primer paso que buscan. No hay curiosidad inocente cuando hay señales tan claras de manipulación. Cuéntalo a un adulto en vez de ir.', pointsEarned: 0 },
      ],
      correctChoiceId: 'di8b',
    },
    // CASO 9 — Acercamiento: meme que trivializa la violencia
    {
      id: 'di9',
      stageIndex: 1,
      indicators: ['contenido_alarmista', 'presion_compartir', 'impacto_emocional_alto', 'apariencia_manipulada'],
      type: 'post',
      content: {
        accountName: 'Chisme_Real_MX',
        accountPic: '💀',
        verified: false,
        postText: '[Video viral con música trap] Imágenes de confrontaciones con texto: "Así se resuelven las cosas aquí. No es Netflix. Es la vida real 🔫😂" — 2.3M vistas',
        metrics: { likes: 134000, shares: 89000, comments: 32000 },
        flagIds: ['rf19', 'rf16'],
        hasSource: false,
        question: 'Un video de 2.3M vistas presenta la violencia como forma "real" de resolver conflictos. ¿Qué efecto tiene al viralizarse?',
      },
      choices: [
        { id: 'di9a', text: 'Es contenido que ya vio mucha gente — si lo ven millones no es tan grave compartirlo', isCorrect: false, feedback: 'La escala viral no lo hace menos dañino — lo hace más. El contenido que presenta la violencia como solución normal reduce la empatía y el umbral de aceptación, especialmente en adolescentes.', pointsEarned: 0 },
        { id: 'di9b', text: 'Identifico que normaliza la violencia como solución cotidiana — no interactúo y lo reporto', isCorrect: true, feedback: '¡Correcto! Trivializar la violencia con humor hace que los jóvenes la perciban como normal, inevitable y hasta deseable. Reportar contenido violento viral es una acción de protección comunitaria real.', pointsEarned: 30 },
        { id: 'di9c', text: 'Lo veo pero no lo comparto — con eso es suficiente', isCorrect: false, feedback: 'Ver sin compartir limita el daño hacia afuera, pero la exposición repetida tiene efecto en tu propia percepción. Reportar es más efectivo que solo no compartir.', pointsEarned: 10 },
      ],
      correctChoiceId: 'di9b',
    },
    // CASO 10 — Control: ya te identificas con la narrativa
    {
      id: 'di10',
      stageIndex: 4,
      indicators: ['promesa_pertenencia_estatus', 'presion_para_cumplir_encargo', 'amenaza_directa'],
      type: 'chat',
      content: {
        profileName: 'Líder_Del_Grupo',
        profilePic: '🦁',
        profileBio: 'Aquí todos cuidan a todos',
        messages: [
          { id: 'di10m1', sender: 'them', text: 'Ya eres uno de los nuestros. Has estado con nosotros semanas y sabes cómo funciona esto.', timestamp: '23:00', flagIds: ['rf18'] },
          { id: 'di10m2', sender: 'them', text: 'Salirte ahora sería traicionar a la familia. ¿Eso eres tú?', timestamp: '23:02', flagIds: ['rf9', 'rf18'] },
          { id: 'di10m3', sender: 'them', text: 'Todos los que se van... no les va bien. Tú ya sabes eso.', timestamp: '23:04', flagIds: ['rf6', 'rf8'] },
        ] as ChatMessage[],
        question: 'Te dicen que "salirte es traición" y que "a los que se van no les va bien". ¿Qué debes saber?',
      },
      choices: [
        { id: 'di10a', text: 'Siento que ya pertenezco — salirme significaría perder todo', isCorrect: false, feedback: 'La sensación de pérdida de identidad y familia al salir es construida deliberadamente. Es la trampa final. Lo que construyeron en ti es falso — tu familia real, tu futuro real y las autoridades sí pueden ayudarte.', pointsEarned: 0 },
        { id: 'di10b', text: 'Entiendo que el sentido de pertenencia fue construido para atraparme — busco ayuda aunque tenga miedo', isCorrect: true, feedback: '¡Muy valiente! La identidad criminal que sientes como propia fue construida pieza a pieza con contenido, palabras y promesas. No es real. Las autoridades tienen protocolos para menores en esta situación. Hay salida.', pointsEarned: 40 },
        { id: 'di10c', text: 'Me quedo pero busco la forma de distanciarme poco a poco', isCorrect: false, feedback: 'El distanciamiento gradual sin apoyo exterior en grupos de control es muy difícil y peligroso. La salida segura requiere apoyo de adultos o autoridades — no lo intentes solo/a.', pointsEarned: 5 },
      ],
      correctChoiceId: 'di10b',
    },
  ],
  finalAdvice: 'El contenido que normalizay romantiza el crimen no es entretenimiento inocente: es parte de una estrategia de reclutamiento a escala masiva. Reconocer cómo actúa sobre tu percepción, no interactuar con él y reportarlo son las tres acciones más poderosas que puedes tomar.',
  realWorldAction: 'Si identifies contenido de este tipo o si ya estás en contacto con grupos que te fueron presentados a través de redes, habla con un adulto de confianza o contacta a la Policía Cibernética de la Ciudad de México al 55 5242 5100 ext. 5086 o escribe a policia.cibernetica@ssc.cdmx.gob.mx.',
};

// ─── EXPORTS ────────────────────────────────────────────────────────────────
export const modules: Module[] = [
  groomingModule,
  coerciveModule,
  fraudModule,
  disinfoModule,
];

// Alias for backward compatibility with existing imports
export const allModules = modules;

// ─── PLAYER PROFILE & GAMIFICATION ────────────────────────────────────────────────
export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface ModuleProgress {
  moduleId: ModuleId;
  completed: boolean;
  score: number;
  maxScore: number;
  flagsDetected: number;
  completedAt?: Date;
}

export interface PlayerProfile {
  name: string;
  level: number;
  totalXP: number;
  xpToNext: number;
  defenseRating: number;
  moduleProgress: ModuleProgress[];
  badges: Badge[];
}

export const defaultBadges: Badge[] = [
  { id: 'b1', label: 'Ojo de úguila', description: 'Detectaste todas las banderas rojas en un módulo', icon: '👁️', earned: false },
  { id: 'b2', label: 'Escudo digital', description: 'Puntuación perfecta en Grooming y Captación', icon: '🛡️', earned: false },
  { id: 'b3', label: 'Anti-fraude', description: 'Puntuación perfecta en Falsas Ofertas', icon: '💰', earned: false },
  { id: 'b4', label: 'Pensamiento crítico', description: 'Completaste el módulo de Normalización Digital', icon: '🧠', earned: false },
  { id: 'b5', label: 'Defensor digital', description: 'Completaste todos los módulos', icon: '🏆', earned: false },
  { id: 'b6', label: 'Primera misión', description: 'Completaste tu primer módulo', icon: '⭐', earned: false },
];

export const initialProfile: PlayerProfile = {
  name: 'Agente',
  level: 1,
  totalXP: 0,
  xpToNext: 200,
  defenseRating: 10,
  moduleProgress: modules.map(m => ({
    moduleId: m.id,
    completed: false,
    score: 0,
    maxScore: m.steps.length * 100,
    flagsDetected: 0,
  })),
  badges: defaultBadges.map(b => ({ ...b })),
};

export function getModuleById(id: ModuleId): Module | undefined {
  return modules.find(m => m.id === id);
}

export function calculateScore(correctAnswers: number, totalQuestions: number, xpAvailable: number): number {
  return Math.round((correctAnswers / totalQuestions) * xpAvailable);
}

export function calculateRiskScore(steps: SimulationStep[], correctIds: string[]): number {
  let risk = 0;
  steps.forEach(step => {
    if (!correctIds.includes(step.correctChoiceId)) {
      risk += (step.stageIndex + 1) * 10;
    }
  });
  return Math.min(100, risk);
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function getRiskLabel(score: number): string {
  if (score >= 70) return 'Riesgo alto';
  if (score >= 40) return 'Riesgo moderado';
  return 'Riesgo bajo';
}
