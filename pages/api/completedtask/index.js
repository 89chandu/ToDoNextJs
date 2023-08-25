//This Is Backend Code
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://chandubopche:pZnxsAW0O3HUkQBb@cluster0.mbwmgkx.mongodb.net/ToDo?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("todolist");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Request successful" });
  } else if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://chandubopche:pZnxsAW0O3HUkQBb@cluster0.mbwmgkx.mongodb.net/ToDo?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("todolist");
      const result = await meetupsCollection.find().toArray();

      client.close();
      res.status(200).json(result);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Request failed" });
    }
  }  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
