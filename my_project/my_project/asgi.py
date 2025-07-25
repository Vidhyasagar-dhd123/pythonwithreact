
import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter

from channels.auth import AuthMiddlewareStack

import home.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_project.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket': URLRouter(
        home.routing.websocket_urlpatterns
    ),
})


