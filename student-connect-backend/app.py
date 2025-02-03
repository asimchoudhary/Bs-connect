from flask import jsonify, request , Flask, session
from flask_sqlalchemy import SQLAlchemy
import random
from dotenv import load_dotenv
import os
from sqlalchemy import desc
from flask_cors import CORS, cross_origin
import requests
from pymongo import MongoClient
import base64
from azure.storage.blob import BlobServiceClient, ContentSettings, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
from PIL import Image
from io import BytesIO
from bson.objectid import ObjectId
 
load_dotenv()
api_key = os.getenv('MAILGUN_API_KEY')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///student-connect.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)
#----------------------------------------
#MongoDB initialization
client2 = MongoClient(os.getenv('MONGODB_URI'))
db2 = client2.Users
userinfo_collection = db2.UserInfo
#----------------------------------------
class OTP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    otp = db.Column(db.String(6), nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
   
    email=db.Column(db.String(100), nullable=False)
    password=db.Column(db.String(100), nullable=False)
    mongodbId = db.Column(db.String(100), nullable=False)
    
#---------------------------------------------------
class Messages(db.Model):
    message_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), nullable=False)

class  Friends(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), nullable=False)
def index():
    return jsonify({'message': 'Hello, Flask!'})


def send_email(email, otp):
    return requests.post(
        "mail_gun_domain",
        auth=("api", api_key),
        data={"from": "_sender_email",
              "to": email,
              "subject": "Your OTP",
              "text": f"Your OTP is {otp}"})
#-----------------------------------------------------------------------------
@app.route('/login', methods=["GET", 'POST'])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    first_row=db.session.query(User).filter_by(email=email).first()
    
    if (first_row):
        if (first_row.password==password):
            return jsonify({'id': first_row.id, 'mongodbId': first_row.mongodbId}),   200
        else:
            return jsonify("not verified") , 400
    else:
        return jsonify("User not found") , 401
#----------------------------------------------------------
@app.route('/register', methods=["GET", 'POST'])
def register():
    data = request.get_json()
    
    email = data["email"]
    password = data["password"]
    first_row=db.session.query(User).filter_by(email=email).first()
    if (first_row):
        return jsonify("already registered") , 400
    
    # Generate an OTP
    otp = str(random.randint(100000, 999999))
    print(otp)
    
    new_otp = OTP(email=email, otp=otp)
    db.session.add(new_otp)
    db.session.commit()
  
    response = send_email(email, otp)
    #-----------------------------------
    if response.status_code == 200:
        print('Email sent successfully')
    else:
        print('Error sending email:', response.text)
    
    return jsonify("its working")
#-----------------------------------------------------

@app.route('/otp_verification', methods=['POST'])
def verify():
    data = request.get_json()
    otp = data["otp"]
    email=data["userEmail"]
    password = data["password"]
    if email is None or otp is None:
        email="_test_reciever_email"
    print(otp)
    print(email)
    first_row=db.session.query(OTP).filter_by(email=email).order_by(desc(OTP.id)).first()
    if (first_row.otp==otp):
        
        return jsonify("verified") , 200
    else:
        return jsonify("not verified") , 400    

#-----------------------------------------------------
@app.route('/pair', methods=['POST'])
def pair():
    users_array = []
    data = request.get_json()
    subject= data["subject"]
    email = data["email"]
    users = userinfo_collection.find({"courses": subject})
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        
        if user["email"] != email:    
            users_array.append(user)
    
    return jsonify(users_array) , 200
    
#---------------------------------------------------- 


@app.route("/profileSetUp" , methods = ["POST"])
@cross_origin() 
def profileSetUp():
    
    data = request.get_json()
    password = data["password"]
    name = data["name"]
    image = data["image"]
    gender = data["gender"]
    state = data["state"]
    city = data["city"]
    email = data["email"]
    courses = data["courses"]
    bio = data["bio"]
    document = {
    "name": name,
    "gender": gender,
    "state": state,
    "city": city,
    "email": email,
    "courses": courses,
    "bio": bio
    }
    if  "instagram" in data.keys():
        document["instagram"] = data["instagram"]
    if "linkedin" in data.keys():
        document["linkedin"] = data["linkedin"]
    if "twitter" in data.keys():
        document["twitter"] = data["twitter"]
    if "github" in data.keys():
        document["github"] = data["github"]
    

   
    
    image_data = image.split(',')[1]

# Decode the base64-encoded image data
    binary_image_data = base64.b64decode(image_data)

    # Create an Image object from the binary data
    image = Image.open(BytesIO(binary_image_data))

    # Specify the directory where you want to save the image
    
    blob_service_client = BlobServiceClient.from_connection_string(os.getenv('AZURE_STORAGE_CONNECTION_STRING'))
    container_client = blob_service_client.get_container_client(os.getenv("AZURE_CONTAINER_NAME"))

    # Upload image to Azure Blob Storage
    blob_name = f"{name}{city}.jpg"
    blob_client = container_client.get_blob_client(blob_name)
    blob_client.upload_blob(binary_image_data, overwrite=True)
    account_name=os.getenv('AZURE_STORAGE_ACCOUNT_NAME')
    container_name=os.getenv('AZURE_CONTAINER_NAME')
    # Generate SAS token for the uploaded blob
    sas_token = generate_blob_sas(
        account_name=os.getenv('AZURE_STORAGE_ACCOUNT_NAME'),
        container_name=os.getenv('AZURE_CONTAINER_NAME'),
        blob_name=blob_name,
        account_key=os.getenv('AZURE_STORAGE_ACCOUNT_KEY'),
        permission=BlobSasPermissions(read=True),
        expiry=datetime.utcnow() + timedelta(days=365*10)  # Set the expiration time for the token
    )

    # Full URL with SAS token to fetch the image later
    image_url_with_sas = f"https://{account_name}.blob.core.windows.net/{container_name}/{blob_name}?{sas_token}"

    document["image"] = image_url_with_sas
    
    


    
    
    
    
    
    def insertUserInMongoDB(userinfo):
        
        result = userinfo_collection.insert_one(userinfo)
        return result
    
    try:
        result = insertUserInMongoDB(document)
        document_id = result.inserted_id
        document_id = str(document_id)
        new_user=User(email=email,password=password , mongodbId = document_id)
        db.session.add(new_user)    
        db.session.commit()
    
        
        return jsonify("its working"), 200
    
    except Exception as e:
        print(e)
        return jsonify("not verified") , 400


#-----------------------------------------------------
# getSubjects route 
@app.route("/getSubjects" , methods = ["POST"])
@cross_origin()
def getSubjects():
    data = request.get_json()
    email = data["email"]
    user = userinfo_collection.find_one({"email": email})
    
    if user:
        return jsonify(user["courses"]), 200
    else:
        return jsonify("not found") , 400

#-----------------------------------------------------   
# getUserDetails route
@app.route("/getUserDetails" , methods = ["POST"])
@cross_origin()
def getUserDetails():
    
    try:
        data = request.get_json()
        userId = data["userId"]   
        user = userinfo_collection.find_one({"_id": ObjectId(userId)})
        print(user)
        user['_id'] = str(user['_id'])
    except Exception as e:
        print(e)        
    if user:
        return jsonify(user), 200
    else:
        return jsonify("not found") , 400
#----------------------------------------------------- 
@app.route("/sendFirstMessage" , methods = ["POST"])
@cross_origin()
def sendMessage():
    data = request.get_json()
    
    sender_id = db.session.query(User).filter_by(email=data["senderEmail"]).first().id
    receiver_id = db.session.query(User).filter_by(email=data["receiverEmail"]).first().id
    sender_friends = db.session.query(Friends).filter_by(user_id=sender_id).all()
    if receiver_id not in sender_friends:
        new_friend = Friends(user_id=sender_id, friend_id=receiver_id)
        new_friend2 = Friends(user_id=receiver_id, friend_id=sender_id) 
        db.session.add(new_friend)
        db.session.add(new_friend2)
        db.session.commit()
    
    
        
    content = data["message"]
    
    message = Messages(sender_id=sender_id, receiver_id=receiver_id, content=content)
    db.session.add(message)
    db.session.commit()
    return jsonify("its working"), 200

if __name__ == '__main__':
        #--------------------
    
    with app.app_context():
        db.create_all()
    app.run()

