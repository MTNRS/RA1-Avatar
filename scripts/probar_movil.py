"""Pruebas de emulación web móvil. No ejecutan Android ni iOS."""
from pathlib import Path
from importlib.metadata import version
import json
import shutil
import socket
import subprocess
import tempfile
import time
import urllib.request
from playwright.sync_api import sync_playwright

raiz = Path(__file__).resolve().parent.parent
with socket.socket() as conexion:
    conexion.bind(('127.0.0.1', 0))
    puerto = conexion.getsockname()[1]
url = f'http://127.0.0.1:{puerto}'
perfiles = [
    ('movil-compacto', 360, 640, 2),
    ('movil-amplio', 412, 915, 2.625),
    ('tableta', 768, 1024, 2),
    ('horizontal', 740, 360, 2),
]
resultados = []
with tempfile.TemporaryFile() as log:
    servidor = subprocess.Popen(['php', '-S', f'127.0.0.1:{puerto}', '-t', str(raiz / 'public')], stdout=log, stderr=log)
    try:
        for _ in range(50):
            try:
                urllib.request.urlopen(url, timeout=1).close()
                break
            except OSError:
                time.sleep(.1)
        else:
            raise RuntimeError('No se ha iniciado PHP')
        with sync_playwright() as playwright:
            navegador = playwright.chromium.launch(executable_path=shutil.which('chromium'), headless=True)
            print('Playwright:', version('playwright'), '; Chromium:', navegador.version)
            for nombre, ancho, alto, densidad in perfiles:
                contexto = navegador.new_context(viewport={'width': ancho, 'height': alto}, device_scale_factor=densidad, is_mobile=True, has_touch=True, locale='es-ES')
                pagina = contexto.new_page()
                errores = []
                pagina.on('pageerror', lambda error: errores.append(str(error)))
                pagina.clock.install()
                pagina.goto(url, wait_until='networkidle')
                assert pagina.evaluate('navigator.maxTouchPoints') > 0
                assert pagina.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
                for selector in ('#reproducir', '#pausar', '#reiniciar', '#velocidad'):
                    assert pagina.locator(selector).bounding_box()['height'] >= 48
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(1000)
                assert pagina.evaluate('reproductor.leidas') > 1
                pagina.locator('#pausar').tap()
                leidas = pagina.evaluate('reproductor.leidas')
                pagina.clock.run_for(1000)
                assert pagina.evaluate('reproductor.leidas') == leidas
                assert pagina.evaluate('reproductor.temporizador') is None
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(300)
                assert pagina.evaluate('reproductor.leidas') > leidas
                pagina.locator('#reiniciar').tap()
                assert pagina.evaluate('reproductor.leidas') == 0
                pagina.locator('#velocidad').select_option('100')
                pagina.locator('#reproducir').tap()
                pagina.clock.run_for(25000)
                assert pagina.locator('#contador').inner_text() == 'Historia finalizada'
                assert pagina.locator('#barra').get_attribute('aria-valuenow') == '100'
                assert pagina.evaluate('normalizarEmocion("desconocida")') == 'neutral'
                assert pagina.locator('#avatarA').evaluate('(img) => img.complete && img.naturalWidth > 0')
                assert not errores, errores
                if nombre == 'movil-compacto':
                    pagina.locator('#reiniciar').tap()
                    pagina.locator('#reproducir').tap()
                    pagina.clock.run_for(1500)
                    pagina.locator('#pausar').tap()
                    (raiz / 'docs/capturas').mkdir(exist_ok=True)
                    pagina.screenshot(path=str(raiz / 'docs/capturas/movil.png'), full_page=True)
                    # Evento sintético: prueba de la reacción del código, no del SO móvil.
                    pagina.locator('#reproducir').tap()
                    pagina.evaluate("Object.defineProperty(document, 'hidden', {configurable:true, get: () => true}); document.dispatchEvent(new Event('visibilitychange'))")
                    assert pagina.evaluate('reproductor.estado') == 'pausado'
                    assert pagina.evaluate('reproductor.temporizador') is None
                    pagina.emulate_media(reduced_motion='reduce')
                    pagina.evaluate("mezclarEmociones('alegria', 'calma', 0.7)")
                    assert pagina.locator('#avatarB').evaluate('(img) => img.style.opacity') == '0'
                    # Una vez cargados todos los recursos usados, el relato puede continuar sin red.
                    contexto.set_offline(True)
                    pagina.locator('#reiniciar').tap()
                    pagina.locator('#reproducir').tap()
                    pagina.clock.run_for(25000)
                    assert pagina.locator('#contador').inner_text() == 'Historia finalizada'
                    assert not errores, errores
                resultados.append({'perfil': nombre, 'viewport': f'{ancho}x{alto}', 'DPR': densidad, 'resultado': 'OK'})
                print('OK:', nombre, '— sin desbordamiento; controles táctiles, pausa, reinicio y finalización')
                contexto.close()
            navegador.close()
        print('OK: evento visibilitychange sintético, movimiento reducido y reproducción sin red tras precarga')
        (raiz / 'docs/resultados.json').write_text(json.dumps(resultados, ensure_ascii=False, indent=2) + '\n')
    finally:
        servidor.terminate()
        servidor.wait(timeout=5)
