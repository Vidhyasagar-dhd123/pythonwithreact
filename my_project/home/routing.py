from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/game/', consumers.GameConsumer.as_asgi()),
    path('ws/async_game/', consumers.AsyncGameConsumer.as_asgi()),
]