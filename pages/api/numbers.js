import New from "../../models/New";
import connectDB from "../../src/lib/connectDB";

export default async function handler(req, res) {
    await connectDB();

    try {
        const { phone } = req.body; // Extract phone number from request body

        // Create a new instance of the New model with the phone number
        const newOrder = new New({
            phone: {
                value: phone,
                verified: false, // Assuming verification is not done during creation
                frozen: false,
            }
        });

        // Save the new instance to the database
        await newOrder.save();
        
        console.log("Data saved to MongoDB");
        res.status(200).json({ done: true });
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        res.status(500).json({ done: false, error: "Internal Server Error" });
    }
}
