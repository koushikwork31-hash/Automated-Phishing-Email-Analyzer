# ThePhish with Docker

This is a Docker Compose template for ThePhish, TheHive, Cortex and MISP.

## Prerequisites
- Docker Compose version 1.27 or later
- 4 CPU cores and 8 GB RAM available for the Docker containers

## Services Contained in this Template

This docker-compose.yml contains the following services:
- **TheHive**
- **Cortex**
- **MISP**
- **ThePhish**

## Configuration Steps

1.  **Clone the Repository**
    ```bash
    cd /path/to/where/you/want/to/clone
    git clone https://github.com/emalderson/ThePhish.git
    cd ThePhish
    ```
2.  **Start the Containers**
    ```bash
    cd docker
    docker-compose up -d
    ```
3.  **Wait for the containers to initialize** (this takes several minutes, first time). You can check the logs with `docker-compose logs -f`.
4.  **Configure TheHive**
    -   Navigate to http://localhost:9000.
    -   Create an admin account.
    -   Create an organization (e.g. "ThePhish").
    -   Create a user (e.g. "thephish") with the **org-admin** role.
    -   Log in as that user and create an API key. Copy this key, you'll need it later.
    -   Configure Cortex in TheHive (Admin > Platform > Cortex):
        -   Name: local
        -   URL: http://cortex:9001
5.  **Configure Cortex**
    -   Navigate to http://localhost:9001.
    -   Create an admin account.
    -   Create an organization (e.g. "ThePhish").
    -   Create a user (e.g. "thephish") with **read, analyze** and **org-admin** roles.
    -   Log in as that user and create an API key. Copy this key, you'll need it later.
    -   Enable the responders (Mailer_1_0) and analyzers you want to use (see main README.md for a list).
6.  **Configure MISP**
    -   Navigate to https://localhost.
    -   Log in with the default credentials (admin@admin.test / admin).
    -   **Important:** Change the default admin password immediately!
    -   Create an organization (e.g. "ThePhish").
    -   Create a user with the **sync_user** role.
    -   Obtain the user's auth key. Copy this key, you'll need it later.
    -   Configure MISP in TheHive (Admin > Platform > MISP).
7.  **Configure ThePhish**
    -   Edit `docker/thephish_conf_files/configuration.json` (which is mounted into the ThePhish container) and set:
        -   `imap.user` and `imap.password`: your email credentials (use an app-specific password if using Gmail).
        -   `thehive.apikey`: the API key you created for TheHive.
        -   `cortex.apikey`: the API key you created for Cortex.
    -   If you have Cortex and TheHive instances with different names/IDs, update `cortex.id` and `misp.id` accordingly.
8.  **Restart ThePhish container**
    ```bash
    docker-compose restart thephish
    ```
9.  **You're ready to use ThePhish!** Navigate to http://localhost:8080!
