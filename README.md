## Install

```
cd bookApi
npm i  or yarn install
```

### Server api

```
npm run dev

```

```
/apiBooks
│
├── /src
│   ├── /config
│   │   └── config.js
│   ├── /controllers
│   │   └── exampleController.ts
│   ├── /middlewares
│   │   └── exampleMiddleware.ts
│   ├── /middlewares/schema
│   │               └── exampleSchema.ts
│   ├── /interfaces
│   │   └── exampleInterface.ts
│   ├── /services
│   │   └── exampleService.ts
│   ├── /utils
│   │   └── exampleUtils.ts
│   ├── /libs
│   │   └── exampleLibs.ts
│   ├── /models
│   │   └── exampleModel.ts
│   ├── /routes
│   │   └── exampleRoutes.ts
│   ├── /test
│   │   └── exampleTest.ts
│   ├── /http
│   │   └── example.http
│   └── server.js
│
├──/**

```

- /config: Contiene archivos de configuración, como configuraciones de base de datos o configuraciones de la aplicación.

- /controllers: Mantiene controladores que manejan la lógica de negocio y la interacción con los modelos. Cada controlador debe tener una responsabilidad única.

- /middlewares: Almacena funciones de middleware que se pueden usar para procesar solicitudes antes de que lleguen a los controladores.

- /models: Contiene definiciones de modelos de base de datos y lógica de acceso a la base de datos.

- /middlewares/schema: Es una forma de validar los datos que llegan a la api.

- /interfaces Contiene archivos para definir métodos que deben ser implementados por las clases que la utilizan.

- /routes: Define las rutas de la aplicación y vincula rutas a controladores.

- /services: Puede contener lógica de negocio adicional que puede pertenece o no directamente a los controladores.

- /tests: Almacena archivos de prueba.

- /http: Almacena archivos de verificacion http usando httpi.

- /public: Contiene archivos estáticos, como hojas de estilo y scripts del lado del cliente.

- app.ts: El punto de entrada principal de la aplicación Express.

- .gitignore: Ignora los archivos y directorios específicos de Git.
- .tsconfig.json : Proporciona configuraciones básicas para un proyecto TypeScript
- .eslintrc.js: Configura ESLint con reglas recomendadas y reglas adicionales específicas de TypeScript.
- jest.config.js : Es la configuración principal para Jest, que es un marco de prueba para JavaScript y TypeScript

- package.json: Archivo de configuración de npm que incluye dependencias y scripts.

- README.md: Documentación del proyecto.
