import express from 'express';
import React from 'react';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import { renderToString } from 'react-dom/server';

import map from '@tinkoff/utils/array/map';

import adminAuthenticationApi from './api/admin/authentication';
import adminLawApi from './api/admin/law';
import adminNewsCategoryApi from './api/admin/newsCategory';
import adminNewsApi from './api/admin/news';
import adminPartnersApi from './api/admin/partners';

import clientNewsCategoryApi from './api/client/newsCategory';
import clientLawApi from './api/client/law';
import clientNewsApi from './api/client/news';
import clientPartnersApi from './api/client/partners';

import { DATABASE_URL } from './constants/constants';
import actions from './actions';
import getStore from '../src/apps/client/store/getStore';
import renderAppPage from '../src/apps/client/html';
import renderAdminPage from '../src/apps/admin/html';

import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import App from '../src/apps/client/App.jsx';

const rootPath = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;
const app = express();

// mongodb
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

// static
app.get(/\.chunk\.(js|css)$/, expressStaticGzip(rootPath, {
    enableBrotli: true,
    orderPreference: ['br']
}));
app.use(compression());
app.use(express.static(rootPath));

// helpers
app.use(bodyParser.json());
app.use(cookieParser());

// api
app.use('/api/admin/authentication', adminAuthenticationApi);
app.use('/api/admin/law', adminLawApi);
app.use('/api/admin/news', adminNewsApi);
app.use('/api/admin/partners', adminPartnersApi);
app.use('/api/admin/newsCategory', adminNewsCategoryApi);
app.use('/api/client/news', clientNewsApi);
app.use('/api/client/partners', clientPartnersApi);
app.use('/api/client/newsCategory', clientNewsCategoryApi);
app.use('/api/client/law', clientLawApi);

// admin
app.get(/^\/admin/, function (req, res) {
    const page = renderAdminPage();

    res.send(page);
});

// app
app.get('*', function (req, res) {
    const store = getStore();

    Promise.all(map(
        actionFunc => {
            return actionFunc(req, res)(store.dispatch);
        },
        actions
    ))
        .then(() => {
            const context = {};
            const html = renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={req.originalUrl}
                        context={context}
                    >
                        <App />
                    </StaticRouter>
                </Provider>
            );
            const helmet = Helmet.renderStatic();
            const preloadedState = store.getState();
            const page = renderAppPage(html, helmet, preloadedState);

            res.send(page);
        });
});

app.listen(PORT, function () {
    console.log('listening on port', PORT); // eslint-disable-line no-console
});
