import express, { type Request, type Response } from "express";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
