# API de Libros en Node.js

Esta API de libros desarrollada en Node.js proporciona un servicio para gestionar una colección de libros. Utiliza los métodos HTTP estándar (GET, PUT, POST, DELETE) para realizar operaciones en la colección de libros.

## Inicio Rápido

1. **Verifica la Conexión:**

   ```plaintext
   GET /
   ```

2. **Verifica que la API está en línea y responde correctamente.**

   ```plaintext
   GET /books
   ```

3. **Devuelve la lista completa de libros disponibles.**
    - Obtener un libro por ID:
        ```plaintext
        GET /books/:id
        ```
    - Actualizar un libro por ID:
        ```plaintext
        PUT /books/:id
        ```
    - Elmina libros por ID:
        ```plaintext
        DELETE /books/:id
        ```
    **Nota**: Reemplaza **:id** con el ID real del libro que deseas consultar, actualizar o eliminar.

## Métodos Disponibles.

**GET**: Obtener información.

**PUT**: Actualizar información existente.

**POST**: Agregar nueva información.

**DELETE**: Eliminar información existente.


## Ejmplos de uso.

1. **Verifica la Conexión:**

    ```plaintext
    GET /
    ```

2. **Verifica la Conexión:**

    ```plaintext
    POST http://tu-api-url.com/books

    Content-Type: application/json

    {
        "title": "Título del Libro",
        "author": "Autor del Libro",
        "year": 2023
    }
    ```
3. **Actualizar un libro**

    ```plaintext
    PUT http://tu-api-url.com/books

    Content-Type: application/json

    {
        "year": 2023
    }
    ```