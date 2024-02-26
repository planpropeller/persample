interface Config {
    [key: string]: {
        databasePath: string;
    };
}

const config: Config = {
    test: {
        databasePath: 'file:./data/db.test.sqlite',
    },
    development: {
        databasePath: 'file:./data/db.sqlite',
    },
    production: {
        databasePath: 'file:./data/db.sqlite',
    },
};

export default config[process.env.NODE_ENV || 'development'];
