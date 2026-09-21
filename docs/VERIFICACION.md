# Verificación real — 21/09/2026

## `php -l public/index.php`

```text
No syntax errors detected in public/index.php
Código de salida: 0
```

## `node --check public/avatar.js`

```text
Código de salida: 0
```

## `node --check public/reproductor.js`

```text
Código de salida: 0
```

## `.venv/bin/python scripts/probar_movil.py`

```text
Playwright: 1.63.0 ; Chromium: 147.0.7727.101
OK: movil-compacto — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: movil-amplio — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: tableta — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: horizontal — sin desbordamiento; controles táctiles, pausa, reinicio y finalización
OK: evento visibilitychange sintético, movimiento reducido y reproducción sin red tras precarga
Código de salida: 0
```

Las pruebas emulan el navegador móvil, no un sistema operativo Android/iOS.
El evento de visibilidad es sintético. La prueba sin red parte de recursos
ya cargados y no acredita una primera carga sin conexión.

Captura del perfil compacto: [movil.png](capturas/movil.png).
