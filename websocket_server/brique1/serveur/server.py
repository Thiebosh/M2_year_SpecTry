import select
import socket
from room_manager import RoomManager

class Server():
    def __init__(self) -> None:
        self.init_server()
        self.inputs = []
        self.polling_freq = 0.5
        self.room_m = RoomManager()

    def init_server(self, ip = "localhost", port=20002, backlog=5):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setblocking(False)

        self.socket.bind((ip, port))
        self.socket.listen(backlog)

    def read(self):
        readable, _, exception = select.select(self.inputs, [], self.inputs, self.polling_freq)
        return readable, exception
            
    def close(self):
        print("Get close signal")
        for socket in self.inputs:
            socket.close()
        for room in self.room_m.rooms.values():
            room.close_evt.set()

    def add_connection(self, socket):
        new_socket, client_address = socket.accept()
        print(f"SERVER - New connexion {client_address}")
        new_socket.setblocking(False)  # as for server
        self.inputs.append(new_socket)  # new input socket
    
    def close_client_connection(self, socket):
        print(f"Close client")
        self.inputs.remove(socket)
        socket.close()

    def run(self, buff_size=1024, encoding="utf-8"):    
        self.inputs.append(self.socket) # Contient tous les sockets (serveur + toutes les rooms)

        while self.inputs:
            try:
                readable, exception = self.read()
            except KeyboardInterrupt:
                self.close()
                break
            
            # handle inputs
            for socket in readable:
                if socket is self.socket: # S'il y a une connexion, c'est le serveur qui va envoyer un message d'où le check
                   self.add_connection(socket)
                    # new_socket.send("which project ?".encode(encoding)) # tmp, dégagera quand protocole uniformisé
                   continue

                b_msg = socket.recv(buff_size)

                if not b_msg:
                    self.close_client_connection(socket)
                    continue

                target = b_msg.decode(encoding)

                if not target in self.room_m.rooms:
                    self.room_m.create_room(target, socket)

                else:
                    self.room_m.add_message(target, socket)

                self.inputs.remove(socket)

            # handle except
            for socket in exception:
                self.inputs.remove(socket)
                socket.close()

            self.room_m.rooms = {key: values for key, values in self.room_m.rooms.items() if not values.get_param()["close_evt"].is_set()}

    


if __name__ == "__main__":
    print("Starting server...")
    
    server = Server()

    print("Server ready")

    server.run()

    print("Closing server...")
