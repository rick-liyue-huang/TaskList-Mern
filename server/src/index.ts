
import express from 'express';

const app = express();
const PORT = process.env.PORT;



app.listen(PORT, () => {
	console.log(`the server is running on port of ${PORT}`);
})
