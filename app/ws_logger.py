
class WebSocketLogger:
    def __init__(self, socketio, sid_client):
        self.socketio = socketio
        self.sid_client = sid_client

    def emit_info(self, msg):
        self.socketio.emit("log_info", msg, to=self.sid_client)

    def emit_warning(self, msg):
        self.socketio.emit("log_warning", msg, to=self.sid_client)

    def emit_error(self, msg):
        self.socketio.emit("log_error", msg, to=self.sid_client)

    def emit_success(self, msg):
        self.socketio.emit("log_success", msg, to=self.sid_client)
