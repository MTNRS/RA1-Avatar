# Memoria — jocarsa | avatar

## Identificación

0489 · Programación multimedia y dispositivos móviles · RA1: aplicar tecnologías
de desarrollo móvil evaluando características y capacidades.

El enunciado facilitado contiene el título y los criterios a–h. La referencia
práctica encontrada es el avatar web del bloque «Análisis de motores de juegos /
Estudio de juegos existentes» de DAM2. La tarea relaciona ese ejemplo con el
análisis de tecnologías móviles: se modifica la aplicación existente para uso
web táctil y se documentan sus límites. No se presupone un requisito de APK.

## a) Limitaciones de los dispositivos móviles

| Limitación | Efecto en el avatar | Decisión aplicada y alcance |
| --- | --- | --- |
| Pantalla pequeña | Texto y avatar pueden solaparse | Disposición en una columna hasta 560 px, desplazamiento vertical permitido y prueba sin desbordamiento horizontal |
| Entrada táctil | Enlaces pequeños son difíciles de pulsar | Botones y selector de al menos 48 px de alto; pruebas con eventos táctiles |
| CPU y batería | Animación continua y temporizadores consumen recursos | Inicio manual y un único temporizador cancelable; pausa al ocultar la página |
| Memoria | Muchas imágenes decodificadas ocupan más que sus PNG comprimidos | Precarga de las siete expresiones usadas en el relato en vez de las doce del original |
| Red variable | Carga inicial lenta o imposible | Recursos servidos localmente y relato fijo; prueba sin conexión solo después de precargar |
| Preferencias de accesibilidad | Mezclas visuales pueden resultar molestas | `prefers-reduced-motion` evita mezclar dos expresiones |
| Suspensión/cierre del navegador | Los temporizadores se ralentizan o la página se descarta | La ocultación pausa; tras una recarga se vuelve al principio, sin persistencia del avance |

La prueba no mide consumo eléctrico, RAM real ni rendimiento de una CPU ARM.
La carga de imágenes comprimidas tampoco equivale al uso de memoria decodificada.
Los navegadores pueden limitar temporizadores en segundo plano, según la
[documentación de Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

## b) Tecnologías de desarrollo móvil

| Enfoque | Tecnologías / entorno | Ventajas | Limitaciones |
| --- | --- | --- | --- |
| Android nativo | Kotlin/Java, Android SDK y Android Studio | Componentes y APIs de plataforma | Versión y distribución específicas de Android |
| Apple nativo | Swift, SwiftUI y Xcode | Integración con las plataformas Apple | Herramientas y plataforma de compilación propias |
| Multiplataforma | Dart/Flutter | Base de código compartida y widgets | Dependencias y requisitos de cada plataforma |
| Híbrido | HTML/CSS/JS con Capacitor | Reutiliza web y permite puentes a funciones nativas | Requiere empaquetado y pruebas de los complementos |
| Web móvil | HTML/CSS/JS en navegador; PHP en el servidor | Acceso por URL y adaptación del ejemplo de clase | Depende de las APIs y políticas del navegador; no es automáticamente instalable |

Fuentes oficiales consultadas el 21/09/2026:
[Android](https://developer.android.com/guide/components/fundamentals),
[SwiftUI](https://developer.apple.com/swiftui/),
[Flutter](https://flutter.dev/development/mobile),
[Capacitor](https://capacitorjs.com/docs).

Se escoge web móvil porque el avatar existente ya utiliza PHP y JavaScript.
PHP se ejecuta en el servidor del laboratorio, no dentro del teléfono. No se
instalan frameworks nativos que el ejemplo no requiere.

## c) Entorno instalado, configurado y utilizado

Se utiliza el Linux disponible, PHP 8.4.20 para servir `public/`, Python 3.13 para
las pruebas y Chromium 147.0.7727.101. PHP, Python y Chromium ya estaban instalados.
Se crea un entorno `.venv` y se instala Playwright 1.63.0 con su controlador,
porque la copia del sistema fallaba al iniciar. No se atribuye como realizada
la instalación de herramientas que ya existían.

Configuración: servidor enlazado a `127.0.0.1`, raíz pública separada, navegador
sin interfaz para pruebas y perfiles táctiles explícitos. El script levanta y
cierra su servidor; el README permite repetir la instalación de dependencias y
el uso interactivo. El entorno de pruebas se ha instalado y utilizado realmente.

## d) Configuraciones de dispositivos

La clasificación combina pantalla, densidad, entrada, capacidad de proceso,
memoria, conectividad y sistema operativo. Las siguientes son configuraciones
web de prueba, no mediciones de teléfonos concretos:

| Configuración | Viewport CSS | DPR | Entrada | Objetivo |
| --- | --- | --- | --- | --- |
| Móvil compacto | 360 × 640 | 2 | Táctil | Texto legible, controles y columna única |
| Móvil amplio | 412 × 915 | 2.625 | Táctil | Aprovechamiento del espacio vertical |
| Tableta | 768 × 1024 | 2 | Táctil | Avatar y texto en columnas |
| Móvil horizontal | 740 × 360 | 2 | Táctil | Poca altura disponible y posibilidad de desplazamiento |

DPR es la relación entre píxeles de dispositivo y píxeles CSS. No indica RAM ni
potencia. Los perfiles utilizan Chromium de escritorio con emulación móvil; no
se les atribuye un modelo de CPU, RAM física o versión real de Android.

## e) Perfiles y relación dispositivo-aplicación

Perfil mínimo funcional: navegador con JavaScript moderno, DOM, temporizadores,
JSON, CSS Grid, eventos de visibilidad y soporte PNG. Se necesita conexión al
servidor para la carga inicial; no requiere GPS, cámara, micrófono ni cuenta.

Perfil de pantalla pequeña: se apilan avatar y bocadillo. Perfil de mayor ancho:
se distribuyen en columnas. Perfil de movimiento reducido: se muestra una sola
expresión sin mezcla. Perfil de uso interrumpido: pausa y reanudación manual.
La selección se hace por capacidades y media queries, no por nombres comerciales.

En la terminología clásica de Java ME, una **configuración** como CLDC establece
una base de ejecución/APIs para una categoría de dispositivos; un **perfil**
como MIDP aporta capacidades de aplicación sobre esa base. Se reconoce esa
clasificación del temario, pero este avatar no es un MIDlet ni utiliza CLDC/MIDP.
Referencia: [documentación Java ME de Oracle](https://docs.oracle.com/javame/mobile/mobile.html)
y [perfil MIDP](https://www.oracle.com/a/tech/docs/java/midp-ds.pdf).

## f) Análisis de la aplicación existente y sus clases

La versión `007-bocadillos.php` combina tres partes en un fichero: PHP solicita
una historia y un análisis emocional a Ollama, HTML/CSS dibuja la escena y
JavaScript muestra palabras y mezcla dos imágenes. Los datos se pasan a JS
mediante JSON. El ejemplo usa funciones, no una jerarquía propia de clases.

| Tipo / interfaz del original | Uso |
| --- | --- |
| `Image` / `HTMLImageElement` | Precargar y mostrar las expresiones PNG |
| `Promise` | Implementar la espera asíncrona con `setTimeout` |
| `Document`, `HTMLElement` y nodos del DOM | Crear palabras, actualizar texto, opacidad y progreso |
| `Array` y objetos JavaScript | Guardar párrafos y sus atributos |

Las clases CSS como `.palabra` no son clases de programación. Tampoco se inventan
clases `Activity` o `MIDlet` que no existen en este código.

En la adaptación se separan PHP, CSS y JS. Se añade `ReproductorAvatar` para
encapsular índices, estado y temporizador. Se conservan funciones del original:
`normalizarEmocion`, `imagenEmocion`, `mezclarEmociones` y `actualizarAvatar`.
La espera con promesas se reemplaza por un temporizador que puede cancelarse.

## g) Modificaciones realizadas

| Antes | Después | Motivo |
| --- | --- | --- |
| Backend dependiente de Ollama | Historia local con emociones preasignadas | Prueba reproducible sin servicio privado |
| Inicio automático y velocidad fija | Reproducir, pausar, continuar, reiniciar y selector de ritmo | Control táctil y ritmo de lectura |
| Escena posicionada con altura fija y overflow oculto | Grid adaptable y desplazamiento vertical | Evitar recortes de contenido en móviles |
| Precarga de doce expresiones | Precarga de las siete usadas por la historia | Reducir recursos iniciales |
| Bucle de esperas asíncronas | Clase con un único temporizador cancelable | Evitar lecturas concurrentes y permitir pausa |
| Sin tratamiento de ocultación | `visibilitychange` y `pagehide` | Detener el avance cuando la página deja de estar activa |
| Mezcla visual constante | Respeto de movimiento reducido | Adaptación a la preferencia del usuario |

La generación automática del relato se sustituye deliberadamente por una muestra;
no se afirma que la adaptación mantenga una función de IA activa. La procedencia
y la secuencia de commits permiten distinguir original y modificaciones.

## h) Comprobación mediante emulación

Se utiliza emulación **de navegador móvil** con Playwright y Chromium: viewport,
DPR, pantalla táctil y preferencia de movimiento. Las cuatro configuraciones
pasan pruebas de reproducción, pausa, continuación, reinicio, finalización,
progreso, imágenes cargadas y ausencia de desbordamiento horizontal y errores JS.

Se prueba además la reacción a `visibilitychange` mediante un evento sintético,
no una suspensión real de Android, y reproducción sin conexión después de haber
cargado los recursos. Se guarda una captura del perfil compacto.

[Playwright](https://playwright.dev/python/docs/emulation) documenta las opciones
usadas. [Chrome](https://developer.chrome.com/docs/devtools/device-mode) explica
que esta simulación es una aproximación: no reproduce el hardware ni todas las
condiciones de un móvil. No se ha ejecutado un AVD Android, un simulador iOS ni
un dispositivo físico. Si el profesor exige emulación del sistema operativo,
ese alcance adicional del criterio h queda pendiente; no se presenta como probado.

## Relación con Integra Tech Consulting

Demostración ficticia de bienvenida que podría inspirar una ayuda visual.
Permanece como prototipo académico; no se ha integrado en una web empresarial ni
se han usado datos de clientes. La integración futura requeriría una revisión
independiente del producto y de los derechos de sus recursos gráficos.
