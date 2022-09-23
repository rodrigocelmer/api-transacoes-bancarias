import { Express } from "express";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

}