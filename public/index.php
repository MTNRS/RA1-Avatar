<?php
try {
    $datos = json_decode(file_get_contents(__DIR__ . '/historia.json'), true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($datos) || !$datos) { throw new RuntimeException('Historia vacía'); }
    foreach ($datos as $parrafo) {
        if (!is_array($parrafo) || !is_string($parrafo['texto'] ?? null) || trim($parrafo['texto']) === '') {
            throw new RuntimeException('Párrafo no válido');
        }
    }
    $jsonDatos = json_encode($datos, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    http_response_code(503);
    exit('No se puede cargar el relato de demostración.');
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jocarsa | avatar · RA1</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
<header><h1>jocarsa | avatar</h1><p>Un relato de bienvenida · Demostración con datos ficticios</p></header>
<main>
  <section id="escena" aria-label="Avatar y relato">
    <div id="avatar">
      <img id="avatarA" src="expresiones/neutral.png" alt="Avatar del relato" width="258" height="505">
      <img id="avatarB" src="expresiones/neutral.png" alt="" aria-hidden="true" width="258" height="505">
    </div>
    <div id="bocadillo">
      <p id="contador">Preparado</p>
      <p id="textoBocadillo">Pulsa Reproducir para comenzar.</p>
      <div id="barra" role="progressbar" aria-label="Progreso del relato" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="progreso"></div></div>
    </div>
  </section>
  <section class="controles" aria-label="Controles de lectura">
    <button id="reproducir" type="button">Reproducir</button>
    <button id="pausar" type="button" disabled>Pausar</button>
    <button id="reiniciar" type="button">Reiniciar</button>
    <label for="velocidad">Ritmo</label>
    <select id="velocidad"><option value="350">Lento</option><option value="230" selected>Normal</option><option value="100">Rápido</option></select>
  </section>
  <p id="mensaje" role="status">Preparado para reproducir.</p>
  <details><summary>Emoción de la escena</summary><div id="estado">Neutral</div></details>
  <noscript>Activa JavaScript para utilizar los controles del avatar.</noscript>
</main>
<footer>Adaptación académica · Integra Tech Consulting como caso ficticio</footer>
<script>const parrafos = <?= $jsonDatos ?>;</script>
<script src="avatar.js"></script>
<script src="reproductor.js"></script>
</body>
</html>
