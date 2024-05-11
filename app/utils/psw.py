import bcrypt


class PSW:

    @staticmethod
    def hash_password(password):
        salt = bcrypt.gensalt(rounds=10)

        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))