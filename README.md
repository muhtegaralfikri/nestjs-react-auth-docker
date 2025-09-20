# Proyek Autentikasi Full-Stack (NestJS, React, Docker)

Sebuah proyek *boilerplate* untuk sistem autentikasi pengguna yang dibangun dengan tumpukan teknologi modern dan sepenuhnya ter-kontainerisasi dengan Docker untuk kemudahan pengembangan dan deployment.

---

## ✨ Fitur

-   Registrasi Pengguna Baru
-   Login Pengguna
-   Password Hashing menggunakan `bcrypt`
-   Konfigurasi terpisah untuk mode **Development** (dengan Hot Reload) dan **Produksi** (dioptimalkan).
-   Frontend disajikan dengan Nginx untuk performa di mode produksi.
-   Seluruh aplikasi (Frontend, Backend, Database) dijalankan dengan satu perintah.

---

## 🛠️ Tech Stack

-   **Backend:** NestJS, TypeORM
-   **Frontend:** React (Vite), Material-UI (MUI)
-   **Database:** PostgreSQL
-   **Kontainerisasi:** Docker, Docker Compose
-   **Web Server (Produksi):** Nginx

---

## 🚀 Instalasi & Menjalankan

Pastikan Anda sudah menginstal **Docker** dan **Docker Compose**.

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/muhtegaralfikri/nestjs-react-auth-docker.git
    cd nestjs-react-auth-docker
    ```

2.  **Buat file environment**:
    * Buat file bernama `.env` di direktori utama.
    * Buat salinan file `.env` tersebut di dalam folder `backend/`.
    * Isi kedua file dengan konten berikut:
        ```env
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=password123
        POSTGRES_DB=auth_db
        POSTGRES_PORT=5432
        ```

3.  **Menjalankan dalam Mode Development:**
    (Dengan hot-reload untuk Frontend dan Backend)
    ```bash
    docker-compose up --build
    ```
    * Frontend akan tersedia di `http://localhost:5173`
    * Backend akan tersedia di `http://localhost:3001`

4.  **Menjalankan dalam Mode Produksi:**
    (Aplikasi yang sudah dioptimalkan dan disajikan oleh Nginx)
    ```bash
    docker-compose -f docker-compose.prod.yml up --build -d
    ```
    * Aplikasi akan tersedia di `http://localhost`

---

## 📝 Endpoint API

-   `POST /auth/register` - Mendaftarkan pengguna baru.
-   `POST /auth/login` - Login pengguna.