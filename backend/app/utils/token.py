from datetime import datetime, timedelta
import jwt

JWT_SECRET = 'OHitWNaV6m'
ACCESS_TOKEN_EXPIRE = datetime.utcnow() + timedelta(minutes=15)
REFRESH_TOKEN_EXPIRE = datetime.utcnow() + timedelta(days=15)


class JWToken:

    @staticmethod
    def create_access_token(id: int):
        access_token = jwt.encode(
            {
                'user_id': id,
                'exp': ACCESS_TOKEN_EXPIRE
            },
            JWT_SECRET,
            algorithm='HS256'
        )
        return access_token

    @staticmethod
    def create_refresh_token(id: int):
        refresh_token = jwt.encode(
            {
                'user_id': id,
                'exp': REFRESH_TOKEN_EXPIRE
            },
            JWT_SECRET,
            algorithm='HS256'
        )
        return refresh_token

    @staticmethod
    def verify_token(token: str):
        try:
            claim = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            return claim['user_id']
        except jwt.ExpiredSignatureError or jwt.InvalidTokenError:
            return None
