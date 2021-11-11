---
title: "Basic MongoDB Entity Lifecycle Examples With PyMongo"
tags: [python, programming, mongo]
date: "2021-10-27"
excerpt: "Interacting with a Mongo database with Python."
---

This is a rough, snippet example of lifecycles of various elements of a Mongo database (i.e. 'CRUD' operations on databases, collections, and documents). These tests are running against a container running mongodb. 

A better test implementation might make use of fixtures or generator functions so that database connections and cleanup is shared across tests.

**Requirements**

- PyMongo
- PyTest

**Resources**
- [PyMongo Docs](https://pymongo.readthedocs.io/en/stable/api/pymongo/index.html)

```python
from pymongo import MongoClient

url = "http://localhost:7080"
host = "localhost"
port = 7080


def test_connection():
    client = MongoClient(host='localhost', port=7080, connect=True)
    assert len(client.list_database_names()) > 0


def test_database_lifecycle():
    database_name = "test_database"
    client = MongoClient(host=host, port=port)

    # assert database does not exist
    assert database_name not in client.list_database_names()

    # create database
    # mongo creates databases if they don't exists
    # when making a transaction, such as collection
    # creation
    db = client.get_database(database_name)
    db.create_collection("test_collection")

    # assert database exists
    assert database_name in client.list_database_names()

    # drop database
    client.drop_database(database_name)

    # assert database does not exist
    assert database_name not in client.list_database_names()


def test_collection_lifecycle():
    database_name = "test_database"
    collection_name = "test_collection"

    client = MongoClient(host=host, port=port)
    db = client.get_database(database_name)

    assert collection_name not in db.list_collection_names()

    db.create_collection(collection_name)

    assert collection_name in db.list_collection_names()

    db.drop_collection(collection_name)
    # alternatively, collection.drop()

    assert collection_name not in db.list_collection_names()
    client.drop_database(database_name)


def test_document_lifecycle():

    database_name = "test_database"
    collection_name = "test_collection"
    document = {
        "name": "test_document",
        "value_1": True,
        "value_2": 1
    }

    document_update = {"$set": {"name": "new name"}}
    document_updated = {
        "name": "new name",
        "value_1": True,
        "value_2": 1
    }

    client = MongoClient(host=host, port=port)
    db = client.get_database(database_name)
    collection = db.create_collection(collection_name)

    # create
    result = collection.insert_one(document=document)
    assert result.acknowledged
    assert result.inserted_id != None

    # read
    rf = collection.find_one(filter=document)

    assert rf["name"] == document["name"]
    assert rf["value_1"] == document["value_1"]
    assert rf["value_2"] == document["value_2"]

    # update
    new_doc = collection.update_one(document, document_update)

    assert collection.find_one(filter=document_updated)["name"] == document_updated["name"]

    # delete
    collection.delete_one(document_updated)

    result = collection.find_one(filter=document_updated)
    assert result == None

    client.drop_database(database_name)
```