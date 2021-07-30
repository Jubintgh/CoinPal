from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.VARCHAR(255), nullable=False)
    last_name = db.Column(db.VARCHAR(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.VARCHAR, nullable=False)
    created_at = db.Column(db.DateTime)

    user_cryptowallet = db.relationship("CryptoWallet", uselist=False, back_populates="user")

    user_friends = db.relationship(
        "User", 
        secondary="friends",
        primaryjoin=("Friend.from_user_id == User.id"),
        secondaryjoin=("Friend.to_user_id == User.id"),
        backref=db.backref("friends", lazy="dynamic"),
        lazy="dynamic"
    )

    user_transactions = db.relationship(
        "User", 
        secondary="transactions",
        primaryjoin=("Transaction.from_user_id == User.id"),
        secondaryjoin=("Transaction.to_user_id == User.id"),
        backref=db.backref("transactions", lazy="dynamic"),
        lazy="dynamic"
    )

    messages = db.relationship("Message", back_populates="user")
    
    # user_cryptowallets = db.relationship(
    #     "cryptowallets",  uselist=False,
    #     backref="user"
    # )

    # messages = db.relationship(
    #     "messages", uselist=False,
    #     backref="user"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }