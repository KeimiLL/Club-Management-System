"""File for security related functionalities."""


from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hasher:
    """Class responsible for hashing."""

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verifies a password against a hash.

        Args:
            plain_password (str): Plain password provided by the user.
            hashed_password (str): Hashed password.

        Returns:
            bool: True if the password matches the hash, False otherwise.
        """
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        """Returns the password hash.

        Args:
            password (str): Password provided by the user.

        Returns:
            str: Hashed password.
        """
        return pwd_context.hash(password)
