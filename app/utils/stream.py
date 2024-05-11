import stream

API_KEY = "utebv5aw3xtw"
SECRET_KEY = "bapej3qukp85my6nyc88eym6sk55vgr2avgrugs6rakkj4hvdwmwutx44gwkg2fm"


class Stream:

    @staticmethod
    def gen_stream_token(user_id: int):
        client = stream.connect(API_KEY, SECRET_KEY, location='us-east')
        user_token = client.create_user_token(str(user_id))
        return user_token
