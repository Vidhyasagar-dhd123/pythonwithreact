import json
from channels.generic.websocket import WebsocketConsumer

class GameConsumer(WebsocketConsumer):
    def connect(self,event):
        print("WebSocket connected: ")
        self.accept()
        self.send(text_data=json.dumps({
            'message': 'Connected successfully'
        }))

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        print("Received: ", data)
        self.send(text_data=json.dumps({'reply': 'Got it'}))

class AsyncGameConsumer(WebsocketConsumer):
    async def connect(self, event):
        print("WebSocket connected: ")
        await self.accept()
        await self.send(text_data=json.dumps({
            'message': 'Connected successfully'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        print("Received: ", data)
        await self.send(text_data=json.dumps({'reply': 'Got it'}))
