import json
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer

class Queue:
    def __init__(self):
        self.queue = {}

    def enqueue(self, data):
        if isinstance(data, dict):
            self.queue[data["room_name"]] = data
            return True
        return False

    def getRoom(self,data):
        if data["room_name"] in self.queue and not self.isEmpty():
            return self.queue.pop(data["room_name"])
        return {}

    def dequeue(self):
        if not self.isEmpty():
            return self.queue.pop(0)
        return {}

    def isEmpty(self):
        return len(self.queue) == 0

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self.username = ""

    async def connect(self):
        print("WebSocket connection established")
        self.rooms = Queue() 
        self.room_group_name = None
        await self.accept()

    async def disconnect(self, close_code):
        print("WebSocket connection closed")
        if self.channel_layer and self.room_group_name:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        print('join')
        if data.get('type')=='join.message':
            await self.join_message(data)
        else:   
            await self.send(text_data=
                json.dumps(
                    {
                        'message':'hello'
                    }
                )
            )

    async def join_message(self,data):
        self.room_name = 'My_room'
        self.room_group_name = f"game_{self.room_name}"
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        self.username=data.get('name')
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'game_message',
                'message':f'hello {self.username}'
            }
        )
        
    async def game_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))

    


