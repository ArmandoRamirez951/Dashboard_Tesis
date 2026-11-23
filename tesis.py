"""Servidor local en Python para el Dashboard BI de Aranea Telecom."""

import functools
import http.server
import os
import socketserver
import webbrowser
from pathlib import Path

PORT = 8080
BASE_DIR = Path(__file__).resolve().parent
WEB_DIR = BASE_DIR / "dashboard_mockup"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """Manejador HTTP que sirve archivos estáticos desde dashboard_mockup."""

    def log_message(self, format: str, *args: object) -> None:
        print(f"[Aranea Server] {self.address_string()} - {format % args}")


def main() -> None:
    if not WEB_DIR.exists():
        print(f"❌ Error: No se encontró la carpeta '{WEB_DIR}'.")
        return

    handler = functools.partial(QuietHandler, directory=str(WEB_DIR))

    # Permite reutilizar el puerto inmediatamente al reiniciar
    socketserver.TCPServer.allow_reuse_address = True

    port = PORT
    while port < PORT + 10:
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
            break
        except OSError:
            port += 1
    else:
        print("❌ No se encontró un puerto disponible entre 8080 y 8089.")
        return

    url = f"http://127.0.0.1:{port}"
    print("=" * 55)
    print("  Aranea Telecom | Sistema BI & Dashboard Operativo")
    print("=" * 55)
    print(f"  Servidor activo en: {url}")
    print("  Credenciales de prueba -> Usuario: admin | Clave: 1234")
    print("  Presiona Ctrl + C para detener el servidor.")
    print("=" * 55)

    webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido correctamente.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
