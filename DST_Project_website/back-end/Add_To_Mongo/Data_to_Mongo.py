import pandas as pd
from pymongo import MongoClient


def db_connection():
    try:
        client = MongoClient("mongodb+srv://faresmohamedwork:faresmohamedwork6872@cluster0.gzkts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        db = client["test"]
        print("Database connected successfully!")
        return db
    except Exception as e:
        print("DATABASE NOT CONNECTED!")
        print(e)
        return None


def read_excel_to_json(file_path):
    try:
        df = pd.read_csv(file_path)
        print("Data read successfully from file!")
        data_json = df.to_dict(orient="records")
        
        for record in data_json:
            record["count"] = 2000
        
        print("Preview of the data to be inserted:")
        for i, record in enumerate(data_json[:10]):
            print(f"{i + 1}: {record}")
        return data_json
    except Exception as e:
        print("Error reading file:")
        print(e)
        return None


def insert_data_to_mongodb(db, collection_name, data):
    try:
        if not data:
            print("No data to insert!")
            return
        collection = db[collection_name]
        result = collection.insert_many(data)
        print(f"Data inserted successfully! Inserted {len(result.inserted_ids)} records.")
    except Exception as e:
        print("Data insertion failed!")
        print(e)


if __name__ == "__main__":
    db = db_connection()
    if db is not None:
        file_path = "Clean_Books.csv"
        data_json = read_excel_to_json(file_path)
        if data_json:
            insert_data_to_mongodb(db, "books", data_json)
