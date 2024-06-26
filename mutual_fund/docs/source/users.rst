Users Endpoints
===============

.. automodule:: app.endpoints.users
    :members:
    :undoc-members:
    :show-inheritance:

.. code-block:: python

    from typing import Optional
    from fastapi import APIRouter, Depends, HTTPException, status
    from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
    from dotenv import load_dotenv
    from jose import JWTError, jwt
    from passlib.context import CryptContext
    from app.schemas import *
    import os
    from datetime import datetime, timedelta


    load_dotenv()

    # Load environment variables
    USER_EMAIL = os.getenv("USER_EMAIL")
    USER_PASSWORD = os.getenv("USER_PASSWORD")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    # Password hashing context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # OAuth2 scheme for token authentication
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    # API Router instance
    users = APIRouter()

    def verify_password(plain_password, hashed_password):
        """
        Verify if the plain password matches the hashed password using bcrypt.

        Args:
            plain_password (str): Plain text password.
            hashed_password (str): Hashed password.

        Returns:
            bool: True if the plain password matches the hashed password, False otherwise.
        """
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(password):
        """
        Hash the password using bcrypt.

        Args:
            password (str): Plain text password.

        Returns:
            str: Hashed password.
        """
        return pwd_context.hash(password)

    def authenticate_user(email: str, password: str):
        """
        Authenticate a user based on email and password.

        Args:
            email (str): User's email address.
            password (str): User's password.

        Returns:
            dict: Dictionary containing user information if authentication is successful, None otherwise.
        """
        if email == USER_EMAIL and verify_password(password, get_password_hash(USER_PASSWORD)):
            return {"email": email}
        return None

    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        """
        Create a JWT access token.

        Args:
            data (dict): Data to be encoded into the token.
            expires_delta (timedelta, optional): Expiry duration for the token. Defaults to 15 minutes.

        Returns:
            bytes: Encoded JWT token.
        """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @users.post("/token", response_model=Token)
    async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
        """
        Generate JWT access token for authentication.

        Args:
            form_data (OAuth2PasswordRequestForm): Form data containing username and password.

        Returns:
            dict: Dictionary containing access token and token type.

        Raises:
            HTTPException: If authentication fails due to incorrect username or password.
        """
        user = authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user["email"]}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    @users.get("/users/me")
    async def read_users_me(token: str = Depends(oauth2_scheme)):
        """
        Retrieve user information from JWT token.

        Args:
            token (str): JWT token for authentication.

        Returns:
            dict: Dictionary containing user email.

        Raises:
            HTTPException: If token validation fails or if email is missing from token.
        """
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
            token_data = TokenData(email=email)
        except JWTError:
            raise credentials_exception
        return {"email": token_data.email}
