FROM postgres:12

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib

COPY *.sql /docker-entrypoint-initdb.d/