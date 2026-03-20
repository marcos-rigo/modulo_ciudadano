import type { SubtopicData } from './types'

export const SUBTOPICS_DATA: SubtopicData[] = [
  // =============================================
  // SUBTOPIC 1: Pensamiento crítico en entornos digitales
  // =============================================
  {
    id: 1,
    title: 'Pensamiento crítico en entornos digitales',
    description:
      'Desarrollá habilidades para analizar, evaluar y cuestionar la información que encontrás en Internet y las redes sociales.',
    introText: `En la actualidad, vivimos inmersos en un entorno digital que nos ofrece acceso ilimitado a información. Sin embargo, no toda esa información es confiable, verdadera o neutral. El pensamiento crítico es la capacidad de analizar, evaluar y cuestionar de manera reflexiva lo que leemos, vemos y escuchamos en línea.

Desarrollar esta habilidad es fundamental para tomar decisiones informadas, protegernos de la manipulación y participar activamente en la sociedad digital como ciudadanos responsables.`,
    learningObjectives: [
      'Comprender qué es el pensamiento crítico y por qué es esencial en entornos digitales.',
      'Identificar sesgos cognitivos que afectan nuestra percepción de la información.',
      'Aplicar estrategias concretas para evaluar la credibilidad de las fuentes.',
      'Reconocer técnicas de manipulación informativa en redes sociales.',
    ],
    keyIdeas: [
      {
        icon: '🧠',
        title: '¿Qué es el pensamiento crítico?',
        description:
          'Es la capacidad de analizar información de forma objetiva, identificar suposiciones y llegar a conclusiones bien fundamentadas.',
      },
      {
        icon: '🔍',
        title: 'Sesgos cognitivos',
        description:
          'Patrones de pensamiento que distorsionan nuestra percepción. El sesgo de confirmación nos lleva a buscar solo lo que confirma nuestras creencias.',
      },
      {
        icon: '⚖️',
        title: 'Evaluación de fuentes',
        description:
          'Verificar autoría, fecha, fuentes citadas e intención detrás de un contenido son pasos clave para determinar su credibilidad.',
      },
      {
        icon: '🌐',
        title: 'Algoritmos y burbujas de filtro',
        description:
          'Los algoritmos de las plataformas digitales priorizan contenido según nuestros gustos, creando "burbujas" que limitan nuestra visión del mundo.',
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/dItUGF8GdTw',
    videoTitle: '¿Qué es el pensamiento crítico?',
    videoDescription:
      'Este video explica de manera clara y concisa qué es el pensamiento crítico, por qué es importante y cómo podemos aplicarlo en nuestra vida cotidiana digital.',
    videoTips: [
      'Prestá atención a la diferencia entre hechos y opiniones.',
      'Observá cómo se identifican y cuestionan los sesgos.',
      'Notá las estrategias prácticas que se sugieren.',
    ],
    podcastUrl: 'https://open.spotify.com/embed/episode/4aWxNy4e1zqQwNvVRgxqI9',
    podcastTitle: 'Pensamiento crítico en la era digital',
    podcastDescription:
      'Un episodio que profundiza en cómo desarrollar el pensamiento crítico frente al caudal de información digital que recibimos a diario.',
    podcastTips: [
      'Tomá nota de los conceptos clave que se mencionan.',
      'Reflexioná sobre ejemplos de tu propia vida digital.',
      'Prestá atención a las recomendaciones finales del episodio.',
    ],
    recommendations: [
      {
        id: 1,
        title: 'Thinking, Fast and Slow — Daniel Kahneman',
        type: 'Artículo',
        description:
          'Un resumen del influyente libro que explora los dos sistemas de pensamiento y cómo los sesgos cognitivos afectan nuestras decisiones.',
        ctaLabel: 'Ver resumen',
        ctaUrl: '#',
      },
      {
        id: 2,
        title: 'The Social Dilemma (Netflix)',
        type: 'Documental',
        description:
          'Documental que examina cómo las redes sociales manipulan psicológicamente a los usuarios y afectan el pensamiento crítico.',
        ctaLabel: 'Ver en Netflix',
        ctaUrl: '#',
      },
      {
        id: 3,
        title: 'Ejercicio de análisis de noticias',
        type: 'Actividad',
        description:
          'Tomá tres noticias de diferentes fuentes sobre el mismo tema y comparalas. ¿Qué diferencias encontrás? ¿Cuál parece más objetiva?',
      },
      {
        id: 4,
        title: 'Lateral Reading — técnica de los periodistas',
        type: 'Ejemplo',
        description:
          'Los periodistas verifican información abriendo nuevas pestañas para buscar qué dicen otras fuentes sobre el autor o medio, en lugar de leer solo el artículo original.',
      },
    ],
    quizQuestions: [
      {
        id: 1,
        question: '¿Qué es el pensamiento crítico?',
        options: [
          'La capacidad de memorizar grandes cantidades de información.',
          'La habilidad de analizar, evaluar y cuestionar información de forma reflexiva.',
          'La tendencia a creer solo en lo que dicen los expertos.',
          'La capacidad de leer muy rápido en entornos digitales.',
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: '¿Qué es el sesgo de confirmación?',
        options: [
          'La tendencia a buscar y favorecer información que confirma nuestras creencias previas.',
          'La capacidad de confirmar datos antes de compartirlos.',
          'Un error en los algoritmos de búsqueda.',
          'La tendencia a cambiar de opinión frecuentemente.',
        ],
        correctIndex: 0,
      },
      {
        id: 3,
        question: '¿Qué son las "burbujas de filtro"?',
        options: [
          'Errores técnicos que filtran contenido inapropiado.',
          'Fenómenos donde los algoritmos muestran solo contenido que refuerza nuestras opiniones.',
          'Sistemas de seguridad en redes sociales.',
          'Filtros de imágenes en aplicaciones fotográficas.',
        ],
        correctIndex: 1,
      },
      {
        id: 4,
        question: '¿Cuál de estas acciones refleja pensamiento crítico ante una noticia?',
        options: [
          'Compartirla inmediatamente si coincide con lo que pensamos.',
          'Ignorarla si proviene de un medio desconocido.',
          'Verificar la fuente, la fecha y buscar otras fuentes que confirmen o refuten la información.',
          'Aceptarla como verdadera si tiene muchos "me gusta".',
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        question: '¿Qué técnica usan los periodistas para verificar información en línea?',
        options: [
          'Deep reading: leer el artículo varias veces.',
          'Lateral reading: abrir nuevas pestañas para buscar qué dicen otras fuentes sobre el autor o medio.',
          'Fast reading: leer solo el título y el primer párrafo.',
          'Social reading: compartir el artículo y esperar reacciones.',
        ],
        correctIndex: 1,
      },
      {
        id: 6,
        question: '¿Cuál de los siguientes es un indicador de baja credibilidad de una fuente?',
        options: [
          'El artículo tiene fecha de publicación reciente.',
          'El autor tiene credenciales verificables.',
          'El titular usa mayúsculas, signos de exclamación y lenguaje alarmista.',
          'El sitio web tiene sección "Acerca de nosotros" con información transparente.',
        ],
        correctIndex: 2,
      },
      {
        id: 7,
        question: '¿Qué significa evaluar críticamente una fuente de información?',
        options: [
          'Criticarla negativamente en redes sociales.',
          'Analizar su autoría, fecha, intención y credibilidad antes de tomarla como válida.',
          'Traducirla a otro idioma para comprenderla mejor.',
          'Verificar que tenga muchos seguidores en redes sociales.',
        ],
        correctIndex: 1,
      },
      {
        id: 8,
        question: '¿Cómo afectan los algoritmos al pensamiento crítico?',
        options: [
          'Lo mejoran al mostrar siempre contenido verificado.',
          'No tienen ningún efecto sobre cómo pensamos.',
          'Pueden limitarlo al crear "burbujas" que refuerzan nuestros sesgos y reducen la diversidad de perspectivas.',
          'Lo desarrollan al exponer a los usuarios a opiniones contrarias.',
        ],
        correctIndex: 2,
      },
      {
        id: 9,
        question: '¿Cuál es el primer paso del pensamiento crítico ante información nueva?',
        options: [
          'Compartir la información con amigos para conocer su opinión.',
          'Hacer una pausa y preguntarse: ¿quién lo dice, por qué y qué evidencia hay?',
          'Aceptarla si proviene de una persona conocida.',
          'Rechazarla si contradice lo que ya sabemos.',
        ],
        correctIndex: 1,
      },
      {
        id: 10,
        question: '¿Por qué es importante el pensamiento crítico para la ciudadanía digital?',
        options: [
          'Porque permite usar las redes sociales más eficientemente.',
          'Porque ayuda a programar aplicaciones digitales.',
          'Porque permite participar de forma responsable, tomar decisiones informadas y protegerse de la manipulación.',
          'Porque es un requisito legal para usar Internet en Argentina.',
        ],
        correctIndex: 2,
      },
    ],
  },

  // =============================================
  // SUBTOPIC 2: Verificación de información y desinformación
  // =============================================
  {
    id: 2,
    title: 'Verificación de información y desinformación',
    description:
      'Aprendé a identificar noticias falsas, fake news y técnicas de desinformación para navegar con seguridad en el mundo digital.',
    introText: `La desinformación es uno de los mayores desafíos de la era digital. Las noticias falsas o "fake news" se propagan a una velocidad alarmante, especialmente a través de las redes sociales y aplicaciones de mensajería. Comprender cómo identificarlas y verificarlas es una habilidad esencial para cualquier ciudadano digital.

La verificación de información (o "fact-checking") es el proceso sistemático de comprobar la veracidad de afirmaciones, datos y noticias. No se trata de desconfiar de todo, sino de desarrollar una actitud reflexiva y basada en evidencia.`,
    learningObjectives: [
      'Distinguir entre desinformación, información errónea y manipulación deliberada.',
      'Conocer y aplicar herramientas concretas de verificación de hechos.',
      'Identificar señales de alerta en contenidos potencialmente falsos.',
      'Comprender el rol de la ciudadanía en frenar la propagación de información falsa.',
    ],
    keyIdeas: [
      {
        icon: '🚨',
        title: 'Tipos de desinformación',
        description:
          'Misinformación (falsa sin intención), desinformación (falsa con intención de engañar) y malinformación (verdadera pero usada para dañar).',
      },
      {
        icon: '🔎',
        title: 'Señales de alerta',
        description:
          'Titulares sensacionalistas, ausencia de fuentes, imágenes fuera de contexto y URLs que imitan medios legítimos son indicadores comunes de contenido falso.',
      },
      {
        icon: '✅',
        title: 'Herramientas de verificación',
        description:
          'Sitios como Chequeado, Snopes, FactCheck.org y la búsqueda inversa de imágenes de Google permiten verificar hechos y fotos rápidamente.',
      },
      {
        icon: '🤝',
        title: 'Responsabilidad ciudadana',
        description:
          'Antes de compartir, verificá. Cada persona es un nodo en la red de desinformación o en la red de información confiable.',
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/AkwWcHekMdo',
    videoTitle: 'Cómo identificar las fake news',
    videoDescription:
      'Un análisis claro sobre cómo funcionan las noticias falsas, sus mecanismos de propagación y las herramientas que podemos usar para identificarlas.',
    videoTips: [
      'Observá los ejemplos concretos de fake news que se muestran.',
      'Prestá atención a las herramientas de verificación mencionadas.',
      'Reflexioná sobre situaciones en las que vos mismo podés haber compartido información no verificada.',
    ],
    podcastUrl: 'https://open.spotify.com/embed/episode/6rqhFgbbKwnb9MLmUQDhf6',
    podcastTitle: 'La epidemia de las fake news',
    podcastDescription:
      'Un episodio que analiza en profundidad el fenómeno de la desinformación, sus causas psicológicas y sociales, y cómo combatirla.',
    podcastTips: [
      'Tomá nota de los casos reales de desinformación que se mencionan.',
      'Prestá atención a los factores psicológicos que nos hacen vulnerables.',
      'Identificá las estrategias prácticas de verificación sugeridas.',
    ],
    recommendations: [
      {
        id: 1,
        title: 'Chequeado — Plataforma argentina de fact-checking',
        type: 'Recurso',
        description:
          'Sitio argentino especializado en verificar afirmaciones de figuras públicas y noticias virales. Ideal para verificar información local.',
        ctaLabel: 'Visitar Chequeado',
        ctaUrl: 'https://chequeado.com',
      },
      {
        id: 2,
        title: 'Búsqueda inversa de imágenes',
        type: 'Actividad',
        description:
          'Buscá una imagen viral en Google Images usando la opción "Buscar imagen" para descubrir si fue tomada fuera de contexto o es de otra época.',
      },
      {
        id: 3,
        title: 'Infodemia — OMS y la desinformación en salud',
        type: 'Ejemplo',
        description:
          'Durante la pandemia de COVID-19, la OMS declaró una "infodemia". Analizá cómo las fake news sanitarias causaron daño real en la población.',
      },
      {
        id: 4,
        title: 'iVerify — Guía de la IFCN',
        type: 'Artículo',
        description:
          'Guía práctica de la Red Internacional de Verificadores de Hechos para ciudadanos que quieren combatir la desinformación.',
        ctaLabel: 'Leer guía',
        ctaUrl: '#',
      },
    ],
    quizQuestions: [
      {
        id: 1,
        question: '¿Cuál es la diferencia entre "misinformación" y "desinformación"?',
        options: [
          'Son términos sinónimos que describen lo mismo.',
          'La misinformación es falsa pero se difunde sin intención de engañar; la desinformación es falsa y se difunde deliberadamente.',
          'La desinformación siempre proviene de medios de comunicación, la misinformación de usuarios individuales.',
          'La misinformación afecta solo a adultos mayores, mientras que la desinformación afecta a jóvenes.',
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: '¿Cuál de estas es una señal de alerta de una posible noticia falsa?',
        options: [
          'El artículo cita varias fuentes verificables.',
          'El autor del artículo tiene un perfil profesional visible.',
          'El titular usa mayúsculas, lenguaje alarmista y signos de exclamación.',
          'El sitio web tiene fecha de publicación visible.',
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        question: '¿Qué herramienta permite verificar si una imagen fue usada fuera de contexto?',
        options: [
          'Wikipedia.',
          'La búsqueda inversa de imágenes de Google.',
          'Instagram Stories.',
          'Microsoft Paint.',
        ],
        correctIndex: 1,
      },
      {
        id: 4,
        question: '¿Qué es un "deepfake"?',
        options: [
          'Una fotografía tomada con mucho zoom.',
          'Un archivo de audio de muy alta calidad.',
          'Contenido audiovisual manipulado por inteligencia artificial para mostrar personas diciendo o haciendo cosas que nunca ocurrieron.',
          'Un tipo de malware que roba contraseñas.',
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        question: '¿Cuál de estas plataformas es un sitio argentino de fact-checking?',
        options: ['Infobae', 'Chequeado', 'Wikipedia', 'Twitter/X'],
        correctIndex: 1,
      },
      {
        id: 6,
        question: '¿Por qué las fake news se propagan tan rápido en redes sociales?',
        options: [
          'Porque los algoritmos las priorizan deliberadamente.',
          'Porque los usuarios las crean profesionalmente.',
          'Porque generan reacciones emocionales fuertes (miedo, indignación) que impulsan el compartido.',
          'Porque siempre son más cortas que las noticias verdaderas.',
        ],
        correctIndex: 2,
      },
      {
        id: 7,
        question: '¿Qué debe hacer un ciudadano digital responsable antes de compartir una noticia?',
        options: [
          'Compartirla inmediatamente si le parece importante.',
          'Verificar la fuente, la fecha, la autoría y buscar otras fuentes que confirmen la información.',
          'Esperar a que otra persona la comparta primero.',
          'Consultar solo con amigos de confianza.',
        ],
        correctIndex: 1,
      },
      {
        id: 8,
        question: '¿Qué es la "malinformación"?',
        options: [
          'Información técnicamente correcta pero usada de forma engañosa o con intención de dañar.',
          'Información mal redactada con errores ortográficos.',
          'Noticias falsas creadas por bots.',
          'Información destinada a niños pequeños.',
        ],
        correctIndex: 0,
      },
      {
        id: 9,
        question: '¿Qué significa el término "infodemia"?',
        options: [
          'Una aplicación para leer noticias.',
          'Una red social especializada en información médica.',
          'Un exceso de información, incluyendo falsa, que dificulta encontrar orientación confiable durante una crisis.',
          'Un tipo de virus informático.',
        ],
        correctIndex: 2,
      },
      {
        id: 10,
        question: '¿Cuál es el rol de la ciudadanía en combatir la desinformación?',
        options: [
          'No tiene ningún rol; es responsabilidad exclusiva de los medios y los gobiernos.',
          'Reportar toda noticia sospechosa a la policía.',
          'Verificar información antes de compartirla y ser consciente de los propios sesgos.',
          'Dejar de usar redes sociales por completo.',
        ],
        correctIndex: 2,
      },
    ],
  },

  // =============================================
  // SUBTOPIC 3: Huella digital e identidad digital
  // =============================================
  {
    id: 3,
    title: 'Huella digital e identidad digital',
    description:
      'Conocé qué rastros dejamos en Internet, cómo se construye nuestra identidad digital y cómo protegerla de manera efectiva.',
    introText: `Cada vez que navegamos por Internet, usamos una aplicación o interactuamos en redes sociales, dejamos un rastro de datos. Este conjunto de datos constituye nuestra "huella digital", una representación permanente de quiénes somos en el mundo en línea.

La identidad digital va más allá: es la construcción activa de nuestra presencia en línea, que incluye nuestros perfiles, publicaciones, comentarios y reputación. Comprender y gestionar ambas es fundamental para proteger nuestra privacidad, seguridad y bienestar en la era digital.`,
    learningObjectives: [
      'Comprender qué es la huella digital y cómo se genera de manera activa y pasiva.',
      'Reconocer los riesgos asociados a una gestión inadecuada de la identidad digital.',
      'Aplicar estrategias concretas para proteger la privacidad en línea.',
      'Reflexionar sobre la construcción de una identidad digital positiva y coherente.',
    ],
    keyIdeas: [
      {
        icon: '👣',
        title: 'Huella digital activa y pasiva',
        description:
          'La huella activa son los datos que compartimos conscientemente (posts, fotos). La pasiva es la que se recopila sin que lo sepamos (cookies, historial, metadatos).',
      },
      {
        icon: '🛡️',
        title: 'Privacidad y seguridad',
        description:
          'Revisar configuraciones de privacidad, usar contraseñas seguras y habilitar la verificación en dos pasos son acciones clave para proteger nuestra identidad.',
      },
      {
        icon: '♾️',
        title: 'Permanencia de los datos',
        description:
          'Lo que publicamos en Internet puede permanecer accesible para siempre, incluso si lo borramos. La regla de oro: no publiques nada que no quieras que sea permanente.',
      },
      {
        icon: '🌟',
        title: 'Reputación digital',
        description:
          'Empleadores, docentes y colegas buscan información en línea. Una identidad digital positiva puede abrir puertas; una negativa puede cerrarlas.',
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/F3uHjbRLjDQ',
    videoTitle: 'Tu huella digital: qué es y por qué importa',
    videoDescription:
      'Este video explica qué es la huella digital, cómo se genera, qué datos recopilan las plataformas y qué podemos hacer para gestionarla responsablemente.',
    videoTips: [
      'Prestá atención a los ejemplos de huella pasiva que quizás no conocías.',
      'Observá las recomendaciones para revisar la configuración de privacidad.',
      'Reflexioná sobre tu propia huella digital actual.',
    ],
    podcastUrl: 'https://open.spotify.com/embed/episode/3TNRFhHFYKJcKVtCZdHXAX',
    podcastTitle: 'Identidad digital en el siglo XXI',
    podcastDescription:
      'Una conversación profunda sobre cómo construimos nuestra identidad en línea, los riesgos del doxxing y el ciberacoso, y cómo protegernos.',
    podcastTips: [
      'Identificá los casos reales de vulneración de identidad digital que se mencionan.',
      'Tomá nota de las herramientas prácticas de protección sugeridas.',
      'Reflexioná sobre la coherencia entre tu identidad real y digital.',
    ],
    recommendations: [
      {
        id: 1,
        title: 'Revisá tu huella digital ahora',
        type: 'Actividad',
        description:
          'Abrí un buscador y buscá tu nombre completo. ¿Qué resultados aparecen? ¿Qué imagen proyectan? Esta es tu huella digital pública actual.',
      },
      {
        id: 2,
        title: 'The Great Hack (Netflix)',
        type: 'Documental',
        description:
          'Documental sobre el escándalo de Cambridge Analytica, que muestra cómo se usaron millones de datos personales de Facebook para manipular elecciones.',
        ctaLabel: 'Ver en Netflix',
        ctaUrl: '#',
      },
      {
        id: 3,
        title: 'Configuraciones de privacidad esenciales',
        type: 'Recurso',
        description:
          'Guía paso a paso para revisar y ajustar las configuraciones de privacidad en Instagram, Facebook, WhatsApp y Google.',
        ctaLabel: 'Ver guía',
        ctaUrl: '#',
      },
      {
        id: 4,
        title: 'El derecho al olvido digital',
        type: 'Artículo',
        description:
          'Análisis del "derecho al olvido" reconocido en la legislación europea y los debates sobre su implementación en América Latina.',
        ctaLabel: 'Leer artículo',
        ctaUrl: '#',
      },
    ],
    quizQuestions: [
      {
        id: 1,
        question: '¿Qué es la huella digital pasiva?',
        options: [
          'Los posts y fotos que publicamos conscientemente en redes sociales.',
          'Los datos que las plataformas recopilan de nosotros sin que lo sepamos, como cookies e historial de navegación.',
          'Los archivos que descargamos de Internet.',
          'Los mensajes que enviamos por WhatsApp.',
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: '¿Cuál de las siguientes es una buena práctica para proteger la identidad digital?',
        options: [
          'Usar la misma contraseña para todas las cuentas para recordarla mejor.',
          'Publicar la fecha de nacimiento completa y dirección en el perfil.',
          'Habilitar la verificación en dos pasos (2FA) en las cuentas importantes.',
          'Aceptar todas las cookies para no ver mensajes molestos.',
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        question: '¿Qué implica el principio de "permanencia" de los datos digitales?',
        options: [
          'Que los datos digitales se borran automáticamente después de 10 años.',
          'Que lo que publicamos puede permanecer accesible indefinidamente, incluso si lo eliminamos.',
          'Que solo las empresas pueden conservar datos por tiempo indefinido.',
          'Que los datos permanecen solo en el servidor del país de origen.',
        ],
        correctIndex: 1,
      },
      {
        id: 4,
        question: '¿Qué es el "doxxing"?',
        options: [
          'Una técnica de programación web.',
          'La práctica de buscar y publicar información privada de una persona sin su consentimiento con intención de dañarla.',
          'Un tipo de archivo de documentos digitales.',
          'Una forma de verificar la identidad en línea.',
        ],
        correctIndex: 1,
      },
      {
        id: 5,
        question: '¿Por qué es importante gestionar la reputación digital?',
        options: [
          'No es importante; lo digital no tiene impacto en la vida real.',
          'Solo importa para personas famosas o políticos.',
          'Porque empleadores, docentes y otros pueden buscar información sobre nosotros y tomar decisiones basadas en nuestra presencia digital.',
          'Solo importa si usamos redes sociales más de 8 horas al día.',
        ],
        correctIndex: 2,
      },
      {
        id: 6,
        question: '¿Qué son los metadatos de una foto?',
        options: [
          'Los filtros aplicados a la imagen.',
          'El nombre del archivo.',
          'Información incrustada en el archivo como ubicación GPS, fecha, hora y dispositivo usado.',
          'La resolución de la imagen en píxeles.',
        ],
        correctIndex: 2,
      },
      {
        id: 7,
        question: '¿Qué reveló el caso Cambridge Analytica sobre los datos digitales?',
        options: [
          'Que Facebook es completamente seguro para compartir datos personales.',
          'Que los datos personales de millones de usuarios pueden ser usados sin consentimiento para influir en elecciones y comportamientos.',
          'Que las redes sociales no recopilan datos de sus usuarios.',
          'Que solo los datos de personas públicas tienen valor comercial.',
        ],
        correctIndex: 1,
      },
      {
        id: 8,
        question: '¿Qué es el "derecho al olvido" digital?',
        options: [
          'El derecho a eliminar todos los perfiles en redes sociales.',
          'El derecho a que se eliminen datos personales desactualizados o inapropiados de los resultados de búsqueda.',
          'El derecho a no ser fotografiado en espacios públicos.',
          'El derecho a olvidar las contraseñas sin consecuencias legales.',
        ],
        correctIndex: 1,
      },
      {
        id: 9,
        question: '¿Qué diferencia existe entre una contraseña segura y una insegura?',
        options: [
          'Las contraseñas seguras siempre tienen al menos 4 caracteres.',
          'Las contraseñas seguras son las que recordamos fácilmente.',
          'Las contraseñas seguras combinan letras, números y símbolos, tienen 12+ caracteres y son únicas para cada cuenta.',
          'No hay diferencia real; todas las contraseñas son igual de seguras.',
        ],
        correctIndex: 2,
      },
      {
        id: 10,
        question: '¿Cuál es la regla de oro para gestionar la identidad digital?',
        options: [
          'Publicar todo lo que te pase para tener muchos seguidores.',
          'No publicar nada en Internet nunca bajo ninguna circunstancia.',
          'Publicar solo contenido que no te importe que permanezca públicamente accesible de forma permanente.',
          'Usar siempre un nombre falso en todas las plataformas.',
        ],
        correctIndex: 2,
      },
    ],
  },
]
