import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    app.get("/filteredimage/", async (req: express.Request, res: express.Response) => {
        let image_url: string = req.query.image_url;
        if (image_url) {
            filterImageFromURL(image_url).then((response) => {
                res.sendFile(response);
                res.on('finish', function () {
                    deleteLocalFiles([response]);
                });
            });
        } else {
            res.status(404).send("Please send the correct image_url");
        }
    });

    /**************************************************************************** */

    //! END @TODO1

    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", async (req, res) => {
        res.send("try GET /filteredimage?image_url={{}}")
    });


    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();