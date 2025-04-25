FROM mysql:8.0

COPY --chown=root:root schema.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=rootpassword \
    MYSQL_DATABASE=electromart \
    MYSQL_USER=user \
    MYSQL_PASSWORD=userpassword