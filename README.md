**Radar Digital**

Una iniciativa de **Alianza Digital de Protección Infantil**.

**Nombre del proyecto y descripción**

**Radar Digital** es una aplicación web educativa gamificada orientada a la prevención de la captación digital de niñas, niños y adolescentes, así como a la identificación de amenazas sociodigitales vinculadas con grooming, presión, manipulación, falsas ofertas y contenidos que normalizan el crimen. El prototipo fue desarrollado durante hackatón para demostrar cómo la cibercriminología aplicada, la educación preventiva y la inteligencia artificial pueden integrarse en una herramienta interactiva de protección infantil en línea.

La aplicación propone un entorno seguro de aprendizaje donde las y los usuarios interactúan con escenarios simulados, identifican banderas rojas, reconocen etapas del riesgo y reciben retroalimentación explicable sobre la mejor decisión preventiva en cada caso.

**Problema que resuelve**

Niñas, niños y adolescentes interactúan diariamente en redes sociales, plataformas de mensajería, videojuegos y otros espacios digitales donde pueden ser expuestos a aproximaciones manipuladoras, engaños, coerción y procesos de captación por parte de actores delictivos. En muchos casos, estos procesos no comienzan con una amenaza explícita, sino con contacto amistoso, promesas, lenguaje emocional, pertenencia simbólica, ofertas atractivas o contenido que normaliza conductas de riesgo.

En particular, la captación de menores por parte del crimen organizado puede apoyarse en mecanismos digitales como:

- falsas ofertas de trabajo,
- promesas de dinero fácil,
- creación de vínculos afectivos o de lealtad,
- romantización del poder criminal,
- presión para mantener secretos,
- pequeños encargos o favores que escalan hacia mayor control.

Aunque existen campañas de sensibilización, muchas estrategias siguen siendo informativas y no permiten que adolescentes practiquen cómo identificar señales de riesgo, cómo interrumpir el proceso de manipulación y cómo tomar decisiones seguras en situaciones realistas.

Radar Digital busca cerrar esa brecha mediante simulaciones guiadas, análisis de riesgo y aprendizaje interactivo.

**Objetivo del prototipo**

Desarrollar un MVP funcional que permita:

- entrenar a adolescentes en la detección temprana de señales de riesgo digital,
- explicar procesos de captación y manipulación desde una lógica de cibercriminología aplicada,
- fortalecer la toma de decisiones preventivas,
- generar métricas básicas de desempeño por interacción y por módulo,
- y demostrar el potencial de una herramienta escalable para escuelas, organizaciones sociales y programas de prevención.

**Enfoque conceptual**

El prototipo se basa en una perspectiva de **cibercriminología aplicada**, entendiendo que la victimización digital ocurre por la convergencia de ofensores motivados, vulnerabilidades contextuales, ausencia de guardianes eficaces y dinámicas tecnológicas que facilitan el engaño, la manipulación y el aislamiento.

Por ello, la app no presenta los riesgos como eventos aislados, sino como **procesos graduales** que pueden ser detectados e interrumpidos antes de que escalen. Cada módulo incorpora una lógica de progresión del riesgo para mostrar que muchas amenazas digitales inician con exposición o acercamiento, continúan con manipulación o vinculación, avanzan hacia prueba de límites o exigencias, y culminan en presión, control o incorporación a dinámicas dañinas.

**Módulos del prototipo**

El prototipo organiza la experiencia en cuatro módulos principales orientados a la prevención de la captación digital de niñas, niños y adolescentes:

**1\. Grooming y captación**

Este módulo enseña a identificar procesos de acercamiento, generación de confianza, secreto, prueba de límites y manipulación progresiva. Se enfoca en cómo una interacción aparentemente amistosa puede transformarse en un proceso de captación.

**2\. Presión y control digital**

Este módulo aborda dinámicas de coerción, intimidación, chantaje, obediencia y control. Su objetivo es ayudar a reconocer cuándo una interacción deja de ser persuasiva y se convierte en una relación de presión o sometimiento.

**3\. Falsas ofertas y reclutamiento económico**

Este módulo trabaja señales de falsas oportunidades, dinero fácil, promesas laborales ambiguas, favores pequeños y solicitudes sospechosas. Busca mostrar cómo ciertas ofertas pueden funcionar como mecanismos de entrada o enganche hacia dinámicas delictivas.

**4\. Contenido que normaliza el crimen**

Este módulo enseña a identificar narrativas, publicaciones, videos o mensajes que romantizan, legitiman o vuelven aspiracional la identidad criminal. Su función es desarrollar pensamiento crítico y prevenir procesos de admiración, identificación o vinculación simbólica con el crimen.

**Relación de los módulos con la captación de niñas, niños y adolescentes por el crimen organizado**

Los módulos fueron articulados para mostrar que la captación digital de menores no depende de una sola táctica, sino de la combinación de varias dinámicas de aproximación, manipulación y control.

- **Grooming y captación** representa el acercamiento inicial, la construcción de confianza y el secreto.
- **Presión y control digital** representa la coerción posterior, la obediencia, la intimidación o el chantaje.
- **Falsas ofertas y reclutamiento económico** representa promesas de dinero fácil, falsas oportunidades o encargos que funcionan como puerta de entrada.
- **Contenido que normaliza el crimen** representa mensajes, relatos o imaginarios que legitiman y vuelven atractiva la incorporación a entornos criminales.

En conjunto, la experiencia educativa permite visualizar la progresión del riesgo desde la exposición inicial hasta el control o incorporación a dinámicas dañinas.

**Progresión del riesgo utilizada en la app**

Para unificar la lógica pedagógica del prototipo, cada interacción puede leerse dentro de una misma secuencia general:

1.  **Exposición**: aparición de contenido, perfil, mensaje u oferta llamativa.
2.  **Acercamiento**: inicio del contacto mediante lenguaje amistoso, interés o promesa.
3.  **Vinculación**: construcción de confianza, pertenencia, secreto o dependencia.
4.  **Prueba o encargo**: solicitud de una acción, información, traslado, favor o conducta concreta.
5.  **Control o incorporación**: presión, amenaza, obediencia, explotación o integración a una dinámica de riesgo.

**Tecnologías y herramientas utilizadas**

**Tecnologías del prototipo**

- HTML
- CSS
- JavaScript
- Node.js
- npm
- Vite
- Tailwind CSS

**Estructura general del proyecto**

.  
├── client/  
├── server/  
├── shared/  
├── dist/  
├── package.json  
├── package-lock.json  
├── vite.config.ts  
├── tsconfig.json  
└── tailwind.config.ts  

**Instrucciones para ejecutar el prototipo**

El proyecto se entrega con una estructura de desarrollo moderna basada en frontend y backend ligero.

**Requisitos previos**

- Tener instalado **Node.js**
- Tener instalado **npm**

**Ejecución local en modo desarrollo**

1.  Descargar o clonar el proyecto.
2.  Abrir una terminal dentro de la carpeta del proyecto redflag-ai-teen.
3.  Instalar dependencias ejecutando:

npm install  

1.  Ejecutar el entorno de desarrollo:

npm run dev  

1.  Abrir en el navegador la URL local indicada por la terminal, normalmente una dirección similar a:

http://localhost:5173  

**Ejecución de versión lista para despliegue**

Si el proyecto ya incluye la carpeta dist, esta corresponde a una versión compilada del prototipo lista para despliegue o publicación.

**Contenido entregado como código fuente**

El código fuente del prototipo se entrega en:

- la carpeta completa del proyecto radar digital,
- y/o el archivo comprimido .zip exportado desde el entorno de desarrollo.

**Herramientas de IA utilizadas**

Durante el desarrollo del prototipo se utilizaron herramientas de inteligencia artificial para acelerar la ideación, la estructuración conceptual, la iteración visual. (Perplexity Computer)

**Herramientas utilizadas**

- **Computer / generador de aplicación**: utilizado para construir y refinar la interfaz web del prototipo, iterar pantallas, mejorar navegación, ampliar escenarios, añadir módulos y ajustar el flujo visual.

**¿Para qué se usaron?**

- Ideación del producto.
- Definición del MVP.
- Iteración del flujo de usuario.
- Ajustes visuales y narrativos del prototipo.

**¿En qué medida se usaron?**

Las herramientas de IA se utilizaron como apoyo para acelerar el desarrollo del prototipo. Sin embargo, la definición del problema, el enfoque en protección infantil, la relación con la captación de menores por parte del crimen organizado, la lógica cibercriminológica, la toma de decisiones sobre contenido y la supervisión final del producto fueron dirigidas por el equipo.

**Indicadores y estadística por interacción**

Como parte del enfoque educativo del prototipo, se propuso que cada interacción pueda generar indicadores que permitan evaluar desempeño, riesgo y aprendizaje por módulo.

**Indicadores base por interacción**

- red_flags_presentes
- red_flags_detectadas
- precision_deteccion
- tiempo_respuesta
- decision_segura
- decision_riesgosa
- fase_del_riesgo
- nivel_dificultad

**Indicadores específicos por módulo**

**Grooming y captación**

- halagos_excesivos
- peticion_secreto
- migracion_chat_privado
- contacto_desconocido_mayor
- ofrecimiento_regalo_dinero
- solicitud_info_personal
- insistencia_mensajes

**Presión y control digital**

- presion_emocional
- amenaza_directa
- chantaje
- culpabilizacion
- obediencia_exigida
- miedo_generado
- aislamiento_sugerido

**Falsas ofertas y reclutamiento económico**

- promesa_dinero_facil
- oferta_trabajo_ambigua
- peticion_favor_pequeno
- normalizacion_ilegalidad
- solicitud_pago_transferencia
- canal_sospechoso
- evasivas_ante_preguntas

**Contenido que normaliza el crimen**

- narrativa_normalizadora
- romantizacion_vida_criminal
- impacto_emocional_alto
- presion_compartir
- sin_fuente_verificable
- apariencia_manipulada
- difusion_sin_verificar

**Métricas agregadas sugeridas para dashboard**

- total de interacciones por módulo,
- porcentaje de detección de señales,
- porcentaje de decisiones seguras,
- porcentaje de decisiones riesgosas,
- tiempo promedio de respuesta,
- fase del riesgo más vulnerable,
- indicador más frecuente por módulo,
- evolución del desempeño del usuario.

**Público objetivo**

El prototipo está orientado principalmente a:

adolescentes

**Impacto esperado**

Radar digital busca contribuir a:

- la protección infantil en entornos digitales,
- la prevención de la victimización digital,
- la alfabetización mediática y de ciberseguridad,
- la detección temprana de dinámicas de captación,
- y la implementación de herramientas preventivas escalables en México.

**Video demo**

https://youtu.be/7iPyjGmgC8k

**Integrantes del equipo**

**Alianza Digital de Protección Infantil**

- Mirna Zárate Hernández
- Gerardo Nóchez Cerón
- Hugo Erik Casteñada Ibañez

**Estado del proyecto**

Prototipo funcional desarrollado durante hackatón como MVP demostrativo.